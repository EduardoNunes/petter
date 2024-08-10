import PrivateLayout from "@/components/PrivateLayout/PrivateLayout";
import { getServerSessionData } from "@/utils/getServerSession";
import { redirect } from "next/navigation";
import { ReactNode } from "react";

export default async function ProtectedRoutesLayout({
  children,
}: {
  children: ReactNode;
}) {
  const session = await getServerSessionData();

  if (session) {
    if (!session.user.userInfo) {
      return redirect("/registers/register-infos");
    } else if (session.user.petterInfo?.length === 0) {
      return redirect("/pages/notice");
    } else {
      return redirect("/pages/home");
    }
  }

  return <PrivateLayout session={session}>{children}</PrivateLayout>;
}
