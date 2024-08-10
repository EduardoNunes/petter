import { getServerSessionData } from "@/utils/getServerSession";
import { redirect } from "next/navigation";
import { ReactNode } from "react";

export default async function RegisterPetterLayout({
  children,
}: {
  children: ReactNode;
}) {
  const session = await getServerSessionData();

  if (!session?.user.userInfo) {
    return redirect("/registers/register-infos");
  }

  return children;
}
