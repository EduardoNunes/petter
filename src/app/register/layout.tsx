import { StepProvider } from "@/context/useStepContext";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-br">
      <body className="flex justify-center items-center h-[100vh]">
        <StepProvider>{children}</StepProvider>
      </body>
    </html>
  );
}
