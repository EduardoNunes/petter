import React from "react";

type ButtonType =
  | "externalButton"
  | "internalButton"
  | "tertiary"
  | "quaternary"
  | "quinary";

interface ButtonProps {
  text: string;
  type: ButtonType;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
}

const Button: React.FC<React.PropsWithChildren<ButtonProps>> = ({
  text,
  children,
  type,
  onClick,
}) => {
  return (
    <button
      className={`flex items-center justify-center h-10 w-full font-secondary rounded-3xl gap-3 
      ${type === "externalButton" ? "bg-azulPalido" : ""}
      ${type === "internalButton" ? "bg-azulForteSombra" : ""}
      `}
      onClick={onClick}
    >
      {children}
      {text}
    </button>
  );
};

export default Button;