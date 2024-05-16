import React from "react";

interface PetterBlackProps {
  fontSize: string;
}

const PetterBlack: React.FC<PetterBlackProps> = ({ fontSize }) => {
  return (
    <div className={"flex items-center relative flex-col"}>
      <div>
        <span className={`text-${fontSize} text-black`}>P</span>
        <span className={`text-${fontSize} text-black`}>e</span>
        <span className={`text-${fontSize} text-black`}>T</span>
        <span className={`text-${fontSize} text-black`}>T</span>
        <span className={`text-${fontSize} text-black`}>e</span>
        <span className={`text-${fontSize} text-black`}>R</span>
      </div>
    </div>
  );
};

export default PetterBlack;
