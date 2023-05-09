import { useEffect, useState } from "react";
import "./Hero.css";
import JoinButton from "./JoinButton";
import PageFrame from "./PageFrame";

import background from "../Assets/background.jpg";
const Hero = () => {
  const [username, setUsername] = useState<string | null>(null);

  const inputEvent = (event: any) => {
    const { value } = event.target;
    setUsername(value);
  };

  return (
    <>
      <div className="w-full min-h-[100vh] pb-12 pt-[120px] bg-brown100 flex flex-col items-center bg-cover bg-center">
        <PageFrame>
          <div className="flex flex-col w-full h-full items-center justify-center">
            <div className="w-full h-full grid grid-cols-1 md:grid-cols-2 mt-[70px] place-items-center gap-6 md:gap-3">
              <div className="h-full w-full flex flex-col items-start">
                <div className="text-brown900 text-[42px] sm:text-[60px] font-CocogooseBold">
                  want to know if a person is single?
                </div>
                <div className="text-brown900 text-[30px] font-CocogooseSemibold mt-4">
                  check if they have a WINKLYY
                </div>
                <div className="flex flex-col max-w-[400px] mt-[80px] self-center md:self-start">
                  <div className="flex flex-col items-center">
                    <div className="h-[60px] rounded-full border-brown900 border-[1.5px] flex flex-row items-center justify-center bg-white px-4">
                      <div className="text-[20px] font-CocogooseSemibold ml-2 text-brown900">
                        winklyy.com/
                      </div>
                      <input
                        type="text"
                        name="username"
                        id="username"
                        value={username ? username : ""}
                        disabled={false}
                        onChange={inputEvent}
                        placeholder="username"
                        className="text-[18px] text-black w-full font-CocogooseThin font-bold h-full rounded-r-full border-0 focus:border-0 focus:ring-0"
                      />
                    </div>
                    <div className="mt-4 w-[156px] h-[60px]">
                      <JoinButton />
                    </div>
                  </div>
                </div>
              </div>
              <img
                src={background}
                className="max-w-[80%] h-auto shadow-lg shadow-brown900"
              />
            </div>
          </div>
        </PageFrame>
      </div>
    </>
  );
};

export default Hero;
