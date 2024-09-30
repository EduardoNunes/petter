import { ProfileProvider } from "@/context/profileContext";
import { TimeLineProvider } from "@/context/timeLineContext";
import { ReactNode } from "react";

export default async function VisitantProfileLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <ProfileProvider>
      <TimeLineProvider>{children}</TimeLineProvider>
    </ProfileProvider>
  );
}
