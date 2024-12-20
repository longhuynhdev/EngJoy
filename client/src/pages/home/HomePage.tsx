import bannerImage from "@/img/banner.png";
import { Banner } from "@/components/common/Banner";
import { ArrowRightIcon } from "@heroicons/react/24/solid";
import { Button } from "@/components/ui/button";

const HomePage = () => {
  return (
    <div>
      {/* Hero Section */}
      <Banner
        title={`Go to new places, \nmeet new people with English`}
        description={
          <span className="flex items-center">
            Learn now <ArrowRightIcon className="w-5 h-5 ml-2" />
          </span>
        }
        height="25rem"
        backgroundUrl={bannerImage}
      />

      {/* Journey Steps Section */}
      <div className="journey-steps p-8 bg-[#1E293B] text-white flex">
        <div className="text-left w-2/3">
          <ol className="space-y-6">
            <li className="flex items-center space-x-4">
              <span className="flex items-center justify-center w-8 h-8 rounded-full bg-white text-black font-semibold">
                1
              </span>
              <p className="flex items-center">
                Take the level test <ArrowRightIcon className="w-5 h-5 ml-2" />
              </p>
            </li>
            <li className="flex items-center space-x-4">
              <span className="flex items-center justify-center w-8 h-8 rounded-full bg-white text-black font-semibold">
                2
              </span>
              <p className="flex items-center">
                Start learning with appropriate lessons{" "}
                <ArrowRightIcon className="w-5 h-5 ml-2" />
              </p>
            </li>
            <li className="flex items-center space-x-4">
              <span className="flex items-center justify-center w-8 h-8 rounded-full bg-white text-black font-semibold">
                3
              </span>
              <p className="flex items-center">
                Take exams after learning{" "}
                <ArrowRightIcon className="w-5 h-5 ml-2" />
              </p>
            </li>
            <li className="flex items-center space-x-4">
              <span className="flex items-center justify-center w-8 h-8 rounded-full bg-white text-black font-semibold">
                4
              </span>
              <p className="flex items-center">
                Accumulate points <ArrowRightIcon className="w-5 h-5 ml-2" />
              </p>
            </li>
            <li className="flex items-center space-x-4">
              <span className="flex items-center justify-center w-8 h-8 rounded-full bg-white text-black font-semibold">
                5
              </span>
              <p className="flex items-center">
                Redeem your desired mock tests{" "}
                <ArrowRightIcon className="w-5 h-5 ml-2" />
              </p>
            </li>
          </ol>
        </div>
        <div className="w-1/3 flex items-center justify-end">
          <h2 className="text-5xl font-bold text-right">
            How to start your journey?
          </h2>
        </div>
      </div>

      {/* Still New to JoyEng Section */}
      <div className="bg-white py-8 flex flex-col items-center border border-gray-300 rounded-lg shadow-md w-2/3 mx-auto">
        <p className="text-gray-700 mb-4 text-4xl font-semibold">Still new to JoyEng?</p>
          <p className="text-gray-500 mb-4 text-xl">
            Take our level test first to know which level to start at?
          </p>
          <Button variant="default" >
            To the level test
          </Button>
      </div>

    </div>
  );
};

export default HomePage;
