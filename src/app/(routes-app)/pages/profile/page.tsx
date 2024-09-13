"use client";

import MessageToast from "@/components/Error/MessageToast";
import Footer from "@/components/Footer/Footer";
import Loading from "@/components/Loading/Loading";
import { useSelfContext } from "@/context/selfContext";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import GalleryProfile from "./GalleryProfile";
import HeaderProfile from "./HeaderProfile";
import InfosProfile from "./InfosProfile";
import { useProfileContext } from "@/context/profileContext";
import ShowImageModal from "../../../../components/Modals/ShowImageModal/ShowImageModal";

export default function Profile() {
  const { self, getSelf, loading, setLoading, isUser, visitantProfile } =
    useSelfContext();
  const { showImage, visitantSelected, loadPetterVisitantInfos } =
    useProfileContext();
  const [toast, setToast] = useState("");
  const [petterInfo, setPetterInfo] = useState<any>(null);
  const router = useRouter();

  useEffect(() => {
    getSelf();
  }, []);

  useEffect(() => {
    if (isUser) {
      setPetterInfo(self.PetterInfo && self.PetterInfo[0]);
    }
    if (!isUser) {
      setLoading(false);
      loadPetterVisitantInfos(visitantProfile);
    }
  }, [self, isUser]);

  useEffect(() => {
    setPetterInfo(visitantSelected);
  }, [visitantSelected]);

  const handleClickGoEditProfile = () => {
    setLoading(true);
    router.push("edit-profile");
  };

  return (
    <div className="flex flex-col w-[90%] h-full">
      {toast && <MessageToast textError={toast} setToast={setToast} />}
      {loading && <Loading />}
      {showImage && <ShowImageModal />}
      <div className="h-[327px] w-full">
        <HeaderProfile
          petterName={petterInfo?.petterName.split(" ")[0] || ""}
        />
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
          hidden={!isUser}
          onClick={handleClickGoEditProfile}
        >
          Editar Perfil
        </button>
      </div>
      <div className="h-[calc(100%-389px)]">
        {self.PetterInfo && (
          <GalleryProfile petterId={(petterInfo && petterInfo.id) || 0} />
        )}
      </div>
      <Footer />
    </div>
  );
}
