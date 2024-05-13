"use client";

import Button from "@/components/Button/Button";
import TextArea from "@/components/TextArea/TextArea";

export default function AboutPetter() {
  return (
    <>
      <>
        <p className="font-secondary pl-4 mb-4">
          Nos conte sobre seu Petter. <br />
          O que ele gosta de fazer? <br />
          O que gosta de comer? <br />
          Tem alguma profissão? <br />
          Tem Peterzinhos? <br />
        </p>
      </>
      <TextArea />
      <div className="absolute w-[90%] bottom-[3%]">
        <Button text="Continuar" type="internalButton" />
      </div>
    </>
  );
}
