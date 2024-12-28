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

  return { userData, loading, error };
};
