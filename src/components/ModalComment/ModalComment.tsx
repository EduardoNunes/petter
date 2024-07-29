import { useTimeLineContext } from "@/context/timeLineContext";
import Image from "next/image";
import "./animation.css";
import { useState } from "react";
import TextArea from "../TextArea/TextArea";

export default function ModalComment() {
  const { setCommentsOpenModal, comments } = useTimeLineContext();
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
  console.log(commentAdd);
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
      <div>
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
        <TextArea
          onTextChange={handleTextChange}
          placeholder="Digite seu comentário."
          height="12"
        />
      </div>
    </div>
  );
}
