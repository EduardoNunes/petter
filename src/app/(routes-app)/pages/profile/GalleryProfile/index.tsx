import MessageToast from "@/components/Error/MessageToast";
import { useProfileContext } from "@/context/profileContext";
import { useSelfContext } from "@/context/selfContext";
import Image from "next/image";
import { Key, useEffect, useRef, useState } from "react";

interface GalleryProfileProps {
  petterId: number;
}

export default function GalleryProfile({ petterId }: GalleryProfileProps) {
  const { setShowImage, setImageSelected, loadImagesProfile, imageSrc } =
    useProfileContext();
  const { setLoading, visitantProfile, isUser } = useSelfContext();
  const [toast, setToast] = useState("");
  const scrollableDivRef = useRef<HTMLDivElement>(null);
  const [page, setPage] = useState(1);

  useEffect(() => {
    if (isUser) {
      loadImagesProfile(petterId, page);
    } else {
      loadImagesProfile(visitantProfile, page);
    }
  }, [page, petterId]);

  function openImage(image: string) {
    setLoading(true);
    setImageSelected(image);
    setShowImage(true);
  }

  useEffect(() => {
    const handleScroll = () => {
      if (scrollableDivRef.current) {
        const scrollDiv = scrollableDivRef.current;
        let isBottom =
          scrollDiv.scrollTop + scrollDiv.clientHeight >=
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
  }, [scrollableDivRef]);

  return (
    <div
      className="h-full grid grid-cols-3 gap-1 overflow-y-auto"
      ref={scrollableDivRef}
    >
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
