import { toast } from "sonner";
import { LessonForm } from "@/components/lessons/LessonForm";
import BackButton from "@/components/common/BackButton";
import { AddEditLessonData } from "@/types/AddEditLessonData";
import { useAddLesson } from "@/hooks/useLessson";
import { useNavigate } from "react-router-dom";

const AddLessonPage = () => {
  const navigate = useNavigate();
  const { addLesson, isLoading } = useAddLesson();
  const handleSubmit = async (data: AddEditLessonData) => {
    try {
      const dataWithDate = {
        ...data,
        date: new Date().toISOString()
      };
      console.log(dataWithDate);
      await addLesson(dataWithDate);
      toast.success(`Lesson: ${data.title} has been uploaded successfully`);
      setTimeout(() => {
        navigate("/dashboard/lessons");
      }, 1500);
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <>
      <BackButton link="/dashboard/lessons" text="Back to Lessons"></BackButton>
      <h3 className="text-2xl font-bold">Add a new lesson</h3>
      <LessonForm
        onSubmit={handleSubmit}
        submitLabel="Submit"
        isLoading={isLoading}
      />
    </>
  );
};

export default AddLessonPage;
