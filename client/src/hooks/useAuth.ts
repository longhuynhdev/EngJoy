import { useNavigate } from "react-router-dom";

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
