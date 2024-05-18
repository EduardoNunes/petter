import Header from "@/components/Header/Header";
import { useEffect, useState } from "react";
import SelectedImage from "../SelectedImage/SelectedImage";
import EnframeImages from "./EnframeImage/EnframeImages";
import LoadGallery from "./LoadGalery/LoadGalery";

export default function PostStepSelectImage() {
  const [image, setImage] = useState<string>("");

  useEffect(() => {
    const pic = localStorage.getItem("SelectedPic");
    if (pic) {
      setImage(pic)
      localStorage.removeItem("SelectedPic");
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("SelectedPic", image);
  }, [image]);


  return (
    <div className="flex flex-col items-center h-full w-full">
      <Header text="Nova divulgação" showExit={true} showContinue={true} />

      <SelectedImage image={image} />

      <div className="w-full h-[40%] flex flex-col items-center overflow-auto pb-8">
        <LoadGallery setImage={setImage} />
      </div>
      <div className="absolute bottom-[3%]">
        <EnframeImages />
      </div>
    </div>
  );
}
