import { getServerSessionData } from "@/utils/getServerSession";
import { redirect } from "next/navigation";
import { ReactNode } from "react";

export default async function PagesLayout({
  children,
}: {
  children: ReactNode;
}) {
  const session = await getServerSessionData();

  if (!session?.user.userInfo) {
    return redirect("/registers/register-infos");
  }

  if (!session?.user.petterInfo) {
    return redirect("/registers/register-petter/register-infos");
  }

  return children;
}
