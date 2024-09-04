import { getServerAuthSession } from "@/utils/auth";
import { redirect } from "next/navigation";
import { ReactNode } from "react";

export default async function LoadImagesLayout({
  children,
}: {
  children: ReactNode;
}) {
  const session = await getServerAuthSession();

  if (session?.user.petterInfo?.length === 0) {
    return redirect("/registers/register-petter/register-infos");
  }
  console.log("IMAGES", session?.user);
  if (session?.user.petterImage) {
    return redirect("/registers/register-petter/about-petter");
  }

  return children;
}
