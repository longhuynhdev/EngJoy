import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableHead,
  TableCell,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import BackButton from "@/components/common/BackButton"; // Đảm bảo bạn đã tạo và import component này

const UserTableView = () => {
  const [users, setUsers] = useState([]); // Dữ liệu người dùng
  const [isLoading, setIsLoading] = useState(true); // Trạng thái tải dữ liệu
  const [error, setError] = useState(null); // Trạng thái lỗi
  const navigate = useNavigate(); // Để điều hướng

  // Fetch dữ liệu người dùng khi component mount
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetch("http://localhost:8080/api/v1/userEntity/getUsers"); // URL API
        if (!response.ok) {
          throw new Error(`Failed to fetch users: ${response.status}`);
        }
        const data = await response.json(); // Parse JSON
        setUsers(data); // Lưu dữ liệu vào state
      } catch (err) {
        setError(err.message || "Error fetching users");
      } finally {
        setIsLoading(false); // Dừng trạng thái loading
      }
    };

    fetchUsers();
  }, []); // Chỉ chạy một lần khi component được mount

  // Render giao diện dựa trên trạng thái
  if (isLoading) return <p>Loading...</p>;
  if (error) return <p className="text-red-500">{error}</p>;
  if (!users.length) return <p className="text-gray-500">No users found</p>;

  // Render bảng dữ liệu người dùng
  return (
    <div className="container mx-auto px-4">
      {/* Nút quay lại Dashboard */}
      <div className="flex justify-start mb-4">
        <BackButton link="/dashboard" text="Back to Dashboard" />
      </div>
      {/* Tiêu đề */}
      <section>
        <h2 className="text-2xl font-bold mb-4">User Table View</h2>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {users.map((user) => (
              <TableRow key={user.id}>
                <TableCell>{user.name}</TableCell>
                <TableCell>{user.email}</TableCell>
                <TableCell>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => navigate(`user-management/${user.email}`)} // Điều hướng đến trang quản lý người dùng
                  >
                    Manage
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </section>
    </div>
  );
};

export default UserTableView;
