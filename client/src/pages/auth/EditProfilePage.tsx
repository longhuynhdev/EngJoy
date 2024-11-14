import UserProfileForm from "@/components/auth/UserProfileForm";
import BackButton from "@/components/common/BackButton";
import ForwardButton from "@/components/common/ForwardButton";
const EditProfilePage = () => {
  return (
    <div className="flex flex-col">
      <div className="flex justify-between items-center">
        <BackButton link="/profile" text="Back to profile" />
        <ForwardButton
          link="/change-password"
          text="Change your password"
          state={{ from: "/edit-profile" }}
        />
      </div>
      <UserProfileForm editable={true} />
    </div>
  );
};

export default EditProfilePage;
