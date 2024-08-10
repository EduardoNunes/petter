import { PostTimelineProvider } from "@/context/postTimelineContext";
import { EnframeProvider } from "@/context/useEnframeContext";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex justify-center items-center h-[100vh] w-[100vw]">
      <EnframeProvider>
        <PostTimelineProvider>{children}</PostTimelineProvider>
      </EnframeProvider>
    </div>
  );
}
