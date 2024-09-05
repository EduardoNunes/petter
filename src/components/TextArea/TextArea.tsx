import React, { useState, ChangeEvent } from "react";

interface TextAreaProps {
  onTextChange: (text: string) => void;
  value: string;
  placeholder: string;
  height: string;
  style?: string;
}

const TextArea: React.FC<TextAreaProps> = ({
  onTextChange,
  value,
  placeholder,
  height,
  style,
}) => {
  const handleTextChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
    const newTextValue = event.target.value;
    onTextChange(newTextValue);
  };

  return (
    <textarea
      value={value}
      onChange={handleTextChange}
      placeholder={placeholder}
      style={{ height: height }}
      className={`w-full py-5 px-8 pt-2 pb-2 rounded-3xl border border-black border-solid font-secondary ${style}`}
    />
  );
};

export default TextArea;
