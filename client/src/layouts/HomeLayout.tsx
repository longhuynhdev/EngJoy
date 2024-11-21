import { Outlet } from "react-router-dom";
import { Toaster } from "@/components/ui/sonner";
import HomepageNavbar from "@/components/home/HomepageNavbar";
const HomeLayout = () => {
  return (
    <div className="min-h-screen">
      <main>
        <HomepageNavbar />
        <Outlet />
        <Toaster theme="light" richColors closeButton expand={false} />{" "}
      </main>
    </div>
  );
};

export default HomeLayout;
