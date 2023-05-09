import { ReactElement } from "react";

interface Props {
  children: ReactElement;
}
const PageFrame = ({ children }: Props) => {
  return (
    <div className="w-[90%] h-auto flex flex-row items-center justify-center sm:w-[80%] left-[5%] right-[5%] sm:left-[10%] sm:right-[10%] px-2">
      {children}
    </div>
  );
};

export default PageFrame;
