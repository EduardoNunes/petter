"use client";

import Header from "@/components/Header/Header";
import PetterColorful from "@/components/Petter/PetterColorful";
import FormInfosPetter from "./FormRegisterPetter";

export default function RegisterPetter() {
  return (
    <div className="flex flex-col items-center w-[90%] h-[84%]">
      <Header text={"Cadastro do Petter"} />
      <PetterColorful fontSize="extraLarge" />
      <p className="font-secondary text-small font-bold text-center mb-[3%]">
        Oba! mais um Petter com a gente!
        <br />
        Deixe-nos conhecê-lo!
      </p>
      <FormInfosPetter />
    </div>
  );
}
