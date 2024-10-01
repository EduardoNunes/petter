"use client";

import MessageToast from "@/components/Error/MessageToast";
import Footer from "@/components/Footer/Footer";
import GalleryProfile from "@/components/GalleryProfile";
import HeaderProfile from "@/components/HeaderProfile";
import InfosProfile from "@/components/InfosProfile";
import Loading from "@/components/Loading/Loading";
import { useProfileContext } from "@/context/profileContext";
import { useSelfContext } from "@/context/selfContext";
import api from "@/server/api";
import { getSession } from "next-auth/react";
import { useEffect, useState } from "react";
import ShowImageModal from "../../../../components/Modals/ShowImageModal/ShowImageModal";

export default function UserProfile() {
  const { self, getSelf, loading, setLoading } = useSelfContext();
  const { showImage, numberImagesGallery } = useProfileContext();
  const [toast, setToast] = useState("");
  const [petterInfo, setPetterInfo] = useState<any>(null);
  const [followings, setFollowings] = useState(0);
  const [followers, setFollowers] = useState(0);

  useEffect(() => {
    getSelf();
  }, []);

  useEffect(() => {
    setPetterInfo(self.PetterInfo && self.PetterInfo[0]);
  }, [self]);

  useEffect(() => {
    async function getFollowerAndFollowed() {
      const session = await getSession();
      const token = session?.user.accessToken;

      if (!self.id || !self.PetterInfo) {
        console.error("User ID or Petter ID is missing");
        return;
      }

      const petterId = self.PetterInfo && self.PetterInfo[0].id;

      try {
        const response = await api.get(
          "/follow-unfollow/follower-and-followed/",
          {
            headers: { Authorization: `Bearer ${token}` },
            params: { petterId: petterId, petterUserId: self.PetterInfo[0].id },
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

  return (
    <div className="flex flex-col w-[90%] h-full">
      {toast && <MessageToast textError={toast} setToast={setToast} />}
      {loading && <Loading />}
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
            <h2 className="text-medium">{numberImagesGallery}</h2>
          </div>
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
