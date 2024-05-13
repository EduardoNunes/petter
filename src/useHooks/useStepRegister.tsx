import { useState } from "react";

type useStepProps = {
  number: number;
};

export const useStep = ({ number }: useStepProps) => {
  const [curretStep, setCurrentStep] = useState<number>(2);

  const handleToAddCurretStep = () => {
    if (curretStep < number) {
      return setCurrentStep(curretStep + 1);
    }
    return;
  };

  const handleToDecreaseCurretStep = () => {
    if (curretStep === 0) {
      return setCurrentStep(curretStep - 1);
    }
    return;
  };

  return {
    curretStep,
    handleToAddCurretStep,
    handleToDecreaseCurretStep,
  };
};
