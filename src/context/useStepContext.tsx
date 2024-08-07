"use client";

import { useRouter } from "next/navigation";
import React, { ReactNode, createContext, useContext, useState } from "react";

interface StepContextType {
  currentStep: number;
  setCurrentStep: React.Dispatch<React.SetStateAction<number>>;
  handleToAddCurrentStep: () => void;
  handleToDecreaseCurrentStep: () => void;
}

const StepContext = createContext<StepContextType | null>(null);

interface StepProviderProps {
  children: ReactNode;
}

export const StepProvider: React.FC<StepProviderProps> = ({ children }) => {
  const [currentStep, setCurrentStep] = useState(0);
  const router = useRouter();

  const handleToAddCurrentStep = () => {
    setCurrentStep((prevStep) => (prevStep < 4 ? prevStep + 1 : prevStep));
  };

  const handleToDecreaseCurrentStep = () => {
    if (currentStep === 0) {
      router.push("/login");
    }

    setCurrentStep((prevStep) => (prevStep > 0 ? prevStep - 1 : prevStep));
  };

  const contextValue: StepContextType = {
    currentStep,
    setCurrentStep,
    handleToAddCurrentStep,
    handleToDecreaseCurrentStep,
  };

  return (
    <StepContext.Provider value={contextValue}>{children}</StepContext.Provider>
  );
};

export const useStepContext = (): StepContextType => {
  const context = useContext(StepContext);
  if (!context) {
    throw new Error("useStepContext must be used within a StepProvider");
  }
  return context;
};
