import { useParams, useNavigate } from "react-router-dom";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useQuiz } from "@/hooks/useQuiz"; // Hook để lấy dữ liệu quiz
import { LoadingSpinner } from "@/components/common/LoadingSpinner";
import { ErrorMessage } from "@/components/common/ErrorMessage";
import bannerImage from "@/img/banner.png"; // Import background image

const startTakingQuizPage = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { quiz, loading, error } = useQuiz(id || "");

  // Xử lý trạng thái tải
  if (loading) {
    return <LoadingSpinner />;
  }

  // Xử lý lỗi 404 hoặc không tìm thấy quiz
  if (error === "404" || !quiz) {
    navigate("/404");
    return null;
  }

  // Xử lý lỗi khác
  if (error) {
    return <ErrorMessage message={error} />;
  }

  // Hiển thị nội dung trang quiz
  return (
    <div
      className="flex flex-col items-center justify-center min-h-screen bg-gray-100"
      style={{
        backgroundImage: `url(${bannerImage})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div
        className="w-[669px] h-[395px] bg-white shadow-md rounded-lg p-8 text-center relative flex flex-col"
      >
        {/* Quiz Title */}
        <div className="w-[347px] h-[56px] mx-auto">
          <h1 className="text-[40px] font-extrabold text-[#0F172A]">{quiz.title}</h1>
        </div>

        {/* Horizontal Line (under Title) */}
        <hr className="w-[347px] border-gray-300 my-2 mx-auto" />

        {/* Description */}
        <div className="w-[637px] h-[56px] mx-auto">
          <p className="text-[16px] font-medium text-[#0F172A]">{quiz.description}</p>
        </div>

        {/* Badges for difficulties and categories */}
        <div className="w-[515px] h-[46px] mx-auto flex justify-center gap-2 flex-wrap mb-4">
          {quiz.difficulties.map((difficulty) => (
            <Badge
              key={difficulty}
              variant="default"
              className="text-white bg-gray-900"
            >
              {difficulty}
            </Badge>
          ))}
          {quiz.categories.map((category) => (
            <Badge
              key={category}
              variant="secondary"
              className="text-white bg-red-500"
            >
              {category}
            </Badge>
          ))}
        </div>

        {/* Horizontal Line (under Badges) */}
        <hr className="w-[515px] border-gray-300 my-2 mx-auto" />

        {/* Prompt - Separate Container */}
        <div className="relative w-[637px] h-[79px] mx-auto">
          <p className="absolute bottom-0 w-full text-center text-[16px] font-light text-[#0F172A]">
            Do you want to start taking the quiz?
          </p>
        </div>

        {/* Button Container - Separate */}
        <div className="w-[637px] h-[102px] flex justify-center gap-[150px] items-center">
          <Button
            variant="secondary"
            className="px-6 py-2 text-sm font-semibold text-white bg-gray-400 rounded-md hover:bg-gray-500"
            onClick={() => navigate("/quizzes")}
          >
            Back to Quizzes
          </Button>
          <Button
            variant="default"
            className="px-6 py-2 text-sm font-semibold text-white bg-blue-600 rounded-md hover:bg-blue-700"
            onClick={() => navigate(`/quizzes/${quiz.id}/start`)}
          >
            Continue
          </Button>
        </div>
      </div>
    </div>
  );
};

export default startTakingQuizPage;
