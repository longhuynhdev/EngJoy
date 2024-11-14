import UserProfileForm from "@/components/auth/UserProfileForm";
import BackButton from "@/components/common/BackButton";
import ForwardButton from "@/components/common/ForwardButton";
const UserProfilePage = () => {
  return (
    <div className="flex flex-col">
      <div className="flex justify-between items-center">
        <BackButton link="/dashboard" text="Back to dashboard" />
        <ForwardButton
          link="/change-password"
          text="Change your password"
          state={{ from: "/profile" }}
        />
      </div>
      <UserProfileForm />
    </div>
  );
};

export default UserProfilePage;
