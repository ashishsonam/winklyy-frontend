import RightArrow from "../Assets/Icons/RightArrow";
import STUComponent from "./STUComponent";
import PageFrame from "./PageFrame";
const StepToUse = () => {
  return (
    <>
      <div className="w-full min-h-[100vh] flex flex-row items-center justify-center bg-brown300">
        <PageFrame>
          <div className="w-[95%] overflow-x-auto flex flex-row items-center gap-4 justify-between px-8 snap-mandatory snap-x">
            <div className="snap-center">
              <STUComponent text={"create a winklyy"} />
            </div>
            <div className="snap-center">
              <STUComponent text={"match with others"} />
            </div>
            <div className="snap-center">
              <STUComponent text={"connect and date"} />
            </div>
          </div>
        </PageFrame>
      </div>
    </>
  );
};

export default StepToUse;
