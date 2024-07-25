import api from "@/server/api";
import { getItem } from "@/utils/localStorageUtils";
import Image from "next/image";
import { useEffect, useState } from "react";

export default function GalleryProfile() {
  const [imageSrc, setImageSrc] = useState<string[]>([]);
  const petterId = getItem("petterId");

/*   useEffect(() => {
    async function loadImagesProfile() {
      try {
        const response = await api.get(
          `show-images-profile/top-20-images?petterId=${petterId}`
        );

        setImageSrc(response.data);
      } catch (error) {
        console.log("Deu ruim em carregar imagens da grade do perfil", error);
      }
    }

    loadImagesProfile();
  }, [petterId]); */

  return (
    <div className="grid grid-cols-3 gap-1">
      {imageSrc.map((image, index) => (
        <div key={index} className="relative w-[28vw] h-[28vw]">
          <Image
            src={image}
            alt={`${index}`}
            fill
            className="rounded-sm object-cover"
            priority={index === 0}
            sizes="(max-width: 600px) 50vw, (max-width: 1200px) 25vw, 20vw"
          />
        </div>
      ))}
    </div>
  );
}
