const Problem = () => {
  return (
    <>
      <div className="w-full flex flex-row items-center justify-center px-8 sm:px-32  bg-brown200 py-20">
        <div className="w-[90%] sm:w-[80%] left-[5%] right-[5%] sm:left-[10%] sm:right-[10%]">
          <div className="text-3xl font-CocogooseRegular text-pink-600">
            problems in online dating
          </div>
          <div className="flex flex-col justify-center gap-24 mt-16">
            <div className="sm:w-1/2 text-4xl sm:text-6xl font-CocogooseMedium">
              zero or minimal matches
            </div>
            <div className="w-full flex sm:justify-end">
              <div className="sm:w-1/2 text-4xl sm:text-6xl font-CocogooseMedium sm:text-right">
                fake profiles
              </div>
            </div>
            <div className="sm:w-1/2 text-4xl sm:text-6xl font-CocogooseMedium mt-6">
              high premium charge for necessary features
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Problem;
