import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import "./globals.css";

export const metadata: Metadata = {
  title: "Project 100K",
  description: "Bouw stap voor stap vermogen op.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="nl">
      <body className="bg-zinc-950 text-white antialiased">
        <Navbar />
        {children}
      </body>
    </html>
  );
}