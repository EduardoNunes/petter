import { ReactNode } from "react";

type LabelProps = {
  labelHtmlFor: string;
  children: ReactNode;
};

export const Label = ({ labelHtmlFor, children }: LabelProps) => {
  return (
    <label htmlFor={labelHtmlFor} className="font-secondary">
      {children}
    </label>
  );
};
