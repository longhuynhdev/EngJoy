import bannerImage from "@/img/banner.png";
import { Banner } from "@/components/common/Banner";
import { ArrowRightIcon } from "@heroicons/react/24/solid";
import { Link } from "react-router-dom";

const HomePage = () => {
  return (
    <div>
      <Banner
        title={`Go to new places, \nmeet new people with English`}
        description={
          <Link to="/lessons">
            <span className="flex items-center">
              Learn now <ArrowRightIcon className="w-5 h-5 ml-2" />
            </span>
          </Link>
        }
        height="34rem"
        backgroundUrl={bannerImage}
      />
    </div>
  );
};

export default HomePage;
