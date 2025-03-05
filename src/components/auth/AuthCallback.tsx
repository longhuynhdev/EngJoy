import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

const AuthCallback = () => {
    const navigate = useNavigate();

    useEffect(() => {
        const params = new URLSearchParams(window.location.search);
        const token = params.get("token");
        const name = params.get("name");
        const email = params.get("email");
        const role = params.get("role");

        if (token && name && email && role) {
            localStorage.setItem("token", token);
            localStorage.setItem("userInfo", JSON.stringify({ name, email, role }));

            const timeout = 1500;
            const targetPath =
                role === "USER"
                    ? "/"
                    : role === "ADMIN" || role === "CONTENT_EDITOR"
                        ? "/dashboard"
                        : "/";
            const message =
                role === "USER"
                    ? "home page"
                    : role === "ADMIN" || role === "CONTENT_EDITOR"
                        ? "dashboard page"
                        : "home page";

            toast.success("Login successful!", {
                description: `Redirecting to ${message}...`,
            });

            setTimeout(() => {
                navigate(targetPath);
            }, timeout);
        } else {
            toast.error("Login failed", {
                description: "Invalid login response",
            });
            navigate("/auth");
        }
    }, [navigate]);

    return null;
};

export default AuthCallback;