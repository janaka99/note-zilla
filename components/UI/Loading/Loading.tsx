import React from "react";
import { FaSpinner } from "react-icons/fa6";
const Loading = () => {
  return (
    <div className="min-h-svh w-full flex justify-center items-center">
      <div className="animate-spin text-white">
        <FaSpinner />
      </div>
    </div>
  );
};

export default Loading;
