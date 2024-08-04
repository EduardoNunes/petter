import { useSelfContext } from "@/context/selfContext";
import api from "@/server/api";
import Image from "next/image";
import { useEffect, useState } from "react";

interface GalleryProfileProps {
  petterId: number;
}

export default function GalleryProfile({ petterId }: GalleryProfileProps) {
  const { setNumberImagesGallery } = useSelfContext();
  const [imageSrc, setImageSrc] = useState<string[]>([]);

  useEffect(() => {
    async function loadImagesProfile() {
      try {
        const response = await api.get(
          `show-images-profile/top-20-images?petterId=${petterId}`
        );

        setImageSrc(response.data);
        setNumberImagesGallery(response.data.length);
      } catch (error) {
        console.log("Deu ruim em carregar imagens da grade do perfil", error);
      }
    }

    loadImagesProfile();
  }, [petterId]);

  return (
    <div className="grid grid-cols-3 gap-1">
      {imageSrc.map((image, index) => (
        <div key={index} className="relative w-[28vw] h-[28vw]">
          <Image
            src={image}
            alt={`${index}`}
            fill
            className="rounded-sm object-cover"
            sizes="(max-width: 200px) 28vw, 28vw"
            priority={index === 0}
            quality={50}
          />
        </div>
      ))}
    </div>
  );
}
