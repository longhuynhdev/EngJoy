import { Link } from "react-router-dom";
import logo from "../../img/logo_horizontal.png";
import userAvatar from "../../img/user.svg";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useLogout } from "@/hooks/useAuth";

const Navbar = () => {
  const logout = useLogout();
  return (
    <div className="bg-[#E2E8F0] dark:bg-slate-700 text-white px-5 flex justify-between">
      <Link to="/" className="flex items-center gap-2">
        <img src={logo} width={149} height={64} alt="JoyEng logo"></img>
      </Link>
      <DropdownMenu>
        <DropdownMenuTrigger className="focus:outline-none">
          <Avatar>
            <AvatarImage
              src={userAvatar}
              alt="User Avatar"
            ></AvatarImage>
            <AvatarFallback className="text-black">JE</AvatarFallback>
          </Avatar>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuLabel>My Account</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem>
            <Link to="/profile">Profile</Link>
          </DropdownMenuItem>
          <DropdownMenuItem onClick={logout}>Logout</DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};

export default Navbar;
