import "./checkbox-style.css";

interface CheckBoxPrpos {
  checked: boolean,
  onChange?: React.ChangeEventHandler<HTMLInputElement>;
  id?: string;
}

const CheckBox: React.FC<React.PropsWithChildren<CheckBoxPrpos>> = ({
  checked,
  onChange,
  id,
}) => {
  return (
    <input
      type="checkbox"
      className="custom-checkbox mt-[6px]"
      checked={checked}
      onChange={onChange}
      id={id}
    />
  );
};

export default CheckBox;
