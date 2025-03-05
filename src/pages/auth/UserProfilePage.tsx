import UserProfileForm from "@/components/auth/UserProfileForm";
import BackButton from "@/components/common/BackButton";
import ForwardButton from "@/components/common/ForwardButton";
import { useUser } from "@/hooks/useUser";

const UserProfilePage = () => {
  const { userData, loading, error } = useUser();

  if (error) {
    return <div>Error loading user data: {error}</div>;
  }

  return (
    <div className="flex flex-col">
      <div className="flex items-center justify-between">
        <BackButton link="/dashboard" text="Back to dashboard" />
        <ForwardButton
          link="/change-password"
          text="Change your password"
          state={{ from: "/profile" }}
        />
      </div>
      <UserProfileForm userData={userData} loading={loading} />
    </div>
  );
};

export default UserProfilePage;
