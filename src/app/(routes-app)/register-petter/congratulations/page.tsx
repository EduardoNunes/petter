"use client";

import Button from "@/components/Button/Button";
import { useRouter } from "next/navigation";
import "./color-fonte.css";

export default function Congratulations() {
  const profileImage = "";
  const router = useRouter();

  const handleClickGoOn = () => {
    router.push("../home");
  };

  return (
    <div className="flex flex-col items-center justify-start h-[50%]">
      <div className="colorful">
        <p className="font-primary text-ultraLarge">Parabéns!</p>
      </div>
      <img src={profileImage} alt="" />
      <p className="font-secondary font-bold">
        {`Seja muito bem vind@, ${"AJUSTAR"}`}
        !
      </p>
      <p className="font-secondary font-bold">
        Agora você é um Petter de verdade!
      </p>
      <p className="font-secondary text-center">
        <br />
        Vamos conhecer o mundo dos <br />
        Petters e fazer amigos?
      </p>

      <div className="absolute w-[90%] bottom-[3%]">
        <div onClick={handleClickGoOn}>
          <Button text="Vamos lá!" type="internalButton" />
        </div>
      </div>
    </div>
  );
}
