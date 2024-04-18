import "./globals.css";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-br">
      <body className="flex justify-center items-center h-[100vh]">{children}</body>
    </html>
  );
}
