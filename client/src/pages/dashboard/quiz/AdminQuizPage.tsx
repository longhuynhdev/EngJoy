import BackButton from "@/components/common/BackButton";
import { Button } from "@/components/ui/button";
import QuizTable from "@/components/quiz/QuizTable";
import { Link } from "react-router-dom";
import useQuizzes from "@/hooks/useQuizzes"; 
import { useDeleteQuiz } from "@/hooks/useQuiz.ts";
import { toast } from "sonner";

const AdminQuizPage = () => {
  const { quizzes, loading, error } = useQuizzes(); 
  const { deleteQuiz } = useDeleteQuiz();

  const handleDeleteQuestion = async (id: string) => {
    try {
      await deleteQuiz(id);
      toast.success("Quiz deleted successfully");
      setTimeout(() => {
        window.location.reload();
      }, 1500);
    } catch (error) {
      console.error("Error deleting quiz:", error);
      toast.error("Failed to delete quiz");
    }
  };

  return (
    <>
      <div className="flex justify-between">
        <BackButton link="/dashboard" text="Back to Dashboard" />
        <Link to="/dashboard/quizzes/add" className="inline-block mr-2">
          <Button className="px-4 py-2 text-xs font-bold text-white bg-blue-500 rounded hover:bg-blue-700">
            Add new quiz
          </Button>
        </Link>
      </div>
      <QuizTable
        quizzes={quizzes}
        loading={loading}
        error={error}
        onDelete={handleDeleteQuestion}
      />
    </>
  );
};

export default AdminQuizPage;
