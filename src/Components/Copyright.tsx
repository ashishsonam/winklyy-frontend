import { useLocation } from "react-router-dom";
import PageFrame from "./PageFrame";

const Copyright = () => {
  const location = useLocation();

  if (location.pathname === "/" || location.pathname === "/home") {
    return (
      <div className="w-full flex flex-col items-center justify-center bg-brown800 pb-4">
        <PageFrame>
          <div className="text-[9px] text-white font-CocogooseRegular">
            images used above are edited. no copyright infringement intended.
          </div>
        </PageFrame>
      </div>
    );
  }
  return <></>;
};
export default Copyright;
