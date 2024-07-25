"use client";

import FooterCard from "./FooterCard/FooterCard";
import { useEffect, useState } from "react";
import api from "@/server/api";
import Image from "next/image";

export default function Card() {
  const [imageSrc, setImageSrc] = useState([]);

  useEffect(() => {
    async function loadTimeline() {
      try {
        const response = await api.get("show-card-timeline/top-10-images");

        const urls = response.data;
        setImageSrc(urls);
      } catch (error) {
        console.log("ERRO", error);
      }
    }

    loadTimeline();
  }, []);

  return (
    <div className="flex flex-col relative w-full h-full overflow-auto">
      {!imageSrc || imageSrc.length === 0 ? (
        <p className="flex h-full items-center justify-center text-big">Ops, nada novo por aqui</p>
      ) : (
        imageSrc.map((image, index) => (
          <div key={index} className="relative w-full h-auto">
            <p className="absolute left-2 text-medium">{index}</p>
            <Image
              src={image}
              width={200}
              height={200}
              alt={`${index}`}
              style={{
                width: "100%",
                height: "auto",
                objectFit: "cover",
                top: 0,
                left: 0,
              }}
            />
            <FooterCard loves={index} commentsLength={index} />
          </div>
        ))
      )}
    </div>
  );
}
