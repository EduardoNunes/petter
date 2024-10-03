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
    return redirect("/login");
  }

  return <PrivateLayout session={session}>{children}</PrivateLayout>;
}
