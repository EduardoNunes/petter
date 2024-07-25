import { useSelfContext } from "@/context/selfContext";
import { getItem } from "@/utils/localStorageUtils";
import Image from "next/image";
import { useEffect, useState } from "react";

interface PetterData {
  profileImage?: string;
  petterBreed?: string;
  petterKind?: string;
}

export default function InfosProfile() {
  const { getSelfPetter, selfPetter } = useSelfContext();
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
    if (petterId) {
      getSelfPetter(Number(petterId));
    }
  }, [petterId]);

  return (
    <div className="flex items-center justify-between gap-4">
      <div className="relative w-24 h-24 ">
        <Image
          src={selfPetter.profileImage || "/images/default-profile.png"}
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
      <div className="w-[30%]">
        <div className="flex items-center h-8 gap-2 ">
          <Image
            src="/images/paw.png"
            width={32}
            height={32}
            alt="Profile Image"
            className="object-cover w-5 h-5"
          />
          <p className="font-secondary text-smaller truncate">
            {selfPetter.petterBreed}
          </p>
        </div>
        <div className="flex items-center h-8 gap-2">
          <Image
            src="/images/paw.png"
            width={32}
            height={32}
            alt="Profile Image"
            className="object-cover w-5 h-5"
          />
          <p className="font-secondary text-smaller truncate">
            {selfPetter.petterKind}
          </p>
        </div>
      </div>
    </div>
  );
}
