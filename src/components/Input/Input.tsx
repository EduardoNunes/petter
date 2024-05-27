import { ChangeEvent } from "react";

interface InputProps {
  text: string;
  type: string;
  id: string;
  autoComplete?: string;
  value?: string;
  onChange?: (event: ChangeEvent<HTMLInputElement>) => void;
}

const Input: React.FC<InputProps> = ({ text, type, id, autoComplete, value, onChange }) => {
  return (
    <>
      <input
        type={type}
        placeholder={text}
        id={id}
        autoComplete={autoComplete}
        value={value}
        onChange={onChange}
        className="h-10 w-full px-5 rounded-3xl border border-black border-solid font-secondary mb-2"
      />
    </>
  );
}

export default Input;