"use client";

import { useEffect, useMemo, useState } from "react";
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

export default function CalculatorPage() {
  const [startvermogen, setStartvermogen] = useState(19000);
  const [maandelijkseInleg, setMaandelijkseInleg] = useState(1000);
  const [rendement, setRendement] = useState(7);
  const [jaren, setJaren] = useState(20);
useEffect(() => {
  const opgeslagen = localStorage.getItem("project100k");

  if (opgeslagen) {
    const data = JSON.parse(opgeslagen);

    setStartvermogen(data.startvermogen);
    setMaandelijkseInleg(data.maandelijkseInleg);
    setRendement(data.rendement);
    setJaren(data.jaren);
  }
}, []);

useEffect(() => {
  localStorage.setItem(
    "project100k",
    JSON.stringify({
      startvermogen,
      maandelijkseInleg,
      rendement,
      jaren,
    })
  );
}, [startvermogen, maandelijkseInleg, rendement, jaren]);
  const berekening = useMemo(() => {
    const veiligeStart = Math.max(0, startvermogen);
    const veiligeInleg = Math.max(0, maandelijkseInleg);
    const veiligeJaren = Math.max(0, jaren);
    const maanden = veiligeJaren * 12;
    const maandRendement = rendement / 100 / 12;

    let vermogen = veiligeStart;

    const grafiekData = [
      {
        jaar: 0,
        inleg: veiligeStart,
        vermogen: veiligeStart,
        winst: 0,
      },
    ];

    for (let maand = 1; maand <= maanden; maand++) {
      vermogen *= 1 + maandRendement;
      vermogen += veiligeInleg;

      if (maand % 12 === 0) {
        const totaleInlegTotDan = veiligeStart + veiligeInleg * maand;

        grafiekData.push({
          jaar: maand / 12,
          inleg: Math.round(totaleInlegTotDan),
          vermogen: Math.round(vermogen),
          winst: Math.round(vermogen - totaleInlegTotDan),
        });
      }
    }

    const totaleInleg = veiligeStart + veiligeInleg * maanden;
    const totaleWinst = vermogen - totaleInleg;

    return {
      eindvermogen: vermogen,
      totaleInleg,
      totaleWinst,
      grafiekData,
    };
  }, [startvermogen, maandelijkseInleg, rendement, jaren]);

  return (
    <main className="min-h-screen bg-zinc-950 px-6 py-12 text-white">
      <div className="mx-auto max-w-6xl">
        <a
          href="/"
          className="text-sm font-semibold text-emerald-400 transition hover:text-emerald-300"
        >
          ← Terug naar home
        </a>

        <header className="mt-8">
          <p className="text-sm font-semibold text-emerald-400">Project 100K</p>

          <h1 className="mt-3 text-4xl font-bold tracking-tight sm:text-5xl">
            Vermogenscalculator
          </h1>

          <p className="mt-4 max-w-2xl text-zinc-400">
            Bereken hoeveel jouw vermogen mogelijk kan groeien met maandelijkse
            inleg en een gemiddeld jaarlijks rendement.
          </p>
        </header>

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
                className="mt-2 w-full rounded-xl border border-zinc-700 bg-zinc-950 px-4 py-3 text-white outline-none transition focus:border-emerald-500"
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
                className="mt-2 w-full rounded-xl border border-zinc-700 bg-zinc-950 px-4 py-3 text-white outline-none transition focus:border-emerald-500"
              />
            </div>

            <div className="mt-6">
              <label className="block text-sm text-zinc-400">
                Jaarlijks rendement (%)
              </label>

              <input
                type="number"
                step="0.1"
                value={rendement}
                onChange={(event) =>
                  setRendement(Number(event.target.value))
                }
                className="mt-2 w-full rounded-xl border border-zinc-700 bg-zinc-950 px-4 py-3 text-white outline-none transition focus:border-emerald-500"
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
                className="mt-2 w-full rounded-xl border border-zinc-700 bg-zinc-950 px-4 py-3 text-white outline-none transition focus:border-emerald-500"
              />
            </div>
          </section>

          <section className="rounded-2xl border border-emerald-500/20 bg-emerald-500/5 p-6">
            <p className="text-sm text-zinc-400">Geschat eindvermogen</p>

            <p className="mt-3 text-4xl font-bold text-emerald-400 sm:text-5xl">
              {formatEuro(berekening.eindvermogen)}
            </p>

            <div className="mt-8 space-y-4">
              <div className="rounded-xl border border-zinc-800 bg-zinc-950 p-4">
                <p className="text-sm text-zinc-500">Totale inleg</p>
                <p className="mt-1 text-2xl font-bold">
                  {formatEuro(berekening.totaleInleg)}
                </p>
              </div>

              <div className="rounded-xl border border-zinc-800 bg-zinc-950 p-4">
                <p className="text-sm text-zinc-500">Geschatte winst</p>
                <p
                  className={`mt-1 text-2xl font-bold ${
                    berekening.totaleWinst >= 0
                      ? "text-emerald-400"
                      : "text-red-400"
                  }`}
                >
                  {formatEuro(berekening.totaleWinst)}
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

        <section className="mt-6 rounded-2xl border border-zinc-800 bg-zinc-900 p-6">
          <p className="text-sm text-zinc-500">Vermogensgroei</p>
          <h2 className="mt-1 text-2xl font-bold">Groei per jaar</h2>

          <div className="mt-6 h-80 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={berekening.grafiekData}>
                <defs>
                  <linearGradient
                    id="vermogenGradient"
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
                    name === "vermogen" ? "Vermogen" : "Totale inleg",
                  ]}
                  labelFormatter={(label) => `Jaar ${label}`}
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
                  fill="url(#vermogenGradient)"
                  name="vermogen"
                  animationDuration={700}
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </section>

        <section className="mt-6 rounded-2xl border border-zinc-800 bg-zinc-900 p-6">
          <div>
            <p className="text-sm text-zinc-500">Jaaroverzicht</p>
            <h2 className="mt-1 text-2xl font-bold">Resultaten per jaar</h2>
          </div>

          <div className="mt-6 overflow-x-auto">
            <table className="w-full min-w-[700px] text-left">
              <thead>
                <tr className="border-b border-zinc-800 text-sm text-zinc-400">
                  <th className="px-4 py-3 font-medium">Jaar</th>
                  <th className="px-4 py-3 font-medium">Totale inleg</th>
                  <th className="px-4 py-3 font-medium">Vermogen</th>
                  <th className="px-4 py-3 font-medium">Winst</th>
                </tr>
              </thead>

              <tbody>
                {berekening.grafiekData.map((item) => (
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