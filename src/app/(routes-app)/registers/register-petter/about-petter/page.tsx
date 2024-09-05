"use client";

import Button from "@/components/Button/Button";
import errorResponse from "@/components/Error/ErrorResponse";
import MessageToast from "@/components/Error/MessageToast";
import Header from "@/components/Header/Header";
import Loading from "@/components/Loading/Loading";
import PetterColorful from "@/components/Petter/PetterColorful";
import TextArea from "@/components/TextArea/TextArea";
import { useStepContext } from "@/context/useStepContext";
import api from "@/server/api";
import { schemaAboutPetter } from "@/validation/schemaAboutPetter";
import { getSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

interface PetterInfo {
  petterName: string;
  id: number;
}

export default function AboutPetter() {
  const { handleToAddCurrentStep } = useStepContext();
  const [descriptionBio, setDescriptionBio] = useState<string>("");
  const [petterName, setPetterName] = useState("");
  const [loading, setLoading] = useState(false);
  const [toast, setToast] = useState("");
  const [caracteres, setCaracteres] = useState(355);

  const router = useRouter();

  useEffect(() => {
    const dataInfos = async () => {
      const session = await getSession();
      const petterInfo = session?.user.petterInfo as PetterInfo[];

      if (session) {
        setPetterName(petterInfo[0].petterName);
      }
    };

    dataInfos();
  }, []);

  async function onSubmit(e: { preventDefault: () => void }) {
    e.preventDefault();
    setLoading(true);
    const session = await getSession();

    const user = session?.user.id;
    const token = session?.user.accessToken;
    const petterInfoId = session?.user.petterInfo as PetterInfo[];

    try {
      await schemaAboutPetter.validate(
        {
          descriptionBio,
        },
        { abortEarly: false }
      );

      await api.patch(
        `/petter-infos/${user}/${petterInfoId[0].id}/description-bio`,
        {
          descriptionBio: descriptionBio,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      handleToAddCurrentStep();
      router.replace("/registers/register-petter/congratulations");
    } catch (error: any) {
      setLoading(false);
      const response = errorResponse(error);
      setToast(response);
    }
    setLoading(false);
  }

  const handleTextChange = (text: string) => {
    if (text.length <= 355) {
      setDescriptionBio(text);
      setCaracteres(355 - text.length);
    } else {
      setToast("Número máximo de caracteres atingido.");
    }
  };

  return (
    <form onSubmit={onSubmit} className="w-[90%] h-full pb-2">
      {toast && <MessageToast textError={toast} setToast={setToast} />}
      {loading && <Loading />}
      <div
        className="flex flex-col pb-4"
        style={{ height: "calc(100% - 40px)" }}
      >
        <div>
          <Header text="Fale sobre seu Petter" />
          <PetterColorful fontSize={"extraLarge"} />
        </div>
        <div className="overflow-y-auto" style={{ height: "calc(100% - 172px)" }}>
          <div>
            <div className="flex flex-col items-center font-secondary mb-2">
              <p className="font-secondary">
                {`Agora é hora de nos contar sobre ${petterName.split(" ")[0]}`}
                .
              </p>
              <p className="font-secondary">{`O que ${
                petterName.split(" ")[0]
              } gosta de fazer?`}</p>
              <p className="font-secondary">{`O que ${
                petterName.split(" ")[0]
              } gosta de comer?`}</p>
              <p className="font-secondary">{`${
                petterName.split(" ")[0]
              } tem alguma profissão?`}</p>
              <p className="font-secondary">{`${
                petterName.split(" ")[0]
              } tem Petterzinhos?`}</p>
              <p className="font-secondary">{`Seja criativo!`}</p>
            </div>
          </div>
          <div style={{ height: "calc(100% - 152px)" }}>
            {<p>{caracteres}</p>}
            <TextArea
              onTextChange={handleTextChange}
              value={descriptionBio}
              placeholder={"Fale sobre seu Petter"}
              height="80%"
            />
          </div>
        </div>
      </div>
      <div className="w-full">
        <Button text="Continuar" type="internalButton" />
      </div>
    </form>
  );
}
