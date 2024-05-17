import Header from "@/components/Header/Header";
import Image from "next/image";
import { useState } from "react";

export default function PostStepSelectImage() {
  const [image, setImage] = useState<string>("");

  const uploadImage = async (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();

    const file = e.target.files?.[0];

    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setImage(imageUrl);
    }
  };

  return (
    <>
      <Header text="Nova divulgação" showExit={true} showContinue={true} />

      <div className="h-[50%] w-full bg-slate-500">
        {image && (
          <Image
            src={image}
            width={150}
            height={150}
            alt=""
            className="object-cover w-full h-full"
          />
        )}
      </div>
      <div>
        <label
          htmlFor="fileInput"
          className="flex items-center h-10 font-secondary font-bold cursor-pointer"
        >
          Selecionar mídia
        </label>
        <input
          id="fileInput"
          type="file"
          className="hidden"
          name="images"
          onChange={uploadImage}
          accept=".jpg, .jpeg"
          capture="user"
        />
      </div>
    </>
  );
}
