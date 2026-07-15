import Link from "next/link";

export default function Navbar() {
  return (
    <header className="sticky top-0 z-50 border-b border-zinc-800 bg-zinc-950/90 backdrop-blur">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6">
        <Link
          href="/"
          className="text-2xl font-bold tracking-tight text-emerald-400"
        >
          Project100K
        </Link>

        <nav className="flex items-center gap-6 text-sm">
          <Link
            href="/"
            className="text-zinc-300 transition hover:text-emerald-400"
          >
            Home
          </Link>

          <Link
            href="/calculator"
            className="text-zinc-300 transition hover:text-emerald-400"
          >
            Calculator
          </Link>

          <Link
            href="/dashboard"
            className="text-zinc-300 transition hover:text-emerald-400"
          >
            Dashboard
          </Link>
        </nav>
      </div>
    </header>
  );
}