"use client";

import FooterCard from "./FooterCard/FooterCard";
import { useEffect, useState } from "react";
import api from "@/server/api";
import Image from "next/image";

export default function Card() {
  const [imageSrc, setImageSrc] = useState<ImageType[]>([]);

  interface ImageType {
    url: string;
    description: string;
  }

  useEffect(() => {
    async function loadTimeline() {
      try {
        const response = await api.get("show-card-timeline/top-10-images");

        const images = response.data;
        setImageSrc(images);
        console.log(response);
      } catch (error) {
        console.log("ERRO", error);
      }
    }

    loadTimeline();
  }, []);

  const handleClickLike = (
    url: string,
    e: React.MouseEvent<HTMLButtonElement>
  ) => {
    e.preventDefault();
    console.log("Like clicked for URL:", url);
  };

  const handleClickComment = (
    url: string,
    e: React.MouseEvent<HTMLButtonElement>
  ) => {
    e.preventDefault();
    console.log("Comment clicked for URL:", url);
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
              loves={index}
              commentsLength={index}
              descriptionCard={image.description}
              url={image.url}
              handleClickComment={handleClickComment}
              handleClickLike={handleClickLike}
            />
          </div>
        ))
      )}
    </div>
  );
}
