import { StaticImport } from "next/dist/shared/lib/get-img-props";
import Image from "next/image";

interface GalleryProfileProps {
  imageSrc: (string | StaticImport)[];
}

export default function GalleryProfile({ imageSrc }: GalleryProfileProps) {
  return (
    <div className="grid grid-cols-3 gap-1">
      {imageSrc.map((image, index) => (
        <div key={index} className="relative w-23 h-23 ">
          <Image
            src={image}
            width={65}
            height={65}
            alt={`${index}`}
            className="object-cover rounded-sm h-full w-full"
          />
        </div>
      ))}
    </div>
  );
}
