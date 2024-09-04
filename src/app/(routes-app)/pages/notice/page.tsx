"use client";

import Button from "@/components/Button/Button";
import CheckBox from "@/components/CheckBox/CheckBox";
import MessageToast from "@/components/Error/MessageToast";
import Header from "@/components/Header/Header";
import { Label } from "@/components/Label/Label";
import Loading from "@/components/Loading/Loading";
import Petter from "@/components/Petter/PetterColorful";
import { getSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function Notice() {
  const [name, setName] = useState("");
  const [toast, setToast] = useState("");
  const [checkedList, setCheckedList] = useState<boolean[]>([
    false,
    false,
    false,
    false,
    false,
  ]);
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const dataInfos = async () => {
      const session = await getSession();

      if (session && session.user.name) {
        setName(session?.user.name);
      }
    };

    dataInfos();
  }, []);

  const handleClickGoAhead = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    setLoading(true);

    if (checkedList.every((check) => check === true)) {
      router.push("/registers/register-petter/register-infos");
    } else {
      setLoading(false);
      setToast("Para prosseguir você deve ler e marcar todos os itens.");
    }
  };

  const handleClickCheck = (index: number) => {
    const newList = [...checkedList];
    newList[index] = !newList[index];
    setCheckedList(newList);
  };

  return (
    <div className="flex justify-center items-center w-full h-full">
      {toast && <MessageToast textError={toast} setToast={setToast} />}
      {loading && <Loading />}
      <div className="flex flex-col items-center justify-between w-[90%] h-full">
        <div>
          <Header text="Boas práticas" />
          <div className="flex flex-col items-center mb-6">
            <Petter fontSize="extraLarge" />
            <h2 className="font-secondary text-center text-big mb-1">{`Sinta-se em casa, ${
              name.split(" ")[0]
            }!`}</h2>
            <p className="font-secondary text-smaller text-center w-4/5">
              Leia e marque as políticas de boas práticas se deseja se juntar ao
              nosso universo Petter.
            </p>
            <hr className="w-4/5 mt-3" />
          </div>
        </div>
        <div className="flex flex-col overflow-auto">
          {[
            "Siga as boas práticas da casa.",
            "Cadastre Petters reais. Forneça apenas informações e imagens verdadeiras e autorais.",
            "Não forneça informações pessoais a usuários suspeitos.",
            "Respeite todos. Estamos todos em busca de boas amizades e boas experiências.",
            "Ajude a comunidade. Sempre denuncie maus comportamentos.",
            "Publique conteúdos onde somente os Petters são os protagonistas.",
          ].map((text, index) => (
            <Label key={index} labelHtmlFor={`checkbox-${index}`}>
              <div className="flex gap-5">
                <CheckBox
                  checked={checkedList[index]}
                  onChange={() => handleClickCheck(index)}
                  id={`checkbox-${index}`}
                />
                <p className="w-[90%] font-secondary mb-5">{text}</p>
              </div>
            </Label>
          ))}
        </div>

        <div className="w-full my-2">
          <Button
            text="Continuar"
            type="internalButton"
            onClick={handleClickGoAhead}
          />
        </div>
      </div>
    </div>
  );
}
