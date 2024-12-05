import * as z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import difficulties from "@/data/difficulties";
import categories from "@/data/categories";
import { MultiSelect } from "@/components/ui/multi-select";
import Tiptap from "../Tiptap";
import { LoadingSpinner } from "../common/LoadingSpinner";

const formSchema = z.object({
  title: z.string().min(1),
  shortDescription: z.string().min(1),
  duration: z
    .union([z.string(), z.number().min(1)])
    .transform((val) => String(val)),
  points: z
    .union([z.string(), z.number().min(1)])
    .transform((val) => String(val)),
  body: z.string().min(1),
  date: z.string(),
  categories: z.array(z.string()),
  difficulties: z.array(z.string()),
});

interface LessonFormProps {
  initialData?: z.infer<typeof formSchema>;
  onSubmit: (data: z.infer<typeof formSchema>) => void;
  submitLabel?: string;
  isLoading?: boolean;
}

export const LessonForm = ({
  initialData,
  onSubmit,
  submitLabel = "Submit",
  isLoading,
}: LessonFormProps) => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: initialData || {
      title: "",
      shortDescription: "",
      duration: "",
      points: "",
      body: "",
      date: "",
      categories: [],
      difficulties: [],
    },
  });

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
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-xs font-bold uppercase text-zinc-500 dark:text-white">
                Title
              </FormLabel>
              <FormControl>
                <Input placeholder="Enter title" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="shortDescription"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-xs font-bold uppercase text-zinc-500 dark:text-white">
                Short Description
              </FormLabel>
              <FormControl>
                <Textarea
                  spellCheck="false"
                  placeholder="Enter short description"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="duration"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-xs font-bold uppercase text-zinc-500 dark:text-white">
                Duration
              </FormLabel>
              <FormControl>
                <Input
                  type="number"
                  placeholder="Enter duration"
                  min={0}
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="points"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-xs font-bold uppercase text-zinc-500 dark:text-white">
                Points
              </FormLabel>
              <FormControl>
                <Input
                  type="number"
                  placeholder="Enter points"
                  min={0}
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="body"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-xs font-bold uppercase text-zinc-500 dark:text-white">
                Content
              </FormLabel>
              <FormControl>
                <Tiptap
                  description={field.value}
                  onChange={(html) => {
                    field.onChange(html);
                  }}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

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
        <FormField
          control={form.control}
          name="difficulties"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-xs font-bold uppercase text-zinc-500 dark:text-white">
                Difficulty
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
        <Button className="w-full dark:bg-slate-800" disabled={isLoading}>
          {isLoading ? <LoadingSpinner /> : null}
          {submitLabel}
        </Button>
      </form>
    </Form>
  );
};
