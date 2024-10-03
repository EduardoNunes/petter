import { usePostImageContext } from "@/context/postImageContext";
import Image from "next/image";

export default function SelectedImage() {
  const { imageURL } = usePostImageContext();

  return (
    <div className="flex items-center w-full h-full bg-lightGray">
      {imageURL && (
        <Image
          src={imageURL}
          width={3000}
          height={3000}
          alt="Selected Image"
          className={`object-scale-down w-full h-full`}
        />
      )}
    </div>
  );
}
