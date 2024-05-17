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
    <div className="flex flex-col h-full w-full">
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
      <div className="flex items-center justify-center h-[50%] w-full gap-8">
        <label htmlFor="fileInput" className="font-secondary font-bold">
          <Image
            src="/images/image.png"
            width={48}
            height={48}
            alt="Enframe"
          />
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
        <Image src="/images/enframe.png" width={48} height={48} alt="Enframe" />
      </div>
    </div>
  );
}
