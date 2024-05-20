import Button from "@/components/Button/Button";
import Header from "@/components/Header/Header";
import TextArea from "@/components/TextArea/TextArea";
import { useEffect, useState } from "react";
import SelectedImage from "../SelectedImage/SelectedImage";
import { useRouter } from "next/navigation";
import { useStepContext } from "@/context/useStepContext";

export default function PostStepComment() {
  const [selectedPic, setSelectedPic] = useState<string>("");
  const router = useRouter();
  const { handleToDecreaseCurrentStep } = useStepContext();

  useEffect(() => {
    const pic = localStorage.getItem("SelectedPic");
    if (pic) {
      setSelectedPic(pic);
    }
  }, []);

  const handleClickFinishPost = (event: { preventDefault: () => void }) => {
    router.push("home");
    localStorage.removeItem("SelectedPic");
    setTimeout(() => {
      handleToDecreaseCurrentStep();
      console.log("TESTE");
    }, 1000);
  };

  return (
    <>
      <Header text="Nova divulgação" showArrow={true} showContinue={false} />

      {selectedPic && <SelectedImage image={selectedPic} />}

      <div className="flex items-center  w-full mb-4">
        <TextArea />
      </div>
      <div className="absolute w-[90%] bottom-[3%]">
        <Button
          text={"Publicar"}
          type="internalButton"
          onClick={handleClickFinishPost}
        />
      </div>
    </>
  );
}
