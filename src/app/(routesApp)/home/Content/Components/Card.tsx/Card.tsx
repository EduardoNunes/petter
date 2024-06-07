"use client";

import FooterCard from "./FooterCard/FooterCard";
import dataCardTemp from "../../../../../../../public/dataTemp/dataCardsTemp";
import { useEffect, useState } from "react";
import api from "@/server/api";

export default function Card() {
  const [imageSrc, setImageSrc] = useState("");

  useEffect(() => {
    async function loadTimeline() {
      console.log("TESTE");
      try {
        const response = await api.get("show-card-timeline/top-10-images", {});

        console.log("RESPONSE", response.data);
      } catch (error) {
        console.log("ERRO", error);
      }
    }

    loadTimeline();
  }, []);

  return (
    <div className="flex flex-col relative w-full h-full overflow-auto">
      {dataCardTemp.map((card, index) => (
        <div key={index} className="relative w-full h-auto">
          <p className="absolute left-2 text-medium">{card.name}</p>
          <img
            src={card.imageSrc}
            alt={card.name}
            style={{
              width: "100%",
              height: "auto",
              objectFit: "cover",
              top: 0,
              left: 0,
            }}
          />
          <FooterCard
            loves={card.loves}
            commentsLength={card.comments.length}
          />
        </div>
      ))}
    </div>
  );
}
