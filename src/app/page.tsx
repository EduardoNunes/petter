"use client";

import PetterBlack from "@/components/Petter/PetterBlack";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import "./animation.css";

export default function Opening() {
  const router = useRouter();

  useEffect(() => {
    const redirect = () => {
      if (typeof window !== "undefined") {
        router.push("/login");
      }
    };

    redirect();
  }, [router]);

  return (
    <>
      {
        <div className="flex flex-col items-center justify-center h-[100vh] w-[100vw]">
          <PetterBlack fontSize={"extraLarge"} />
        </div>
      }
    </>
  );
}
