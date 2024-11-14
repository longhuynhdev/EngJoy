import userAvatar from "../../img/user.svg";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Link } from "react-router-dom";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useLogout } from "@/hooks/useAuth";
const AvatarDropdownMenu = () => {
  const logout = useLogout();
  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="focus:outline-none">
        <Avatar>
          <AvatarImage src={userAvatar} alt="User Avatar"></AvatarImage>
          <AvatarFallback className="text-black">JE</AvatarFallback>
        </Avatar>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuLabel>My Dashboard</DropdownMenuLabel>
        <Link to="/dashboard">
          <DropdownMenuItem>Dashboard</DropdownMenuItem>
        </Link>
        <DropdownMenuSeparator />
        <DropdownMenuLabel>My Account</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <Link to="/profile">
          <DropdownMenuItem>Profile</DropdownMenuItem>
        </Link>
        <Link to="/change-password">
          <DropdownMenuItem>Change password</DropdownMenuItem>
        </Link>
        <DropdownMenuItem onClick={logout}>Logout</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default AvatarDropdownMenu;
