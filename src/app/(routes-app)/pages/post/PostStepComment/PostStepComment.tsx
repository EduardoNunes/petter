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
    if (text.length <= 150) {
      setCommentText(text);
    } else {
      setToast("Número máximo de caracteres atingido.");
    }
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
    <div className="flex flex-col justify-between h-full">
      {toast && <MessageToast textError={toast} setToast={setToast} />}
      <Header text="Nova divulgação" showArrow={true} showContinue={false} />

      <div className="h-[calc(60%-80px)]">{image && <SelectedImage />}</div>

      <div className="flex items-center max-h-[calc(40%-80px)] w-full">
        <TextArea
          value={commentText}
          onTextChange={handleTextChange}
          placeholder="Descrição da imagem"
          height="30vh"
        />
      </div>
      <div className="w-full">
        <Button
          text={"Publicar"}
          type="internalButton"
          onClick={handleClickSubmit}
        />
      </div>
    </div>
  );
}
