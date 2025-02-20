import { Link } from "react-router-dom";
import logo from "../../img/logo.png";
import { PhoneCall, Mail } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-[#1E293B] text-white px-8 py-10">
  <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
    {/* Logo Section */}
    <div className="flex items-center justify-start pl-[160px] pr-[120px]">
      <Link to="/" className="flex items-center gap-2">
        <img src={logo} width={266} height={266} alt="JoyEng logo" />
      </Link>
    </div>

    {/* Features và Information */}
    <div className="flex justify-center gap-[120px]">
      {/* Features */}
      <div>
        <h2 className="mb-4 text-lg font-bold">Features</h2>
        <ul className="space-y-2">
          <li>
            <Link to="/" className="text-gray-400 hover:text-white">
              Home
            </Link>
          </li>
          <li>
            <Link to="/level-test" className="text-gray-400 hover:text-white">
              Level test
            </Link>
          </li>
          <li>
            <Link to="/lessons" className="text-gray-400 hover:text-white">
              Lessons
            </Link>
          </li>
          <li>
            <Link to="/exams" className="text-gray-400 hover:text-white">
              Exams
            </Link>
          </li>
          <li>
            <Link to="/mock-tests" className="text-gray-400 hover:text-white">
              Mock tests
            </Link>
          </li>
        </ul>
      </div>

      {/* Information */}
      <div>
        <h2 className="mb-4 text-lg font-bold">Information</h2>
        <ul className="space-y-2">
          <li>
            <Link to="/about" className="text-gray-400 hover:text-white">
              About us
            </Link>
          </li>
          <li>
            <Link to="/contact" className="text-gray-400 hover:text-white">
              Contact
            </Link>
          </li>
          <li>
            <Link to="/support" className="text-gray-400 hover:text-white">
              Supports
            </Link>
          </li>
          <li>
            <Link to="/terms" className="text-gray-400 hover:text-white">
              Terms & Condition
            </Link>
          </li>
          <li>
            <Link to="/privacy" className="text-gray-400 hover:text-white">
              Privacy Policy
            </Link>
          </li>
        </ul>
      </div>
    </div>

    {/* Contact Section */}
    <div className="pr-[160px]">
      <h2 className="mb-4 text-lg font-bold">Contact Us</h2>
      <p className="text-gray-400">
        <PhoneCall className="inline-block mr-2 text-gray-400" /> +84 999 999
        999
      </p>
      <p className="mt-2 text-gray-400">
        <Mail className="inline-block mr-2 text-gray-400" /> joyeng@gmail.com
      </p>
    </div>
  </div>

  {/* Copyright Section */}
<div className="flex items-center justify-center pt-6 mt-10 border-t border-gray-700">
    <p className="text-sm text-gray-400">
      © 2025. JoyEng Ltd. All rights reserved.
    </p>
</div>

</footer>

  );
};

export default Footer;
