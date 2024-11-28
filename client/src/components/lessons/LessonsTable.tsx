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
import { Lesson } from "@/types/Lessons";
import { LoadingSpinner } from "../common/LoadingSpinner";
import { ErrorMessage } from "../common/ErrorMessage";
import { DeleteConfirmationPopover } from "../common/DeleteConfirmationPopover";
interface LessonsTableProps {
  lessons: Lesson[];
  onDelete?: (id: string) => Promise<void>;
  loading: boolean;
  error: string | null;
  limit?: number;
}

const LessonsTable = ({
  lessons,
  loading,
  error,
  limit,
  onDelete,
}: LessonsTableProps) => {
  const baseUrl = "/dashboard/lessons";

  if (loading) {
    return <LoadingSpinner />;
  }

  if (error) {
    return <ErrorMessage message={`${error} Lessons`} />;
  }

  const sortedLessons: Lesson[] = lessons
    ? [...lessons].sort(
        (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
      )
    : [];

  const filteredLessons = limit ? sortedLessons.slice(0, limit) : sortedLessons;

  return (
    <div className="mt-10">
      <h3 className="mb-4 text-2xl font-semibold">{"Lessons"}</h3>
      <Table>
        <TableCaption>A list of recent lessons</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>Title</TableHead>
            <TableHead>Categories</TableHead>
            <TableHead className="hidden md:table-cell">Difficulties</TableHead>
            <TableHead className="hidden md:table-cell">Author</TableHead>
            <TableHead className="hidden text-right md:table-cell">
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
              <TableCell className="hidden text-right md:table-cell text-nowrap">
                {new Date(lesson.date).toLocaleDateString()}
              </TableCell>
              <TableCell className="whitespace-nowrap">
                <Link
                  to={`${baseUrl}/edit/${lesson.id}`}
                  className="inline-block mr-2"
                >
                  <Button className="px-4 py-2 text-xs font-bold text-white bg-blue-500 rounded hover:bg-blue-700">
                    Edit
                  </Button>
                </Link>
                <DeleteConfirmationPopover
                  title="Delete Lesson"
                  message={`Are you sure you want to delete "${lesson.title}"?`}
                  onConfirm={() => {
                    if (onDelete) {
                      onDelete(lesson.id);
                    }
                  }}  
                />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default LessonsTable;
