import Button from "@/components/Button/Button";
import Header from "@/components/Header/Header";
import TextArea from "@/components/TextArea/TextArea";
import { useSelfContext } from "@/context/selfContext";
import { useTimeLineContext } from "@/context/timeLineContext";
import { useStepContext } from "@/context/useStepContext";
import api from "@/server/api";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import SelectedImage from "../SelectedImage/SelectedImage";

export default function PostStepComment() {
  const { image } = useTimeLineContext();
  const { handleToDecreaseCurrentStep } = useStepContext();
  const { getSelf, self } = useSelfContext();
  const [commentText, setCommentText] = useState<string>("");
  const router = useRouter();

  useEffect(() => {
    getSelf()
  }, []);

  const handleTextChange = (text: string) => {
    setCommentText(text);
  };

  async function handleClickSubmit(event: { preventDefault: () => void }) {
    event.preventDefault();

    if (!self.id || !self.PetterInfo) {
      console.error("User ID or Petter ID is missing");
      return;
    }

    try {
      const formData = new FormData();

      formData.append("userId", self.id.toString());
      formData.append("petterId", self.PetterInfo[0].id.toString());

      if (image) {
        formData.append("image", image);
      } else {
        console.error("Invalid image type:", image);
      }

      formData.append("description", commentText);

      await api.post("petter-image-timeline", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      setTimeout(() => {
        handleToDecreaseCurrentStep();
      }, 1000);

      console.log("Imagem postada na timeline");
      router.push("home");
    } catch (error) {
      console.error("ERROR", error);
    }
  }

  return (
    <>
      <Header text="Nova divulgação" showArrow={true} showContinue={false} />

      {image && <SelectedImage />}

      <div className="flex items-center w-full mb-4">
        <TextArea
          value={commentText}
          onTextChange={handleTextChange}
          placeholder="Descrição da imagem"
          height="44"
        />
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
