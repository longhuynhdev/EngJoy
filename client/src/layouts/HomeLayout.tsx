import { Outlet } from "react-router-dom";
import { Toaster } from "@/components/ui/sonner";
const HomeLayout = () => {
  return (
    <div className="min-h-screen">
      <main>
        <Outlet />
        <Toaster theme="light" richColors closeButton expand={false} />{" "}
      </main>
    </div>
  );
};

export default HomeLayout;
