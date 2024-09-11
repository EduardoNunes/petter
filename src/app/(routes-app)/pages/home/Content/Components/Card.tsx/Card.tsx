"use client";

import errorResponse from "@/components/Error/ErrorResponse";
import MessageToast from "@/components/Error/MessageToast";
import { useSelfContext } from "@/context/selfContext";
import { useTimeLineContext } from "@/context/timeLineContext";
import api from "@/server/api";
import { getSession } from "next-auth/react";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import FooterCard from "./FooterCard/FooterCard";
import HeaderCard from "./HeaderCard/HeaderCard";

interface ImageType {
  petterInfo: any;
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
  const { likesCount, likesCountId, commentsCount, likedByMe } =
    useTimeLineContext();
  const { setLoading } = useSelfContext();
  const [imageSrc, setImageSrc] = useState<ImageType[]>([]);
  const [toast, setToast] = useState("");
  const [petterLoggedId, setPetterLoggedId] = useState<number | undefined>(
    undefined
  );
  const scrollableDivRef = useRef<HTMLDivElement>(null);
  const [page, setPage] = useState(1);

  useEffect(() => {
    loadTimeline(page);
  }, [page, likesCount, likesCountId, commentsCount, likedByMe]);

  const loadTimeline = async (newPage: number) => {
    const session = await getSession();
    const token = session?.user.accessToken;
    const petterInfoId = session?.user.petterInfo as PetterInfo[];

    setPetterLoggedId(petterInfoId[0].id);
    console.log("CHAMOU");
    try {
      const response = await api.get(
        `show-card-timeline/images?page=${newPage}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      const images = response.data.imagesWithCounts;
      console.log("IMAGES", images);
      setImageSrc((prevImages) => [...prevImages, ...images]);
    } catch (error: any) {
      const response = errorResponse(error);
      setLoading(false);
      setToast(response);
    }
    setLoading(false);
  };

  useEffect(() => {
    const handleScroll = () => {
      if (scrollableDivRef.current) {
        const scrollDiv = scrollableDivRef.current;
        let isBottom =
          scrollDiv.scrollTop + scrollDiv.clientHeight ===
          scrollDiv.scrollHeight;

        if (isBottom) {
          setPage((prevPage) => prevPage + 1);
        }
      }
    };

    const divElement = scrollableDivRef.current;

    if (divElement) {
      divElement.addEventListener("scroll", handleScroll);
    }

    return () => {
      if (divElement) {
        divElement.removeEventListener("scroll", handleScroll);
      }
    };
  }, []);

  return (
    <div
      className="flex flex-col w-full h-full overflow-auto"
      ref={scrollableDivRef}
    >
      {toast && <MessageToast textError={toast} setToast={setToast} />}
      {!imageSrc || imageSrc.length === 0
        ? ""
        : imageSrc.map((image, index) => (
            <div key={index} className="relative w-full h-auto">
              <HeaderCard petterInfo={image.petterInfo} />
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
                }}
              />
              <FooterCard
                commentsCount={image.commentsCount}
                descriptionCard={image.description}
                likesCount={image.likesCount}
                imageId={image.id}
                likedByMe={
                  image.Like.some(
                    (item) => item.petterInfoId === petterLoggedId
                  ) || false
                }
              />
            </div>
          ))}
    </div>
  );
}
