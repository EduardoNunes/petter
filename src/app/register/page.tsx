"use client";

import Header from "@/components/Header/Header";
import Petter from "@/components/Petter/Petter";
import InfosDataRegister from "./StepDataRegister/InfosDataRegister";
import FormRegister from "./StepDataRegister/FormRegister";
import InfosLoadImage from "./StepLoadImage/InfosLoadImage";
import LoadImages from "./StepLoadImage/FormLoadImage";
import AboutPetter from "./StepAboutPetter";
import { useStep } from "@/useHooks/useStepRegister";

export default function Register() {
  const { curretStep } = useStep({ number: 2 });

  return (
    <div className="flex flex-col justify-center w-[90%] h-[90%]">
      <div className="text-center">
        <Header text="Cadastro" />
      </div>
      <div className="flex flex-col items-center mb-[6%]">
        <Petter />
        {curretStep === 0 ? <InfosDataRegister /> : null}
        {curretStep === 1 ? <InfosLoadImage /> : null}
      </div>
      {curretStep === 0 ? <FormRegister /> : null}
      {curretStep === 1 ? <LoadImages /> : null}
      {curretStep === 2 ? <AboutPetter /> : null}
    </div>
  );
}
