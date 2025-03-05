import DashboardNavbar from "@/components/dashboard/DashboardNavbar";
import DashboardSidebar from "@/components/dashboard/DashboardSidebar";
import { Outlet } from "react-router-dom";
import { Toaster } from "@/components/ui/sonner";

const DashboardLayout = () => {
  return (
    <>
      <DashboardNavbar />
      <div className="flex">
        <div className="hidden md:block min-h-screen w-[300px]">
          <DashboardSidebar />
        </div>
        <div className="p-5 w-full md:max-w-[1400px]">
          <Outlet />
          <Toaster theme="light" richColors closeButton expand={false} />
        </div>
      </div>
    </>
  );
};

export default DashboardLayout;
