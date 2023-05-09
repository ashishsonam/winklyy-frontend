interface Props {
  imageUri?: string | null;
  text?: string | null;
}

const STUComponent = ({ text, imageUri = "" }: Props) => {
  return (
    <>
      <div className="min-w-[280px] sm:min-w-[380px] h-[600px] rounded-3xl p-4 bg-white">
        <div className="h-[56%] bg-black rounded-3xl">
          <img />
        </div>
        <div className="flex flex-col items-center justify-center h-[40%]  mt-4">
          <div className="text-3xl font-CocogooseSemibold text-brown900 text-center">
            {text}
          </div>
        </div>
      </div>
    </>
  );
};

export default STUComponent;
