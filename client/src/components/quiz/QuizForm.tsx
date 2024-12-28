import { useState } from "react";
import { useForm, useFieldArray } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { PlusCircle, Trash2 } from "lucide-react";
import categories from "@/data/categories";
import difficulties from "@/data/difficulties";
import { MultiSelect } from "../ui/multi-select";

// Schema for form validation
const questionSchema = z.object({
  question: z.string().min(1, "Question is required"),
  answers: z.array(
    z.object({
      answer: z.string().min(1, "Answer is required"),
      explanation: z.string().optional(),
      correct: z.boolean(),
    })
  ).length(4, "A question must have exactly 4 answers"),
});

const quizSchema = z.object({
  title: z.string().min(1, "Quiz title is required"),
  shortDescription: z.string().min(1, "Short description is required"),
  duration: z.number().min(1, "Duration must be at least 1 minute"),
  points: z.string().min(1, "Points must be at least 1"),
  date: z.string().min(1, "Date is required"),
  categories: z.array(z.string()).min(1, "At least one category is required"),
  difficulties: z.array(z.string()).min(1, "At least one difficulty is required"),
  questions: z.array(questionSchema).min(1, "A quiz must have at least one question"),
});

export type QuizFormValues = z.infer<typeof quizSchema>;

interface QuizFormProps {
  initialData?: QuizFormValues;
  onSubmit: (data: QuizFormValues) => void;
}

export function QuizForm({ initialData, onSubmit }: QuizFormProps) {
  const [isEditing, setIsEditing] = useState(!!initialData);

  const form = useForm<QuizFormValues>({
    resolver: zodResolver(quizSchema),
    defaultValues: initialData || {
      title: "",
      shortDescription: "",
      duration: 10,
      points: '10', // Default points
      date: new Date().toISOString(), // Default date
      categories: ["General"], // Default category
      difficulties: ["Easy"], // Default difficulty
      questions: [
        {
          question: "",
          answers: [
            { answer: "", explanation: "", correct: false },
            { answer: "", explanation: "", correct: false },
            { answer: "", explanation: "", correct: false },
            { answer: "", explanation: "", correct: false },
          ],
        },
      ],
    },
  });

  const { fields, append, remove } = useFieldArray({
    name: "questions",
    control: form.control,
  });

  const handleSubmit = (data: QuizFormValues) => {
    onSubmit(data);
    if (!isEditing) {
      form.reset();
    }
  };

  const handleCategoriesChange = (values: string[]) => {
    form.setValue(
      "categories",
      values.map((v) => v)
    );
  };

  const handleDifficultiesChange = (values: string[]) => {
    form.setValue(
      "difficulties",
      values.map((v) => v)
    );
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-8">
        {/* Quiz Title */}
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Quiz Title</FormLabel>
              <FormControl>
                <Input {...field} placeholder="Enter the quiz title" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Short Description */}
        <FormField
          control={form.control}
          name="shortDescription"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Short Description</FormLabel>
              <FormControl>
                <Textarea {...field} placeholder="Enter a short description" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Duration */}
        <FormField
          control={form.control}
          name="duration"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Duration (minutes)</FormLabel>
              <FormControl>
                <Input type="number" {...field} placeholder="Duration in minutes" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Points */}
        <FormField
          control={form.control}
          name="points"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Points</FormLabel>
              <FormControl>
                <Input type="number" {...field} placeholder="Points" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Date */}
        <FormField
          control={form.control}
          name="date"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Date</FormLabel>
              <FormControl>
                <Input type="date" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Categories */}
        <FormField
          control={form.control}
          name="categories"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-xs font-bold uppercase text-zinc-500 dark:text-white">
                Categories
              </FormLabel>
              <FormControl>
                <MultiSelect
                  options={categories}
                  onValueChange={handleCategoriesChange}
                  defaultValue={field.value}
                  placeholder="Select categories"
                  variant="secondary"
                  maxCount={4}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Difficulties */}
        <FormField
          control={form.control}
          name="difficulties"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-xs font-bold uppercase text-zinc-500 dark:text-white">
                Difficulties
              </FormLabel>
              <FormControl>
                <MultiSelect
                  options={difficulties}
                  onValueChange={handleDifficultiesChange}
                  defaultValue={field.value}
                  placeholder="Select difficulties"
                  variant="secondary"
                  maxCount={4}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Questions */}
        <div className="space-y-4">
          {fields.map((field, index) => (
            <div key={field.id} className="p-4 space-y-4 border rounded-md">
              {/* Question */}
              <FormField
                control={form.control}
                name={`questions.${index}.question`}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Question {index + 1}</FormLabel>
                    <FormControl>
                      <Textarea {...field} placeholder={`Enter Question ${index + 1}`} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Answers */}
              {field.answers.map((answer, answerIndex) => (
                <div key={answerIndex} className="space-y-2">
                  {/* Answer */}
                  <FormField
                    control={form.control}
                    name={`questions.${index}.answers.${answerIndex}.answer`}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Answer {answerIndex + 1}</FormLabel>
                        <FormControl>
                          <Input {...field} placeholder={`Answer ${answerIndex + 1}`} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  {/* Correct Checkbox */}
                  <FormField
                    control={form.control}
                    name={`questions.${index}.answers.${answerIndex}.correct`}
                    render={({ field }) => (
                      <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                        <FormControl>
                          <Checkbox
                            checked={field.value}
                            onCheckedChange={field.onChange}
                          />
                        </FormControl>
                        <FormDescription>
                          Is this the correct answer?
                        </FormDescription>
                      </FormItem>
                    )}
                  />
                </div>
              ))}

              <Button
                type="button"
                variant="destructive"
                size="sm"
                onClick={() => remove(index)}
              >
                <Trash2 className="w-4 h-4 mr-2" />
                Remove Question
              </Button>
            </div>
          ))}
        </div>

        {/* Add Question Button */}
        <Button
          type="button"
          variant="outline"
          size="sm"
          onClick={() =>
            append({
              question: "",
              answers: [
                { answer: "", explanation: "", correct: false },
                { answer: "", explanation: "", correct: false },
                { answer: "", explanation: "", correct: false },
                { answer: "", explanation: "", correct: false },
              ],
            })
          }
        >
          <PlusCircle className="w-4 h-4 mr-2" />
          Add Question
        </Button>

        {/* Submit Button */}
        <Button type="submit">
          {isEditing ? "Update Quiz" : "Create Quiz"}
        </Button>
      </form>
    </Form>
  );
}
