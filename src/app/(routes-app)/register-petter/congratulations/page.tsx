"use client";

import Button from "@/components/Button/Button";
import Loading from "@/components/Loading/Loading";
import { getSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import "./color-fonte.css";

interface PetterInfo {
  petterName: string;
}

export default function Congratulations() {
  const [petterName, setPetterName] = useState("");
  const [loading, setLoading] = useState(false);
  const profileImage = "";

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

  const handleClickGoOn = () => {
    setLoading(true);
    router.replace("../home");
  };

  return (
    <div className="flex flex-col items-center justify-start h-[50%]">
      {loading && <Loading />}
      <div className="colorful">
        <p className="font-primary text-ultraLarge">Parabéns!</p>
      </div>
      <img src={profileImage} alt="" />
      <p className="font-secondary font-bold">
        {`Seja muito bem vind@, ${petterName.split(" ")[0]}`}!
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
