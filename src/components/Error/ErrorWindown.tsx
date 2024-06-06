import React, { useState } from "react";

interface ErrorWindowProps {
  textError: string;
  setError: React.Dispatch<React.SetStateAction<string>>;
}

const ErrorWindow: React.FC<ErrorWindowProps> = ({ textError, setError }) => {
  const [isVisible, setIsVisible] = useState(true);

  const hideErrorWindow = () => {
    setTimeout(() => {
      setIsVisible(false);
      setError("");
    }, 3000);
  };

  React.useEffect(() => {
    hideErrorWindow();
  }, []);

  if (!isVisible) {
    return null;
  }

  return (
    <div className="absolute top-[50%] translate-x-[-50%] left-[50%] translate-y-[-50%] z-10">
      <div className="flex items-center text-center h-auto w-auto px-4 py-4 rounded-lg bg-amareloPadrao z-1">
        <p className="font-secondary font-bold">{textError}</p>
      </div>
    </div>
  );
};

export default ErrorWindow;
