import { useSelfContext } from "@/context/selfContext";
import { useTimeLineContext } from "@/context/timeLineContext";
import api from "@/server/api";
import Image from "next/image";
import { useState } from "react";
import TextArea from "../TextArea/TextArea";
import "./animation.css";

export default function ModalComment() {
  const { self } = useSelfContext();
  const {
    setCommentsOpenModal,
    comments,
    timelineImageId,
    handleClickShowComment,
  } = useTimeLineContext();
  const [animation, setAnimation] = useState("slide-in");
  const [commentAdd, setCommentAdd] = useState("");

  const handleClickCloseModal = () => {
    setAnimation("slide-out");
    setTimeout(() => {
      setCommentsOpenModal(false);
    }, 300);
  };

  const handleTextChange = (text: string) => {
    setCommentAdd(text);
  };

  const handleClickSendMessage = async () => {
    if (!self.PetterInfo) {
      console.log("Petter que vai comentar não identificado.");
      return;
    }

    try {
      const data = {
        userId: self.id,
        petterId: self.PetterInfo[0].id,
        commented: commentAdd,
        timelineId: timelineImageId,
      };

      const response = await api.post("comment-post-timeline", data);
      
      console.log("Comentário salvo com sucesso.", response.data);

      await handleClickShowComment(Number(timelineImageId), "timeline");
      setCommentAdd("");
    } catch (error) {
      console.log("ERRO AO TENTAR ENVIAR", error);
    }
  };

  return (
    <div
      className={`absolute top-0 left-0 z-10 flex flex-col w-[100%] h-[100%] px-8 bg-branco ${animation}`}
    >
      <div className="flex w-full justify-end py-3">
        <button onClick={handleClickCloseModal}>
          <Image
            src="/images/exit.png"
            width={28}
            height={28}
            alt="Paw Love"
            className=""
          />
        </button>
      </div>
      <div className="h-[80%] overflow-auto">
        {comments &&
          comments.map((comment, index) => (
            <div key={index} className="p-2 mb-2 bg-verdePastel rounded-lg">
              <div className="flex items-center gap-3 mb-1 p-1 rounded-lg bg-azulPalido">
                <Image
                  src={comment.petterInfo.profileImage}
                  width={42}
                  height={42}
                  alt="Comentário"
                  className="rounded-full border-azulEscuroSombra border-solid border-[2px]"
                />
                <p className="text-medium">{comment.petterInfo.petterName}</p>
              </div>
              <p className="font-secondary pl-8">{comment.commented}</p>
            </div>
          ))}
      </div>
      <div className="absolute bottom-12 w-[86%]">
        <div className="relative">
          <TextArea
            onTextChange={handleTextChange}
            value={commentAdd}
            placeholder="Deixe seu comentário."
            height="46px"
          />
          <button onClick={handleClickSendMessage}>
            <Image
              src="/images/send.png"
              width={32}
              height={32}
              alt="Enviar"
              className="absolute top-2 right-4"
            />
          </button>
        </div>
      </div>
    </div>
  );
}
