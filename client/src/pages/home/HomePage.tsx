import bannerImage from "@/img/banner.png";
import { Banner } from "@/components/common/Banner";
import { ArrowRightIcon } from "@heroicons/react/24/solid";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const HomePage = () => {
  return (
    <div>
      {/* Hero Section */}

      <Banner
        title={`Go to new places, \nmeet new people with English`}
        description={
          <Link to="/lessons">
            <span className="flex items-center">
              Learn now <ArrowRightIcon className="w-5 h-5 ml-2" />
            </span>
          </Link>
        }
        height="25rem"
        backgroundUrl={bannerImage}
      />

      {/* Journey Steps Section */}
      <div className="journey-steps p-8 bg-[#1E293B] text-white flex">
        <div className="w-2/3 text-left">
          <ol className="space-y-6">
            <li className="flex items-center space-x-4">
              <span className="flex items-center justify-center w-8 h-8 font-semibold text-black bg-white rounded-full">
                1
              </span>
              <p className="flex items-center">
                Take the level test <ArrowRightIcon className="w-5 h-5 ml-2" />
              </p>
            </li>
            <li className="flex items-center space-x-4">
              <span className="flex items-center justify-center w-8 h-8 font-semibold text-black bg-white rounded-full">
                2
              </span>
              <p className="flex items-center">
                Start learning with appropriate lessons{" "}
                <ArrowRightIcon className="w-5 h-5 ml-2" />
              </p>
            </li>
            <li className="flex items-center space-x-4">
              <span className="flex items-center justify-center w-8 h-8 font-semibold text-black bg-white rounded-full">
                3
              </span>
              <p className="flex items-center">
                Take exams after learning{" "}
                <ArrowRightIcon className="w-5 h-5 ml-2" />
              </p>
            </li>
            <li className="flex items-center space-x-4">
              <span className="flex items-center justify-center w-8 h-8 font-semibold text-black bg-white rounded-full">
                4
              </span>
              <p className="flex items-center">
                Accumulate points <ArrowRightIcon className="w-5 h-5 ml-2" />
              </p>
            </li>
            <li className="flex items-center space-x-4">
              <span className="flex items-center justify-center w-8 h-8 font-semibold text-black bg-white rounded-full">
                5
              </span>
              <p className="flex items-center">
                Redeem your desired mock tests{" "}
                <ArrowRightIcon className="w-5 h-5 ml-2" />
              </p>
            </li>
          </ol>
        </div>
        <div className="flex items-center justify-end w-1/3">
          <h2 className="text-5xl font-bold text-right">
            How to start your journey?
          </h2>
        </div>
      </div>

      {/* Still New to JoyEng Section */}
      <div className="flex flex-col items-center w-2/3 py-8 mx-auto bg-white border border-gray-300 rounded-lg shadow-md">
        <p className="mb-4 text-4xl font-semibold text-gray-700">
          Still new to JoyEng?
        </p>
        <p className="mb-4 text-xl text-gray-500">
          Take our level test first to know which level to start at?
        </p>
        <Button variant="default">To the level test</Button>
      </div>
    </div>
  );
};

export default HomePage;
