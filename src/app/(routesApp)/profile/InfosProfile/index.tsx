import api from "@/server/api";
import { getItem } from "@/utils/localStorageUtils";
import Image from "next/image";
import { useEffect, useState } from "react";

interface PetterData {
  profileImage?: string;
}

export default function InfosProfile() {
  const publications = "12";
  const friends = "10";
  const [petterId, setPetterId] = useState<string>("");
  const [petterData, setPetterData] = useState<PetterData>({});

  useEffect(() => {
    const storedPetterId = getItem("petterId");
    if (storedPetterId) {
      setPetterId(storedPetterId);
    }
  }, []);

  useEffect(() => {
    async function loadProfileInfos() {
      try {
        const response = await api.get("petter-infos", {
          params: {
            petterId,
          },
        });

        console.log("RESPONSE", response.data);
        setPetterData(response.data);
      } catch (error) {
        console.log("ERRO", error);
      }
    }

    if (petterId) {
      loadProfileInfos();
    }
  }, [petterId]);

  return (
    <div className="flex items-center justify-between gap-4">
      <div className="relative w-24 h-24 ">
        <Image
          src={petterData.profileImage || ""}
          width={150}
          height={150}
          alt="Profile Image"
          className="object-cover w-full h-full rounded-full border-lime-950 border-solid border-[3px]"
        />
      </div>
      <div>
        <label className="font-secondary" htmlFor="text">
          Posts
        </label>
        <h2>{publications}</h2>
      </div>
      <div>
        <label className="font-secondary" htmlFor="text">
          Amigos
        </label>
        <h2>{friends}</h2>
      </div>
      <div className="w-[90px]">
        <div className="flex items-center h-8 gap-2">
          <Image
            src="/images/paw.png"
            width={32}
            height={32}
            alt="Profile Image"
            className="object-cover w-5 h-5"
          />
          <p className="font-secondary text-smaller">Canis familiaris</p>
        </div>
        <div className="flex items-center h-8 gap-2">
          <Image
            src="/images/paw.png"
            width={32}
            height={32}
            alt="Profile Image"
            className="object-cover w-5 h-5"
          />
          <p className="font-secondary text-smaller">SDR</p>
        </div>
      </div>
    </div>
  );
}
