"use client";

import { useMemo, useState } from "react";
import {
  Area,
  AreaChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

function formatEuro(value: number) {
  return new Intl.NumberFormat("nl-NL", {
    style: "currency",
    currency: "EUR",
    maximumFractionDigits: 0,
  }).format(value);
}

export default function ETFCalculatorPage() {
  const [startbedrag, setStartbedrag] = useState(10000);
  const [maandelijkseInleg, setMaandelijkseInleg] = useState(500);
  const [rendement, setRendement] = useState(7);
  const [kosten, setKosten] = useState(0.22);
  const [jaren, setJaren] = useState(20);

  const berekening = useMemo(() => {
    const veiligeStart = Math.max(0, startbedrag);
    const veiligeInleg = Math.max(0, maandelijkseInleg);
    const veiligeJaren = Math.min(100, Math.max(1, jaren));
    const brutoJaarRendement = rendement / 100;
    const nettoJaarRendement = (rendement - kosten) / 100;
    const brutoMaandRendement = brutoJaarRendement / 12;
    const nettoMaandRendement = nettoJaarRendement / 12;
    const maanden = veiligeJaren * 12;

    let vermogenNaKosten = veiligeStart;
    let vermogenZonderKosten = veiligeStart;

    const jaarData = [
      {
        jaar: 0,
        inleg: veiligeStart,
        vermogen: veiligeStart,
        winst: 0,
        kosten: 0,
      },
    ];

    for (let maand = 1; maand <= maanden; maand++) {
      vermogenNaKosten *= 1 + nettoMaandRendement;
      vermogenNaKosten += veiligeInleg;

      vermogenZonderKosten *= 1 + brutoMaandRendement;
      vermogenZonderKosten += veiligeInleg;

      if (maand % 12 === 0) {
        const totaleInleg = veiligeStart + veiligeInleg * maand;
        const betaaldeKosten = vermogenZonderKosten - vermogenNaKosten;

        jaarData.push({
          jaar: maand / 12,
          inleg: Math.round(totaleInleg),
          vermogen: Math.round(vermogenNaKosten),
          winst: Math.round(vermogenNaKosten - totaleInleg),
          kosten: Math.max(0, Math.round(betaaldeKosten)),
        });
      }
    }

    const totaleInleg = veiligeStart + veiligeInleg * maanden;
    const totaleKosten = vermogenZonderKosten - vermogenNaKosten;

    return {
      eindvermogen: vermogenNaKosten,
      totaleInleg,
      totaleWinst: vermogenNaKosten - totaleInleg,
      totaleKosten: Math.max(0, totaleKosten),
      nettoRendement: rendement - kosten,
      jaarData,
    };
  }, [startbedrag, maandelijkseInleg, rendement, kosten, jaren]);

  return (
    <main className="min-h-screen bg-zinc-950 px-6 py-12 text-white">
      <div className="mx-auto max-w-6xl">
        <header>
          <p className="text-sm font-semibold uppercase tracking-wider text-emerald-400">
            Project 100K
          </p>

          <h1 className="mt-2 text-4xl font-bold sm:text-5xl">
            ETF Calculator
          </h1>

          <p className="mt-4 max-w-2xl text-zinc-400">
            Bereken hoeveel jouw ETF-investeringen mogelijk kunnen groeien en
            bekijk wat jaarlijkse fondskosten op lange termijn betekenen.
          </p>
        </header>

        <div className="mt-10 grid gap-6 lg:grid-cols-2">
          <section className="rounded-2xl border border-zinc-800 bg-zinc-900 p-6">
            <h2 className="text-xl font-semibold">Jouw gegevens</h2>

            <div className="mt-6">
              <label className="block text-sm text-zinc-400">
                Startbedrag
              </label>

              <input
                type="number"
                min="0"
                value={startbedrag}
                onChange={(event) =>
                  setStartbedrag(Number(event.target.value))
                }
                className="mt-2 w-full rounded-xl border border-zinc-700 bg-zinc-950 px-4 py-3 outline-none transition focus:border-emerald-500"
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
                className="mt-2 w-full rounded-xl border border-zinc-700 bg-zinc-950 px-4 py-3 outline-none transition focus:border-emerald-500"
              />
            </div>

            <div className="mt-6">
              <label className="block text-sm text-zinc-400">
                Verwacht jaarlijks rendement (%)
              </label>

              <input
                type="number"
                step="0.1"
                value={rendement}
                onChange={(event) =>
                  setRendement(Number(event.target.value))
                }
                className="mt-2 w-full rounded-xl border border-zinc-700 bg-zinc-950 px-4 py-3 outline-none transition focus:border-emerald-500"
              />
            </div>

            <div className="mt-6">
              <label className="block text-sm text-zinc-400">
                Jaarlijkse ETF-kosten (%)
              </label>

              <input
                type="number"
                min="0"
                step="0.01"
                value={kosten}
                onChange={(event) => setKosten(Number(event.target.value))}
                className="mt-2 w-full rounded-xl border border-zinc-700 bg-zinc-950 px-4 py-3 outline-none transition focus:border-emerald-500"
              />
            </div>

            <div className="mt-6">
              <label className="block text-sm text-zinc-400">
                Aantal jaren
              </label>

              <input
                type="number"
                min="1"
                max="100"
                value={jaren}
                onChange={(event) =>
                  setJaren(
                    Math.min(100, Math.max(1, Number(event.target.value)))
                  )
                }
                className="mt-2 w-full rounded-xl border border-zinc-700 bg-zinc-950 px-4 py-3 outline-none transition focus:border-emerald-500"
              />
            </div>
          </section>

          <section className="rounded-2xl border border-emerald-500/20 bg-emerald-500/5 p-6">
            <p className="text-sm text-zinc-400">Geschat eindvermogen</p>

            <p className="mt-3 text-4xl font-bold text-emerald-400 sm:text-5xl">
              {formatEuro(berekening.eindvermogen)}
            </p>

            <div className="mt-8 grid gap-4 sm:grid-cols-2">
              <div className="rounded-xl border border-zinc-800 bg-zinc-950 p-4">
                <p className="text-sm text-zinc-500">Totale inleg</p>
                <p className="mt-1 text-2xl font-bold">
                  {formatEuro(berekening.totaleInleg)}
                </p>
              </div>

              <div className="rounded-xl border border-zinc-800 bg-zinc-950 p-4">
                <p className="text-sm text-zinc-500">Geschatte winst</p>
                <p className="mt-1 text-2xl font-bold text-emerald-400">
                  {formatEuro(berekening.totaleWinst)}
                </p>
              </div>

              <div className="rounded-xl border border-zinc-800 bg-zinc-950 p-4">
                <p className="text-sm text-zinc-500">Geschatte kostenimpact</p>
                <p className="mt-1 text-2xl font-bold text-amber-400">
                  {formatEuro(berekening.totaleKosten)}
                </p>
              </div>

              <div className="rounded-xl border border-zinc-800 bg-zinc-950 p-4">
                <p className="text-sm text-zinc-500">Netto rendement</p>
                <p className="mt-1 text-2xl font-bold">
                  {berekening.nettoRendement.toFixed(2)}%
                </p>
              </div>
            </div>

            <p className="mt-6 text-xs leading-5 text-zinc-500">
              De kostenimpact is een benadering van het verschil tussen groei
              met en zonder de ingevoerde jaarlijkse ETF-kosten.
            </p>
          </section>
        </div>

        <section className="mt-6 rounded-2xl border border-zinc-800 bg-zinc-900 p-6">
          <p className="text-sm text-zinc-500">ETF-groei</p>
          <h2 className="mt-1 text-2xl font-bold">Vermogen per jaar</h2>

          <div className="mt-6 h-80 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={berekening.jaarData}>
                <defs>
                  <linearGradient
                    id="etfGradient"
                    x1="0"
                    y1="0"
                    x2="0"
                    y2="1"
                  >
                    <stop
                      offset="5%"
                      stopColor="#10b981"
                      stopOpacity={0.45}
                    />
                    <stop
                      offset="95%"
                      stopColor="#10b981"
                      stopOpacity={0}
                    />
                  </linearGradient>
                </defs>

                <CartesianGrid strokeDasharray="3 3" stroke="#27272a" />

                <XAxis
                  dataKey="jaar"
                  stroke="#71717a"
                  tickFormatter={(value) => `${value} jr`}
                />

                <YAxis
                  stroke="#71717a"
                  tickFormatter={(value) =>
                    new Intl.NumberFormat("nl-NL", {
                      notation: "compact",
                      maximumFractionDigits: 1,
                    }).format(value)
                  }
                />

                <Tooltip
                  formatter={(value, name) => [
                    formatEuro(Number(value)),
                    name === "vermogen"
                      ? "Vermogen"
                      : name === "inleg"
                        ? "Totale inleg"
                        : "Kosten",
                  ]}
                  labelFormatter={(label) =>
                    label === 0 ? "Start" : `Jaar ${label}`
                  }
                  contentStyle={{
                    backgroundColor: "#09090b",
                    border: "1px solid #27272a",
                    borderRadius: "12px",
                  }}
                />

                <Area
                  type="monotone"
                  dataKey="vermogen"
                  stroke="#10b981"
                  strokeWidth={3}
                  fill="url(#etfGradient)"
                  name="vermogen"
                  animationDuration={700}
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </section>

        <section className="mt-6 rounded-2xl border border-zinc-800 bg-zinc-900 p-6">
          <p className="text-sm text-zinc-500">Jaaroverzicht</p>
          <h2 className="mt-1 text-2xl font-bold">ETF-resultaten per jaar</h2>

          <div className="mt-6 overflow-x-auto">
            <table className="w-full min-w-[760px] text-left">
              <thead>
                <tr className="border-b border-zinc-800 text-sm text-zinc-400">
                  <th className="px-4 py-3 font-medium">Jaar</th>
                  <th className="px-4 py-3 font-medium">Totale inleg</th>
                  <th className="px-4 py-3 font-medium">Vermogen</th>
                  <th className="px-4 py-3 font-medium">Winst</th>
                  <th className="px-4 py-3 font-medium">Kostenimpact</th>
                </tr>
              </thead>

              <tbody>
                {berekening.jaarData.map((item) => (
                  <tr
                    key={item.jaar}
                    className="border-b border-zinc-800 transition hover:bg-zinc-800/40"
                  >
                    <td className="px-4 py-4 font-semibold">
                      {item.jaar === 0 ? "Start" : `Jaar ${item.jaar}`}
                    </td>

                    <td className="px-4 py-4 text-zinc-300">
                      {formatEuro(item.inleg)}
                    </td>

                    <td className="px-4 py-4 font-semibold text-emerald-400">
                      {formatEuro(item.vermogen)}
                    </td>

                    <td
                      className={`px-4 py-4 font-semibold ${
                        item.winst >= 0 ? "text-emerald-400" : "text-red-400"
                      }`}
                    >
                      {formatEuro(item.winst)}
                    </td>

                    <td className="px-4 py-4 font-semibold text-amber-400">
                      {formatEuro(item.kosten)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      </div>
    </main>
  );
}