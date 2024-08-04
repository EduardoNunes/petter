import PrivateLayout from "@/components/PrivateLayout/PrivateLayout";
import { getServerSessionData } from "@/utils/getServerSession";
import { redirect } from "next/navigation";
import { ReactNode } from "react";

export default async function ProtectedRoutesLayout({ children }: { children: ReactNode }) {
  const session = await getServerSessionData();

  if (session) {
    return redirect("/home");
  }

  return <PrivateLayout session={session}>{children}</PrivateLayout>;
}
