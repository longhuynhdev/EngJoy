import { Outlet } from "react-router-dom";
import { Toaster } from "@/components/ui/sonner";
import HomepageNavbar from "@/components/home/HomepageNavbar";
import HomepageFooter from "@/components/home/HomepageFooter";
const HomeLayout = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <main className="flex-1">
        <HomepageNavbar />
        <Outlet />
        <Toaster theme="light" richColors closeButton expand={false} />{" "}
      </main>

      <HomepageFooter />
    </div>
  );
};
export default HomeLayout;
