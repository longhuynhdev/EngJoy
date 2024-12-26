import { toast } from "sonner";
import { QuizForm, QuizFormValues } from "@/components/quiz/QuizForm"; 
import BackButton from "@/components/common/BackButton";
import { useAddQuiz } from "@/hooks/useQuiz"; 
import { useNavigate } from "react-router-dom";

const AddQuizPage = () => {
  const navigate = useNavigate();
  const { addQuiz, isLoading } = useAddQuiz(); 

  const handleSubmit = async (data: QuizFormValues) => {
    try {
      // DEBUG: Log data for debugging
      console.log("Quiz data submitted:", data);

      await addQuiz(data); 
      toast.success(`Quiz: ${data.title} has been added successfully`);

      setTimeout(() => {
        navigate("/dashboard/quizzes");
      }, 1500);
    } catch (error) {
      console.error("Failed to add quiz:", error);
      toast.error("Failed to add quiz: " + error.message );
    }
  };

  return (
    <>
      <BackButton link="/dashboard/quizzes" text="Back to Quizzes" />
      <h3 className="text-2xl font-bold">Add a New Quiz</h3>
      <QuizForm onSubmit={handleSubmit}/>
    </>
  );
};

export default AddQuizPage;
