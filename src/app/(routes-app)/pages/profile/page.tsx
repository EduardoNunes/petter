"use client";

import Footer from "@/components/Footer/Footer";
import { useSelfContext } from "@/context/selfContext";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import GalleryProfile from "./GalleryProfile";
import HeaderProfile from "./HeaderProfile";
import InfosProfile from "./InfosProfile";

export default function Profile() {
  const { self, getSelf } = useSelfContext();
  const router = useRouter();

  const handleClickGoEditProfile = () => {
    router.push("edit-profile");
  };

  useEffect(() => {
    getSelf();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const petterInfo = self.PetterInfo && self.PetterInfo[0];

  return (
    <div className="flex items-center w-[90%] h-[100%]">
      <HeaderProfile petterName={petterInfo?.petterName || ""} />
      <div className="h-[84%] w-full">
        <div className="h-[250px]">
          <InfosProfile
            profileImage={petterInfo?.profileImage || ""}
            petterKind={petterInfo?.petterKind || ""}
            petterBreed={petterInfo?.petterBreed || ""}
          />
          <h1 className="h-28 py-2 font-secondary">
            {petterInfo?.descriptionBio || ""}
          </h1>
          <button
            className="font-secondary text-smaller bg-azulPalido text-black py-1 px-3 rounded-lg mb-3"
            onClick={handleClickGoEditProfile}
          >
            Editar Perfil
          </button>
        </div>
        <div className="overflow-auto h-[calc(100%-250px)]">
          {self.PetterInfo && (
            <GalleryProfile petterId={(petterInfo && petterInfo.id) || 0} />
          )}
        </div>
      </div>
      <Footer />
    </div>
  );
}
