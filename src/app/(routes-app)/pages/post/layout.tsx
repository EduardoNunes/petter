export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex justify-center items-center h-[100vh] w-[100vw]">
      {children}
    </div>
  );
}
