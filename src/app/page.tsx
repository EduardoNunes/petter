"use client";

import Logo from "@/components/Logo/Logo";
import Image from "next/image";
import "./animation.css";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function Opening() {
  const router = useRouter();

  useEffect(() => {
    setTimeout(() => {
      router.push("/login");
    }, 3000);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <div className="flex flex-col items-center justify-center h-[100vh] w-[100vw] bg-gradient-to-r from-azulPalido to-branco">
        <Logo />
        <div className="flex gap-2 pt-14">
          <Image
            src="/images/dog.png"
            width={30}
            height={30}
            alt="Dog"
            className="animation1"
          />
          <Image
            src="/images/cat.png"
            width={30}
            height={30}
            alt="Cat"
            className="animation2"
          />
          <Image
            src="/images/duck.png"
            width={30}
            height={30}
            alt="Duck"
            className="animation3"
          />
          <Image
            src="/images/hamster.png"
            width={30}
            height={30}
            alt="Hamster"
            className="animation4"
          />
          <Image
            src="/images/turttle.png"
            width={30}
            height={30}
            alt="Turttle"
            className="animation5"
          />
          <Image
            src="/images/fish.png"
            width={30}
            height={30}
            alt="Fish"
            className="animation6"
          />
        </div>
      </div>
    </>
  );
}
