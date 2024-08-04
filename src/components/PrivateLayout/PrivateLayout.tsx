"use client";

import { StepProvider } from "@/context/useStepContext";
import { SessionProvider } from "next-auth/react";
import { ReactNode } from "react";

interface PrivateLayoutProps {
  children: ReactNode;
  session: any;
}

export default function PrivateLayout({
  children,
  session,
}: PrivateLayoutProps) {
  return (
    <SessionProvider session={session}>
      <div className="flex justify-center items-center h-[100vh] w-[100vw]">
        <StepProvider>{children}</StepProvider>
      </div>
    </SessionProvider>
  );
}
