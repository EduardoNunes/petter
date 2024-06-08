"use client";

import Button from "@/components/Button/Button";
import PetterColorful from "@/components/Petter/PetterColorful";
import TextArea from "@/components/TextArea/TextArea";
import { useStepContext } from "@/context/useStepContext";

export default function AboutPetter() {
  const { handleToAddCurrentStep } = useStepContext();

  return (
    <form onSubmit={handleToAddCurrentStep} className="w-[90%]">
      <PetterColorful fontSize={"extraLarge"} />
      <div className="flex flex-col items-center font-secondary mb-10">
        <p className="font-secondary">
          Agora é hora de nos contar sobre seu Petter.
        </p>
        <p className="font-secondary">O que ele gosta de fazer? </p>
        <p className="font-secondary">O que gosta de comer? </p>
        <p className="font-secondary">Tem alguma profissão? </p>
        <p className="font-secondary">Tem Petterzinhos? </p>
        <p className="font-secondary">Seja criativo!</p>
      </div>
      <TextArea />
      <div className="absolute w-[90%] bottom-[3%]">
        <Button text="Continuar" type="internalButton" />
      </div>
    </form>
  );
}
