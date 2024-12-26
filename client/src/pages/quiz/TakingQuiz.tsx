import { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import bannerImage from "@/img/banner.png"; 

interface QuizTimeProps {
  totalQuestions: number;
  currentQuestionIndex: number;
  answeredQuestions: boolean[];
}

interface Question {
  question: string;
  answers: { answerId: number; answer: string }[];
}

interface QuestionBlockProps {
  currentQuestion: Question;
  handleAnswer: (index: number) => void;
}

const QuizTime = ({ totalQuestions, currentQuestionIndex, answeredQuestions }: QuizTimeProps) => {
  return (
    <div className="w-full max-w-3xl bg-white shadow-lg rounded-lg p-6 text-center mb-6">
      <h1 className="text-2xl font-bold text-gray-800 mb-4">Your Progress</h1>
      <hr className="w-[347px] border-gray-300 my-2 mx-auto" />
      <div className="flex justify-center gap-2">
        {Array.from({ length: totalQuestions }).map((_, index) => (
          <Badge
            key={index}
            variant="default"
            className={`${
              answeredQuestions[index]
                ? "bg-green-500 text-white"
                : "bg-gray-300 text-gray-800"
            }`}
          >
            {index + 1}
          </Badge>
        ))}
      </div>
    </div>
  );
};

const QuestionBlock = ({ currentQuestion, handleAnswer }: QuestionBlockProps) => {
  const answerLabels = ["A", "B", "C", "D"];
  return (
    <div className="w-full max-w-3xl bg-white shadow-lg rounded-lg p-6 text-center">
      <div className="mb-6">
        <p className="text-lg font-medium text-gray-700">{currentQuestion.question}</p>
        <div className="mt-4 flex flex-col gap-4">
          {currentQuestion.answers.map((answer, index) => (
            <Button
              key={answer.answerId}
              variant="default"
              className="px-4 py-2 text-sm font-semibold bg-blue-400 text-white rounded-lg hover:bg-blue-600"
              onClick={() => handleAnswer(index)}
            >
              {answerLabels[index]}.{answer.answer}
            </Button>
          ))}
        </div>
      </div>
    </div>
  );
};

const TakingQuizPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const quiz = location.state?.quiz; 
  const [quizQuestions, setQuizQuestions] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answeredQuestions, setAnsweredQuestions] = useState<boolean[]>([]);
  const [quizTitle] = useState(location.state?.quiz?.title || "Default Quiz Title");
  const [score, setScore] = useState(0); // Lưu điểm số

  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        const response = await fetch("http://localhost:8080/api/v1/questions");
        const data = await response.json();
        setQuizQuestions(data);
        setAnsweredQuestions(new Array(data.length).fill(false)); 
      } catch (error) {
        console.error("Failed to fetch quiz questions:", error);
        navigate("/error"); 
      }
    };

    fetchQuestions();
  }, [navigate]);

  const handleAnswer = (index: number) => {
    const updatedAnswers = [...answeredQuestions];
    updatedAnswers[currentQuestionIndex] = true;
    setAnsweredQuestions(updatedAnswers);

    // Giả sử câu trả lời đúng là câu trả lời có index 0
    if (index === 0) {
      setScore(score + 1); // Tăng điểm khi trả lời đúng
    }

    if (currentQuestionIndex < quizQuestions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    }
  };

  if (quizQuestions.length === 0) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-100">
        <p>Loading quiz questions...</p>
      </div>
    );
  }

  const currentQuestion = quizQuestions[currentQuestionIndex]; 

  return (

    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <div
        className="w-full flex flex-col items-center justify-center"
        style={{
          backgroundImage: `url(${bannerImage})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          height: "15rem",
        }}
      >
        <h1 className="text-4xl font-bold text-black">{quizTitle}</h1>
      </div>
      <QuizTime
        totalQuestions={quizQuestions.length}
        currentQuestionIndex={currentQuestionIndex}
        answeredQuestions={answeredQuestions}
      />

      <QuestionBlock
        currentQuestion={currentQuestion}
        handleAnswer={handleAnswer}
      />

      <div className="w-full max-w-3xl flex justify-between mt-6">
        <Button
          variant="secondary"
          disabled={currentQuestionIndex === 0}
          onClick={() =>
            setCurrentQuestionIndex((prev) => Math.max(prev - 1, 0))
          }
        >
          Previous
        </Button>
        <Button
          variant="secondary"
          onClick={() => {
            if (currentQuestionIndex === quizQuestions.length - 1) {
              navigate(`/quizzes/${quiz.id}/result`, {
                state: {
                  score,
                  totalScore: quizQuestions.length, // Tổng điểm tối đa là số câu hỏi
                  title: quiz.title,
                  description: quiz.description,  
                  difficulties: quiz.difficulties, 
                  categories: quiz.categories, 
                }, 
              });
            } else {
              setCurrentQuestionIndex((prev) => prev + 1);
            }
          }}
        >
          {currentQuestionIndex === quizQuestions.length - 1
            ? "Finish"
            : "Next"}
        </Button>
      </div>
    </div>
  );
};

export default TakingQuizPage;
