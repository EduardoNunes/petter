"use client"

import Footer from "@/components/Footer/Footer";
import Bio from "./Bio";
import GalleryProfile from "./GalleryProfile";
import HeaderProfile from "./HeaderProfile";
import InfosProfile from "./InfosProfile";
import { useRouter } from "next/navigation";

export default function Profile() {
  const router = useRouter();

  const handleClickGoEditProfile = () => {
    router.push("edit-profile")
  }

  return (
    <div className="flex items-center w-[90%] h-[100%]">
      <HeaderProfile />
      <div className="h-[84%] w-full">
        <div className="h-[250px]">
          <InfosProfile />
          <Bio />
          <button className="font-secondary text-smaller bg-azulPalido text-black py-1 px-3 rounded-lg mb-3" onClick={handleClickGoEditProfile}>
            Editar Perfil
          </button>
        </div>
        <div className="overflow-auto h-[calc(100%-250px)]">
          <GalleryProfile />
        </div>
      </div>
      <Footer />
    </div>
  );
}
