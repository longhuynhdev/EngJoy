import {
  Card,
  CardHeader,
  CardContent,
  CardTitle,
  CardFooter,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Lesson } from "@/types/Lessons";
import { Link } from "react-router-dom";
interface LessonCardProps {
  lesson: Lesson;
}

const LessonCard = ({ lesson }: LessonCardProps) => {
  return (
    <Card key={lesson.id} className="flex flex-col min-h-[300px]">
      <CardHeader>
        <CardTitle className="">{lesson.title}</CardTitle>
        <div className="flex gap-2 flex-wrap">
          {lesson.categories.map((cat, index) => (
            <Badge key={index}>{cat}</Badge>
          ))}
          {lesson.difficulties.map((diff, index) => (
            <Badge key={index} className="bg-red-500 text white">
              {diff}
            </Badge>
          ))}
        </div>
      </CardHeader>
      <CardContent>
        <p className="line-clamp-6">{lesson.shortDescription}</p>
      </CardContent>
      <CardFooter className="mt-auto">
        <Link to={`/lessons/${lesson.id}`}>
          <Button variant="default">View Lesson</Button>
        </Link>
      </CardFooter>
    </Card>
  );
};

export default LessonCard;
