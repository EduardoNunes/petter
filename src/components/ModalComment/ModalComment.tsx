import { useSelfContext } from "@/context/selfContext";
import { useTimeLineContext } from "@/context/timeLineContext";
import api from "@/server/api";
import Image from "next/image";
import { useEffect, useState } from "react";
import TextArea from "../TextArea/TextArea";
import "./animation.css";
import { getSession } from "next-auth/react";
import Loading from "../Loading/Loading";
import MessageToast from "../Error/MessageToast";
import { schemaPostComment } from "@/validation/schemaPostComment";

export default function ModalComment() {
  const { self, loading, setLoading } = useSelfContext();
  const {
    setCommentsOpenModal,
    comments,
    timelineImageId,
    handleClickShowComment,
  } = useTimeLineContext();
  const [animation, setAnimation] = useState("slide-in");
  const [commentAdd, setCommentAdd] = useState("");
  const [toast, setToast] = useState("");

  useEffect(() => {
    setLoading(false);
  }, []);

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
    const session = await getSession();
    const token = session?.user.accessToken;
    setLoading(true);

    if (!self.PetterInfo) {
      console.log("Petter que vai comentar não identificado.");
      return;
    }

    try {
      await schemaPostComment.validate(
        {
          commentAdd,
        },
        { abortEarly: false }
      );

      const data = {
        userId: self.id,
        petterId: self.PetterInfo[0].id,
        commented: commentAdd,
        timelineId: timelineImageId,
      };

      await api.post("comment-post-timeline", data, {
        headers: { Authorization: `Bearer ${token}` },
      });

      await handleClickShowComment(Number(timelineImageId), "timeline");
      setCommentAdd("");
    } catch (error: any) {
      setLoading(false);
      setToast(error.message);
    }
    setLoading(false);
  };

  return (
    <div
      className={`absolute top-0 left-0 z-10 flex flex-col w-full h-full px-8 pb-2 bg-branco ${animation}`}
    >
      {loading && <Loading />}
      {toast && <MessageToast textError={toast} setToast={setToast} />}
      <div className="flex justify-end w-full h-12 py-3">
        <button onClick={handleClickCloseModal}>
          <Image
            src="/images/exit.png"
            width={28}
            height={28}
            alt="Exit"
            className="w-6"
          />
        </button>
      </div>
      <div className="h-[calc(100%-96px)] overflow-auto">
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
              <p className="font-secondary pl-8 break-words">
                {comment.commented}
              </p>
            </div>
          ))}
      </div>
      <div className="w-full mt-2">
        <div className="relative h-12">
          <TextArea
            onTextChange={handleTextChange}
            value={commentAdd}
            placeholder="Deixe seu comentário."
            height="48px"
            style=""
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
