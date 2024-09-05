import { getServerAuthSession } from "@/utils/auth";
import { redirect } from "next/navigation";
import { ReactNode } from "react";

export default async function RegisterInfosLayout({
  children,
}: {
  children: ReactNode;
}) {
  const session = await getServerAuthSession();

  if (session?.user.userInfo) {
    return redirect("/registers/notice");
  }

  return children;
}
