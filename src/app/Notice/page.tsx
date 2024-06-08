"use client";

import Button from "@/components/Button/Button";
import { Label } from "@/components/Label/Label";
import Petter from "@/components/Petter/PetterColorful";
import { useRouter } from "next/navigation";
import CheckBox from "@/components/CheckBox/CheckBox";
import { useState } from "react";
import ErrorWindow from "@/components/Error/ErrorWindown";
import Loading from "@/components/Loading/Loading";

export default function Notice() {
  const [error, setError] = useState("");
  const [checkedList, setCheckedList] = useState<boolean[]>([
    false,
    false,
    false,
    false,
    false,
  ]);
  const router = useRouter();
  const userName = localStorage.getItem("tutorName");
  const [loading, setLoading] = useState(false);

  const handleClickGoHome = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    setLoading(true);

    if (checkedList.every((check) => check === true)) {
      router.push("/register-petter/register-infos");
    } else {
      setLoading(false);
      setError("Leia e marque todos os itens.");
    }
  };

  const handleClickCheck = (index: number) => {
    const newList = [...checkedList];
    newList[index] = !newList[index];
    setCheckedList(newList);
  };

  return (
    <div className="flex justify-center items-center w-[100vw] h-[100vh]">
      {error && <ErrorWindow textError={error} setError={setError} />}
      {loading && <Loading />}
      <div className="flex flex-col items-center justify-around w-[90%] h-[70%]">
        <div className="flex flex-col items-center">
          <Petter fontSize="extraLarge" />
          <h2 className="font-secondary text-center text-big mb-5">{`Sinta-se em casa, ${userName}!`}</h2>
        </div>
        <div className="flex flex-col overflow-auto">
          {[
            "Siga as boas práticas da casa.",
            "Cadastre Petters reais. Forneça apenas informações e imagens verdadeiras.",
            "Não forneça informações pessoais a usuários suspeitos.",
            "Respeite todos. Estamos todos em busca de boas amizades e boas experiências.",
            "Ajude a comunidade. Sempre denuncie maus comportamentos.",
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
        <div className="absolute bottom-[6%] w-[90%]">
          <Button
            text="Continuar"
            type="internalButton"
            onClick={handleClickGoHome}
          />
        </div>
      </div>
    </div>
  );
}
