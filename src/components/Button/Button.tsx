type ButtonType =
  | "externalButton"
  | "internalButton"
  | "tertiary"
  | "quaternary"
  | "quinary";

interface ButtonProps {
  text: string;
  type: ButtonType;
}

export default function Button({
  text,
  children,
  type,
}: React.PropsWithChildren<ButtonProps>) {
  return (
    <button
      className={`flex items-center justify-center h-10 w-full font-secondary rounded-3xl gap-3 
      ${type === "externalButton" ? "bg-azulPalido" : ""}
      ${type === "internalButton" ? "bg-azulForteSombra" : ""}
      `}
    >
      {children}
      {text}
    </button>
  );
}
