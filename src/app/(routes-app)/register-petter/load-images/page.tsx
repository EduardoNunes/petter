"use client";

import Header from "@/components/Header/Header";
import PetterColorful from "@/components/Petter/PetterColorful";
import FormLoadImages from "./FormLoadImage";
import { useRouter } from "next/router";
import { useEffect } from "react";
import redirectTo from "@/utils/RedirectTo";

export default function LoadImages() {
  const router = useRouter();

  useEffect(() => {
    redirectTo(router);
  }, []);

  return (
    <div className="flex flex-col items-center w-[90%] h-[84%]">
      <Header text={"Cadastro do Petter"} />
      <PetterColorful fontSize="extraLarge" />
      <p className="font-secondary font-bold text-medium text-center mt-[3%] mb-[5%]">
        Carregue as melhores
        <br />
        fotos do seu petter.
      </p>
      <FormLoadImages />
    </div>
  );
}
