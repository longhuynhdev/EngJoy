import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
  TableCaption,
} from "@/components/ui/table";
import { Button } from "../ui/button";
import { Link } from "react-router-dom";
import { Badge } from "@/components/ui/badge";
import { Lesson } from "@/types/lessons";
import { Loader2 } from "lucide-react";

interface LessonsTableProps {
  lessons: Lesson[];
  loading: boolean;
  error: string | null;
  limit?: number;
  title?: string;
}

const LessonsTable = ({
  lessons,
  loading,
  error,
  limit,
  title,
}: LessonsTableProps) => {
  const baseUrl = "/dashboard/lessons";

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[200px]">
        <Loader2 className="animate-spin h-8 w-8" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-red-500 text-center p-4 rounded-md bg-red-50">
        {error}
      </div>
    );
  }

  const sortedLessons: Lesson[] = lessons
    ? [...lessons].sort(
        (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
      )
    : [];

  const filteredLessons = limit ? sortedLessons.slice(0, limit) : sortedLessons;

  return (
    <div className="mt-10">
      <h3 className="text-2xl mb-4 font-semibold">
        {title ? title : "Lessons"}
      </h3>
      <Table>
        <TableCaption>A list of recent lessons</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>Title</TableHead>
            <TableHead>Categories</TableHead>
            <TableHead className="hidden md:table-cell">Difficulties</TableHead>
            <TableHead className="hidden md:table-cell">Author</TableHead>
            <TableHead className="hidden md:table-cell text-right">
              Date
            </TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {filteredLessons.map((lesson) => (
            <TableRow key={lesson.id}>
              <TableCell>{lesson.title}</TableCell>
              <TableCell>
                {lesson.categories.map((cat, index) => (
                  <Badge key={index} variant="secondary" className="mx-1">
                    {cat}
                  </Badge>
                ))}
              </TableCell>
              <TableCell className="hidden md:table-cell">
                {lesson.difficulties.map((diff, index) => (
                  <Badge key={index} variant="secondary" className="mx-1">
                    {diff}
                  </Badge>
                ))}
              </TableCell>
              <TableCell className="hidden md:table-cell">
                {lesson.author}
              </TableCell>
              <TableCell className="hidden md:table-cell text-right text-nowrap">
                {new Date(lesson.date).toLocaleDateString()}
              </TableCell>
              <TableCell className="whitespace-nowrap">
                <Link
                  to={`${baseUrl}/edit/${lesson.id}`}
                  className="mr-2 inline-block"
                >
                  <Button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded text-xs">
                    Edit
                  </Button>
                </Link>
                <Link
                  to={`${baseUrl}/delete/${lesson.id}`}
                  className="inline-block"
                >
                  <Button
                    variant="destructive"
                    className="hover:bg-red-700 text-white font-bold py-2 px-4 rounded text-xs"
                  >
                    Delete
                  </Button>
                </Link>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default LessonsTable;
