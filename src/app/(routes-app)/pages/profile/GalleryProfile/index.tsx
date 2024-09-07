import MessageToast from "@/components/Error/MessageToast";
import Loading from "@/components/Loading/Loading";
import { useProfileContext } from "@/context/profileContext";
import { useSelfContext } from "@/context/selfContext";
import api from "@/server/api";
import { getSession } from "next-auth/react";
import Image from "next/image";
import { useEffect, useState } from "react";

interface GalleryProfileProps {
  petterId: number;
}

export default function GalleryProfile({ petterId }: GalleryProfileProps) {
  const { setNumberImagesGallery } = useProfileContext();
  const [imageSrc, setImageSrc] = useState<string[]>([]);
  const {loading, setLoading} = useSelfContext();
  const [toast, setToast] = useState("");

  useEffect(() => {
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

    loadImagesProfile();
  }, [petterId, setNumberImagesGallery]);

  return (
    <div className="grid grid-cols-3 gap-1">
      {toast && <MessageToast textError={toast} setToast={setToast} />}
      {imageSrc.map((image, index) => (
        <div key={index} className="relative w-[29.5vw] h-[29.5vw]">
          <Image
            src={image}
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
