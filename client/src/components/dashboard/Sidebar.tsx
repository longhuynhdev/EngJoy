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
  BookOpenCheck,
  MessageCircleQuestion,
} from "lucide-react";

import { Link } from "react-router-dom";

const Sidebar = () => {
  return (
    <Command className="rounded-none bg-secondary">
      <CommandInput placeholder="Type a command or search..." />
      <CommandList>
        <CommandEmpty>No results found.</CommandEmpty>
        <CommandGroup heading="Contents Management">
          <CommandItem>
            <LayoutDashboard className="w-4 h-4 mr-2" />
            <Link to="/dashboard">Dashboard</Link>
          </CommandItem>
          <CommandItem>
            <Newspaper className="w-4 h-4 mr-2" />
            <Link to="/dashboard/lessons">Lessons</Link>
          </CommandItem>
          <CommandItem>
            <Folder className="w-4 h-4 mr-2" />
            <Link to="/dashboard/tags">Tags</Link>
          </CommandItem>
          <CommandItem>
            <MessageCircleQuestion className="w-4 h-4 mr-2" />
            <Link to="/dashboard/questions">Questions</Link>
          </CommandItem>
          <CommandItem>
            <Quote className="w-4 h-4 mr-2" />
            <Link to="/dashboard/quizzes">Quizzes</Link>
          </CommandItem>
          <CommandItem>
            <BookCheck className="w-4 h-4 mr-2" />
            <Link to="/dashboard/exams">Exams</Link>
          </CommandItem>
          <CommandItem>
            <BookOpenCheck className="w-4 h-4 mr-2" />
            <Link to="/dashboard/mock-tests">Mock tests</Link>
          </CommandItem>
        </CommandGroup>
        <CommandSeparator />
        <CommandGroup heading="User Management">
          <CommandItem>
            <User className="w-4 h-4 mr-2" />
            <Link to="/dashboard/users">Users</Link>
          </CommandItem>
        </CommandGroup>
        <CommandSeparator />
        <CommandGroup heading="Settings">
          <CommandItem>
            <User className="w-4 h-4 mr-2" />
            <Link to="/profile">Profile</Link>
            <CommandShortcut>Ctrl+P</CommandShortcut>
          </CommandItem>
          <CommandItem>
            <Settings className="w-4 h-4 mr-2" />
            <Link to="/settings">Settings</Link>
            <CommandShortcut>Ctrl+S</CommandShortcut>
          </CommandItem>
        </CommandGroup>
      </CommandList>
    </Command>
  );
};

export default Sidebar;
