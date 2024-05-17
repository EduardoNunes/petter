"use client";

import Header from "@/components/Header/Header";
import { useStepContext } from "@/context/useStepContext";
import PostStepSelectImage from "./PostStepSelectImage";

export default function Post() {
  const { currentStep } = useStepContext();

  return (
    <div className="w-[90%] h-[86%] bg-red-600">
      {currentStep === 0 && <PostStepSelectImage />}

      {currentStep === 1 && (
        <>
          <Header text="New post" showArrow={true} />
          <p>Teste2</p>
        </>
      )}
    </div>
  );
}
