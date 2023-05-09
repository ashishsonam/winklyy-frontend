import React from "react";
import { Link } from "react-router-dom";
import PageFrame from "../Components/PageFrame";

const Page404 = () => {
  return (
    <>
      <div className="w-full flex min-h-[100vh] flex-col items-center justify-center pt-[120px] pb-[20px] bg-brown200">
        <PageFrame>
          <div className="flex items-center flex-col justify-center lg:flex-row py-28 px-6 md:px-24 md:py-20 lg:py-32 gap-16 lg:gap-28">
            <div className="w-full lg:w-1/2">
              <img
                className="hidden lg:block"
                src="https://i.ibb.co/v30JLYr/Group-192-2.png"
                alt=""
              />
              <img
                className="hidden md:block lg:hidden"
                src="https://i.ibb.co/c1ggfn2/Group-193.png"
                alt=""
              />
              <img
                className="md:hidden"
                src="https://i.ibb.co/8gTVH2Y/Group-198.png"
                alt=""
              />
            </div>
            <div className="w-full lg:w-1/2">
              <h1 className="py-4 text-3xl lg:text-4xl font-CocogooseBold text-brown900">
                Looks like you've found the doorway to the great nothing
              </h1>
              <p className="font-CocogooseRegular py-4 text-base text-brown900">
                The content you’re looking for doesn’t exist. Either it was
                removed, or you mistyped the link.
              </p>
              <p className="font-CocogooseRegular py-2 text-base text-brown900">
                Sorry about that! Please visit our hompage to get where you need
                to go.
              </p>
              <Link to={"/"}>
                <button className="w-full font-CocogooseMedium lg:w-auto my-4 border rounded-md px-1 sm:px-16 py-5 bg-brown900 text-white hover:bg-brown800 focus:outline-none focus:ring-2 focus:ring-brown900 focus:ring-opacity-50">
                  Go back to Homepage
                </button>
              </Link>
            </div>
          </div>
        </PageFrame>
      </div>
    </>
  );
};

export default Page404;
