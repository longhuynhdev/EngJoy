import React from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import bannerImage from "@/img/banner.png"; // Import the image

interface QuizDetails {
  title: string;
  description: string;
  difficulties: string[];
  categories: string[];
}

const StartQuizPage: React.FC<QuizDetails> = ({
  title,
  description,
  difficulties,
  categories,
}) => {
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
          <h1 className="text-[40px] font-extrabold text-[#0F172A]">{title}</h1>
        </div>

        {/* Horizontal Line (under Title, length 347px) */}
        <hr className="w-[347px] border-gray-300 my-2 mx-auto" />

        {/* Description */}
        <div className="w-[637px] h-[56px] mx-auto">
          <p className="text-[16px] font-medium text-[#0F172A]">{description}</p>
        </div>

        {/* Badges for difficulties and categories */}
        <div className="w-[515px] h-[46px] mx-auto flex justify-center gap-2 flex-wrap mb-4">
          {difficulties.map((difficulty, index) => (
            <Badge
              key={index}
              variant="default" // You can change the variant here if needed
              className="text-white bg-gray-900"
            >
              {difficulty}
            </Badge>
          ))}
          {categories.map((category, index) => (
            <Badge
              key={index}
              variant="secondary" // You can change the variant here if needed
              className="text-white bg-red-500"
            >
              {category}
            </Badge>
          ))}
        </div>

        {/* Horizontal Line (under Badges, length 515px) */}
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
          >
            Back to Quizzes
          </Button>
          <Button
            variant="default"
            className="px-6 py-2 text-sm font-semibold text-white bg-gray-400 rounded-md hover:bg-gray-500"
          >
            Continue
          </Button>
        </div>
      </div>
    </div>
  );
};

export default StartQuizPage;
