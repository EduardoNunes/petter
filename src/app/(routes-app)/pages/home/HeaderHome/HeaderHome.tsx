import PetterBlack from "@/components/Petter/PetterBlack";
import { useHomeContext } from "@/context/homeContext";
import Image from "next/image";

export default function HeaderHome() {
  const { isOpenSearch, setIsOpenSearch } = useHomeContext();

  function handleOpenSearch() {
    setIsOpenSearch(true);
  }

  return (
    <div className="flex items-center justify-between w-full h-[62px]">
      <PetterBlack fontSize="big" />
      <div className="flex items-center justify-between h-8 gap-5">
        <button onClick={handleOpenSearch}>
          <Image
            src="/images/search.png"
            width={32}
            height={32}
            alt="Search"
            className="Search Icon"
          />
        </button>
        {/* <Image
          src="/images/paw.png"
          width={32}
          height={32}
          alt="Paw"
          className="Paw Icon"
        /> */}
        <Image
          src="/images/chat.png"
          width={32}
          height={32}
          alt="Paw"
          className="Chat Icon"
        />
      </div>
    </div>
  );
}
