import Button from "@/components/Button/Button";
import Header from "@/components/Header/Header";
import TextArea from "@/components/TextArea/TextArea";
import { useSelfContext } from "@/context/selfContext";
import { useStepContext } from "@/context/useStepContext";
import api from "@/server/api";
import { getSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import SelectedImage from "../SelectedImage/SelectedImage";
import errorResponse from "@/components/Error/ErrorResponse";
import MessageToast from "@/components/Error/MessageToast";
import { usePostImageContext } from "@/context/postImageContext";
import { useQuery } from "react-query";
import Loading from "@/components/Loading/Loading";

export default function PostStepComment() {
  const { image, timelineOrGallery, setImage, setImageURL } =
    usePostImageContext();
  const { handleToDecreaseCurrentStep } = useStepContext();
  const { getSelf, setLoading } = useSelfContext();
  const [commentText, setCommentText] = useState<string>("");
  const [toast, setToast] = useState("");
  const [caracteres, setCaracteres] = useState(150);

  const router = useRouter();

  const { data, isLoading } = useQuery("self", getSelf);

  const handleTextChange = (text: string) => {
    if (text.length <= 150) {
      setCommentText(text);
      setCaracteres(150 - text.length);
    } else {
      setToast("Número máximo de caracteres atingido.");
    }
  };

  async function handleClickSubmit(event: { preventDefault: () => void }) {
    event.preventDefault();
    setLoading(true);

    const session = await getSession();
    const token = session?.user.accessToken;

    if (!data?.id || !data?.PetterInfo) {
      setToast("Algo errado com o usuário ou com o petter");
      return;
    }

    try {
      const formData = new FormData();

      formData.append("userId", data?.id.toString());
      formData.append("petterId", data?.PetterInfo[0].id.toString());

      if (image) {
        formData.append("imagesFile", image);
      } else {
        setToast("Imagem inválida:");
        return;
      }

      formData.append("description", commentText);

      await api.post(
        `/petter-register-images/petter-image-${timelineOrGallery}`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setTimeout(() => {
        handleToDecreaseCurrentStep();
      }, 1000);

      if (timelineOrGallery === "timeline") {
        router.push("home");
      } else if (timelineOrGallery === "gallery") {
        router.push("user-profile");
      }
    } catch (error: any) {
      const response = errorResponse(error);
      setLoading(false);
      setToast(response);
    } finally {
      setImageURL("");
      setImage(undefined);
    }
  }

  return (
    <div className="flex flex-col justify-between h-full">
      {toast && <MessageToast textError={toast} setToast={setToast} />}
      {isLoading && <Loading />}
      <Header text="Nova divulgação" showArrow={true} showContinue={false} />

      <div className="h-[calc(60%-80px)]">{image && <SelectedImage />}</div>
      <p>{caracteres}</p>
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
