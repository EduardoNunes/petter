import React, { ChangeEvent } from "react";

interface SelectProps {
  selectedOption: string;
  option1: string;
  option2: string;
  option3: string;
  option4: string;
  handleSelectChange: (event: ChangeEvent<HTMLSelectElement>) => void;
}

const Select: React.FC<SelectProps> = ({
  selectedOption,
  option1,
  option2,
  option3,
  option4,
  handleSelectChange,
}) => {
  return (
    <select
      id="selectOption"
      value={selectedOption}
      onChange={handleSelectChange}
      className="font-secondary"
    >
      <option value="" className="font-secondary">
        Selecione...
      </option>
      <option value="masculino" className="font-secondary">
        {option1}
      </option>
      <option value="feminino" className="font-secondary">
        {option2}
      </option>
      <option value={option3} className="font-secondary">
        {"outro"}
      </option>
      <option value="Prefiro não informar" className="font-secondary">
        {option4}
      </option>
    </select>
  );
};

export default Select;
