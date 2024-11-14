import { useState, useRef } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Avatar, AvatarImage, AvatarFallback } from "../ui/avatar";
import userAvatar from "../../img/user.svg";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
interface UserProfileFormProps {
  editable?: boolean;
}

const UserProfileForm = ({ editable = false }: UserProfileFormProps) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    name: "Nguyễn Văn A",
    userName: "User Demo",
    email: "user@joyeng.com",
    role: "USER",
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value,
    });
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      // Validate file type
      if (!file.type.startsWith("image/")) {
        alert("Please upload an image file");
        return;
      }

      // Preview image
      const reader = new FileReader();
      reader.onloadend = () => {
        setSelectedImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleAvatarClick = () => {
    if (editable) {
      fileInputRef.current?.click();
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: Implement update profile logic with image upload
    const formDataToSubmit = new FormData();
    if (fileInputRef.current?.files?.[0]) {
      formDataToSubmit.append("avatar", fileInputRef.current.files[0]);
    }
    Object.entries(formData).forEach(([key, value]) => {
      formDataToSubmit.append(key, value);
    });
    toast.success("Updated profile");
  };

  return (
    <Card>
      <CardHeader className="flex flex-col items-center gap-4">
        <CardTitle>{editable ? "Edit Profile" : "User Profile"}</CardTitle>
        <div className="relative">
          <Avatar
            className={`h-24 w-24 ${
              editable ? "cursor-pointer hover:opacity-75" : ""
            }`}
            onClick={handleAvatarClick}
          >
            <AvatarImage src={selectedImage || userAvatar} alt="User Avatar" />
            <AvatarFallback className="text-black">JE</AvatarFallback>
          </Avatar>
          {editable && (
            <input
              type="file"
              ref={fileInputRef}
              className="hidden"
              accept="image/*"
              onChange={handleImageChange}
            />
          )}
          {editable && (
            <div className="absolute bottom-0 right-0">
              <Button
                type="button"
                size="sm"
                variant="secondary"
                className="rounded-full"
                onClick={handleAvatarClick}
              >
                📷
              </Button>
            </div>
          )}
        </div>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit}>
          <div className="grid w-96 items-center gap-4">
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="name">Name</Label>
              <Input
                id="name"
                value={formData.name}
                onChange={handleInputChange}
                disabled={!editable}
              />
              <Label htmlFor="userName">User Name</Label>
              <Input
                id="userName"
                value={formData.userName}
                onChange={handleInputChange}
                disabled={!editable}
              />
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                value={formData.email}
                onChange={handleInputChange}
                disabled={!editable}
              />
              <Label htmlFor="role">Role</Label>
              <Input
                id="role"
                value={formData.role}
                onChange={handleInputChange}
                disabled
              />
            </div>
            {!editable ? (
              <button
                type="button"
                onClick={() => (window.location.href = "/edit-profile")}
                className="mt-4 w-full rounded-lg bg-blue-600 px-4 py-2 text-white hover:bg-blue-700"
              >
                Edit Profile
              </button>
            ) : (
              <button
                type="submit"
                className="mt-4 w-full rounded-lg bg-blue-600 px-4 py-2 text-white hover:bg-blue-700"
              >
                Save Changes
              </button>
            )}
          </div>
        </form>
      </CardContent>
    </Card>
  );
};

export default UserProfileForm;
