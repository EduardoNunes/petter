import Header from "@/components/Header/Header";
import TextArea from "@/components/TextArea/TextArea";
import { useEnframeContext } from "@/context/useEnframeContext";
import Image from "next/image";
import { useEffect, useState } from "react";
import SelectedImage from "../SelectedImage/SelectedImage";

export default function PostStepComment() {
  const [selectedPic, setSelectedPic] = useState<string>("");

  useEffect(() => {
    const pic = localStorage.getItem("SelectedPic");
    if (pic) {
      setSelectedPic(pic);
    }
  }, []);

  return (
    <>
      <Header text="Nova divulgação" showArrow={true} showContinue={true} />

      {selectedPic && <SelectedImage image={selectedPic} />}

      <div className="flex items-center h-[50%] w-full mb-4 bg-slate-500">
        <TextArea />
      </div>
    </>
  );
}
