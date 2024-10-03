import Image from "next/image";
import { useState } from "react";
import HamburgerProfile from "../Modals/HamburgerProfile/HamburgerProfile";

interface HeaderProfileProps {
  petterName: string;
  isUser: boolean;
}

export default function HeaderProfile({ petterName, isUser }: HeaderProfileProps) {
  const [isOpenHamburger, setIsOpenHamburger] = useState(false);

  async function handleOpenHamburger() {
    setIsOpenHamburger(!isOpenHamburger);
  }

  return (
    <div className="flex items-center justify-between h-[62px] w-full">
      <div>
        <h1 className="text-extraLarge1">{petterName}</h1>
      </div>
      <div className={`flex h-8 gap-2 ${!isUser && "hidden"}`}>      
        <div className={`relative ${!isUser && "hidden"}`}>
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
