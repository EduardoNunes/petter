import MessageToast from "@/components/Error/MessageToast";
import { usePostTimelineContext } from "@/context/postTimelineContext";
import { useSelfContext } from "@/context/selfContext";
import Image from "next/image";
import { useState } from "react";
import dataGalleryImagesTemp from "../../../../../../../public/dataTemp/dataGalleryTemp";

export default function LoadGallery() {
  const { setImageURL, setImage } = usePostTimelineContext();
  const { setLoading } = useSelfContext();
  const [toast, setToast] = useState("");

  const handleImageClick = async (imageUrl: string) => {
    setImageURL(imageUrl);
    setLoading(true);

    try {
      const response = await fetch(imageUrl);
      const blob = await response.blob();

      const file = new File([blob], imageUrl.split("/").pop() || "image", {
        type: blob.type,
      });

      setImage(file);
    } catch (error: any) {
      setLoading(false);
      setToast(error);
    }
    setLoading(false);
  };

  return (
    <div className="grid grid-cols-4 gap-4 mt-8">
      {toast && <MessageToast textError={toast} setToast={setToast} />}
      {dataGalleryImagesTemp.map((item, index) => (
        <div
          key={index}
          className="relative aspect-w-1 aspect-h-1 cursor-pointer w-[18vw] h-[18vw]"
          onClick={() => handleImageClick(item.image)}
        >
          <Image
            src={item.image}
            alt=""
            fill
            className="rounded-sm object-cover"
            sizes="(max-width: 200px) 18vw, 18vw"
            priority={index === 0}
            quality={50}
          />
        </div>
      ))}
    </div>
  );
}
