import { HomeProvider } from "@/context/homeContext";
import { PostImageProvider } from "@/context/postImageContext";
import { ProfileProvider } from "@/context/profileContext";
import { TimeLineProvider } from "@/context/timeLineContext";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex justify-center items-center h-[100vh] w-[100vw]">
      <TimeLineProvider>
        <ProfileProvider>
          <PostImageProvider>
            <HomeProvider>{children}</HomeProvider>
          </PostImageProvider>
        </ProfileProvider>
      </TimeLineProvider>
    </div>
  );
}
