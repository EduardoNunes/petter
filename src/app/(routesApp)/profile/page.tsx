"use client";

import Footer from "@/components/Footer/Footer";
import { useRouter } from "next/navigation";
import GalleryProfile from "./GalleryProfile";
import HeaderProfile from "./HeaderProfile";
import InfosProfile from "./InfosProfile";
import { useSelfContext } from "@/context/selfContext";

export default function Profile() {
  const { selfPetter } = useSelfContext();
  const router = useRouter();

  const handleClickGoEditProfile = () => {
    router.push("edit-profile");
  };

  return (
    <div className="flex items-center w-[90%] h-[100%]">
      <HeaderProfile />
      <div className="h-[84%] w-full">
        <div className="h-[250px]">
          <InfosProfile />
          <h1 className="h-28 py-2 font-secondary">
            {selfPetter.descriptionBio}
          </h1>
          <button
            className="font-secondary text-smaller bg-azulPalido text-black py-1 px-3 rounded-lg mb-3"
            onClick={handleClickGoEditProfile}
          >
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
