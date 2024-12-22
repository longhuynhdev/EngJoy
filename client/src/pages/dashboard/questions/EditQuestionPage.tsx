import { toast } from "sonner";
import { QuestionForm, FormValues } from "@/components/questions/QuestionForm";
import BackButton from "@/components/common/BackButton";
import { useParams, useNavigate } from "react-router-dom";
import { useQuestion, useEditQuestion } from "@/hooks/useQuestion";
import { LoadingSpinner } from "@/components/common/LoadingSpinner";
import { ErrorMessage } from "@/components/common/ErrorMessage";

const EditQuestionPage = () => {
    const navigate = useNavigate();
    const { id } = useParams();
    const { question, loading, error } = useQuestion(id!);
    const { editQuestion, isLoading: isEditing } = useEditQuestion();

    if (loading) {
        return <LoadingSpinner />;
    }

    if (error === "404" || !question) {
        navigate("/404");
        return null;
    }

    if (error) {
        return <ErrorMessage message={error} />;
    }

    const initialData: FormValues = {
        id: question.id,
        question: question.question,
        answers: question.answers,
    };

    const handleSubmit = async (data: FormValues) => {
        try {
            await editQuestion(id!, data);
            toast.success(`Question: ${data.question} has been updated successfully`);
            navigate("/dashboard/questions");
        } catch (error) {
            toast.error("Failed to update question: " + error.message);
        }
    };

    return (
        <>
            <BackButton link="/dashboard/questions" text="Back to Questions" />
            <h3 className="text-2xl font-bold">Edit Question</h3>
            <QuestionForm initialData={initialData} onSubmit={handleSubmit} />
        </>
    );
};

export default EditQuestionPage;