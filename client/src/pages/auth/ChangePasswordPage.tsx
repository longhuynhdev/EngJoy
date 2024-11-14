import ChangePasswordForm from "@/components/auth/ChangePasswordForm";
import BackButton from "@/components/common/BackButton";
import { useLocation } from "react-router-dom";

const ChangePasswordPage = () => {
  const location = useLocation();
  const backLink = location.state?.from || "/";
  const backText =
    backLink === "/profile"
      ? "Back to profile"
      : backLink === "/edit-profile"
      ? "Back to edit profile"
      : "Back to homepage";

  return (
    <div>
      <BackButton link={backLink} text={backText} />
      <ChangePasswordForm />
    </div>
  );
};

export default ChangePasswordPage;
