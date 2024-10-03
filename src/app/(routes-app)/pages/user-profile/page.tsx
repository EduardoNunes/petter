"use client";

import MessageToast from "@/components/Error/MessageToast";
import Footer from "@/components/Footer/Footer";
import GalleryProfile from "@/components/GalleryProfile";
import HeaderProfile from "@/components/HeaderProfile";
import InfosProfile from "@/components/InfosProfile";
import Loading from "@/components/Loading/Loading";
import MaleOrFemale from "@/components/MaleOrFemale/MaleOrFemale";
import { useProfileContext } from "@/context/profileContext";
import { useSelfContext } from "@/context/selfContext";
import api from "@/server/api";
import { getSession } from "next-auth/react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useQuery } from "react-query";
import ShowImageModal from "../../../../components/Modals/ShowImageModal/ShowImageModal";
import { usePostImageContext } from "@/context/postImageContext";

export default function UserProfile() {
  const { self, getSelf, setLoading } = useSelfContext();
  const { showImage, numberImagesGallery } = useProfileContext();
  const { setTimelineOrGallery } = usePostImageContext();
  const [toast, setToast] = useState("");
  const [petterInfo, setPetterInfo] = useState<any>(null);
  const [followings, setFollowings] = useState(0);
  const [followers, setFollowers] = useState(0);

  const router = useRouter();
  const { data, isLoading } = useQuery("self", getSelf);

  useEffect(() => {
    setPetterInfo(data?.PetterInfo && data?.PetterInfo[0]);
  }, [data]);

  useEffect(() => {
    async function getFollowerAndFollowed() {
      setLoading(true);
      const session = await getSession();
      const token = session?.user.accessToken;

      if (!data?.id || !data?.PetterInfo) {
        console.error("User ID or Petter ID is missing");
        return;
      }

      const petterId = data?.PetterInfo && data?.PetterInfo[0].id;

      try {
        const response = await api.get(
          "/follow-unfollow/follower-and-followed/",
          {
            headers: { Authorization: `Bearer ${token}` },
            params: {
              petterId: petterId,
              petterUserId: data?.PetterInfo[0].id,
            },
          }
        );

        setFollowings(response.data.followerCount);
        setFollowers(response.data.followedCount);
      } catch (error) {
        console.log(error);
      }
      setLoading(false);
    }

    getFollowerAndFollowed();
  }, []);

  const addImageGallery = () => {
    setTimelineOrGallery("gallery")
    router.push("/pages/post");
  };

  return (
    <div className="flex flex-col w-[90%] h-full">
      {toast && <MessageToast textError={toast} setToast={setToast} />}
      {isLoading && <Loading />}
      {showImage && <ShowImageModal />}
      <div className="h-[327px] w-full">
        <HeaderProfile
          petterName={petterInfo?.petterName.split(" ")[0] || ""}
          isUser={true}
        />
        <InfosProfile
          profileImage={petterInfo?.profileImage || ""}
          petterKind={petterInfo?.petterKind || ""}
          petterBreed={petterInfo?.petterBreed || ""}
          followings={followings}
          followers={followers}
        />
        <h1 className="w-full h-28 my-2 font-secondary break-words overflow-y-auto">
          {petterInfo?.descriptionBio || ""}
        </h1>
        <div className="flex w-full justify-between items-center">
          <div className="flex items-center justify-center gap-2">
            <MaleOrFemale gender={petterInfo?.petterGender} />
            <h2 className="text-medium">{numberImagesGallery}</h2>
          </div>
          <button onClick={addImageGallery}>
            <Image
              src="/images/add-image.png"
              alt="Icone Adicionar Image"
              width={32}
              height={32}
              className="h-9 w-9"
            />
          </button>
        </div>
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
