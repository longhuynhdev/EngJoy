import { Link } from "react-router-dom";
import logo from "../../img/logo.png";
import { PhoneCall, Mail } from "lucide-react";

const HomepageFooter = () => {
  return (
    <footer className="bg-[#1E293B] text-white px-4 py-6">
      {/* Main footer content */}
      <div className="container mx-auto grid grid-cols-1 gap-6 md:grid-cols-3">
        {/* Logo Section */}
        <div className="flex items-center justify-center md:justify-start">
          <Link to="/" className="flex items-center gap-2">
            <img
              src={logo}
              width={150}
              height={150}
              alt="JoyEng logo"
              className="max-w-[150px]"
            />
          </Link>
        </div>

        {/* Features and Information*/}
        <div className="flex justify-center gap-8 md:gap-12">
          {/* Features */}
          <div>
            <h2 className="mb-3 text-base font-bold">Features</h2>
            <ul className="space-y-1">
              <li>
                <Link to="/" className="text-gray-400 hover:text-white text-sm">
                  Home
                </Link>
              </li>
              <li>
                <Link
                  to="/lessons"
                  className="text-gray-400 hover:text-white text-sm"
                >
                  Lessons
                </Link>
              </li>
              <li>
                <Link
                  to="/exams"
                  className="text-gray-400 hover:text-white text-sm"
                >
                  Exams
                </Link>
              </li>
            </ul>
          </div>

          {/* Information */}
          <div>
            <h2 className="mb-3 text-base font-bold">Information</h2>
            <ul className="space-y-1">
              <li>
                <Link
                  to="/about"
                  className="text-gray-400 hover:text-white text-sm"
                >
                  About us
                </Link>
              </li>
              <li>
                <Link
                  to="/contact"
                  className="text-gray-400 hover:text-white text-sm"
                >
                  Contact
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Contact Section */}
        <div className="text-center md:text-left">
          <h2 className="mb-3 text-base font-bold">Contact Us</h2>
          <p className="text-gray-400 text-sm">
            <PhoneCall className="inline-block mr-1 text-gray-400 h-4 w-4" />{" "}
            +84 999 999 999
          </p>
          <p className="mt-1 text-gray-400 text-sm">
            <Mail className="inline-block mr-1 text-gray-400 h-4 w-4" />{" "}
            engjoy@gmail.com
          </p>
        </div>
      </div>

      {/* Copyright Section - reduced spacing */}
      <div className="flex items-center justify-center pt-4 mt-6 border-t border-gray-700">
        <p className="text-xs text-gray-400">
          © 2025. EngJoy Ltd. All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default HomepageFooter;
