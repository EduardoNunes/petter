"use client";

import Footer from "@/components/Footer/Footer";
import { useSelfContext } from "@/context/selfContext";
import { getItem } from "@/utils/localStorageUtils";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import GalleryProfile from "./GalleryProfile";
import HeaderProfile from "./HeaderProfile";
import InfosProfile from "./InfosProfile";

interface PetterInfoType {
  id: number;
  petterName: string;
  petterKind: string;
  petterBreed: string;
  petterBirth: string;
  userId: number;
  profileImage: string;
  descriptionBio: string;
}

export default function Profile() {
  const { self, getSelf, emailLogged, setEmailLogged } = useSelfContext();
  const [data, setData] = useState<PetterInfoType | null>(null);
  const router = useRouter();

  const handleClickGoEditProfile = () => {
    router.push("edit-profile");
  };

  useEffect(() => {
    const email = getItem("email");
    if (email) {
      setEmailLogged(email);
    }
  }, []);

  useEffect(() => {
    if (emailLogged) {
      getSelf();
    }
  }, [emailLogged]);

  useEffect(() => {
    if (self.PetterInfo && self.PetterInfo.length > 0) {
      const firstPetterInfo = self.PetterInfo[0] as PetterInfoType;
      setData(firstPetterInfo);
    }
  }, [self.PetterInfo]);

  return (
    <div className="flex items-center w-[90%] h-[100%]">
      <HeaderProfile petterName={data?.petterName ?? ""} />
      <div className="h-[84%] w-full">
        <div className="h-[250px]">
          <InfosProfile
            profileImage={data?.profileImage ?? ""}
            petterKind={data?.petterKind ?? ""}
            petterBreed={data?.petterBreed ?? ""}
          />
          <h1 className="h-28 py-2 font-secondary">
            {data?.descriptionBio ?? ""}
          </h1>
          <button
            className="font-secondary text-smaller bg-azulPalido text-black py-1 px-3 rounded-lg mb-3"
            onClick={handleClickGoEditProfile}
          >
            Editar Perfil
          </button>
        </div>
        <div className="overflow-auto h-[calc(100%-250px)]">
          {data && <GalleryProfile petterId={data.id} />}
        </div>
      </div>
      <Footer />
    </div>
  );
}
