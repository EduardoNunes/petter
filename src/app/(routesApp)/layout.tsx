"use client"

import { StepProvider } from "@/context/useStepContext";
import { SessionProvider } from "next-auth/react";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <SessionProvider>
      <div className="flex justify-center items-center h-[100vh] w-[100vw]">
        <StepProvider>{children}</StepProvider>
      </div>
    </SessionProvider>
  );
}
