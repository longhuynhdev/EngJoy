import { Button } from "@/components/ui/button";
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
import { useState } from "react";

export function QuizCard() {
  const [quizAnswers, setQuizAnswers] = useState({
    question1: "",
    question2: "",
    question3: "",
  });

  const [showResults, setShowResults] = useState(false);

  const handleAnswerChange = (question: string, answer: string) => {
    setQuizAnswers((prev) => ({ ...prev, [question]: answer }));
  };

  const handleSubmitQuiz = () => {
    setShowResults(true);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <Card className="mt-8 mx-auto max-w-2xl">
        <CardHeader>
          <CardTitle>Quiz: Test Your Idiom Knowledge</CardTitle>
          <CardDescription>
            Answer these questions to review what you've learned.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div>
            <h3 className="mb-2 text-lg font-medium">
              1. What does "Break a leg" mean?
            </h3>
            <RadioGroup
              value={quizAnswers.question1}
              onValueChange={(value) => handleAnswerChange("question1", value)}
            >
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="a" id="q1-a" />
                <Label htmlFor="q1-a">Be careful</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="b" id="q1-b" />
                <Label htmlFor="q1-b">Good luck</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="c" id="q1-c" />
                <Label htmlFor="q1-c">Break something</Label>
              </div>
            </RadioGroup>
          </div>
          <div>
            <h3 className="mb-2 text-lg font-medium">
              2. What does "It's raining cats and dogs" describe?
            </h3>
            <RadioGroup
              value={quizAnswers.question2}
              onValueChange={(value) => handleAnswerChange("question2", value)}
            >
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="a" id="q2-a" />
                <Label htmlFor="q2-a">Light rain</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="b" id="q2-b" />
                <Label htmlFor="q2-b">Heavy rain</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="c" id="q2-c" />
                <Label htmlFor="q2-c">Animals falling from the sky</Label>
              </div>
            </RadioGroup>
          </div>
          <div>
            <h3 className="mb-2 text-lg font-medium">
              3. When is "The ball is in your court" used?
            </h3>
            <RadioGroup
              value={quizAnswers.question3}
              onValueChange={(value) => handleAnswerChange("question3", value)}
            >
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="a" id="q3-a" />
                <Label htmlFor="q3-a">When playing tennis</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="b" id="q3-b" />
                <Label htmlFor="q3-b">
                  When it's someone else's turn to act
                </Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="c" id="q3-c" />
                <Label htmlFor="q3-c">When you're in a courtroom</Label>
              </div>
            </RadioGroup>
          </div>
        </CardContent>
        <CardFooter>
          <Button onClick={handleSubmitQuiz} className="w-full">
            Submit Answers
          </Button>
        </CardFooter>
      </Card>

      {showResults && (
        <Card className="mt-8 mx-auto max-w-2xl">
          <CardHeader>
            <CardTitle>Quiz Results</CardTitle>
          </CardHeader>
          <CardContent>
            <p>
              1. Correct Answer: Good luck
              <br />
              Your Answer:{" "}
              {quizAnswers.question1 === "b" ? "Correct!" : "Incorrect"}
            </p>
            <p>
              2. Correct Answer: Heavy rain
              <br />
              Your Answer:{" "}
              {quizAnswers.question2 === "b" ? "Correct!" : "Incorrect"}
            </p>
            <p>
              3. Correct Answer: When it's someone else's turn to act
              <br />
              Your Answer:{" "}
              {quizAnswers.question3 === "b" ? "Correct!" : "Incorrect"}
            </p>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
