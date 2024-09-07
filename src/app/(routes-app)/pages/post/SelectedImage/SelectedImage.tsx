import { usePostTimelineContext } from "@/context/postTimelineContext";
import { useEnframeContext } from "@/context/useEnframeContext";
import Image from "next/image";

export default function SelectedImage() {
  const { enframe } = useEnframeContext();
  const { imageURL } = usePostTimelineContext();

  return (
    <div className="flex items-center h-[70%] w-full mb-4 bg-lightGray">
      {imageURL && (
        <Image
          src={imageURL}
          width={3000}
          height={3000}
          alt=""
          className={`object-cover w-${enframe} h-${enframe}`}
        />
      )}
    </div>
  );
}
