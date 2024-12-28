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
    <Card key={lesson.id} className="flex flex-col">
      <CardHeader className="pb-4">
        <CardTitle className="text-base font-semibold">
          {lesson.title}
        </CardTitle>
        <p className="text-sm text-muted-foreground">
          {lesson.shortDescription}
        </p>
        <div className="flex flex-wrap gap-2 mt-2">
          {lesson.categories.map((cat, index) => (
            <Badge key={index} variant="default">
              {cat}
            </Badge>
          ))}
          {lesson.difficulties.map((diff, index) => (
            <Badge key={index} variant="destructive">
              {diff}
            </Badge>
          ))}
        </div>
      </CardHeader>
      <CardContent className="pt-0">
        <div className="w-full overflow-hidden rounded-lg">
          <img
            src={`https://placehold.co/228x85/green/white?text=${lesson.title}`}
            alt={lesson.title}
            className="object-cover w-full h-auto"
          />
        </div>
      </CardContent>
      <CardFooter className="mt-auto">
        <Link to={`/lessons/${lesson.id}`} className="w-full">
          <Button variant="default" className="w-full">
            View Lesson
          </Button>
        </Link>
      </CardFooter>
    </Card>
  );
};

export default LessonCard;
