import { useState } from "react";
import "../quiz/TakingQuiz.css";
import { Banner } from "@/components/common/Banner";
import bannerImage from "@/img/banner.png";

const QuizPage = () => {
  const [progress, setProgress] = useState(1); 
  const totalQuestions = 10;

  const handleNextQuestion = () => {
    if (progress < totalQuestions) {
      setProgress(progress + 1);
    }
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
            </div>
      <section className="quiz-section">
        <div className="quiz-question">
          <p>
            A: Why are you working so hard these days? <br />
            B: Because _____ a car, so I’m saving as much as I can.
          </p>
        </div>
        <div className="quiz-options">
          <button
            className="quiz-option"
            onClick={handleNextQuestion}
          >
            A. I'll buy
          </button>
          <button
            className="quiz-option"
            onClick={handleNextQuestion}
          >
            B. I'm going to buy
          </button>
          <button
            className="quiz-option"
            onClick={handleNextQuestion}
          >
            C. I buy
          </button>
        </div>
      </section>
    </div>
  );
};

export default QuizPage;
