"use client";

import errorResponse from "@/components/Error/ErrorResponse";
import MessageToast from "@/components/Error/MessageToast";
import { useSelfContext } from "@/context/selfContext";
import { useTimeLineContext } from "@/context/timeLineContext";
import api from "@/server/api";
import { getSession } from "next-auth/react";
import Image from "next/image";
import { useEffect, useState } from "react";
import FooterCard from "./FooterCard/FooterCard";

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
  const {
    likesCount,
    likesCountId,
    commentsCount,
    likedByMe,
  } = useTimeLineContext();
  const { setLoading } = useSelfContext();
  const [imageSrc, setImageSrc] = useState<ImageType[]>([]);
  const [toast, setToast] = useState("");
  const [petterLoggedId, setPetterLoggedId] = useState<number | undefined>(
    undefined
  );

  useEffect(() => {
    async function loadTimeline() {
      const session = await getSession();
      const token = session?.user.accessToken;
      const petterInfoId = session?.user.petterInfo as PetterInfo[];

      setPetterLoggedId(petterInfoId[0].id);

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

  return (
    <div className="flex flex-col relative w-full h-full overflow-auto">
      {toast && <MessageToast textError={toast} setToast={setToast} />}
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
                commentsCount={image.commentsCount}
                descriptionCard={image.description}
                likesCount={image.likesCount}
                imageId={image.id}
                likedByMe={image.Like.some((item) => item.petterInfoId === petterLoggedId) || false}
              />
            </div>
          ))}
    </div>
  );
}
