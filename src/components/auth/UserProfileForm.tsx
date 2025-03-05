import { useState, useRef, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Avatar, AvatarImage, AvatarFallback } from "../ui/avatar";
import userAvatar from "../../img/user.svg";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { useUser } from "@/hooks/useUser";

interface UserProfileFormProps {
  editable?: boolean;
  userData?: {
    name: string;
    email: string;
    role: string;
    avatarUrl?: string;
  };
  loading?: boolean;
}

const UserProfileForm = ({
                           editable = false,
                           userData,
                           loading = false,
                         }: UserProfileFormProps) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    name: userData?.name || "",
    email: userData?.email || "",
    role: userData?.role || "",
  });

  const { updateUser } = useUser();

  useEffect(() => {
    if (userData) {
      setFormData({
        name: userData.name,
        email: userData.email,
        role: userData.role,
      });
      if (userData.avatarUrl) {
        setSelectedImage(userData.avatarUrl);
      }
    }
  }, [userData]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value,
    });
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (!file.type.startsWith("image/")) {
        alert("Please upload an image file");
        return;
      }

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
    try {
      await updateUser(userData?.email || "", formData);
      toast.success("Updated profile");
    } catch (error) {
      toast.error("Failed to update profile");
    }
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
            <div className="grid items-center gap-4 w-96">
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="name">Name</Label>
                <Input
                    id="name"
                    value={formData.name}
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
                      className="w-full px-4 py-2 mt-4 text-white bg-blue-600 rounded-lg hover:bg-blue-700"
                  >
                    Edit Profile
                  </button>
              ) : (
                  <button
                      type="submit"
                      className="w-full px-4 py-2 mt-4 text-white bg-blue-600 rounded-lg hover:bg-blue-700"
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