"use client";

import Header from "@/components/Header/Header";
import Petter from "@/components/Petter/PetterColorful";
import { useSelfContext } from "@/context/selfContext";
import FormUserRegisterCredentials from "./FormUserRegisterCredentials";
import InfosUserRegisterCredentials from "./InfosUserRegisterCredentials";
import Loading from "@/components/Loading/Loading";
import { useEffect } from "react";

export default function RegisterUserCredentials() {
  const { loading, setLoading } = useSelfContext();

  useEffect(() => {
    setLoading(false);
  }, []);

  return (
    <div className="flex flex-col w-[90%] h-full overflow-hidden">
      {loading && <Loading />}
      <Header showArrow={true} text="Cadastro do tutor" />
      <Petter fontSize="extraLarge" />

      <div className="flex flex-col w-full h-full mb-2 gap-4 overflow-y-auto">
        <InfosUserRegisterCredentials />
        <FormUserRegisterCredentials />
      </div>
    </div>
  );
}
