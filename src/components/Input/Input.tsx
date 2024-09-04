import { ChangeEvent } from "react";

interface InputProps {
  text: string;
  type: string;
  id: string;
  autoComplete?: string;
  value?: string;
  name: string;
  disabled?: boolean;
  onChange?: (event: ChangeEvent<HTMLInputElement>) => void;
  style?: string;
}

const Input: React.FC<InputProps> = ({ text, type, id, autoComplete, value, name,  disabled, onChange, style }) => {
  return (
    <>
      <input
        type={type}
        placeholder={text}
        id={id}
        autoComplete={autoComplete}
        value={value}
        name={name}
        disabled={disabled}
        onChange={onChange}
        className={`h-10 w-full px-5 rounded-3xl border border-black border-solid font-secondary ${style || "mb-2"}`}
      />
    </>
  );
}

export default Input;