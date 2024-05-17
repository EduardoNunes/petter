import Image from "next/image";


interface LoadEnframeProps {
  enframe: string | null;
  setEnframe: (url: string) => void;
}

export default function EnframeImages({
  enframe,
  setEnframe,
}: LoadEnframeProps) {
  const handleClickEnframe = () => {
    enframe === "contain" ? setEnframe("cover") : setEnframe("contain");
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
