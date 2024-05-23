import "./checkbox-style.css";

interface CheckBoxPrpos {
  checked: boolean,
  onChange?: React.MouseEventHandler<HTMLInputElement>;
}

const CheckBox: React.FC<React.PropsWithChildren<CheckBoxPrpos>> = ({
  checked,
  onChange,
}) => {
  return (
    <input
      type="checkbox"
      className="custom-checkbox mt-[6px]"
      checked={checked}
      onChange={onChange}
    />
  );
};

export default CheckBox;
