"use client";

import Footer from "@/components/Footer/Footer";
import { useSelfContext } from "@/context/selfContext";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import GalleryProfile from "./GalleryProfile";
import HeaderProfile from "./HeaderProfile";
import InfosProfile from "./InfosProfile";
import Loading from "@/components/Loading/Loading";

export default function Profile() {
  const { self, getSelf, loading, setLoading } = useSelfContext();
  const router = useRouter();

  const handleClickGoEditProfile = () => {
    setLoading(true);
    router.push("edit-profile");
  };

  useEffect(() => {
    setLoading(false);
  }, []);

  useEffect(() => {
    getSelf();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const petterInfo = self.PetterInfo && self.PetterInfo[0];

  return (
    <div className="flex flex-col w-[90%] h-full">
      {loading && <Loading />}
      <div className="h-[327px] w-full">
        <HeaderProfile petterName={petterInfo?.petterName || ""} />
        <InfosProfile
          profileImage={petterInfo?.profileImage || ""}
          petterKind={petterInfo?.petterKind || ""}
          petterBreed={petterInfo?.petterBreed || ""}
        />
        <h1 className="w-full h-28 my-2 font-secondary break-words overflow-y-auto">
          {petterInfo?.descriptionBio || ""}
        </h1>
        <button
          className="font-secondary text-smaller bg-azulPalido text-black py-1 px-3 rounded-lg mb-3"
          onClick={handleClickGoEditProfile}
        >
          Editar Perfil
        </button>
      </div>
      <div className="overflow-auto h-[calc(100%-389px)]">
        {self.PetterInfo && (
          <GalleryProfile petterId={(petterInfo && petterInfo.id) || 0} />
        )}
      </div>
      <Footer />
    </div>
  );
}
