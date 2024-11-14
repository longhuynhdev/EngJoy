import { ArrowLeftCircle } from "lucide-react";
import { Link } from "react-router-dom";

interface BackButtonProps {
  text: string;
  link: string;
  state?: { from: string };
  size?: number;
}

const BackButton = ({ text, link, state, size }: BackButtonProps) => {
  return (
    <Link
      to={link}
      state={state}
      className="text-gray-500 hover:underline flex items-center gap-1 font-bold mb-5"
    >
      <ArrowLeftCircle size={size ? size : 18} />
      {text}
    </Link>
  );
};

export default BackButton;
