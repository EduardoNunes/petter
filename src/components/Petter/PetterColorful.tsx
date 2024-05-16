import React from "react";

interface PetterColorfulProps {
  fontSize: string;
}

const PetterColorful: React.FC<PetterColorfulProps> = ({ fontSize }) => {
  return (
    <div className={"flex items-center relative flex-col"}>
      <div>
        <span className={`text-${fontSize} text-verdeForteSombra`}>P</span>
        <span className={`text-${fontSize} text-azulEscuro`}>e</span>
        <span className={`text-${fontSize} text-rosaForteSombra`}>T</span>
        <span className={`text-${fontSize} text-azulForteSombra`}>T</span>
        <span className={`text-${fontSize} text-amareloPadrao`}>e</span>
        <span className={`text-${fontSize} text-rosaForte`}>R</span>
      </div>
    </div>
  );
};

export default PetterColorful;
