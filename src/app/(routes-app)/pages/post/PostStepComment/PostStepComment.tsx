import Button from "@/components/Button/Button";
import Header from "@/components/Header/Header";
import TextArea from "@/components/TextArea/TextArea";
import { usePostTimelineContext } from "@/context/postTimelineContext";
import { useSelfContext } from "@/context/selfContext";
import { useStepContext } from "@/context/useStepContext";
import api from "@/server/api";
import { getSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import SelectedImage from "../SelectedImage/SelectedImage";
import errorResponse from "@/components/Error/ErrorResponse";
import MessageToast from "@/components/Error/MessageToast";

export default function PostStepComment() {
  const { image } = usePostTimelineContext();
  const { handleToDecreaseCurrentStep } = useStepContext();
  const { getSelf, self, setLoading } = useSelfContext();
  const [commentText, setCommentText] = useState<string>("");
  const [toast, setToast] = useState("");

  const router = useRouter();

  useEffect(() => {
    getSelf();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleTextChange = (text: string) => {
    setCommentText(text);
  };

  async function handleClickSubmit(event: { preventDefault: () => void }) {
    event.preventDefault();
    setLoading(true);

    const session = await getSession();
    const token = session?.user.accessToken;

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
          Authorization: `Bearer ${token}`,
        },
      });

      setTimeout(() => {
        handleToDecreaseCurrentStep();
      }, 1000);

      router.push("home");
    } catch (error: any) {
      const response = errorResponse(error);
      setLoading(false);
      setToast(response);
    }
  }

  return (
    <>
      {toast && <MessageToast textError={toast} setToast={setToast} />}
      <Header text="Nova divulgação" showArrow={true} showContinue={false} />

      {image && <SelectedImage />}

      <div className="flex items-center w-full mb-4">
        <TextArea
          value={commentText}
          onTextChange={handleTextChange}
          placeholder="Descrição da imagem"
          height="30vh"
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
