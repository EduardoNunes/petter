import Header from "@/components/Header/Header";
import Image from "next/image";
import { useState } from "react";
import LoadGallery from "./LoadGalery/LoadGalery";
import EnframeImages from "./EnframeImage/EnframeImages";

export default function PostStepSelectImage() {
  const [image, setImage] = useState<string>("");
  const [enframe, setEnframe] = useState("contain");

  return (
    <div className="flex flex-col items-center h-full w-full">
      <Header text="Nova divulgação" showExit={true} showContinue={true} />

      <div className="flex items-center h-[50%] w-full mb-4 bg-slate-500">
        {image && (
          <Image
            src={image}
            width={3000}
            height={3000}
            alt=""
            className={`object-${enframe} w-full h-full`}
          />
        )}
      </div>
      <div className="w-full h-[40%] flex flex-col items-center overflow-auto pb-8">
        <LoadGallery image={image} setImage={setImage} />
      </div>
      <div className="absolute bottom-[3%]">
        <EnframeImages enframe={enframe} setEnframe={setEnframe} />
      </div>
    </div>
  );
}
