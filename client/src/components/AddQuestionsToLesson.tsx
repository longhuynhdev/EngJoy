import { useState, useEffect } from "react";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { CheckCircle2, XCircle } from "lucide-react";
import { useParams } from "react-router-dom";

interface Question {
  id: number;
  question: string;
  answers: Array<{
    answerId: number;
    answer: string;
    explanation: string;
    correct: boolean;
  }>;
}

export default function AddQuestionsToLesson() {
  const { id } = useParams();
  const [questions, setQuestions] = useState<Question[]>([]);
  const [lessonQuestions, setLessonQuestions] = useState<Question[]>([]);
  const [selectedQuestions, setSelectedQuestions] = useState<number[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  useEffect(() => {
    if (!id) {
      setError("Lesson ID not found");
      return;
    }
    fetchQuestions();
    fetchLessonQuestions();
  }, [id]);

  const fetchQuestions = async () => {
    try {
      const response = await fetch("http://localhost:8080/api/v1/questions");
      if (!response.ok) {
        throw new Error("Failed to fetch questions");
      }
      const data = await response.json();
      setQuestions(data);
    } catch (err) {
      setError("Failed to load questions. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const fetchLessonQuestions = async () => {
    try {
      const response = await fetch(`http://localhost:8080/api/v1/lessons/${id}`);
      if (!response.ok) {
        throw new Error("Failed to fetch lesson questions");
      }
      const data = await response.json();
      setLessonQuestions(data.questions);
    } catch (err) {
      setError("Failed to load lesson questions. Please try again.");
    }
  };

  const handleCheckboxChange = (questionId: number) => {
    setSelectedQuestions((prev) =>
        prev.includes(questionId)
            ? prev.filter((id) => id !== questionId)
            : [...prev, questionId]
    );
  };

  const handleSubmit = async () => {
    try {
      const token = localStorage.getItem("token");

      if (!token) {
        throw new Error("Authentication required");
      }

      const response = await fetch(
          `http://localhost:8080/api/v1/lessons/${id}/questions`,
          {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify(selectedQuestions),
          }
      );

      if (!response.ok) {
        throw new Error("Failed to add questions to lesson");
      }

      setSuccess("Questions successfully added to the lesson!");
      setSelectedQuestions([]);
      fetchLessonQuestions(); // Refresh the lesson questions list
    } catch (err) {
      setError("Failed to add questions to the lesson. Please try again.");
    }
  };

  if (isLoading) {
    return <div>Loading questions...</div>;
  }

  return (
      <Card className="w-full max-w-2xl mx-auto">
        <CardHeader>
          <CardTitle>Add Questions to Lesson</CardTitle>
        </CardHeader>
        <CardContent>
          {error && (
              <Alert variant="destructive" className="mb-4">
                <XCircle className="w-4 h-4" />
                <AlertTitle>Error</AlertTitle>
                <AlertDescription>{error}</AlertDescription>
              </Alert>
          )}
            {success && (
              <Alert className="mb-4 text-green-700 bg-green-100 border-green-500">
              <CheckCircle2 className="w-4 h-4 text-green-500" />
              <AlertTitle>Success</AlertTitle>
              <AlertDescription>{success}</AlertDescription>
              </Alert>
            )}
          <div className="space-y-4">
            <h2 className="text-lg font-medium">Lesson Questions</h2>
            {lessonQuestions.map((question) => (
                <div key={question.id} className="flex items-start space-x-2">
                  <div>
                    <label className="text-sm font-medium leading-none">
                      {question.question}
                    </label>
                    <p className="text-sm text-muted-foreground">
                      {question.answers.find((a) => a.correct)?.answer}
                    </p>
                  </div>
                </div>
            ))}
          </div>
          <div className="mt-4 space-y-4">
            <h2 className="text-lg font-medium">Available Questions</h2>
            {questions.map((question) => (
                <div key={question.id} className="flex items-start space-x-2">
                  <Checkbox
                      id={`question-${question.id}`}
                      checked={selectedQuestions.includes(question.id)}
                      onCheckedChange={() => handleCheckboxChange(question.id)}
                  />
                  <div>
                    <label
                        htmlFor={`question-${question.id}`}
                        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                    >
                      {question.question}
                    </label>
                    <p className="text-sm text-muted-foreground">
                      {question.answers.find((a) => a.correct)?.answer}
                    </p>
                  </div>
                </div>
            ))}
          </div>
        </CardContent>
        <CardFooter>
          <Button
              onClick={handleSubmit}
              disabled={selectedQuestions.length === 0}
          >
            Add Selected Questions to Lesson
          </Button>
        </CardFooter>
      </Card>
  );
}