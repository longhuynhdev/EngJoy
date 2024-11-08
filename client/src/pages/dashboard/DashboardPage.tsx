import {
  BookCheck,
  BookOpenCheck,
  Folder,
  Newspaper,
  Quote,
  User,
  MessageCircleQuestion,
} from "lucide-react";
import DashboardCard from "@/components/dashboard/DashBoardCard";
import LessonsTable from "@/components/lessons/LessonsTable";
const DashBoardPage = () => {
  return (
    <>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-5">
        <DashboardCard
          title="Lessons"
          count={30}
          icon={<Newspaper className="text-slate-500" size={72} />}
        />
        <DashboardCard
          title="Questions"
          count={200}
          icon={<MessageCircleQuestion className="text-slate-500" size={72} />}
        />
        <DashboardCard
          title="Quizzes"
          count={130}
          icon={<Quote className="text-slate-500" size={72} />}
        />
        <DashboardCard
          title="Exams"
          count={7}
          icon={<BookCheck className="text-slate-500" size={72} />}
        />
        <DashboardCard
          title="Categories"
          count={5}
          icon={<Folder className="text-slate-500" size={72} />}
        />
        <DashboardCard
          title="Mock tests"
          count={15}
          icon={<BookOpenCheck className="text-slate-500" size={72} />}
        />
        <DashboardCard
          title="Users"
          count={100}
          icon={<User className="text-slate-500" size={72} />}
        />
      </div>
      <LessonsTable />
    </>
  );
};

export default DashBoardPage;
