import React, { useState, ChangeEvent } from "react";

export default function TextArea() {
  const [textValue, setTextValue] = useState("");

  const handleTextChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
    setTextValue(event.target.value);
  };

  return (
    <textarea
      value={textValue}
      onChange={handleTextChange}
      placeholder="Fale sobre seu petter"
      className="h-[200px] w-full p-5 pt-2 pb-2 rounded-3xl border border-black border-solid font-secondary"
    />
  );
}
