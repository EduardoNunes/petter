"use client";

import Button from "@/components/Button/Button";
import TextArea from "@/components/TextArea/TextArea";

export default function AboutPetter() {
  return (
    <>
      <>
        <div className="flex flex-col items-center font-secondary mb-10">
          <p className="font-secondary">
            Agora é hora de nos contar sobre seu Petter.
          </p>
          <p className="font-secondary">O que ele gosta de fazer? </p>
          <p className="font-secondary">O que gosta de comer? </p>
          <p className="font-secondary">Tem alguma profissão? </p>
          <p className="font-secondary">Tem Peterzinhos? </p>
          <p className="font-secondary">Seja criativo!</p>
        </div>
      </>
      <TextArea />
      <div className="absolute w-[90%] bottom-[3%]">
        <Button text="Continuar" type="internalButton" />
      </div>
    </>
  );
}
