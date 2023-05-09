import { Dispatch, SetStateAction, useEffect } from "react";

interface Props {
  imageUri: string;
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
}

const FullScreenImage = ({ imageUri, open, setOpen }: Props) => {
  useEffect(() => {
    const windowOffset = window.scrollY;
    document.body.setAttribute(
      "style",
      `position:fixed; top -${windowOffset}px; left:0; right:0;`
    );
    return () => {
      document.body.setAttribute("style", "");
      window.scrollTo(0, windowOffset);
    };
  }, []);

  return (
    <>
      <div className="z-50 fixed top-0 left-0 w-full h-[100vh] bg-white flex flex-col items-center justify-center">
        <div className="w-full h-full relative flex flex-col items-center justify-center ">
          <img
            className="object-contain h-full w-full"
            src={imageUri}
            alt="profile image"
          />
          <div
            className="cursor-pointer absolute top-0 right-0 m-4 text-gray-400 transition duration-150 ease-in-out"
            onClick={() => {
              setOpen(false);
            }}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              aria-label="Close"
              className="icon icon-tabler icon-tabler-x"
              width={20}
              height={20}
              viewBox="0 0 24 24"
              strokeWidth="2.5"
              stroke="currentColor"
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path stroke="none" d="M0 0h24v24H0z" />
              <line x1={18} y1={6} x2={6} y2={18} />
              <line x1={6} y1={6} x2={18} y2={18} />
            </svg>
          </div>
        </div>
      </div>
    </>
  );
};

export default FullScreenImage;
