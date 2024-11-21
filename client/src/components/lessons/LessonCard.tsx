import {
  Card,
  CardHeader,
  CardContent,
  CardTitle,
  CardFooter,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

interface LessonCardProps {
  title: string;
  body: string;
  difficulties?: string[];
  categories?: string[];
}

const LessonCard = ({
  title,
  body,
  categories = [],
  difficulties = [],
}: LessonCardProps) => {
  return (
    <Card className="flex flex-col min-h-[300px]">
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        <div className="flex gap-2 flex-wrap">
          {categories.map((cat, index) => (
            <Badge key={index}>{cat}</Badge>
          ))}
          {difficulties.map((diff, index) => (
            <Badge key={index} className="bg-red-500 text white">
              {diff}
            </Badge>
          ))}
        </div>
      </CardHeader>
      <CardContent>
        <p>{body}</p>
      </CardContent>
      <CardFooter className="mt-auto">
        <Button variant="default">View Lesson</Button>
      </CardFooter>
    </Card>
  );
};

export default LessonCard;
