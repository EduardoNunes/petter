"use client";

import { SelfProvider } from "@/context/selfContext";
import "./globals.css";
import { QueryClient, QueryClientProvider } from "react-query";
import { PostImageProvider } from "@/context/postImageContext";

const queryClient = new QueryClient();

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <QueryClientProvider client={queryClient}>
      <SelfProvider>
        <PostImageProvider>
          <html lang="pt-br">
            <body className="flex justify-center items-center h-[100vh]">
              {children}
            </body>
          </html>
        </PostImageProvider>
      </SelfProvider>
    </QueryClientProvider>
  );
}
