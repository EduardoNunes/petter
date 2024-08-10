"use client";

import { useStepContext } from "@/context/useStepContext";
import PostStepComment from "./PostStepComment/PostStepComment";
import PostStepSelectImage from "./PostStepSelectImage";
import { useEffect } from "react";

export default function Post() {
  const { currentStep, setCurrentStep } = useStepContext();

  useEffect(() => {
    setCurrentStep(0);
  }, []);

  return (
    <div className="w-[90%] h-[86%]">
      {currentStep === 0 && <PostStepSelectImage />}

      {currentStep === 1 && <PostStepComment />}
    </div>
  );
}
