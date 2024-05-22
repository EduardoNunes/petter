import "./checkbox-style.css";

interface CheckBoxPrpos {
  onClick?: React.MouseEventHandler<HTMLInputElement>;
}

const CheckBox: React.FC<React.PropsWithChildren<CheckBoxPrpos>> = ({
  onClick,
}) => {
  return <input type="checkbox" className="custom-checkbox mt-[6px]" />;
};

export default CheckBox;
