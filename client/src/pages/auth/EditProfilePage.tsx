import UserProfileForm from "@/components/auth/UserProfileForm";
import BackButton from "@/components/common/BackButton";

const EditProfilePage = () => {
  return (
    <div>
      <BackButton link="/profile" text="Back to profile" />
      <UserProfileForm editable={true} />
    </div>
  );
};

export default EditProfilePage;
