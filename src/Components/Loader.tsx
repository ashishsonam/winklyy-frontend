import React from "react";
import PuffLoader from "react-spinners/PuffLoader";
import { brown700 } from "../Constants/colors";

const override: React.CSSProperties = {
  display: "block",
  margin: "0 auto",
  borderColor: "red",
};

const Loader = () => {
  return (
    <>
      <div className="w-full h-[100vh] flex items-center justify-center">
        <PuffLoader
          cssOverride={override}
          size={120}
          color={brown700}
          loading={true}
          speedMultiplier={1.5}
          aria-label="Loading Spinner"
          data-testid="loader"
        />
      </div>
    </>
  );
};

export default Loader;
