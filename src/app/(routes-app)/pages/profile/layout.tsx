import { ProfileProvider } from "@/context/profileContext";
import { ReactNode } from "react";

export default async function ProfileLayout({
  children,
}: {
  children: ReactNode;
}) {
  return <ProfileProvider>{children}</ProfileProvider>;
}
