import { useTimeLineContext } from "@/context/timeLineContext";
import { useEnframeContext } from "@/context/useEnframeContext";
import Image from "next/image";

export default function SelectedImage() {
  const { enframe } = useEnframeContext();
  const { imageURL } = useTimeLineContext();

  return (
    <div className="flex items-center h-[50%] w-full mb-4 bg-slate-500">
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
