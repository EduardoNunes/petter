"use client";

import FooterCard from "./FooterCard/FooterCard";
import { useEffect, useState } from "react";
import api from "@/server/api";
import Image from "next/image";
import { useTimeLineContext } from "@/context/timeLineContext";
import { getSession } from "next-auth/react";

interface ImageType {
  id: number;
  url: string;
  description: string;
  likesCount: number;
  commentsCount: number;
}

export default function Card() {
  const [imageSrc, setImageSrc] = useState<ImageType[]>([]);
  const {
    handleClickLikeFunction,
    likesCount,
    likesCountId,
    commentsCount,
    handleClickShowComment,
    setTimelineImageId,
  } = useTimeLineContext();

  useEffect(() => {
    async function loadTimeline() {
      const session = await getSession();
      const token = session?.user.accessToken;

      try {
        const response = await api.get("show-card-timeline/top-10-images", {
          headers: { Authorization: `Bearer ${token}` },
        });

        const images = response.data.top10ImagesWithCounts;
        setImageSrc(images);
      } catch (error) {
        console.log("ERRO", error);
      }
    }
    loadTimeline();
  }, [likesCount, likesCountId, commentsCount]);

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
      {!imageSrc || imageSrc.length === 0 ? (
        <p className="flex h-full items-center justify-center text-medium">
          Renderizando as ultimas postagens.
        </p>
      ) : (
        imageSrc.map((image, index) => (
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
            />
          </div>
        ))
      )}
    </div>
  );
}
