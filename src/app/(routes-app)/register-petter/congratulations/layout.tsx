import { getServerSessionData } from "@/utils/getServerSession";
import { redirect } from "next/navigation";
import { ReactNode } from "react";

export default async function CongratulationsLayout({
  children,
}: {
  children: ReactNode;
}) {
  const session = await getServerSessionData();

  if (session?.user.petterInfo?.length === 0) {
    return redirect("/register-petter/register-infos");
  }

  return children;
}
