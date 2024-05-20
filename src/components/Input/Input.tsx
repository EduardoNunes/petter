interface InputProps {
  text: string;
  type: string;
  id: string;
  autoComplete?: string;
}

export default function Input({ text, type, id, autoComplete }: InputProps) {
  return (
    <>
      <input
        type={type}
        placeholder={text}
        id={id}
        autoComplete={autoComplete}
        className="h-10 w-full pl-5 rounded-3xl border border-black border-solid font-secondary mb-2"
      />
    </>
  );
}
