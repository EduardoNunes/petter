import React, { useEffect, useState } from "react";

interface MessageToastProps {
  textError: string;
  setToast: React.Dispatch<React.SetStateAction<string>>;
}

const MessageToast: React.FC<MessageToastProps> = ({ textError, setToast }) => {
  const [isVisible, setIsVisible] = useState(true);
  const sucesso = textError.includes("sucesso");

  const hideMessageToast = () => {
    setTimeout(() => {
      setIsVisible(false);
      setToast("");
    }, 3000);
  };

  React.useEffect(() => {
    hideMessageToast();
  }, []);

  if (!isVisible) {
    return null;
  }

  return (
    <div className="absolute top-[50%] translate-x-[-50%] left-[50%] translate-y-[-50%] z-10">
      <div
        className={`flex items-center text-center h-auto w-auto px-4 py-4 rounded-lg z-1 bg-${
          sucesso ? "verdePastel" : "amareloPadrao"
        }`}
      >
        <p className="font-secondary font-bold">{textError}</p>
      </div>
    </div>
  );
};

export default MessageToast;
