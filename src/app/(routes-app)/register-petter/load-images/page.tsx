"use client";

import Header from "@/components/Header/Header";
import PetterColorful from "@/components/Petter/PetterColorful";
import FormLoadImages from "./FormLoadImage";
import { useEffect, useState } from "react";
import { refreshSession } from "@/utils/refreshSession";

export default function LoadImages() {
  const [petterName, setPetterName] = useState("");

  useEffect(() => {
    const dataInfos = async () => {
      const session = await refreshSession();
      if (session) {
        setPetterName(session?.petterInfo[0].petterName);
      }
    };

    dataInfos();
  }, []);

  return (
    <div className="flex flex-col items-center w-[90%] h-[84%]">
      <Header text={"Cadastro do Petter"} />
      <PetterColorful fontSize="extraLarge" />
      <p className="font-secondary font-bold text-medium text-center mt-[3%] mb-[5%]">
        {`Carregue as melhores`}
        <br />
        {`fotos de ${petterName.split(" ")[0]}`}.
      </p>
      <FormLoadImages />
    </div>
  );
}
