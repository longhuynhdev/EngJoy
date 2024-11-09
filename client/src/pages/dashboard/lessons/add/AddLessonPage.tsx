import { toast } from "sonner";
import { LessonForm } from "@/components/lessons/LessonForm";
import BackButton from "@/components/BackButton";

const AddLessonPage = () => {
  //TODO: change any to the correct type
  const handleSubmit = (data: any) => {
    console.log(data);
    toast.success(`Lesson: ${data.title} has been uploaded successfully`);
  };

  return (
    <>
      <BackButton link="/dashboard/lessons" text="Back to Lessons"></BackButton>
      <h3 className="text-2xl font-bold">Add a new lesson</h3>
      <LessonForm onSubmit={handleSubmit} submitLabel="Submit" />
    </>
  );
};

export default AddLessonPage;
