import { ArrowRightCircle } from "lucide-react";
import { Link } from "react-router-dom";

interface ForwardButtonProps {
  text: string;
  link: string;
  state?: { from: string };
  size?: number;
}

const ForwardButton = ({ text, link, state, size }: ForwardButtonProps) => {
  return (
    <Link
      to={link}
      state={state}
      className="text-gray-500 hover:underline flex items-center gap-1 font-bold mb-5"
    >
      <ArrowRightCircle size={size ? size : 18} />
      {text}
    </Link>
  );
};

export default ForwardButton;
