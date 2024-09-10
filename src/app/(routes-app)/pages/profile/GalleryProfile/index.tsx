import MessageToast from "@/components/Error/MessageToast";
import Loading from "@/components/Loading/Loading";
import { useProfileContext } from "@/context/profileContext";
import { useSelfContext } from "@/context/selfContext";
import api from "@/server/api";
import { getSession } from "next-auth/react";
import Image from "next/image";
import { Key, useEffect, useState } from "react";

interface GalleryProfileProps {
  petterId: number;
}

export default function GalleryProfile({ petterId }: GalleryProfileProps) {
  const { setNumberImagesGallery, setShowImage, setImageSelected } =
    useProfileContext();
  const { setLoading, visitantProfile, isUser } = useSelfContext();
  const [imageSrc, setImageSrc] = useState<string[]>([]);
  const [toast, setToast] = useState("");

  useEffect(() => {
    if (isUser) {
      loadImagesProfile();
    } else {
      const invertOrdImages = visitantProfile.PetterImages.sort(
        (a: { id: number }, b: { id: number }) => b.id - a.id
      );
      setImageSrc(
        invertOrdImages.map(
          (item: { id: string; url: string }) => `${item.id} ${item.url}`
        )
      );
    }
  }, [petterId, setNumberImagesGallery]);

  async function loadImagesProfile() {
    const session = await getSession();
    const token = session?.user.accessToken;
    setLoading(true);

    try {
      const response = await api.get(
        `show-images-profile/top-20-images?petterId=${petterId}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      setImageSrc(response.data);
      setNumberImagesGallery(response.data.length);
    } catch (error: any) {
      setLoading(false);
      setToast(error);
    }
    setLoading(false);
  }

  function openImage(image: string) {
    setLoading(true);
    setImageSelected(image);
    setShowImage(true);
  }

  return (
    <div className="grid grid-cols-3 gap-1">
      {toast && <MessageToast textError={toast} setToast={setToast} />}
      {imageSrc.map((image: string, index: Key | null | undefined) => (
        <div
          key={index}
          className="relative w-[29.5vw] h-[29.5vw]"
          onClick={() => openImage(image)}
        >
          <Image
            src={image.split(" ")[1]}
            alt={`${index}`}
            fill
            className="rounded-sm object-cover"
            sizes="(max-width: 200px) 29.5vw, 29.5vw"
            priority={index === 0}
            quality={50}
          />
        </div>
      ))}
    </div>
  );
}
