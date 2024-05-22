import React from "react";

interface ErrorWindowProps {
  textError: string;
}

const ErrorWindow: React.FC<ErrorWindowProps> = ({ textError }) => {
  return (
    <div className="absolute top-[50%] translate-x-[-50%] left-[50%] translate-y-[-50%]">
      <div className="flex items-center text-center h-16 w-auto px-4 rounded-lg bg-amareloPadrao z-1">
        <p className="font-secondary">{textError}</p>
      </div>
    </div>
  );
};

export default ErrorWindow;
