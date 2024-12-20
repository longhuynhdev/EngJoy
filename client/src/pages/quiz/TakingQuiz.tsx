import { useState, useEffect } from "react";
import "../quiz/TakingQuiz.css";
import { Banner } from "@/components/common/Banner";
import bannerImage from "@/img/banner.png";

const QuizPage = () => {
  const [quizData, setQuizData] = useState([]);
  const [progress, setProgress] = useState(0);
  const [userAnswers, setUserAnswers] = useState([]);
  const totalQuestions = 10;

  // Fetch quiz data from an API (this is just an example)
  useEffect(() => {
    const fetchQuizData = async () => {
      try {
        // Replace with actual API call
        const response = await fetch("/api/quiz");
        const data = await response.json();
        setQuizData(data);
      } catch (error) {
        console.error("Error fetching quiz data:", error);
      }
    };
    fetchQuizData();
  }, []);

  const handleAnswer = (answer) => {
    // Save the user's answer
    setUserAnswers((prevAnswers) => [...prevAnswers, answer]);
    
    // Move to the next question
    if (progress < totalQuestions - 1) {
      setProgress(progress + 1);
    }
  };

  const renderQuizQuestion = () => {
    const question = quizData[progress];
    if (!question) return null;

    return (
      <div className="quiz-question">
        <p>{question.text}</p>
        <div className="quiz-options">
          {question.options.map((option, index) => (
            <button
              key={index}
              className="quiz-option"
              onClick={() => handleAnswer(option)}
            >
              {option}
            </button>
          ))}
        </div>
      </div>
    );
  };

  return (
    <div className="quiz-container">
      <Banner
        title="Passive Clause"
        height="20rem"
        backgroundUrl={bannerImage}
      />

      <div className="quiz-content-container">
        <section className="progress-section">
          <h2>YOUR PROGRESS</h2>
          <div className="progress-bar">
            {Array.from({ length: totalQuestions }, (_, index) => (
              <span
                key={index}
                className={`progress-item ${
                  progress > index ? "completed" : ""
                }`}
              >
                {index + 1}
              </span>
            ))}
          </div>
        </section>

        <section className="quiz-section">
          {renderQuizQuestion()}
        </section>
      </div>
    </div>
  );
};

export default QuizPage;
