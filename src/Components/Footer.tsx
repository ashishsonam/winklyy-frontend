import PageFrame from "./PageFrame";

const Footer = () => {
  return (
    <>
      <div className="w-full flex flex-col items-center justify-center h-[80px] bg-brown800">
        <PageFrame>
          <div className="flex flex-col items-center justify-center w-full">
            <div className="text-base text-white font-CocogooseThin font-semibold">
              copyright © 2023 WINKLYY
            </div>
          </div>
        </PageFrame>
      </div>
    </>
  );
};

export default Footer;
