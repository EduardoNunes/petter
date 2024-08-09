"use client";

import FooterCard from "./FooterCard/FooterCard";
import { useEffect, useState } from "react";
import api from "@/server/api";
import Image from "next/image";
import { useTimeLineContext } from "@/context/timeLineContext";
import { getSession } from "next-auth/react";
import Loading from "@/components/Loading/Loading";
import errorResponse from "@/components/Error/ErrorResponse";
import MessageToast from "@/components/Error/MessageToast";

interface ImageType {
  id: number;
  url: string;
  description: string;
  likesCount: number;
  commentsCount: number;
  Like: Array<any>;
}

interface PetterInfo {
  petterName: string;
  id: number;
}

export default function Card() {
  const [imageSrc, setImageSrc] = useState<ImageType[]>([]);
  const {
    handleClickLikeFunction,
    likesCount,
    likesCountId,
    commentsCount,
    likedByMe,
    handleClickShowComment,
    setTimelineImageId,
  } = useTimeLineContext();
  const [loading, setLoading] = useState(true);
  const [toast, setToast] = useState("");
  const [petterLoggedId, setPetterLoggedId] = useState<number | undefined>(undefined) ;

  useEffect(() => {
    async function loadTimeline() {
      const session = await getSession();
      const token = session?.user.accessToken;
      const petterInfoId = session?.user.petterInfo as PetterInfo[];

      setPetterLoggedId(petterInfoId[0].id)

      try {
        const response = await api.get("show-card-timeline/top-10-images", {
          headers: { Authorization: `Bearer ${token}` },
        });

        const images = response.data.top10ImagesWithCounts;

        setImageSrc(images);
      } catch (error: any) {
        const response = errorResponse(error);
        setLoading(false);
        setToast(response);
      }
      setLoading(false);
    }
    loadTimeline();
  }, [likesCount, likesCountId, commentsCount, likedByMe]);

  const handleClickLike =
    (id: number) => (e: React.MouseEvent<HTMLButtonElement>) => {
      e.preventDefault();
      handleClickLikeFunction(id, "timeline");
    };

  const handleClickComment =
    (id: number) => (e: React.MouseEvent<HTMLButtonElement>) => {
      e.preventDefault();
      setTimelineImageId(id);
      handleClickShowComment(id, "timeline");
    };

  return (
    <div className="flex flex-col relative w-full h-full overflow-auto">
      {toast && <MessageToast textError={toast} setToast={setToast} />}
      {loading && <Loading />}
      {!imageSrc || imageSrc.length === 0
        ? ""
        : imageSrc.map((image, index) => (
            <div key={index} className="relative w-full h-auto">
              <Image
                src={image.url}
                width={200}
                height={200}
                alt={`${index}`}
                priority={index === 0}
                style={{
                  width: "100%",
                  height: "auto",
                  objectFit: "cover",
                  top: 0,
                  left: 0,
                }}
              />
              <FooterCard
                likesCount={image.likesCount}
                commentsCount={image.commentsCount}
                descriptionCard={image.description}
                handleClickLike={handleClickLike(image.id)}
                handleClickComment={handleClickComment(image.id)}
                likedByMe={image.Like || false}
                petterLoggedId={petterLoggedId}
              />
            </div>
          ))}
    </div>
  );
}
