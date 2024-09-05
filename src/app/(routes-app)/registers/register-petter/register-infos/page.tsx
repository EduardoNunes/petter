"use client";

import Header from "@/components/Header/Header";
import PetterColorful from "@/components/Petter/PetterColorful";
import { useRouter } from "next/navigation";
import FormInfosPetter from "./FormRegisterPetter";
import { useSelfContext } from "@/context/selfContext";
import { useEffect } from "react";
import Loading from "@/components/Loading/Loading";

export default function RegisterPetter() {
  const { loading, setLoading } = useSelfContext();
  const router = useRouter();

  useEffect(() => {
    setLoading(false);
  }, []);

  return (
    <div className="flex flex-col items-center w-[90%] h-full pb-2">
      {loading && <Loading />}
      <div>
        <Header text="Cadastro do Petter" />
        <PetterColorful fontSize="extraLarge" />
      </div>
      <div className="overflow-y-auto" style={{ height: "calc(100% - 132px)" }}>
        <p className="font-secondary text-small text-center mb-3">
          Oba! Mais um Petter com a gente!
          <br />
          Deixe-nos conhecê-lo!
        </p>
        <FormInfosPetter />
      </div>
    </div>
  );
}
