"use client";

import Header from "@/components/Header/Header";
import Petter from "@/components/Petter/PetterColorful";
import InfosUserRegisterCredentials from "./InfosUserRegisterCredentials";
import FormUserRegisterCredentials from "./FormUserRegisterCredentials";

export default function RegisterUserCredentials() {
  return (
    <div className="flex flex-col w-[90%] h-full">
      <Header showArrow={true} text="Cadastro do tutor" />
      <Petter fontSize="extraLarge" />

      <div className="flex flex-col w-full mb-2 overflow-y-auto">
        <InfosUserRegisterCredentials />
        <FormUserRegisterCredentials />
      </div>
    </div>
  );
}
