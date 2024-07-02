import Button from "@/components/Button/Button";
import Header from "@/components/Header/Header";
import TextArea from "@/components/TextArea/TextArea";
import { useEffect, useState } from "react";
import SelectedImage from "../SelectedImage/SelectedImage";
import { useRouter } from "next/navigation";
import { useStepContext } from "@/context/useStepContext";
import api from "@/server/api";

export default function PostStepComment() {
  const [selectedPic, setSelectedPic] = useState<string>("");
  const [commentText, setCommentText] = useState<string>("");
  const router = useRouter();
  const { handleToDecreaseCurrentStep } = useStepContext();

  useEffect(() => {
    const pic = localStorage.getItem("SelectedPic");
    if (pic) {
      setSelectedPic(pic);
    }
  }, []);

  const handleTextChange = (text: string) => {
    setCommentText(text);
  };

  async function handleClickSubmit(event: { preventDefault: () => void }) {
    
    try {
      const response = await api.post("", {
        description,
        url,
        userId,
        petterInfoId,
      });

      localStorage.removeItem("SelectedPic");
      setTimeout(() => {
        handleToDecreaseCurrentStep();
      }, 1000);

      router.push("home");
      console.log(response, "RESPONSE");
    } catch (error) {
      console.log("ERROR", error);
    }
  };

  return (
    <>
      <Header text="Nova divulgação" showArrow={true} showContinue={false} />

      {selectedPic && <SelectedImage image={selectedPic} />}

      <div className="flex items-center  w-full mb-4">
        <TextArea onTextChange={handleTextChange} />
      </div>
      <div className="absolute w-[90%] bottom-[3%]">
        <Button
          text={"Publicar"}
          type="internalButton"
          onClick={handleClickSubmit}
        />
      </div>
    </>
  );
}
