import { useParams } from "react-router-dom";
import { Badge } from "@/components/ui/badge";
import { useLesson } from "@/hooks/useLessson";
import { LoadingSpinner } from "@/components/common/LoadingSpinner";
import { ErrorMessage } from "@/components/common/ErrorMessage";
import { useNavigate } from "react-router-dom";
import { QuestionSection } from "@/components/lessons/QuestionSection";
const LessonDetailsPage = () => {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const { lesson, loading, error } = useLesson(id || "");

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

  return (
    <div className="container max-w-4xl px-4 py-8 mx-auto">
      <article className="mx-auto">
        <header className="mb-8">
          <h1 className="mb-4 text-4xl font-bold text-gray-900 dark:text-white">
            {lesson.title}
          </h1>
          <div className="flex flex-wrap gap-2">
            {lesson.categories.map((category) => (
              <Badge key={category} variant="default">
                {category}
              </Badge>
            ))}
            {lesson.difficulties.map((difficulty) => (
              <Badge key={difficulty} variant="destructive">
                {difficulty}
              </Badge>
            ))}
          </div>
        </header>

        {/* Main content*/}
        <div
          className="prose prose-slate max-w-none dark:prose-invert prose-headings:font-bold prose-h1:text-3xl prose-h2:text-2xl prose-h3:text-xl prose-p:text-gray-700 dark:prose-p:text-gray-300 prose-a:text-blue-600 hover:prose-a:text-blue-500 prose-img:rounded-lg"
          dangerouslySetInnerHTML={{ __html: lesson.body }}
        />

        {/* Question Section */}
        <div className="mt-12">
          <QuestionSection questions={lesson.questions} />
        </div>
      </article>
    </div>
  );
};

export default LessonDetailsPage;
