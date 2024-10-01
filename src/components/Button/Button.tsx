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
  disabled?: boolean;
}

const Button: React.FC<React.PropsWithChildren<ButtonProps>> = ({
  text,
  children,
  type,
  onClick,
  disabled,
}) => {
  return (
    <button
      className={`flex items-center justify-center h-10 w-full font-secondary rounded-3xl gap-3 
      ${type === "externalButton" ? "bg-azulPalido" : ""}
      ${type === "internalButton" ? "bg-azulForteSombra" : ""}
      `}
      onClick={onClick}
      disabled={disabled}
    >
      {children}
      {text}
    </button>
  );
};

export default Button;
