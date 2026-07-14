"use client";

import { useMemo, useState } from "react";

function formatEuro(value: number) {
  return new Intl.NumberFormat("nl-NL", {
    style: "currency",
    currency: "EUR",
    maximumFractionDigits: 0,
  }).format(value);
}

export default function CalculatorPage() {
  const [startvermogen, setStartvermogen] = useState(19000);
  const [maandelijkseInleg, setMaandelijkseInleg] = useState(1000);
  const [rendement, setRendement] = useState(7);
  const [jaren, setJaren] = useState(10);

  const resultaat = useMemo(() => {
    const maanden = Math.max(0, jaren * 12);
    const maandRendement = rendement / 100 / 12;

    let eindvermogen = Math.max(0, startvermogen);

    for (let maand = 0; maand < maanden; maand++) {
      eindvermogen *= 1 + maandRendement;
      eindvermogen += Math.max(0, maandelijkseInleg);
    }

    const totaleInleg =
      Math.max(0, startvermogen) +
      Math.max(0, maandelijkseInleg) * maanden;

    const totaleWinst = eindvermogen - totaleInleg;

    return {
      eindvermogen,
      totaleInleg,
      totaleWinst,
    };
  }, [startvermogen, maandelijkseInleg, rendement, jaren]);

  return (
    <main className="min-h-screen bg-zinc-950 px-6 py-12 text-white">
      <div className="mx-auto max-w-5xl">
        <a
          href="/"
          className="text-sm font-semibold text-emerald-400 hover:text-emerald-300"
        >
          ← Terug naar home
        </a>

        <div className="mt-8">
          <p className="text-sm font-semibold text-emerald-400">Project 100K</p>

          <h1 className="mt-3 text-4xl font-bold sm:text-5xl">
            Vermogenscalculator
          </h1>

          <p className="mt-4 max-w-2xl text-zinc-400">
            Bereken hoeveel jouw vermogen mogelijk kan groeien met maandelijkse
            inleg en gemiddeld jaarlijks rendement.
          </p>
        </div>

        <div className="mt-10 grid gap-6 lg:grid-cols-2">
          <section className="rounded-2xl border border-zinc-800 bg-zinc-900 p-6">
            <h2 className="text-xl font-semibold">Jouw gegevens</h2>

            <div className="mt-6">
              <label className="block text-sm text-zinc-400">
                Huidig vermogen
              </label>

              <input
                type="number"
                min="0"
                value={startvermogen}
                onChange={(event) =>
                  setStartvermogen(Number(event.target.value))
                }
                className="mt-2 w-full rounded-xl border border-zinc-700 bg-zinc-950 px-4 py-3 text-white outline-none focus:border-emerald-500"
              />
            </div>

            <div className="mt-6">
              <label className="block text-sm text-zinc-400">
                Maandelijkse inleg
              </label>

              <input
                type="number"
                min="0"
                value={maandelijkseInleg}
                onChange={(event) =>
                  setMaandelijkseInleg(Number(event.target.value))
                }
                className="mt-2 w-full rounded-xl border border-zinc-700 bg-zinc-950 px-4 py-3 text-white outline-none focus:border-emerald-500"
              />
            </div>

            <div className="mt-6">
              <label className="block text-sm text-zinc-400">
                Jaarlijks rendement (%)
              </label>

              <input
                type="number"
                min="0"
                step="0.1"
                value={rendement}
                onChange={(event) =>
                  setRendement(Number(event.target.value))
                }
                className="mt-2 w-full rounded-xl border border-zinc-700 bg-zinc-950 px-4 py-3 text-white outline-none focus:border-emerald-500"
              />
            </div>

            <div className="mt-6">
              <label className="block text-sm text-zinc-400">
                Aantal jaren
              </label>

              <input
                type="number"
                min="0"
                value={jaren}
                onChange={(event) => setJaren(Number(event.target.value))}
                className="mt-2 w-full rounded-xl border border-zinc-700 bg-zinc-950 px-4 py-3 text-white outline-none focus:border-emerald-500"
              />
            </div>
          </section>

          <section className="rounded-2xl border border-emerald-500/20 bg-emerald-500/5 p-6">
            <p className="text-sm text-zinc-400">Geschat eindvermogen</p>

            <p className="mt-3 text-4xl font-bold text-emerald-400 sm:text-5xl">
              {formatEuro(resultaat.eindvermogen)}
            </p>

            <div className="mt-8 space-y-4">
              <div className="rounded-xl border border-zinc-800 bg-zinc-950 p-4">
                <p className="text-sm text-zinc-500">Totale inleg</p>
                <p className="mt-1 text-2xl font-bold">
                  {formatEuro(resultaat.totaleInleg)}
                </p>
              </div>

              <div className="rounded-xl border border-zinc-800 bg-zinc-950 p-4">
                <p className="text-sm text-zinc-500">Geschatte winst</p>
                <p
                  className={`mt-1 text-2xl font-bold ${
                    resultaat.totaleWinst >= 0
                      ? "text-emerald-400"
                      : "text-red-400"
                  }`}
                >
                  {formatEuro(resultaat.totaleWinst)}
                </p>
              </div>

              <div className="rounded-xl border border-zinc-800 bg-zinc-950 p-4">
                <p className="text-sm text-zinc-500">Looptijd</p>
                <p className="mt-1 text-2xl font-bold">{jaren} jaar</p>
              </div>
            </div>

            <p className="mt-6 text-xs leading-5 text-zinc-500">
              Dit is een indicatieve berekening. Werkelijke rendementen kunnen
              hoger of lager uitvallen.
            </p>
          </section>
        </div>
      </div>
    </main>
  );
}