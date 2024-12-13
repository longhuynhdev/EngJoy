import { useParams } from "react-router-dom";
import { Badge } from "@/components/ui/badge";
import { useQuizzes } from "@/hooks/useQuizzes"; // Hook để lấy chi tiết quiz
import { LoadingSpinner } from "@/components/common/LoadingSpinner";
import { ErrorMessage } from "@/components/common/ErrorMessage";
import { useNavigate } from "react-router-dom";

const QuizzesDetailsPage = () => {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>(); // Lấy `id` từ URL
  const { quizzes, loading, error } = useQuizzes(id || ""); // Hook để lấy dữ liệu quiz

  if (loading) {
    return <LoadingSpinner />;
  }

  if (error === "404" || !quizzes) {
    navigate("/404"); // Điều hướng đến trang 404 nếu không tìm thấy quiz
    return null;
  }

  if (error) {
    return <ErrorMessage message={error} />;
  }

  return (
    <div className="container max-w-4xl px-4 py-8 mx-auto">
      <article className="mx-auto">
        <header className="mb-8">
          <h1 className="mb-4 text-4xl font-bold text-gray-900 dark:text-white">
            {quizzes.title}
          </h1>
          <div className="flex flex-wrap gap-2">
            {quizzes.categories.map((category) => (
              <Badge key={category} variant="default">
                {category}
              </Badge>
            ))}
            {quizzes.difficulties.map((difficulty) => (
              <Badge key={difficulty} variant="destructive">
                {difficulty}
              </Badge>
            ))}
          </div>
        </header>

        {/* Nội dung chi tiết quiz */}
        <div
          className="prose prose-slate max-w-none dark:prose-invert prose-headings:font-bold prose-h1:text-3xl prose-h2:text-2xl prose-h3:text-xl prose-p:text-gray-700 dark:prose-p:text-gray-300 prose-a:text-blue-600 hover:prose-a:text-blue-500 prose-img:rounded-lg"
          dangerouslySetInnerHTML={{ __html: quizzes.body }}
        />
      </article>
    </div>
  );
};

export default QuizzesDetailsPage;
