"use client";

import Header from "@/components/Header/Header";
import PetterColorful from "@/components/Petter/PetterColorful";
import FormLoadImages from "./FormLoadImage";
import InfosLoadImage from "./InfosLoadImage";

export default function LoadImages() {
  return (
    <div className="flex flex-col items-center w-[90%] h-[84%]">
      <Header text={"Cadastro do Petter"} />
      <PetterColorful fontSize="extraLarge" />
      <InfosLoadImage />
      <FormLoadImages />
    </div>
  );
}
