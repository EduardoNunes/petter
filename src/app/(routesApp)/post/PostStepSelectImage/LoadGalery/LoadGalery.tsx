import Image from "next/image";
import dataGalleryImagesTemp from "../../../../../../public/dataTemp/dataGalleryTemp";
import { usePostTimeLineContext } from "@/context/postTimeLineContext";

export default function LoadGallery() {
  const { setImageURL, setImage } = usePostTimeLineContext();

  const handleImageClick = async (imageUrl: string) => {
    setImageURL(imageUrl);

    try {
      const response = await fetch(imageUrl);
      const blob = await response.blob();

      const file = new File([blob], imageUrl.split("/").pop() || "image", {
        type: blob.type,
      });

      setImage(file);
    } catch (error) {
      console.error("Failed to fetch image:", error);
    }
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
