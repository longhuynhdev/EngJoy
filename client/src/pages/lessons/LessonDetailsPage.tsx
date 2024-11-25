import { useParams } from "react-router-dom";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"

import { Loader2 } from "lucide-react";

import { useLesson } from "@/hooks/useLessson";

const LessonDetailsPage = () => {
  const { id } = useParams<{ id: string }>();
  const { lesson, loading, error } = useLesson(id || "");

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[200px]">
        <Loader2 className="animate-spin h-8 w-8" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-red-500 text-center p-4 rounded-md bg-red-50">
        {error}
      </div>
    );
  }

  if (!lesson) {
    return <div>Lesson not found</div>;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <article className="prose prose-slate dark:prose-invert lg:prose-xl mx-auto">
        <h1 className="mb-4">{lesson.title}</h1>
        <div className="flex flex-wrap gap-2 mb-4">
          {lesson.categories.map((category) => (
            <Badge key={category} variant="secondary">
              {category}
            </Badge>
          ))}
          {lesson.difficulties.map((difficulty) => (
            <Badge key={difficulty} variant="outline">
              {difficulty}
            </Badge>
          ))}
        </div>
        <div className="mt-6">{lesson.body}</div>
      </article>
    </div>
  );
};

export default LessonDetailsPage;
