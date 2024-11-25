import { toast } from "sonner";
import { LessonForm } from "@/components/lessons/LessonForm";
import BackButton from "@/components/common/BackButton";
import { useParams } from "react-router-dom";
import { useLesson } from "@/hooks/useLessson";
import { Lesson } from "@/types/lessons";
import { Loader2 } from "lucide-react";

const EditLessonPage = () => {
  const { id } = useParams();
  const { lesson, loading, error } = useLesson(id!);

  const initialData = lesson
    ? {
        title: lesson.title,
        shortDescription: lesson.shortDescription,
        body: lesson.body,
        date: lesson.date,
        categories: lesson.categories,
        difficulties: lesson.difficulties,
      }
    : undefined;

  const handleSubmit = async (data: Omit<Lesson, 'id' | 'comments' | 'author' | 'shortDescription'>) => {
    try {
      const response = await fetch(`http://localhost:8080/api/v1/lessons/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error('Failed to update lesson');
      }

      toast.success(`Lesson: ${data.title} has been updated successfully`);
    } catch (error) {
      toast.error('Failed to update lesson');
    }
  };

  if (loading) {
    return <Loader2 className="animate-spin h-8 w-8 mx-auto" />;
  }

  if (error) {
    return <div className="text-red-500">Error: {error}</div>;
  }

  if (!lesson) {
    return <div>Lesson not found</div>;
  }

  return (
    <>
      <BackButton link="/dashboard/lessons" text="Back to Lessons" />
      <h3 className="text-2xl font-bold">Edit Lesson</h3>
      <LessonForm
        initialData={initialData}
        onSubmit={handleSubmit}
        submitLabel="Update"
        isLoading={loading}
      />
    </>
  );
};

export default EditLessonPage;