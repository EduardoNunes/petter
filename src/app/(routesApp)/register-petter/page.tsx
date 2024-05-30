"use client"

import Header from "@/components/Header/Header";
import PetterColorful from "@/components/Petter/PetterColorful";
import FormInfosPetter from "./FormRegisterPetter";
import InfosAboutPetter from "./InfosRegisterPetter";

export default function RegisterPetter() {
  return (
    <div className="flex flex-col items-center w-[90%] h-[84%]">
      <Header text={"Cadastro do Petter"}/>
      <PetterColorful fontSize="extraLarge" />
      <InfosAboutPetter />
      <FormInfosPetter />
    </div>
  );
}
