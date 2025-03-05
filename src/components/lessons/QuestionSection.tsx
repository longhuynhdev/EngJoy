import { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";

interface Answer {
  answerId: number;
  answer: string;
  explanation: string;
  correct: boolean;
}

interface Question {
  id: number;
  question: string;
  answers: Answer[];
}

interface QuestionSectionProps {
  questions: Question[];
}

export function QuestionSection({ questions }: QuestionSectionProps) {
  const [selectedAnswers, setSelectedAnswers] = useState<{
    [key: number]: number;
  }>({});
  const [showExplanations, setShowExplanations] = useState<{
    [key: number]: boolean;
  }>({});

  const handleAnswerSelect = (questionId: number, answerId: number) => {
    setSelectedAnswers((prev) => ({ ...prev, [questionId]: answerId }));
    setShowExplanations((prev) => ({ ...prev, [questionId]: true }));
  };

  return (
    <div className="space-y-8">
      <h2 className="text-2xl font-bold">Câu hỏi cho bài học</h2>
      {questions.map((question) => (
        <Card key={question.id}>
          <CardHeader>
            <CardTitle>{question.question}</CardTitle>
          </CardHeader>
          <CardContent>
            <RadioGroup
              onValueChange={(value) =>
                handleAnswerSelect(question.id, parseInt(value))
              }
              value={selectedAnswers[question.id]?.toString()}
            >
              {question.answers.map((answer) => (
                <div
                  key={answer.answerId}
                  className="flex items-center space-x-2"
                >
                  <RadioGroupItem
                    value={answer.answerId.toString()}
                    id={`q${question.id}-a${answer.answerId}`}
                  />
                  <Label
                    htmlFor={`q${question.id}-a${answer.answerId}`}
                    className={`flex-grow p-2 rounded ${
                      showExplanations[question.id] &&
                      selectedAnswers[question.id] === answer.answerId
                        ? answer.correct
                          ? "bg-green-100 dark:bg-green-900"
                          : "bg-red-100 dark:bg-red-900"
                        : ""
                    }`}
                  >
                    {answer.answer}
                  </Label>
                </div>
              ))}
            </RadioGroup>
          </CardContent>
          {showExplanations[question.id] && (
            <CardFooter>
              <CardDescription>
                {
                  question.answers.find(
                    (a) => a.answerId === selectedAnswers[question.id]
                  )?.explanation
                }
              </CardDescription>
            </CardFooter>
          )}
        </Card>
      ))}
    </div>
  );
}
