"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";
import Loading from "../Loading/Loading";

export default function Footer() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const handleClickGoHome = () => {
    if (window.location.pathname !== "/home") {
      setLoading(true);
      router.push("/home");
    }
  };

  const handleClickGoPost = () => {
    if (window.location.pathname !== "/post") {
      setLoading(true);
      router.push("/post");
    }
  };

  const handleClickGoProfile = () => {
    if (window.location.pathname !== "/profile") {
      setLoading(true);
      router.push("/profile");
    }
  };

  return (
    <div className="absolute flex items-center justify-between bottom-0 h-[7%] w-[90%] pl-2 pr-2">
      {loading && <Loading />}
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
        width={32}
        height={32}
        priority={true}
        alt="Services"
        className="w-9 h-9"
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
