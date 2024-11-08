import Navbar from "@/components/dashboard/Navbar";
import Sidebar from "@/components/dashboard/Sidebar";
import { Outlet } from "react-router-dom";
import { Toaster } from "@/components/ui/toaster";

const DashboardLayout = () => {
  return (
    <>
      <Navbar />
      <div className="flex">
        <div className="hidden md:block min-h-screen w-[300px]">
          <Sidebar />
        </div>
        <div className="p-5 w-full md:max-w-[1400px]">
          <Outlet />
          <Toaster />
        </div>
      </div>
    </>
  );
};

export default DashboardLayout;
