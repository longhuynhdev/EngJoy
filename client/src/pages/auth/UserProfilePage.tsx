import UserProfileForm from "@/components/auth/UserProfileForm";
import BackButton from "@/components/common/BackButton";
const UserProfilePage = () => {
  return (
    <div>
      <BackButton link="/dashboard" text="Back to dashboard" />
      <UserProfileForm />
    </div>
  );
};

export default UserProfilePage;
