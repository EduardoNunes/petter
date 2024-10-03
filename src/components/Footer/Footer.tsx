"use client";

import { usePostImageContext } from "@/context/postImageContext";
import { useSelfContext } from "@/context/selfContext";
import Image from "next/image";
import { useRouter } from "next/navigation";

export default function Footer() {
  const router = useRouter();
  const { setLoading, setIsUser, isUser } = useSelfContext();
  const { setTimelineOrGallery } = usePostImageContext();

  const handleClickGoHome = () => {
    if (window.location.pathname !== "/pages/home") {
      setLoading(true);
      router.push("/pages/home");
    }
  };

  const handleClickGoPost = () => {
    if (window.location.pathname !== "/pages/post") {
      setLoading(true);
      setTimelineOrGallery("timeline");
      router.push("/pages/post");
    }
  };

  const handleClickGoProfile = () => {
    if (window.location.pathname !== "/pages/user-profile") {
      setLoading(true);
      setIsUser(true);
      router.push("/pages/user-profile");
    } else if (window.location.pathname === "/pages/user-profile" && !isUser) {
      setIsUser(true);
      router.push("/pages/visitant-profile");
    }
  };

  return (
    <div className="flex items-center justify-between h-[62px] w-full">
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
