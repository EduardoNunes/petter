
import { TimeLineProvider } from "@/context/timeLineContext";
import { EnframeProvider } from "@/context/useEnframeContext";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex justify-center items-center h-[100vh] w-[100vw]">
      <EnframeProvider>
        <TimeLineProvider>{children}</TimeLineProvider>
      </EnframeProvider>
    </div>
  );
}
