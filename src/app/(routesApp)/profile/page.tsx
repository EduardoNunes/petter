"use client";

import Footer from "@/components/Footer/Footer";
import Bio from "./Bio";
import GalleryProfile from "./GalleryProfile";
import HeaderProfile from "./HeaderProfile";
import InfosProfile from "./InfosProfile";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { getItem } from "@/utils/localStorageUtils";
import api from "@/server/api";

export default function Profile() {
  const [imageSrc, setImageSrc] = useState<string[]>([]);
  const router = useRouter();
  const petterId = getItem("petterId");

  useEffect(() => {
   /*  async function loadImagesProfile() {
      try {
        const response = await api.get(
          `show-images-profile/top-20-images?petterId=${petterId}`
        );

        console.log("RESPONSE", response.data);
        setImageSrc(response.data);
      } catch (error) {
        console.log("Deu ruim em carregar imagens da grade do perfil", error);
      }
    }

    loadImagesProfile(); */
  }, [petterId]);

  useEffect(() => {
  /*   async function loadInfosProfile() {
      try {
        const response = await api.get(
          ``
        )
      } catch (error) {
        console.log("Deu ruim em carregar informações do perfil", error);
      }
    } */
  }, [petterId]);

  const handleClickGoEditProfile = () => {
    router.push("edit-profile");
  };

  return (
    <div className="flex items-center w-[90%] h-[100%]">
      <HeaderProfile />
      <div className="h-[84%] w-full">
        <div className="h-[250px]">
          <InfosProfile />
          <Bio />
          <button
            className="font-secondary text-smaller bg-azulPalido text-black py-1 px-3 rounded-lg mb-3"
            onClick={handleClickGoEditProfile}
          >
            Editar Perfil
          </button>
        </div>
        <div className="overflow-auto h-[calc(100%-250px)]">
          <GalleryProfile imageSrc={imageSrc} />
        </div>
      </div>
      <Footer />
    </div>
  );
}
