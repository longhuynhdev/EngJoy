// import Navbar from "../components/Navbar";
// import Sidebar from "../components/Sidebar";
import { Outlet } from "react-router-dom";

const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      {/* <Navbar /> */}
      <div className="flex">
        <div className="hidden md:block h-[100vh] w-[300px]">
          {/* <Sidebar /> */}
        </div>
        <div className="p-5 w-full md:max-w-[1400px]">
          <Outlet />
        </div>
      </div>
    </>
  );
};

export default DashboardLayout;
