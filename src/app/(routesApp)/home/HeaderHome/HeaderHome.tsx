import PetterBlack from "@/components/Petter/PetterBlack";
import Image from "next/image";

export default function HeaderHome() {
  return (
    <>
      <div className="absolute top-0 flex items-center justify-between w-[90%] h-[7%] pl-2 pr-2">
        <PetterBlack fontSize="big" />
        <div className="flex items-center justify-between h-8 gap-5">
          <Image
            src="/images/paw.png"
            width={32}
            height={32}
            alt="Paw"
            className=""
          />
          <Image
            src="/images/chat.png"
            width={32}
            height={32}
            alt="Paw"
            className=""
          />
        </div>
      </div>
    </>
  );
}
