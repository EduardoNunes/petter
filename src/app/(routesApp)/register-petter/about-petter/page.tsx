"use client";

import Button from "@/components/Button/Button";
import PetterColorful from "@/components/Petter/PetterColorful";
import TextArea from "@/components/TextArea/TextArea";
import { useSelfContext } from "@/context/selfContext";
import { useStepContext } from "@/context/useStepContext";
import api from "@/server/api";
import { getItem } from "@/utils/localStorageUtils";
import { useEffect, useState } from "react";

export default function AboutPetter() {
  const { handleToAddCurrentStep } = useStepContext();
  const { self, getSelf } = useSelfContext();
  const [descriptionBio, setDescriptionBio] = useState<string>("");
  const [email, setEmail] = useState<string | null>(null);

  useEffect(() => {
    const storedEmail = getItem("email");
    if (storedEmail) {
      setEmail(storedEmail);
    }
  }, []);

  const handleTextChange = (text: string) => {
    setDescriptionBio(text);
  };

  async function onSubmit(e: { preventDefault: () => void }) {
    e.preventDefault();

    if (email) {
      getSelf(email);
    }
    /* try {
      const formData = new FormData();
      formData.append("descriptionBio", descriptionBio);
  
      const response = await api.patch(
        `/petter-infos/${petterId}/description-bio`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
  
      console.log("RESPONSE", response);     
      handleToAddCurrentStep();
    } catch (error) {
      console.error("ERROR", error);     
    } */
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
      <TextArea onTextChange={handleTextChange} />
      <div className="absolute w-[90%] bottom-[3%]">
        <Button text="Continuar" type="internalButton" />
      </div>
    </form>
  );
}
