export default function Home() {
  return (
    <main className="min-h-screen bg-zinc-950 text-white">
      <section className="mx-auto flex min-h-screen max-w-6xl flex-col justify-center px-6 py-20">
        <div className="mb-6 inline-flex w-fit rounded-full border border-emerald-500/30 bg-emerald-500/10 px-4 py-2 text-sm text-emerald-300">
          Project 100K
        </div>

        <h1 className="max-w-4xl text-5xl font-bold tracking-tight sm:text-7xl">
          Van €19.000 naar
          <span className="block text-emerald-400">€100.000 vermogen</span>
        </h1>

        <p className="mt-6 max-w-2xl text-lg leading-8 text-zinc-400">
          We bouwen een slim financieel platform met calculators, dashboards en
          AI-tools om vermogen op te bouwen en betere geldkeuzes te maken.
        </p>

        <div className="mt-10 flex flex-wrap gap-4">
          <button className="rounded-xl bg-emerald-500 px-6 py-3 font-semibold text-zinc-950">
            Bekijk de tools
          </button>

          <button className="rounded-xl border border-zinc-700 px-6 py-3 font-semibold">
            Bekijk de roadmap
          </button>
        </div>

        <div className="mt-16 grid gap-4 sm:grid-cols-3">
          <div className="rounded-2xl border border-zinc-800 bg-zinc-900 p-6">
            <p className="text-sm text-zinc-500">Startvermogen</p>
            <p className="mt-2 text-3xl font-bold">€19.000</p>
          </div>

          <div className="rounded-2xl border border-zinc-800 bg-zinc-900 p-6">
            <p className="text-sm text-zinc-500">Doelvermogen</p>
            <p className="mt-2 text-3xl font-bold text-emerald-400">€100.000</p>
          </div>

          <div className="rounded-2xl border border-zinc-800 bg-zinc-900 p-6">
            <p className="text-sm text-zinc-500">Voortgang</p>
            <p className="mt-2 text-3xl font-bold">19%</p>
          </div>
        </div>
      </section>
    </main>
  );
}