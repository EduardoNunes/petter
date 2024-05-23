import React, { ChangeEvent } from "react";

interface SelectProps {
  selectedOption: string;
  handleSelectChange: (event: ChangeEvent<HTMLSelectElement>) => void;
}

const Select: React.FC<SelectProps> = ({
  selectedOption,
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
      <option value="option1" className="font-secondary">
        Masculino
      </option>
      <option value="option2" className="font-secondary">
        Feminino
      </option>
      <option value="option3" className="font-secondary">
        Outro
      </option>
      <option value="option4" className="font-secondary">
        Prefiro não informar.
      </option>
    </select>
  );
};

export default Select;
