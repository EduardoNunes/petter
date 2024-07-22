import { PostTimeLineProvider } from "@/context/postTimeLineContext";
import { EnframeProvider } from "@/context/useEnframeContext";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex justify-center items-center h-[100vh] w-[100vw]">
      <EnframeProvider>
        <PostTimeLineProvider>{children}</PostTimeLineProvider>
      </EnframeProvider>
    </div>
  );
}
