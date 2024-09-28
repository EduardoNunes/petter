import PrivateLayout from "@/components/PrivateLayout/PrivateLayout";
import { getServerAuthSession } from "@/utils/auth";
import { redirect } from "next/navigation";
import { ReactNode } from "react";

export default async function ProtectedRoutesLayout({
  children,
}: {
  children: ReactNode;
}) {
  const session = await getServerAuthSession();
  if (!session) {
    return <PrivateLayout session={session}>{children}</PrivateLayout>;
  }

  if (session) {
    if (!session.user.userInfo) {
      return redirect("/registers/register-infos");
    } else if (session.user.petterInfo?.length === 0) {
      return redirect("/registers/notice");
    } else {
      return redirect("/pages/home");
    }
  }

  return <PrivateLayout session={session}>{children}</PrivateLayout>;
}
