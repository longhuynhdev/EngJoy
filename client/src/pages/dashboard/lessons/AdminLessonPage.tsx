import BackButton from "@/components/BackButton";
import LessonsTable from "@/components/lessons/LessonsTable";
const AdminLessonsPage = () => {
  return (
    <>
      <BackButton link="/dashboard" text="Go Back" />
      <LessonsTable />
    </>
  );
};

export default AdminLessonsPage;
