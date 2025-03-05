import { toast } from "sonner";
import { QuestionForm } from "@/components/questions/QuestionForm";
import BackButton from "@/components/common/BackButton";
import { useAddQuestion } from "@/hooks/useQuestion";
import { useNavigate } from "react-router-dom";
import { FormValues } from "@/components/questions/QuestionForm";

const AddQuestionPage = () => {
  const navigate = useNavigate();
  const { addQuestion, isLoading } = useAddQuestion();

  const handleSubmit = async (data: FormValues) => {
    try {
      // DEBUG:
      console.log("data:", data);
      await addQuestion(data);
      toast.success(`Question: ${data.question} has been added successfully`);
      setTimeout(() => {
          navigate("/dashboard/questions");
      }, 1500);
    } catch (error) {
      console.error("Failed to add question:", error);
      toast.error("Failed to add question: " + error.message);
    }
  };

  return (
    <>
      <BackButton link="/dashboard/questions" text="Back to Questions" />
      <h3 className="text-2xl font-bold">Add a new question</h3>
      <QuestionForm onSubmit={handleSubmit} />
    </>
  );
};

export default AddQuestionPage;
