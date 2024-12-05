import { Link } from "react-router-dom";
import logo from "../../img/Frame 30.png";
import { Facebook, Instagram, Twitter, PhoneCall, Mail } from "lucide-react";
import { FaGoogle } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-[#1E293B] text-white px-8 py-10">
  <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
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
        <h2 className="text-lg font-bold mb-4">Features</h2>
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
        <h2 className="text-lg font-bold mb-4">Information</h2>
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
      <h2 className="text-lg font-bold mb-4">Contact Us</h2>
      <p className="text-gray-400">
        <PhoneCall className="inline-block text-gray-400 mr-2" /> +84 999 999
        999
      </p>
      <p className="text-gray-400 mt-2">
        <Mail className="inline-block text-gray-400 mr-2" /> joyeng@gmail.com
      </p>
    </div>
  </div>

  {/* Social Media Section */}
  <div className="mt-10 border-t border-gray-700 pt-6 flex items-center justify-between">
    <div className="flex gap-4 text-gray-400 mx-auto">
      <Facebook className="hover:text-white cursor-pointer" />
      <FaGoogle className="hover:text-white cursor-pointer" />
      <Twitter className="hover:text-white cursor-pointer" />
      <Instagram className="hover:text-white cursor-pointer" />
    </div>
    <p className="text-gray-400 text-sm">
      © 2024. JoyEng Ltd. All rights reserved.
    </p>
  </div>

</footer>

  );
};

export default Footer;
