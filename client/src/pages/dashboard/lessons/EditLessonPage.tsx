import { toast } from "sonner";
import { LessonForm } from "@/components/lessons/LessonForm";
import BackButton from "@/components/common/BackButton";
import { useParams } from "react-router-dom";
import { useLesson } from "@/hooks/useLessson";
import { LoadingSpinner } from "@/components/common/LoadingSpinner";
import { ErrorMessage } from "@/components/common/ErrorMessage";
import { useNavigate } from "react-router-dom";
import { AddEditLessonData } from "@/types/AddEditLessonData";

const EditLessonPage = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const { lesson, loading, error } = useLesson(id!);

  const initialData: AddEditLessonData | undefined = lesson
    ? {
        title: lesson.title,
        shortDescription: lesson.shortDescription,
        body: lesson.body,
        date: lesson.date,
        categories: lesson.categories,
        difficulties: lesson.difficulties,
        duration: lesson.duration,
        points: lesson.points,
      }
    : undefined;

  const handleSubmit = async (data: AddEditLessonData) => {
    try {
      const response = await fetch(
        `http://localhost:8080/api/v1/lessons/${id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to update lesson");
      }

      toast.success(`Lesson: ${data.title} has been updated successfully`);
      navigate("/dashboard/lessons");
    } catch (error) {
      toast.error("Failed to update lesson");
    }
  };

  if (loading) {
    return <LoadingSpinner />;
  }

  if (error === "404" || !lesson) {
    navigate("/404");
    return null;
  }

  if (error) {
    return <ErrorMessage message={error} />;
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