import logo from "../../img/logo.png";
import { Link } from "react-router-dom";
import AvatarDropdownMenu from "../common/AvatarDropdownMenu";
const HomepageNavbar = () => {
  return (
    <div className="bg-[#E2E8F0] dark:bg-slate-700 text-white px-5 flex justify-between">
      <Link to="/" className="flex items-center gap-2">
        <img
          src={logo}
          width={70}
          height={25}
          alt="JoyEng logo"
          className="rounded-lg object-contain"
        ></img>
      </Link>
      <div className="flex items-center justify-center">
        <Link
          to="/"
          className="px-4 py-2 text-slate-700 dark:text-slate-200 hover:text-blue-600 dark:hover:text-blue-400 transition-colors text-base font-medium"
        >
          Home
        </Link>

        <Link
          to="/lessons"
          className="px-4 py-2 text-slate-700 dark:text-slate-200 hover:text-blue-600 dark:hover:text-blue-400 transition-colors text-base font-medium"
        >
          Lessons
        </Link>
        <Link
          to="/quizzes"
          className="px-4 py-2 text-slate-700 dark:text-slate-200 hover:text-blue-600 dark:hover:text-blue-400 transition-colors text-base font-medium"
        >
          Quizzes
        </Link>
        <Link
          to="/exams"
          className="px-4 py-2 text-slate-700 dark:text-slate-200 hover:text-blue-600 dark:hover:text-blue-400 transition-colors text-base font-medium"
        >
          Exams
        </Link>
      </div>
      <AvatarDropdownMenu />
    </div>
  );
};

export default HomepageNavbar;
