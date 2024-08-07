import { getServerSessionData } from "@/utils/getServerSession";
import { redirect } from "next/navigation";
import { ReactNode } from "react";

export default async function LoadImagesLayout({
  children,
}: {
  children: ReactNode;
}) {
  const session = await getServerSessionData();

  console.log("SESSION", session?.user);

  if (session?.user.petterInfo?.length === 0) {
    return redirect("/register-petter/register-infos");
  }

  return children;
}
