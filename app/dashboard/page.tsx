export default function DashboardPage() {
  const huidigVermogen = 19000;
  const doelVermogen = 100000;
  const maandelijkseInleg = 1000;
  const voortgang = Math.round((huidigVermogen / doelVermogen) * 100);
  const resterend = doelVermogen - huidigVermogen;

  return (
    <main className="min-h-screen bg-zinc-950 px-6 py-12 text-white">
      <div className="mx-auto max-w-6xl">
        <header>
          <p className="text-sm font-semibold text-emerald-400">Project 100K</p>

          <h1 className="mt-3 text-4xl font-bold tracking-tight sm:text-5xl">
            Dashboard
          </h1>

          <p className="mt-4 max-w-2xl text-zinc-400">
            Bekijk je voortgang richting €100.000 en houd je belangrijkste
            cijfers overzichtelijk bij.
          </p>
        </header>

        <section className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          <div className="rounded-2xl border border-zinc-800 bg-zinc-900 p-6">
            <p className="text-sm text-zinc-500">Huidig vermogen</p>
            <p className="mt-2 text-3xl font-bold">€19.000</p>
          </div>

          <div className="rounded-2xl border border-zinc-800 bg-zinc-900 p-6">
            <p className="text-sm text-zinc-500">Doelvermogen</p>
            <p className="mt-2 text-3xl font-bold text-emerald-400">
              €100.000
            </p>
          </div>

          <div className="rounded-2xl border border-zinc-800 bg-zinc-900 p-6">
            <p className="text-sm text-zinc-500">Maandelijkse inleg</p>
            <p className="mt-2 text-3xl font-bold">€1.000</p>
          </div>

          <div className="rounded-2xl border border-zinc-800 bg-zinc-900 p-6">
            <p className="text-sm text-zinc-500">Nog nodig</p>
            <p className="mt-2 text-3xl font-bold">
              €{resterend.toLocaleString("nl-NL")}
            </p>
          </div>
        </section>

        <section className="mt-6 rounded-2xl border border-zinc-800 bg-zinc-900 p-6">
          <div className="flex items-end justify-between gap-4">
            <div>
              <p className="text-sm text-zinc-500">Voortgang</p>
              <h2 className="mt-1 text-3xl font-bold">{voortgang}%</h2>
            </div>

            <p className="text-sm text-zinc-400">
              €{huidigVermogen.toLocaleString("nl-NL")} van €
              {doelVermogen.toLocaleString("nl-NL")}
            </p>
          </div>

          <div className="mt-6 h-4 overflow-hidden rounded-full bg-zinc-800">
            <div
              className="h-full rounded-full bg-emerald-500 transition-all"
              style={{ width: `${voortgang}%` }}
            />
          </div>
        </section>

        <section className="mt-6 grid gap-6 lg:grid-cols-2">
          <div className="rounded-2xl border border-zinc-800 bg-zinc-900 p-6">
            <p className="text-sm text-zinc-500">Verdeling vermogen</p>
            <h2 className="mt-1 text-2xl font-bold">Portfolio</h2>

            <div className="mt-6 space-y-4">
              <div>
                <div className="flex justify-between text-sm">
                  <span>ETF&apos;s</span>
                  <span className="text-zinc-400">€17.000</span>
                </div>

                <div className="mt-2 h-3 overflow-hidden rounded-full bg-zinc-800">
                  <div className="h-full w-[89%] rounded-full bg-emerald-500" />
                </div>
              </div>

              <div>
                <div className="flex justify-between text-sm">
                  <span>Crypto</span>
                  <span className="text-zinc-400">€2.000</span>
                </div>

                <div className="mt-2 h-3 overflow-hidden rounded-full bg-zinc-800">
                  <div className="h-full w-[11%] rounded-full bg-emerald-700" />
                </div>
              </div>
            </div>
          </div>

          <div className="rounded-2xl border border-zinc-800 bg-zinc-900 p-6">
            <p className="text-sm text-zinc-500">Volgende mijlpaal</p>
            <h2 className="mt-1 text-2xl font-bold">€25.000 vermogen</h2>

            <p className="mt-4 text-zinc-400">
              Je hebt nog €6.000 nodig om je eerste grote mijlpaal te bereiken.
            </p>

            <a
              href="/calculator"
              className="mt-6 inline-flex rounded-xl bg-emerald-500 px-5 py-3 font-semibold text-zinc-950 transition hover:bg-emerald-400"
            >
              Open calculator
            </a>
          </div>
        </section>
      </div>
    </main>
  );
}