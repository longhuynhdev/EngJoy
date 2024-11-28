import { toast } from "sonner";
import { LessonForm } from "@/components/lessons/LessonForm";
import BackButton from "@/components/common/BackButton";
import { useParams } from "react-router-dom";
import { useLesson, useEditLesson } from "@/hooks/useLessson";
import { LoadingSpinner } from "@/components/common/LoadingSpinner";
import { ErrorMessage } from "@/components/common/ErrorMessage";
import { useNavigate } from "react-router-dom";
import { AddEditLessonData } from "@/types/AddEditLessonData";

const EditLessonPage = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const { lesson, loading, error } = useLesson(id!);
  const { editLesson, isLoading: isEditing } = useEditLesson();

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

  const initialData: AddEditLessonData = {
    title: lesson.title,
    shortDescription: lesson.shortDescription,
    body: lesson.body,
    date: lesson.date,
    categories: lesson.categories,
    difficulties: lesson.difficulties,
    duration: lesson.duration.toString(),
    points: lesson.points.toString(),
  };

  const handleSubmit = async (data: AddEditLessonData) => {
    try {
      await editLesson(id!, data);
      toast.success(`Lesson: ${data.title} has been updated successfully`);
      navigate("/dashboard/lessons");
    } catch (error) {
      toast.error("Failed to update lesson: " + error.message);
    }
  };

  return (
    <>
      <BackButton link="/dashboard/lessons" text="Back to Lessons" />
      <h3 className="text-2xl font-bold">Edit Lesson</h3>
      <LessonForm
        initialData={initialData}
        onSubmit={handleSubmit}
        submitLabel="Update"
        isLoading={isEditing}
      />
    </>
  );
};

export default EditLessonPage;
