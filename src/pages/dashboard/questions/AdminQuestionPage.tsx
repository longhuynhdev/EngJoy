import BackButton from "@/components/common/BackButton";
import { Button } from "@/components/ui/button";
import QuestionsTable from "@/components/questions/QuestionsTable";
import { Link } from "react-router-dom";
import { useQuestions } from "@/hooks/useQuestions";
import { useDeleteQuestion } from "@/hooks/useQuestion.ts";
import { toast } from "sonner";

const AdminQuestionPage = () => {
  const { questions, loading, error } = useQuestions();
  const { deleteQuestion } = useDeleteQuestion();

    const handleDeleteQuestion = async (id: string) => {
        try {
            await deleteQuestion(id);
            toast.success("Question deleted successfully");
            setTimeout(() => {
                window.location.reload();
            }, 1500);
        } catch (error) {
            console.error("Error deleting question:", error);
            toast.error("Failed to delete question");
        }
    };

  return (
    <>
      <div className="flex justify-between">
        <BackButton link="/dashboard" text="Back to Dashboard" />
        <Link to="/dashboard/questions/add" className="inline-block mr-2">
          <Button className="px-4 py-2 text-xs font-bold text-white bg-blue-500 rounded hover:bg-blue-700">
            Add new question
          </Button>
        </Link>
      </div>
      <QuestionsTable
        questions={questions}
        loading={loading}
        error={error}
        onDelete={handleDeleteQuestion}
      />
    </>
  );
};

export default AdminQuestionPage;
