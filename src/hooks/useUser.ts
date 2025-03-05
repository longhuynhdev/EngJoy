import { useState, useEffect } from "react";

interface UserData {
  name: string;
  userName: string;
  email: string;
  role: string;
  avatarUrl?: string;
}

interface ApiResponse {
  name: string;
  userName: string;
  email: string;
  role: {
    name: string;
  };
  avatarUrl?: string;
}

export const useUser = () => {
  const [userData, setUserData] = useState<UserData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchUserData = async () => {
      const token = localStorage.getItem("token");
      if (!token) {
        setLoading(false);
        return;
      }

      try {
        const response = await fetch(`http://localhost:8080/api/v1/userEntity/me`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (!response.ok) {
          throw new Error("Failed to fetch user data");
        }

        const data: ApiResponse = await response.json();
        setUserData({
          ...data,
          role: data.role.name,
        });
      } catch (err) {
        setError(err instanceof Error ? err.message : "An error occurred");
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, []);

  const updateUser = async (currentEmail: string, updateUserDto: { name: string; email: string; role: string }) => {
    try {
      const token = localStorage.getItem("token");

      const response = await fetch(`http://localhost:8080/api/v1/userEntity/updateUser/${currentEmail}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(updateUserDto),
      });

      if (!response.ok) {
        throw new Error("Failed to update user");
      }

      const contentType = response.headers.get("content-type");
      if (contentType && contentType.includes("application/json")) {
        const data = await response.json();
        setUserData({
          ...data,
          role: data.role.name,
        });
        return data;
      } else {
        const text = await response.text();
        return { message: text };
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred");
      throw err;
    }
  };


  const updatePassword = async (changePasswordDto: { email: string; oldPassword: string; newPassword: string; confirmPassword: string }) => {
    try {
      const token = localStorage.getItem("token");

      const response = await fetch(`http://localhost:8080/api/v1/userEntity/updatePassword`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          email: changePasswordDto.email,
          currentPassword: changePasswordDto.oldPassword,
          newPassword: changePasswordDto.newPassword,
          confirmPassword: changePasswordDto.confirmPassword,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to update password");
      }

      const contentType = response.headers.get("content-type");
      if (contentType && contentType.includes("application/json")) {
        const data = await response.json();
        return data;
      } else {
        const text = await response.text();
        return { message: text };
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred");
      throw err;
    }
  };

  return { userData, loading, error, updateUser, updatePassword };
};