import PageFrame from "./PageFrame";
import search from "../Assets/search.gif";
import { Link } from "react-router-dom";
const Discover = () => {
  return (
    <div className="w-full flex flex-row items-center justify-center bg-brown300">
      <PageFrame>
        <div className="w-full h-full flex flex-col items-center justify-center py-8">
          <div className="font-CocogooseSemibold text-brown900 text-[32px] sm:text-[60px] text-center">
            discover people via{" "}
            <Link to="/search" className="bg-white rounded-md px-4 py-2">
              SEARCH
            </Link>
          </div>
          <Link
            to={"/search"}
            className="relative mt-[70px] sm:mt-[120px] max-w-[800px]"
          >
            <img src={search} className="w-full h-full" />
          </Link>
        </div>
      </PageFrame>
    </div>
  );
};

export default Discover;
