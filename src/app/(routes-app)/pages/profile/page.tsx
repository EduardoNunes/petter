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
import Image from "next/image";
import api from "@/server/api";
import { getSession } from "next-auth/react";

export default function Profile() {
  const { self, getSelf, loading, setLoading, isUser, visitantProfile } =
    useSelfContext();
  const {
    showImage,
    visitantSelected,
    loadPetterVisitantInfos,
    numberImagesGallery,
  } = useProfileContext();
  const [toast, setToast] = useState("");
  const [petterInfo, setPetterInfo] = useState<any>(null);
  const [isFollowing, setIsFollowing] = useState(false);
  const [isFollower, setIsFollower] = useState(false);
  const [followings, setFollowings] = useState(0);
  const [followers, setFollowers] = useState(0);
  const [imageArrow, setImageArrow] = useState("/images/proibited.png");
  const [arrowIndication, setArrowIndication] = useState("");
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

  useEffect(() => {
    async function getFollowerAndFollowed() {
      const session = await getSession();
      const token = session?.user.accessToken;

      if (!self.id || !self.PetterInfo) {
        console.error("User ID or Petter ID is missing");
        return;
      }

      const petterId = isUser
        ? self.PetterInfo && self.PetterInfo[0].id
        : visitantProfile;

      try {
        const response = await api.get(
          `follow-unfollow/follower-and-followed?petterId=${petterId}&petterUserId=${self.PetterInfo[0].id}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        setFollowings(response.data.followerCount);
        setFollowers(response.data.followedCount);
        setIsFollowing(response.data.isFollowed);
        setIsFollower(response.data.isFollower);

        if (response.data.isFollowed && response.data.isFollower) {
          setImageArrow("/images/trade.png");
          setArrowIndication("Vocês se seguem.");
        } else if (response.data.isFollower) {
          setImageArrow("/images/arrow-left.png");
          setArrowIndication("Este Petter te segue.");
        } else if (response.data.isFollowed) {
          setImageArrow("/images/arrow-right.png");
          setArrowIndication("Você segue este Petter.");
        } else {
          setImageArrow("/images/proibited.png");
          setArrowIndication("Ninguém se segue.");
        }
      } catch (error) {}
    }

    getFollowerAndFollowed();
  }, [handleFollow]);

  /* const handleClickGoEditProfile = () => {
    setLoading(true);
    router.push("edit-profile");
  }; */

  async function handleFollow() {
    const session = await getSession();
    const token = session?.user.accessToken;
    const newIsFollow = !isFollowing;
    setIsFollowing(newIsFollow);
    setFollowers((prev) => (newIsFollow ? prev + 1 : prev - 1));

    try {
      await api.post(
        "follow-unfollow/follow",
        {
          followerId: self?.PetterInfo?.[0]?.id,
          followedId: visitantProfile,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
    } catch (error) {
      console.error("Failed to follow/unfollow:", error);
    }
  }

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
          {/*           <button
            className="font-secondary text-smaller bg-azulPalido text-black py-1 px-3 rounded-lg"
            hidden={!isUser}
            onClick={handleClickGoEditProfile}
          >
            Editar Perfil
          </button> */}
          <div className="flex items-center gap-3">
            <Image
              src={imageArrow}
              width={20}
              height={20}
              alt="Profile Image"
              title={arrowIndication}
              hidden={isUser}
              className="object-cover w-[20px] h-[20px]"
            />
            <button
              className="font-secondary text-smaller"
              hidden={isUser}
              onClick={handleFollow}
            >
              <Image
                src={
                  isFollowing ? "/images/follow.png" : "/images/unfollow.png"
                }
                width={32}
                height={32}
                alt="Profile Image"
                className="object-cover w-[36px] h-[36px]"
              />
            </button>
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
