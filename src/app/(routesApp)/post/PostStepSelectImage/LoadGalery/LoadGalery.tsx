import Image from "next/image";
import dataGalleryImagesTemp from "../../../../../../public/dataTemp/dataGalleryTemp";

interface LoadGalleryProps {
  image: string | null;
  setImage: (url: string) => void;
}

export default function LoadGallery({ setImage }: LoadGalleryProps) {
  const handleImageClick = (imageUrl: string) => {
    setImage(imageUrl);
  };

  return (
    <>
      <div className="grid grid-cols-4 gap-4 mt-8">
        {dataGalleryImagesTemp.map((item, index) => (
          <div
            key={index}
            className="relative w-full aspect-w-1 aspect-h-1 cursor-pointer"
            onClick={() => handleImageClick(item.image)}
          >
            <Image
              src={item.image}
              width={50}
              height={50}
              alt=""
              className="rounded-md h-auto w-auto"
            />
          </div>
        ))}
      </div>
    </>
  );
}
