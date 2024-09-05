import { getServerAuthSession } from "@/utils/auth";
import { redirect } from "next/navigation";
import { ReactNode } from "react";

export default async function PagesLayout({
  children,
}: {
  children: ReactNode;
}) {
  const session = await getServerAuthSession();

  if (!session?.user.userInfo) {
    return redirect("/registers/register-infos");
  }

  if (!session?.user.petterInfo && session?.user.petterInfo?.length === 0) {
    return redirect("/registers/register-petter/register-infos");
  }

  if (!session?.user.petterImage) {
    return redirect("/registers/register-petter/load-images");
  }

  return children;
}
