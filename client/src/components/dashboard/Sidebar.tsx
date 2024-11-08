import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
  CommandShortcut,
} from "@/components/ui/command";

import {
  LayoutDashboard,
  Newspaper,
  Folder,
  Settings,
  User,
  Quote,
  BookCheck,
  BookOpenCheck
} from "lucide-react";

import { Link } from "react-router-dom";

const Sidebar = () => {
  return (
    <Command className="bg-secondary rounded-none">
      <CommandInput placeholder="Type a command or search..." />
      <CommandList>
        <CommandEmpty>No results found.</CommandEmpty>
        <CommandGroup heading="Contents Management">
          <CommandItem>
            <LayoutDashboard className="mr-2 h-4 w-4" />
            <Link to="/dashboard">Dashboard</Link>
          </CommandItem>
          <CommandItem>
            <Newspaper className="mr-2 h-4 w-4" />
            <Link to="/dashboard/lessons">Lessons</Link>
          </CommandItem>
          <CommandItem>
            <Folder className="mr-2 h-4 w-4" />
            <Link to="/dashboard/categories">Categories</Link>
          </CommandItem>
          <CommandItem>
            <Quote className="mr-2 h-4 w-4" />
            <Link to="/dashboard/quizzes">Quizzes</Link>
          </CommandItem>
          <CommandItem>
            <BookCheck className="mr-2 h-4 w-4" />
            <Link to="/dashboard/exams">Exams</Link>
          </CommandItem>
          <CommandItem>
            <BookOpenCheck className="mr-2 h-4 w-4" />
            <Link to="/dashboard/mock-tests">Mock tests</Link>
          </CommandItem>
        </CommandGroup>
        <CommandSeparator />
        <CommandGroup heading="User Management">
          <CommandItem>
            <User className="mr-2 h-4 w-4" />
            <Link to="/dashboard/users">Users</Link>
          </CommandItem>
        </CommandGroup>
        <CommandSeparator />
        <CommandGroup heading="Settings">
          <CommandItem>
            <User className="mr-2 h-4 w-4" />
            <Link to="/profile">Profile</Link>
            <CommandShortcut>Ctrl+P</CommandShortcut>
          </CommandItem>
          <CommandItem>
            <Settings className="mr-2 h-4 w-4" />
            <Link to="/settings">Settings</Link>
            <CommandShortcut>Ctrl+S</CommandShortcut>
          </CommandItem>
        </CommandGroup>
      </CommandList>
    </Command>
  );
};

export default Sidebar;
