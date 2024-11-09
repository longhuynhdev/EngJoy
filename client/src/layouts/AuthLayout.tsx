import { Outlet } from "react-router-dom";
import { Toaster } from "@/components/ui/sonner";

const AuthLayout = () => {
  return (
    <div className="h-[100vh] flex items-center justify-center relative">
      <Outlet />
      <Toaster theme="light" richColors closeButton expand={false} />
    </div>
  );
};

export default AuthLayout;
