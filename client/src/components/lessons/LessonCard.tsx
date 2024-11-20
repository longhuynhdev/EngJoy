import { Card, CardHeader, CardContent, CardTitle, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

interface LessonCardProps {
  title: string;
  body: string;
  difficulty: string[];
  category: string[];
}

const LessonCard = ({ title, body, difficulty, category }: LessonCardProps) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        <div>
          {category.map((cat, index) => (
            <Badge key={index}>{cat}</Badge>
          ))}
          {difficulty.map((diff, index) => (
            <Badge key={index} className="bg-red-500 text white">{diff}</Badge>
          ))}
        </div>
      </CardHeader>
      <CardContent>
        <p>{body}</p>
      </CardContent>
      <CardFooter>
        <Button variant="default">View Lesson</Button>
      </CardFooter>    
    </Card>
  );
};

export default LessonCard;