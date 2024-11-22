import { LoginFormData } from "@/types/LoginFormData";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

export const useLogin = () => {
  const navigate = useNavigate();

  const login = async (data: LoginFormData) => {
    try {
      const response = await fetch("http://localhost:8080/api/v1/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify(data),
      });

      if (response.ok) {
        const responseData = await response.json();
        localStorage.setItem("userInfo", JSON.stringify(responseData.user));

        const timeout = 1500;
        const userRole = responseData.user.role;
        const targetPath =
          userRole === "USER"
            ? "/"
            : userRole === "ADMIN" || userRole === "CONTENT_EDITOR"
            ? "/dashboard"
            : "/";
        const message =
          userRole === "USER"
            ? "home page"
            : userRole === "ADMIN" || userRole === "CONTENT_EDITOR"
            ? "dashboard page"
            : "home page";

        toast.success("Login successful!", {
          description: `Redirecting to ${message}...`,
        });

        setTimeout(() => {
          navigate(targetPath);
        }, timeout);

        return { success: true };
      }

      toast.error("Login failed", {
        description: "Please check your credentials",
      });
      return { success: false };
    } catch (error) {
      console.error("Login error:", error);
      return { success: false, error };
    }
  };

  return login;
};

export const useLogout = () => {
  const navigate = useNavigate();

  const logout = async () => {
    try {
      // Call backend to clear session/cookies
      await fetch("http://localhost:8080/api/v1/auth/logout", {
        method: "POST",
        credentials: "include", // important for cookies
      });

      // Clear local storage
      localStorage.removeItem("userInfo");

      // Navigate to auth page
      navigate("/auth");
    } catch (error) {
      console.error("Logout error:", error);
    }
  };

  return logout;
};
