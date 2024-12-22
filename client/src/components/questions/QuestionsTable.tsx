import {Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow,} from "@/components/ui/table";
import {Button} from "../ui/button";
import {Link} from "react-router-dom";
import {Question} from "@/types/question";
import {LoadingSpinner} from "../common/LoadingSpinner";
import {ErrorMessage} from "../common/ErrorMessage";
import {DeleteConfirmationPopover} from "../common/DeleteConfirmationPopover";

interface QuestionsTableProps {
  questions: Question[];
  onDelete?: (id: string) => Promise<void>;
  loading: boolean;
  error: string | null;
  limit?: number;
}

const QuestionsTable = ({
  questions,
  loading,
  error,
  onDelete,
}: QuestionsTableProps) => {
  const baseUrl = "/dashboard/questions";

  if (loading) {
    return <LoadingSpinner />;
  }

  if (error) {
    return <ErrorMessage message={`${error} Questions`} />;
  }

  return (
    <div className="mt-10">
      <h3 className="mb-4 text-2xl font-semibold">{"Questions"}</h3>
      <Table>
        <TableCaption>A list of recent questions</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>Title</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {questions.map((question) => (
            <TableRow key={question.id}>
              <TableCell>{question.question}</TableCell>

              <TableCell className="whitespace-nowrap">
                <Link
                  to={`${baseUrl}/edit/${question.id}`}
                  className="inline-block mr-2"
                >
                  <Button className="px-4 py-2 text-xs font-bold text-white bg-blue-500 rounded hover:bg-blue-700">
                    Edit
                  </Button>
                </Link>
                <DeleteConfirmationPopover
                  title="Delete Question"
                  message={`Are you sure you want to delete "${question.question}"?`}
                  onConfirm={() => {
                    if (onDelete) {
                      onDelete(question.id);
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

export default QuestionsTable;
