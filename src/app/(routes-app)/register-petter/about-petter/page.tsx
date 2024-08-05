"use client";

import Button from "@/components/Button/Button";
import PetterColorful from "@/components/Petter/PetterColorful";
import TextArea from "@/components/TextArea/TextArea";
import { useStepContext } from "@/context/useStepContext";
import api from "@/server/api";
import redirectTo from "@/utils/RedirectTo";
import { getSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function AboutPetter() {
  const { handleToAddCurrentStep } = useStepContext();
  const [descriptionBio, setDescriptionBio] = useState<string>("");
  const router = useRouter();

  useEffect(() => {
    redirectTo(router);
  }, []);

  const handleTextChange = (text: string) => {
    setDescriptionBio(text);
  };

  async function onSubmit(e: { preventDefault: () => void }) {
    e.preventDefault();
    const session = await getSession();

    if (!session || session.user.petterInfo.length === 0) {
      console.log("VC PRECISA ESTAR LOGADO");
      return;
    }

    const user = session.user.id;
    const petterInfoId = session.user.petterInfo;

    try {
      await api.patch(
        `/petter-infos/${user}/${petterInfoId}/description-bio`,
        {
          descriptionBio: descriptionBio,
        }
      );

      handleToAddCurrentStep();
      router.push("/register-petter/congratulations");
    } catch (error) {
      console.error("ERROR", error);
    }
  }

  return (
    <form onSubmit={onSubmit} className="w-[90%]">
      <PetterColorful fontSize={"extraLarge"} />
      <div className="flex flex-col items-center font-secondary mb-10">
        <p className="font-secondary">
          Agora é hora de nos contar sobre seu Petter.
        </p>
        <p className="font-secondary">O que ele gosta de fazer? </p>
        <p className="font-secondary">O que gosta de comer? </p>
        <p className="font-secondary">Tem alguma profissão? </p>
        <p className="font-secondary">Tem Petterzinhos? </p>
        <p className="font-secondary">Seja criativo!</p>
      </div>
      <TextArea
        onTextChange={handleTextChange}
        value={descriptionBio}
        placeholder={"Fale sobre seu Petter"}
        height="48"
      />
      <div className="absolute w-[90%] bottom-[3%]">
        <Button text="Continuar" type="internalButton" />
      </div>
    </form>
  );
}
