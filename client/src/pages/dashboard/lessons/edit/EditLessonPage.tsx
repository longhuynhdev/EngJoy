import { toast } from "sonner";
import { LessonForm } from "@/components/lessons/LessonForm";
import BackButton from "@/components/common/BackButton";
import { useParams } from "react-router-dom";
import lessons from "@/data/lessons";

const EditLessonPage = () => {
  const { id } = useParams();
  const lesson = lessons.find((post) => String(post.id) === id);

  const initialData = lesson
    ? {
        title: lesson.title,
        body: lesson.body,
        author: lesson.author,
        date: lesson.date,
        category: Array.isArray(lesson.categories)
          ? lesson.categories
          : [lesson.categories],
        difficulty: Array.isArray(lesson.difficulties)
          ? lesson.difficulties
          : [lesson.difficulties],
      }
    : undefined;

  // TODO: change any to the correct type
  const handleSubmit = (data: any) => {
    console.log(data);
    toast.success(`Lesson: ${data.title} has been updated successfully`);
  };

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
      />
    </>
  );
};

export default EditLessonPage;
