"use client";

import MessageToast from "@/components/Error/MessageToast";
import Footer from "@/components/Footer/Footer";
import Loading from "@/components/Loading/Loading";
import { useProfileContext } from "@/context/profileContext";
import { useSelfContext } from "@/context/selfContext";
import api from "@/server/api";
import { getSession } from "next-auth/react";
import Image from "next/image";
import { useEffect, useState } from "react";
import ShowImageModal from "../../../../components/Modals/ShowImageModal/ShowImageModal";
import HeaderProfile from "@/components/HeaderProfile";
import InfosProfile from "@/components/InfosProfile";
import GalleryProfile from "@/components/GalleryProfile";
import { useQuery } from "react-query";
import MaleOrFemale from "@/components/MaleOrFemale/MaleOrFemale";

export default function visitantProfile() {
  const { self, visitantProfile, setLoading } = useSelfContext();
  const { showImage, loadPetterVisitantInfos, numberImagesGallery } =
    useProfileContext();
  const [toast, setToast] = useState("");
  const [petterVisitantInfo, setPetterVisitantInfo] = useState<any>(null);
  const [isFollowing, setIsFollowing] = useState(false);
  const [isFollower, setIsFollower] = useState(false);
  const [followings, setFollowings] = useState(0);
  const [followers, setFollowers] = useState(0);
  const [imageArrow, setImageArrow] = useState("/images/proibited.png");

  const { data, isLoading } = useQuery(
    ["visitantProfile", visitantProfile],
    () => loadPetterVisitantInfos(visitantProfile)
  );

  useEffect(() => {
    setPetterVisitantInfo(data);
  }, [data]);

  useEffect(() => {
    setLoading(true);
    async function getFollowerAndFollowed() {
      const session = await getSession();
      const token = session?.user.accessToken;

      if (!self.id || !self.PetterInfo) {
        console.error("Falta user Id ou Petter ID");
        return;
      }

      try {
        const response = await api.get(
          "/follow-unfollow/follower-and-followed/",
          {
            headers: { Authorization: `Bearer ${token}` },
            params: {
              petterId: visitantProfile,
              petterUserId: self.PetterInfo[0].id,
            },
          }
        );

        setFollowings(response.data.followerCount);
        setFollowers(response.data.followedCount);
        setIsFollowing(response.data.isFollowed);
        setIsFollower(response.data.isFollower);

        if (response.data.isFollowed && response.data.isFollower) {
          setImageArrow("/images/trade.png");
        } else if (response.data.isFollower) {
          setImageArrow("/images/arrow-left.png");
        } else if (response.data.isFollowed) {
          setImageArrow("/images/arrow-right.png");
        } else {
          setImageArrow("/images/proibited.png");
        }
      } catch (error) {
        console.log(error);
      }
      setLoading(false);
    }

    getFollowerAndFollowed();
  }, []);

  async function handleFollow() {
    const newIsFollow = !isFollowing;

    if (newIsFollow && isFollower) {
      setImageArrow("/images/trade.png");
    } else if (isFollower) {
      setImageArrow("/images/arrow-left.png");
    } else if (newIsFollow) {
      setImageArrow("/images/arrow-right.png");
    } else {
      setImageArrow("/images/proibited.png");
    }

    setIsFollowing(newIsFollow);
    setFollowers((prev) => (newIsFollow ? prev + 1 : prev - 1));

    const session = await getSession();
    const token = session?.user.accessToken;

    try {
      await api.post(
        "/follow-unfollow/follow",
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
      {isLoading && <Loading />}
      {showImage && <ShowImageModal />}
      <div className="h-[327px] w-full">
        <HeaderProfile
          petterName={petterVisitantInfo?.petterName.split(" ")[0] || ""}
          isUser={false}
        />
        <InfosProfile
          profileImage={petterVisitantInfo?.profileImage || ""}
          petterKind={petterVisitantInfo?.petterKind || ""}
          petterBreed={petterVisitantInfo?.petterBreed || ""}
          followings={followings}
          followers={followers}
        />
        <h1 className="w-full h-28 my-2 font-secondary break-words overflow-y-auto">
          {petterVisitantInfo?.descriptionBio || ""}
        </h1>
        <div className="flex w-full justify-between items-center">
          <div className="flex items-center justify-center gap-2">
            <MaleOrFemale gender={petterVisitantInfo?.petterGender} />
            <h2 className="text-medium">{numberImagesGallery}</h2>
          </div>
          <div className="flex items-center gap-3">
            <Image
              src={imageArrow}
              width={20}
              height={20}
              alt="Profile Image"
              className="object-cover w-[20px] h-[20px]"
            />
            <button
              className="font-secondary text-smaller"
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
      <div className="h-[calc(100%-389px)] overflow-y-auto">
        {self.PetterInfo && (
          <GalleryProfile
            petterId={(petterVisitantInfo && petterVisitantInfo.id) || 0}
          />
        )}
      </div>
      <Footer />
    </div>
  );
}
