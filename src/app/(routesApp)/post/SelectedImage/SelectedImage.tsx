import { useEnframeContext } from "@/context/useEnframeContext";
import Image from "next/image";

interface PostStepSelectImageProps {
  image: string;
}

export default function SelectedImage({ image }: PostStepSelectImageProps) {
  const { enframe } = useEnframeContext();

  return (
    <div className="flex items-center h-[50%] w-full mb-4 bg-slate-500">
      {image && (
        <Image
          src={image}
          width={3000}
          height={3000}
          alt=""
          className={`object-cover w-${enframe} h-${enframe}`}
        />
      )}
    </div>
  );
}
