import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "../ui/button";
import { Link } from "react-router-dom";
import { Quiz } from "@/types/quiz"; 
import { LoadingSpinner } from "../common/LoadingSpinner";
import { ErrorMessage } from "../common/ErrorMessage";
import { DeleteConfirmationPopover } from "../common/DeleteConfirmationPopover";

interface QuizTableProps {
  quizzes: Quiz[];
  onDelete?: (id: string) => Promise<void>;
  loading: boolean;
  error: string | null;
  limit?: number;
}

const QuizTable = ({
  quizzes,
  loading,
  error,
  onDelete,
}: QuizTableProps) => {
  const baseUrl = "/dashboard/quizzes";

  if (loading) {
    return <LoadingSpinner />;
  }

  if (error) {
    return <ErrorMessage message={`${error} Quizzes`} />;
  }

  return (
    <div className="mt-10">
      <h3 className="mb-4 text-2xl font-semibold">{"Quizzes"}</h3>
      <Table>
        <TableCaption>A list of recent quizzes</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>Title</TableHead>
            <TableHead>Categories</TableHead>
            <TableHead>Difficulties</TableHead>
            <TableHead>Date</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {quizzes.map((quiz) => (
            <TableRow key={quiz.id}>
              <TableCell>{quiz.title}</TableCell>
              <TableCell>{quiz.categories}</TableCell>
              <TableCell>{quiz.difficulties}</TableCell>
              <TableCell>{quiz.date} seconds</TableCell>

              <TableCell className="whitespace-nowrap">
                <Link
                  to={`${baseUrl}/edit/${quiz.id}`}
                  className="inline-block mr-2"
                >
                  <Button className="px-4 py-2 text-xs font-bold text-white bg-blue-500 rounded hover:bg-blue-700">
                    Edit
                  </Button>
                </Link>
                <DeleteConfirmationPopover
                  title="Delete Quiz"
                  message={`Are you sure you want to delete "${quiz.title}"?`}
                  onConfirm={() => {
                    if (onDelete) {
                      onDelete(quiz.id);
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

export default QuizTable;
