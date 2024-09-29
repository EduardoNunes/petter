"use client";

import { StepProvider } from "@/context/useStepContext";
import { SessionProvider, signOut } from "next-auth/react";
import { useRouter } from "next/navigation";
import { ReactNode, useEffect } from "react";

interface PrivateLayoutProps {
  children: ReactNode;
  session: any;
}

export default function PrivateLayout({
  children,
  session,
}: PrivateLayoutProps) {
  const router = useRouter();

  async function logout() {
    await signOut({
      redirect: false,
    });

    setTimeout(() => {
      router.replace("/login");
    }, 2000);
  }

  useEffect(() => {
    if (session) {
      if (session.user && session.user?.message === "Usuário não encontrado") {
        logout();
        return;
      }
    }
  }, []);

  return (
    <SessionProvider session={session}>
      <div className="flex justify-center items-center h-[100vh] w-[100vw]">
        <StepProvider>{children}</StepProvider>
      </div>
    </SessionProvider>
  );
}
