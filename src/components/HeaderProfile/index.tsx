import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";
import HamburgerProfile from "../Modals/HamburgerProfile/HamburgerProfile";

interface HeaderProfileProps {
  petterName: string;
}

export default function HeaderProfile({ petterName }: HeaderProfileProps) {
  const [isOpenHamburger, setIsOpenHamburger] = useState(false);
  const router = useRouter();

  async function handleOpenHamburger() {
    setIsOpenHamburger(!isOpenHamburger);
  }

  return (
    <div className="flex items-center justify-between h-[62px] w-full">
      <div>
        <h1 className="text-extraLarge1">{petterName}</h1>
      </div>
      <div className="flex h-8 gap-2">
        <Image
          src="/images/add.png"
          width={32}
          height={32}
          alt="Home"
          className="h-auto w-auto"
        />
        <div className="relative">
          <button onClick={handleOpenHamburger}>
            <Image
              src="/images/menu-hamburguer.png"
              width={39}
              height={39}
              alt="Home"
              className="h-auto w-auto"
            />
          </button>
          {isOpenHamburger && <HamburgerProfile />}
        </div>
      </div>
    </div>
  );
}
