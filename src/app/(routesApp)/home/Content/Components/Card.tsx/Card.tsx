"use client";

import FooterCard from "./FooterCard/FooterCard";
import { useEffect, useState } from "react";
import api from "@/server/api";
import Image from "next/image";
import { useTimeLineContext } from "@/context/timeLineContext";

interface ImageType {
  id: number;
  url: string;
  description: string;
  likesCount: number;
}

export default function Card() {
  const [imageSrc, setImageSrc] = useState<ImageType[]>([]);
  const {
    handleClickLikeFunction,
    likesCount,
    handleClickShowComment,
  } = useTimeLineContext();

  useEffect(() => {
    async function loadTimeline() {
      try {
        const response = await api.get("show-card-timeline/top-10-images");
        const images = response.data;
        setImageSrc(images);
      } catch (error) {
        console.log("ERRO", error);
      }
    }

    loadTimeline();
  }, [likesCount]);

  const handleClickLike =
    (id: number) => (e: React.MouseEvent<HTMLButtonElement>) => {
      e.preventDefault();
      handleClickLikeFunction(id, "timeline");
    };

  const handleClickComment =
    (id: number) => (e: React.MouseEvent<HTMLButtonElement>) => {
      e.preventDefault();
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
              commentsLength={index}
              descriptionCard={image.description}
              handleClickComment={handleClickComment(image.id)}
              handleClickLike={handleClickLike(image.id)}
            />
          </div>
        ))
      )}
    </div>
  );
}
