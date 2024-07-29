import { SelfProvider } from "@/context/selfContext";
import { TimeLineProvider } from "@/context/timeLineContext";
import { StepProvider } from "@/context/useStepContext";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex justify-center items-center h-[100vh] w-[100vw]">
      <StepProvider>
        <SelfProvider>{children}</SelfProvider>
      </StepProvider>
    </div>
  );
}
