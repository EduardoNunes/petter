import Header from "@/components/Header/Header";
import Image from "next/image";
import { useState } from "react";
import dataGalleryImagesTemp from "../../../../../public/dataTemp/dataGalleryTemp";

export default function PostStepSelectImage() {
  const [image, setImage] = useState<string>("");
  const [enframe, setEnframe] = useState("auto");

  const uploadImage = async (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();

    const file = e.target.files?.[0];

    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setImage(imageUrl);
    }
  };

  const handleClickEnframe = () => {
    enframe === "auto" ? setEnframe("full") : setEnframe("auto");
  };

  return (
    <div className="flex flex-col h-full w-full">
      <Header text="Nova divulgação" showExit={true} showContinue={true} />

      <div className="flex items-center h-[50%] w-full bg-slate-500">
        {image && (
          <Image
            src={image}
            width={150}
            height={150}
            alt=""
            className={`object-cover w-${enframe} h-${enframe}`}
          />
        )}
      </div>
      <div className="w-full h-[50%] flex flex-col items-center">
        <div className="grid grid-cols-4 gap-4 mt-8">
          {dataGalleryImagesTemp.map((item, index) => (
            <div key={index} className="relative w-full aspect-w-1 aspect-h-1">
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
      </div>
      {/* <div className="flex items-center justify-center h-[50%] w-full gap-8">
        <label htmlFor="fileInput" className="font-secondary font-bold">
          <Image src="/images/image.png" width={48} height={48} alt="Enframe" />
        </label>
        <input
          id="fileInput"
          type="file"
          className="hidden"
          name="images"
          onChange={uploadImage}
          accept=".jpg, .jpeg, .png"
          capture="user"
        />
        <Image
          src="/images/enframe.png"
          width={48}
          height={48}
          alt="Enframe"
          onClick={handleClickEnframe}
        />
      </div> */}
    </div>
  );
}
