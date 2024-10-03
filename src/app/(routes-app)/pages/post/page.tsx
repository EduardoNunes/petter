"use client";

import { useStepContext } from "@/context/useStepContext";
import PostStepComment from "./PostStepComment/PostStepComment";
import PostStepSelectImage from "./PostStepSelectImage";
import { useEffect } from "react";
import { useSelfContext } from "@/context/selfContext";
import Loading from "@/components/Loading/Loading";

export default function Post() {
  const { currentStep, setCurrentStep } = useStepContext();
  const { loading, setLoading } = useSelfContext();

  useEffect(() => {
    setLoading(false);
  }, []);

  useEffect(() => {
    setCurrentStep(0);
  }, []);

  return (
    <div className="w-[90%] h-full pb-2">
      {loading && <Loading />}
      {currentStep === 0 && <PostStepSelectImage />}

      {currentStep === 1 && <PostStepComment />}
    </div>
  );
}
