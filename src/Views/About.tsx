import React from 'react';
import { Link } from 'react-router-dom';
import PageFrame from '../Components/PageFrame';

const About = () => {
  return (
    <>
      <div className="w-full pt-[140px] flex flex-col items-center justify-around">
        <div className="w-full h-full flex flex-col items-center justify-center">
          <PageFrame>
            <div className="mb-8 px-2">
              <div className="text-brown900 text-[30px] font-CocogooseRegular text-center ">
                <span className="text-brown900 text-[46px] sm:text-[64px] font-CocogooseMedium mr-4">
                  WINKLYY
                </span>
                is a mission to connect
              </div>
              <div className="text-brown900 text-[20px]  sm:text-[30px] font-CocogooseRegular text-center">
                Abhishek with his Aishwarya
              </div>
              <div className="text-brown900 text-[20px]  sm:text-[30px] font-CocogooseRegular text-center">
                Michelle with her Barack
              </div>
            </div>
          </PageFrame>
          <div className="bg-brown100 py-4 sm:py-10 w-full flex items-center justify-center">
            <PageFrame>
              <div className="w-full flex flex-col items-center justify-center">
                <div className="text-brown800 text-2xl sm:text-6xl font-CocogooseMedium text-center">
                  in this noisy online world,
                </div>
                <div className="text-brown800 text-2xl sm:text-6xl font-CocogooseMedium text-center mt-2 sm:mt-6">
                  find your true partner
                </div>
              </div>
            </PageFrame>
          </div>
          <PageFrame>
            <div className="py-4 w-full">
              <div className="text-brown900 text-[30px] font-CocogooseRegular mt-4 text-center">
                <div> at its core,</div>
                <span className="text-brown900 text-[46px] sm:text-[64px] font-CocogooseMedium mr-4">
                  WINKLYY
                </span>
                is about
                <span className="text-brown900 text-[46px] sm:text-[64px] font-CocogooseMedium ml-4">
                  LOVE
                </span>
              </div>
              <div className="flex flex-row items-center justify-center py-8">
                <Link
                  to="/signup"
                  id="signup"
                  className="h-[70px] w-[136px] sm:w-[153px] px-4 md:px-7 py-4 flex items-center justify-center rounded-full bg-brown900 hover:text-white focus:outline-none"
                >
                  <div className="text-white text-xl font-CocogooseMedium">
                    join now
                  </div>
                </Link>
              </div>
            </div>
          </PageFrame>
        </div>
      </div>
    </>
  );
};

export default About;
