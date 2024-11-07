import { Outlet } from "react-router-dom";

const AuthLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="h-[100vh] flex items-center justify-center relative">
      <Outlet />
    </div>
  );
};

export default AuthLayout;
