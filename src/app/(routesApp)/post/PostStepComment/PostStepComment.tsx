import Button from "@/components/Button/Button";
import Header from "@/components/Header/Header";
import TextArea from "@/components/TextArea/TextArea";
import { useState } from "react";
import SelectedImage from "../SelectedImage/SelectedImage";
import { useRouter } from "next/navigation";
import { useStepContext } from "@/context/useStepContext";
import api from "@/server/api";
import { getItem } from "@/utils/localStorageUtils";
import { usePostTimeLineContext } from "@/context/postTimeLineContext";

export default function PostStepComment() {
  const { image } = usePostTimeLineContext();
  const [commentText, setCommentText] = useState<string>("");
  const router = useRouter();
  const { handleToDecreaseCurrentStep } = useStepContext();

  const handleTextChange = (text: string) => {
    setCommentText(text);
  };

  async function handleClickSubmit(event: { preventDefault: () => void }) {
    event.preventDefault();

    console.log("IMAGENS", image);

    try {
      const formData = new FormData();

      formData.append("petterId", getItem("petterId") || "");
      formData.append("userId", getItem("userId") || "");
      
      if (image) {
        formData.append("image", image);
      } else {
        console.error("Invalid image type:", image);
      }

      formData.append("description", commentText);

      const response = await api.post("petter-image-timeline", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      setTimeout(() => {
        handleToDecreaseCurrentStep();
      }, 1000);

      console.log(response, "RESPONSE");
      // router.push("home");
    } catch (error) {
      console.error("ERROR", error);
    }
  }

  return (
    <>
      <Header text="Nova divulgação" showArrow={true} showContinue={false} />

      {image && <SelectedImage />}

      <div className="flex items-center w-full mb-4">
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
