import { useProfileContext } from "@/context/profileContext";
import Image from "next/image";
import "../animation.css";
import { useEffect, useState } from "react";
import { useSelfContext } from "@/context/selfContext";

export default function ShowImageModal() {
  const { setLoading } = useSelfContext();
  const { imageSelected, setImageSelected, setShowImage } = useProfileContext();
  const [animation, setAnimation] = useState("slide-in");

  const handleClickCloseModal = () => {
    setAnimation("slide-out");
    setTimeout(() => {
      setShowImage(false);
    }, 300);
  };

  return (
    <div
      className={`absolute flex flex-col justify-between top-0 left-0 h-full w-full z-10 bg-lightGray ${animation}`}
    >
      <div className="flex justify-center w-full h-full max-h-[calc(100%-40px)]">
        <Image
          src={imageSelected.split(" ")[1]}
          width={1000}
          height={1000}
          alt="Image Selected"
          className="object-scale-down"
          onLoad={() => setLoading(false)}
        />
      </div>
      <div className="flex justify-center w-full h-12 py-3">
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
    </div>
  );
}
