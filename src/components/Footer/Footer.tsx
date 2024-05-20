"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";

export default function Footer() {
  const router = useRouter();

  const handleClickGoHome = () => {
    router.push("/home");
  };

  const handleClickGoPost = () => {
    router.push("/post");
  };

  const handleClickGoProfile = () => {
    router.push("/profile");
  };

  return (
    <div className="absolute flex items-center justify-between bottom-0 h-[7%] w-[90%] pl-2 pr-2">
      <button onClick={handleClickGoHome}>
        <Image
          src="/images/home.png"
          width={32}
          height={32}
          alt="Home"
          className=""
        />
      </button>
      <Image
        src="/images/paw-love.png"
        width={32}
        height={32}
        alt="Paw Love"
        className=""
      />
      <button onClick={handleClickGoPost}>
        <Image
          src="/images/add.png"
          width={32}
          height={32}
          alt="Plus"
          className=""
        />
      </button>
      <Image
        src="/images/pet-services.png"
        width={39}
        height={39}
        alt="Services"
        className=""
      />
      <button onClick={handleClickGoProfile}>
        <Image
          src="/images/paw.png"
          width={32}
          height={32}
          alt="Paw"
          className=""
        />
      </button>
    </div>
  );
}
