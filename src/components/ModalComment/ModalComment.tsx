import { useTimeLineContext } from "@/context/timeLineContext";
import Image from "next/image";

export default function ModalComment() {
  const { setCommentsOpenModal } = useTimeLineContext();

  const handleClickCloseModal = () => {
    setCommentsOpenModal(false);
  };

  return (
    <div className="absolute top-0 left-0 z-10 flex flex-col w-[100%] h-[100%] bg-branco">
      <div className="flex w-full justify-end p-3">
        <button>
          <Image
            src="/images/exit.png"
            width={28}
            height={28}
            alt="Paw Love"
            onClick={handleClickCloseModal}
            className=""
          />
        </button>
      </div>
      <div>
        <h1>Modal Aberto</h1>
      </div>
    </div>
  );
}
