"use client";

import Header from "@/components/Header/Header";
import Petter from "@/components/Petter/Petter";
import { useStepContext } from "@/context/useStepContext";
import { useEffect } from "react";
import AboutPetter from "./StepAboutPetter";
import Congratulations from "./StepCongratulations";
import FormRegister from "./StepDataRegister/FormRegister";
import InfosDataRegister from "./StepDataRegister/InfosDataRegister";
import LoadImages from "./StepLoadImage/FormLoadImage";
import InfosLoadImage from "./StepLoadImage/InfosLoadImage";

export default function Register() {
  const { currentStep } = useStepContext();

  useEffect(() => {
    console.log("currentStep atualizado:", currentStep);
  }, [currentStep]);

  return (
    <div className="flex flex-col justify-center w-[90%] h-[90%]">
      <div className="text-center">
        <Header text="Cadastro" />
      </div>
      <div className="flex flex-col items-center mb-[6%]">
        <Petter />
        {currentStep === 0 && <InfosDataRegister />}
        {currentStep === 1 && <InfosLoadImage />}
      </div>
      {currentStep === 0 && <FormRegister />}
      {currentStep === 1 && <LoadImages />}
      {currentStep === 2 && <AboutPetter />}
      {currentStep === 3 && <Congratulations />}
    </div>
  );
}
