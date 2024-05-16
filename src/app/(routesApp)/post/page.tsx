"use client";

import React from "react";
import Header from "@/components/Header/Header";
import { useStepContext } from "@/context/useStepContext";

export default function Post() {
  const { currentStep } = useStepContext();

  return (
    <div className="w-[90%]">
      <Header text="New post" showContinue={true}/>
      {currentStep === 0 && <p>Teste</p>}
    </div>
  );
}
