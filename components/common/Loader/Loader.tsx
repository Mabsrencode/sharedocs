import React from "react";
interface SpinnerProps {
  bigger: boolean;
}
const Loader: React.FC<SpinnerProps> = ({ bigger }) => {
  return (
    <div className="w-full h-screen flex justify-center items-center">
      <div
        className={`mix-blend-difference animate-spin rounded-full ${
          bigger ? "h-12 w-12" : "h-6 w-6"
        } ${
          bigger ? "border-4" : "border-2"
        } border-t-transparent border-white`}
      ></div>
    </div>
  );
};

export default Loader;
