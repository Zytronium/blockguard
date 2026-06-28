import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "BlockGuard",
  description: "Community-maintained database of reported suspicious/bot Minecraft accounts to help server owners keep their server safe.",
};

export default function RootLayout({ children }: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full w-full">
      <body className="min-h-full w-full rounded-md bg-primary-dark">
        <div className="min-h-full flex flex-col border-t-12 rounded-2xl border-primary-dark">
        {/* navbar goes here */}
          <main className="flex flex-col items-center justify-center rounded-t-2xl min-h-[calc(100vh-12px)] w-full bg-background">
            {children}
          </main>
        {/* footer goes here*/}
        </div>
      </body>
    </html>
  );
}
