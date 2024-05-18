import { useEnframeContext } from "@/context/useEnframeContext";
import Image from "next/image";

export default function EnframeImages() {
  const { enframe, setEnframe } = useEnframeContext();
  
  const handleClickEnframe = () => {
    enframe === "content" ? setEnframe("full") : setEnframe("content");
  };

  return (
    <>
      <Image
        src="/images/enframe.png"
        width={48}
        height={48}
        alt="Enframe"
        onClick={handleClickEnframe}
      />
    </>
  );
}
