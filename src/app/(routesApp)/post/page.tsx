"use client";

import React from "react";
import Header from "@/components/Header/Header";
import { useStepContext } from "@/context/useStepContext";

export default function Post() {
  const { currentStep } = useStepContext();

  return (
    <div className="w-[90%]">
      {currentStep === 0 && (
        <>
          <Header text="New post" showContinue={true} />
          <p>Teste</p>
        </>
      )}

      {currentStep === 1 && (
        <>
          <Header text="New post" showArrow={true} />
          <p>Teste2</p>
        </>
      )}
    </div>
  );
}
