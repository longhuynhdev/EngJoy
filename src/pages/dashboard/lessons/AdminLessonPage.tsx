import BackButton from "@/components/common/BackButton";
import { Button } from "@/components/ui/button";
import LessonsPagination from "@/components/lessons/LessonsPagination";
import LessonsTable from "@/components/lessons/LessonsTable";
import { Link } from "react-router-dom";
import { useLessons } from "@/hooks/useLesssons";
import { useDeleteLesson } from "@/hooks/useLessson";
import { toast } from "sonner";

const AdminLessonsPage = () => {
  const { lessons, loading, error, refetchLessons } = useLessons();
  const { deleteLesson } = useDeleteLesson();
  const handleDeleteLesson = async (id: string) => {
    try {
      await deleteLesson(id);
      await refetchLessons();
      toast.success("Lesson deleted successfully");
    } catch (error) {
      console.error("Error deleting lesson:", error);
      toast.error("Failed to delete lesson");
    }
  };

  return (
    <>
      <div className="flex justify-between">
        <BackButton link="/dashboard" text="Back to Dashboard" />
        <Link to="/dashboard/lessons/add" className="inline-block mr-2">
          <Button className="px-4 py-2 text-xs font-bold text-white bg-blue-500 rounded hover:bg-blue-700">
            Add new lesson
          </Button>
        </Link>
      </div>
      <LessonsTable
        lessons={lessons}
        loading={loading}
        error={error}
        onDelete={handleDeleteLesson}
      />
      <LessonsPagination />
    </>
  );
};

export default AdminLessonsPage;
