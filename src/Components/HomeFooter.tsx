import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Facebook from "../Assets/Icons/Facebook";
import Instagram from "../Assets/Icons/Instagram";
import LinkedIn from "../Assets/Icons/LinkedIn";
import RightQuote from "../Assets/Icons/RightQuote";
import { brown900 } from "../Constants/colors";
import JoinButton from "./JoinButton";
import PageFrame from "./PageFrame";

const HomeFooter = () => {
  const [username, setUsername] = useState<string | null>(null);

  const inputEvent = (event: any) => {
    setVisible(true);
    const { value } = event.target;
    setUsername(value);
  };

  useEffect(() => {
    if (username?.trim().length === 0) {
      setVisible(false);
    }
  }, [username]);
  const [visible, setVisible] = useState<boolean>(false);

  return (
    <>
      <div className="w-full flex flex-row items-center justify-center py-8 sm:py-0">
        <PageFrame>
          <div className="h-auto sm:h-[330px] w-full flex flex-col sm:flex-row items-center sm:justify-between">
            <div className="w-full sm:w-1/2 px-4 sm:px-8 md:px-12 flex items-center justify-center">
              <div className="text-brown900 font-CocogooseMedium text-base md:text-[22px] lg:text-2xl">
                <span>
                  <RightQuote size={48} color={brown900} />
                </span>
                don't date the most beautiful person in the world, date the
                person who makes your world the most beautiful.
              </div>
            </div>
            <div className="w-full sm:w-1/2 p-4 flex flex-col item-center sm:items-end justify-center ">
              <div>
                <div className="flex flex-col xl:flex-row items-center justify-center">
                  <div className="h-[60px] max-w-sm rounded-full border-brown900 border-[1.5px] flex flex-row items-center  bg-white px-2">
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
                      className="text-[18px] w-[140px] font-CocogooseThin font-bold h-full rounded-r-full border-0 focus:border-0 focus:ring-0"
                    />
                  </div>
                  {visible && (
                    <div className="mt-4 xl:mt-0 xl:ml-4 w-[136px] sm:w-[153px] h-[60px]">
                      <JoinButton />
                    </div>
                  )}
                </div>
                <div className="flex flex-row items-center justify-center ">
                  <div className="max-w-sm grid grid-cols-3 gap-7 self-center place-items-center place-content-center mt-6">
                    <Link to="https://www.instagram.com/_winklyy/">
                      <Instagram />
                    </Link>
                    <Link to="https://www.linkedin.com/company/winklyy/">
                      <LinkedIn />
                    </Link>
                    <Link to="https://www.facebook.com/profile.php?id=100090121310447">
                      <Facebook />
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </PageFrame>
      </div>
    </>
  );
};

export default HomeFooter;
