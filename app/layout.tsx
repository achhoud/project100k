import type { Metadata } from "next";
import Link from "next/link";
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
      <body className="bg-zinc-950 text-white">
        <header className="sticky top-0 z-50 border-b border-zinc-800 bg-zinc-950/90 backdrop-blur">
          <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6">
            <Link
              href="/"
              className="text-xl font-bold tracking-tight text-emerald-400"
            >
              Project100K
            </Link>

            <nav className="flex items-center gap-8 text-sm font-medium">
              <Link
                href="/"
                className="text-zinc-400 transition hover:text-white"
              >
                Home
              </Link>

              <Link
                href="/calculator"
                className="text-zinc-400 transition hover:text-white"
              >
                Calculator
              </Link>

              <Link
                href="/dashboard"
                className="text-zinc-400 transition hover:text-white"
              >
                Dashboard
              </Link>

              <button className="rounded-lg border border-zinc-700 px-3 py-2 transition hover:bg-zinc-800">
                🚀
              </button>
            </nav>
          </div>
        </header>

        {children}
      </body>
    </html>
  );
}
