import api from "@/server/api";
import { getItem } from "@/utils/localStorageUtils";
import Image from "next/image";
import { useEffect, useState } from "react";

export default function GalleryProfile() {
  const [imageSrc, setImageSrc] = useState<string[]>([]);

  useEffect(() => {
    async function loadImagesProfile() {
      try {
        const petterId = getItem("petterId");

        const response = await api.get(
          `show-images-profile/top-20-images?petterId=${petterId}`
        );

        console.log("RESPONSE", response.data);
        setImageSrc(response.data);
      } catch (error) {
        console.log("Deu ruim aqui", error);
      }
    }

    loadImagesProfile();
  }, []);

  return (
    <div className="grid grid-cols-3 gap-1">
      {imageSrc.map((image, index) => (
        <div key={index} className="relative w-23 h-23 ">
          <Image
            src={image}
            width={65}
            height={65}
            alt={`${index}`}
            className="object-cover rounded-sm h-full w-full"
          />
        </div>
      ))}
    </div>
  );
}
