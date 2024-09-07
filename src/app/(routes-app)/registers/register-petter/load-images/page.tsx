"use client";

import Header from "@/components/Header/Header";
import PetterColorful from "@/components/Petter/PetterColorful";
import FormLoadImages from "./FormLoadImage";
import { useEffect, useState } from "react";
import { getSession } from "next-auth/react";
import { useSelfContext } from "@/context/selfContext";
import Loading from "@/components/Loading/Loading";

interface PetterInfo {
  petterName: string;
}

export default function LoadImages() {
  const { loading, setLoading } = useSelfContext();
  const [petterName, setPetterName] = useState("");

  useEffect(() => {
    setLoading(false);
  }, []);

  useEffect(() => {
    const dataInfos = async () => {
      const session = await getSession();
      const petterInfo = session?.user.petterInfo as PetterInfo[];

      if (petterInfo) {
        setPetterName(petterInfo[0].petterName);
      }
    };

    dataInfos();
  }, []);

  return (
    <div className="flex flex-col items-center w-[90%] h-[100vh] pb-2">
      {loading && <Loading />}
      <div>
        <Header text={"Cadastro do Petter"} />
        <PetterColorful fontSize="extraLarge" />
        <p className="font-secondary font-bold text-medium text-center mt-2 mb-4">
          {`Carregue as melhores`}
          <br />
          {`fotos de ${petterName.split(" ")[0]}`}.
        </p>
      </div>
      <FormLoadImages />
    </div>
  );
}
