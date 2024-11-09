import BackButton from "@/components/BackButton";
import LessonsPagination from "@/components/lessons/LessonsPagination";
import LessonsTable from "@/components/lessons/LessonsTable";
const AdminLessonsPage = () => {
  return (
    <>
      <BackButton link="/dashboard" text="Go Back" />
      <LessonsTable />
      <LessonsPagination />
    </>
  );
};

export default AdminLessonsPage;
