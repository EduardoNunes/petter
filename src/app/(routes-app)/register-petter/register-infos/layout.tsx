import { getServerSessionData } from "@/utils/getServerSession";
import { redirect } from "next/navigation";
import { ReactNode } from "react";

export default async function RegisterPetterInfosLayout({
  children,
}: {
  children: ReactNode;
}) {
  const session = await getServerSessionData();

  if (session?.user.petterInfo && session?.user.petterInfo?.length > 0) {
    return redirect("/register-petter/load-images");
  }

  return children;
}
