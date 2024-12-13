import {
    Card,
    CardHeader,
    CardContent,
    CardTitle,
    CardFooter,
  } from "@/components/ui/card";
  import { Badge } from "@/components/ui/badge";
  import { Button } from "@/components/ui/button";
  import { Lesson } from "@/types/lessons";
  
  interface QuizCardProps {
    quiz: Lesson;
  }
  
  const QuizCard = ({ quiz }: QuizCardProps) => {
    return (
      <Card key={quiz.id} className="flex flex-col min-h-[300px]">
        <CardHeader>
          <CardTitle className="">{quiz.title}</CardTitle>
          <div className="flex gap-2 flex-wrap">
            {quiz.categories.map((cat, index) => (
              <Badge key={index}>{cat}</Badge>
            ))}
            {quiz.difficulties.map((diff, index) => (
              <Badge key={index} className="bg-blue-500 text-white">
                {diff}
              </Badge>
            ))}
          </div>
        </CardHeader>
        <CardContent>
          <p className="line-clamp-6">{quiz.shortDescription}</p>
        </CardContent>
        <CardFooter className="mt-auto">
          <Button variant="default">Take Quiz</Button>
        </CardFooter>
      </Card>
    );
  };
  
  export default QuizCard;
  