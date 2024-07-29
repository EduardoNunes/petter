import { useTimeLineContext } from "@/context/timeLineContext";
import Image from "next/image";

export default function ModalComment() {
  const { setCommentsOpenModal, comments } = useTimeLineContext();

  const handleClickCloseModal = () => {
    setCommentsOpenModal(false);
  };

  console.log(comments);

  return (
    <div className="absolute top-0 left-0 z-10 flex flex-col w-[100%] h-[100%] bg-branco">
      <div className="flex w-full justify-end p-3">
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
            <div key={index}>
              <p>{comment.petterInfo.petterName}</p>
              <Image 
                 src={comment.petterInfo.profileImage}
                 width={28}
                 height={28}
                 alt="Baalon comment"
              />
              <p>{comment.commented}</p>
            </div>
          ))}
      </div>
    </div>
  );
}
