import { useState } from "react"
import { useForm, useFieldArray } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Checkbox } from "@/components/ui/checkbox"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { PlusCircle, Trash2 } from 'lucide-react'

const answerSchema = z.object({
  answerId: z.number().optional(),
  answer: z.string().min(1, "Answer is required"),
  explanation: z.string().min(1, "Explanation is required"),
  correct: z.boolean().default(false),
})

const formSchema = z.object({
  id: z.number().optional(),
  question: z.string().min(1, "Question is required"),
  answers: z.array(answerSchema).min(2, "At least two answers are required"),
})

export type FormValues = z.infer<typeof formSchema>

interface QuestionFormProps {
  initialData?: FormValues
  onSubmit: (data: FormValues) => void
}

export function QuestionForm({ initialData, onSubmit }: QuestionFormProps) {
  const [isEditing, setIsEditing] = useState(!!initialData)

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: initialData || {
      question: "",
      answers: [
        { answer: "", explanation: "", correct: false },
        { answer: "", explanation: "", correct: false },
        { answer: "", explanation: "", correct: false },
      ],
    },
  })

  const { fields, append, remove } = useFieldArray({
    name: "answers",
    control: form.control,
  })

  const handleSubmit = (data: FormValues) => {
    onSubmit(data)
    if (!isEditing) {
      form.reset()
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="question"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Question</FormLabel>
              <FormControl>
                <Textarea {...field} placeholder="Enter the question" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="space-y-4">
          {fields.map((field, index) => (
            <div key={field.id} className="p-4 space-y-4 border rounded-md">
              <FormField
                control={form.control}
                name={`answers.${index}.answer`}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Answer {index + 1}</FormLabel>
                    <FormControl>
                      <Input {...field} placeholder="Enter the answer" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name={`answers.${index}.explanation`}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Explanation</FormLabel>
                    <FormControl>
                      <Textarea {...field} placeholder="Enter the explanation" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name={`answers.${index}.correct`}
                render={({ field }) => (
                  <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                    <FormControl>
                      <Checkbox
                        checked={field.value}
                        onCheckedChange={field.onChange}
                      />
                    </FormControl>
                    <div className="space-y-1 leading-none">
                      <FormLabel>Correct Answer</FormLabel>
                      <FormDescription>
                        Is this the correct answer?
                      </FormDescription>
                    </div>
                  </FormItem>
                )}
              />

              {fields.length > 2 && (
                <Button
                  type="button"
                  variant="destructive"
                  size="sm"
                  onClick={() => remove(index)}
                >
                  <Trash2 className="w-4 h-4 mr-2" />
                  Remove Answer
                </Button>
              )}
            </div>
          ))}
        </div>

        <Button
          type="button"
          variant="outline"
          size="sm"
          onClick={() => append({ answer: "", explanation: "", correct: false })}
        >
          <PlusCircle className="w-4 h-4 mr-2" />
          Add Answer
        </Button>

        <Button type="submit">
          {isEditing ? "Update Question" : "Add Question"}
        </Button>
      </form>
    </Form>
  )
}

