import React, { useState, ChangeEvent } from "react";

interface TextAreaProps {
  onTextChange: (text: string) => void;
  placeholder: string;
  height: string;
}

const TextArea: React.FC<TextAreaProps> = ({
  onTextChange,
  placeholder,
  height,
}) => {
  const [textValue, setTextValue] = useState("");

  const handleTextChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
    const newTextValue = event.target.value;
    setTextValue(newTextValue);
    onTextChange(newTextValue);
  };

  return (
    <textarea
      value={textValue}
      onChange={handleTextChange}
      placeholder={placeholder}
      className={`h-${height} w-full p-5 pt-2 pb-2 rounded-3xl border border-black border-solid font-secondary`}
    />
  );
};

export default TextArea;
