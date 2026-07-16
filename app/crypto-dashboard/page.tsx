"use client";

import { useMemo, useState } from "react";
import {
  Cell,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
} from "recharts";

type Coin = {
  id: number;
  name: string;
  symbol: string;
  amount: number;
  buyPrice: number;
  currentPrice: number;
};

const CHART_COLORS = [
  "#10b981",
  "#22c55e",
  "#34d399",
  "#6ee7b7",
  "#059669",
  "#047857",
];

function formatEuro(value: number) {
  return new Intl.NumberFormat("nl-NL", {
    style: "currency",
    currency: "EUR",
    maximumFractionDigits: 0,
  }).format(value);
}

export default function CryptoDashboardPage() {
  const [coins, setCoins] = useState<Coin[]>([
    {
      id: 1,
      name: "Bitcoin",
      symbol: "BTC",
      amount: 0.08,
      buyPrice: 52000,
      currentPrice: 65000,
    },
    {
      id: 2,
      name: "Ethereum",
      symbol: "ETH",
      amount: 1.2,
      buyPrice: 2100,
      currentPrice: 2600,
    },
    {
      id: 3,
      name: "Bittensor",
      symbol: "TAO",
      amount: 3,
      buyPrice: 280,
      currentPrice: 420,
    },
    {
      id: 4,
      name: "Render",
      symbol: "RNDR",
      amount: 100,
      buyPrice: 5.5,
      currentPrice: 8.5,
    },
  ]);

  const resultaten = useMemo(() => {
    const coinData = coins.map((coin) => {
      const inleg = coin.amount * coin.buyPrice;
      const waarde = coin.amount * coin.currentPrice;
      const winst = waarde - inleg;
      const winstPercentage = inleg > 0 ? (winst / inleg) * 100 : 0;

      return {
        ...coin,
        inleg,
        waarde,
        winst,
        winstPercentage,
      };
    });

    const totaleWaarde = coinData.reduce(
      (totaal, coin) => totaal + coin.waarde,
      0,
    );

    const totaleInleg = coinData.reduce(
      (totaal, coin) => totaal + coin.inleg,
      0,
    );

    const totaleWinst = totaleWaarde - totaleInleg;

    const totaalRendement =
      totaleInleg > 0 ? (totaleWinst / totaleInleg) * 100 : 0;

    const besteCoin =
      [...coinData].sort(
        (a, b) => b.winstPercentage - a.winstPercentage,
      )[0] ?? null;

    const chartData = coinData
      .filter((coin) => coin.waarde > 0)
      .map((coin) => ({
        name: coin.symbol,
        value: coin.waarde,
      }));

    return {
      coinData,
      totaleWaarde,
      totaleInleg,
      totaleWinst,
      totaalRendement,
      besteCoin,
      chartData,
    };
  }, [coins]);

  function updateCoin(
    id: number,
    field: "amount" | "buyPrice" | "currentPrice",
    value: string,
  ) {
    const nieuweWaarde = Number(value);

    setCoins((huidigeCoins) =>
      huidigeCoins.map((coin) =>
        coin.id === id
          ? {
              ...coin,
              [field]: Number.isFinite(nieuweWaarde) ? nieuweWaarde : 0,
            }
          : coin,
      ),
    );
  }

  function addCoin() {
    const nieuwId =
      coins.length > 0 ? Math.max(...coins.map((coin) => coin.id)) + 1 : 1;

    setCoins((huidigeCoins) => [
      ...huidigeCoins,
      {
        id: nieuwId,
        name: "Nieuwe coin",
        symbol: `COIN${nieuwId}`,
        amount: 0,
        buyPrice: 0,
        currentPrice: 0,
      },
    ]);
  }

  function removeCoin(id: number) {
    setCoins((huidigeCoins) =>
      huidigeCoins.filter((coin) => coin.id !== id),
    );
  }

  return (
    <main className="min-h-screen bg-zinc-950 px-6 py-12 text-white">
      <div className="mx-auto max-w-6xl">
        <header className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-sm font-semibold uppercase tracking-wider text-emerald-400">
              Project 100K
            </p>

            <h1 className="mt-2 text-4xl font-bold sm:text-5xl">
              Crypto Dashboard
            </h1>

            <p className="mt-4 max-w-2xl text-zinc-400">
              Bekijk jouw cryptoportfolio, verdeling en prestaties in één
              overzicht.
            </p>
          </div>

          <button
            type="button"
            onClick={addCoin}
            className="rounded-xl bg-emerald-500 px-5 py-3 font-semibold text-zinc-950 transition hover:bg-emerald-400"
          >
            + Coin toevoegen
          </button>
        </header>

        <section className="mt-10 grid gap-5 sm:grid-cols-2 xl:grid-cols-5">
          <div className="rounded-2xl border border-zinc-800 bg-zinc-900 p-6">
            <p className="text-sm text-zinc-500">Totale waarde</p>
            <p className="mt-2 text-3xl font-bold text-emerald-400">
              {formatEuro(resultaten.totaleWaarde)}
            </p>
          </div>

          <div className="rounded-2xl border border-zinc-800 bg-zinc-900 p-6">
            <p className="text-sm text-zinc-500">Totale winst</p>
            <p
              className={`mt-2 text-3xl font-bold ${
                resultaten.totaleWinst >= 0
                  ? "text-emerald-400"
                  : "text-red-400"
              }`}
            >
              {formatEuro(resultaten.totaleWinst)}
            </p>
          </div>

          <div className="rounded-2xl border border-zinc-800 bg-zinc-900 p-6">
            <p className="text-sm text-zinc-500">Rendement</p>
            <p
              className={`mt-2 text-3xl font-bold ${
                resultaten.totaalRendement >= 0
                  ? "text-emerald-400"
                  : "text-red-400"
              }`}
            >
              {resultaten.totaalRendement.toFixed(1)}%
            </p>
          </div>

          <div className="rounded-2xl border border-zinc-800 bg-zinc-900 p-6">
            <p className="text-sm text-zinc-500">Beste coin</p>
            <p className="mt-2 text-3xl font-bold">
              {resultaten.besteCoin?.symbol ?? "-"}
            </p>
            <p className="mt-1 text-sm text-emerald-400">
              {resultaten.besteCoin
                ? `${resultaten.besteCoin.winstPercentage.toFixed(1)}%`
                : "0%"}
            </p>
          </div>

          <div className="rounded-2xl border border-zinc-800 bg-zinc-900 p-6">
            <p className="text-sm text-zinc-500">Aantal coins</p>
            <p className="mt-2 text-3xl font-bold">{coins.length}</p>
          </div>
        </section>

        <section className="mt-6 grid gap-6 lg:grid-cols-2">
          <div className="rounded-2xl border border-zinc-800 bg-zinc-900 p-6">
            <p className="text-sm text-zinc-500">Portefeuilleverdeling</p>
            <h2 className="mt-1 text-2xl font-bold">Donut chart</h2>

            <div className="relative mt-6 h-80">
              {resultaten.chartData.length > 0 ? (
                <>
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={resultaten.chartData}
                        dataKey="value"
                        nameKey="name"
                        innerRadius={85}
                        outerRadius={125}
                        paddingAngle={3}
                        stroke="none"
                      >
                        {resultaten.chartData.map((item, index) => (
                          <Cell
                            key={item.name}
                            fill={
                              CHART_COLORS[index % CHART_COLORS.length]
                            }
                          />
                        ))}
                      </Pie>

                      <Tooltip
                        formatter={(value) => formatEuro(Number(value))}
                        contentStyle={{
                          backgroundColor: "#09090b",
                          border: "1px solid #27272a",
                          borderRadius: "12px",
                        }}
                      />
                    </PieChart>
                  </ResponsiveContainer>

                  <div className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center">
                    <span className="text-sm text-zinc-500">
                      Totale waarde
                    </span>
                    <span className="mt-1 text-2xl font-bold">
                      {formatEuro(resultaten.totaleWaarde)}
                    </span>
                  </div>
                </>
              ) : (
                <div className="flex h-full items-center justify-center text-zinc-500">
                  Voeg eerst een coin met waarde toe.
                </div>
              )}
            </div>

            <div className="mt-4 grid grid-cols-2 gap-3">
              {resultaten.chartData.map((item, index) => (
                <div
                  key={item.name}
                  className="flex items-center justify-between rounded-lg bg-zinc-950 px-3 py-2"
                >
                  <div className="flex items-center gap-2">
                    <span
                      className="h-3 w-3 rounded-full"
                      style={{
                        backgroundColor:
                          CHART_COLORS[index % CHART_COLORS.length],
                      }}
                    />
                    <span className="text-sm font-medium">{item.name}</span>
                  </div>

                  <span className="text-sm text-zinc-400">
                    {resultaten.totaleWaarde > 0
                      ? `${(
                          (item.value / resultaten.totaleWaarde) *
                          100
                        ).toFixed(1)}%`
                      : "0%"}
                  </span>
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-2xl border border-zinc-800 bg-zinc-900 p-6">
            <p className="text-sm text-zinc-500">Portefeuille</p>
            <h2 className="mt-1 text-2xl font-bold">Jouw coins</h2>

            <div className="mt-6 space-y-5">
              {resultaten.coinData.map((coin, index) => {
                const percentage =
                  resultaten.totaleWaarde > 0
                    ? (coin.waarde / resultaten.totaleWaarde) * 100
                    : 0;

                return (
                  <div key={coin.id}>
                    <div className="flex items-center justify-between gap-4">
                      <div>
                        <p className="font-semibold">
                          {coin.name}{" "}
                          <span className="text-zinc-500">
                            ({coin.symbol})
                          </span>
                        </p>

                        <p className="mt-1 text-sm text-zinc-500">
                          {percentage.toFixed(1)}% van portfolio
                        </p>
                      </div>

                      <p className="font-semibold">
                        {formatEuro(coin.waarde)}
                      </p>
                    </div>

                    <div className="mt-3 h-3 overflow-hidden rounded-full bg-zinc-800">
                      <div
                        className="h-full rounded-full"
                        style={{
                          width: `${Math.min(
                            100,
                            Math.max(0, percentage),
                          )}%`,
                          backgroundColor:
                            CHART_COLORS[index % CHART_COLORS.length],
                        }}
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        <section className="mt-6 rounded-2xl border border-zinc-800 bg-zinc-900 p-6">
          <div>
            <p className="text-sm text-zinc-500">Portfolio</p>
            <h2 className="mt-1 text-2xl font-bold">
              Posities en prestaties
            </h2>
          </div>

          <div className="mt-6 overflow-x-auto">
            <table className="w-full min-w-[1000px] text-left">
              <thead>
                <tr className="border-b border-zinc-800 text-sm text-zinc-400">
                  <th className="px-4 py-3 font-medium">Coin</th>
                  <th className="px-4 py-3 font-medium">Aantal</th>
                  <th className="px-4 py-3 font-medium">Aankoopprijs</th>
                  <th className="px-4 py-3 font-medium">Huidige prijs</th>
                  <th className="px-4 py-3 font-medium">Waarde</th>
                  <th className="px-4 py-3 font-medium">Winst</th>
                  <th className="px-4 py-3 font-medium">Actie</th>
                </tr>
              </thead>

              <tbody>
                {resultaten.coinData.map((coin) => (
                  <tr
                    key={coin.id}
                    className="border-b border-zinc-800"
                  >
                    <td className="px-4 py-4">
                      <div className="font-semibold">{coin.name}</div>
                      <div className="text-sm text-zinc-500">
                        {coin.symbol}
                      </div>
                    </td>

                    <td className="px-4 py-4">
                      <input
                        type="number"
                        step="any"
                        min="0"
                        value={coin.amount}
                        onChange={(event) =>
                          updateCoin(
                            coin.id,
                            "amount",
                            event.target.value,
                          )
                        }
                        className="w-28 rounded-lg border border-zinc-700 bg-zinc-950 px-3 py-2 outline-none focus:border-emerald-500"
                      />
                    </td>

                    <td className="px-4 py-4">
                      <input
                        type="number"
                        step="any"
                        min="0"
                        value={coin.buyPrice}
                        onChange={(event) =>
                          updateCoin(
                            coin.id,
                            "buyPrice",
                            event.target.value,
                          )
                        }
                        className="w-32 rounded-lg border border-zinc-700 bg-zinc-950 px-3 py-2 outline-none focus:border-emerald-500"
                      />
                    </td>

                    <td className="px-4 py-4">
                      <input
                        type="number"
                        step="any"
                        min="0"
                        value={coin.currentPrice}
                        onChange={(event) =>
                          updateCoin(
                            coin.id,
                            "currentPrice",
                            event.target.value,
                          )
                        }
                        className="w-32 rounded-lg border border-zinc-700 bg-zinc-950 px-3 py-2 outline-none focus:border-emerald-500"
                      />
                    </td>

                    <td className="px-4 py-4 font-semibold text-emerald-400">
                      {formatEuro(coin.waarde)}
                    </td>

                    <td
                      className={`px-4 py-4 font-semibold ${
                        coin.winst >= 0
                          ? "text-emerald-400"
                          : "text-red-400"
                      }`}
                    >
                      {formatEuro(coin.winst)}
                      <div className="mt-1 text-sm">
                        {coin.winstPercentage.toFixed(1)}%
                      </div>
                    </td>

                    <td className="px-4 py-4">
                      <button
                        type="button"
                        onClick={() => removeCoin(coin.id)}
                        className="rounded-lg border border-red-500/30 px-3 py-2 text-sm font-semibold text-red-400 transition hover:bg-red-500/10"
                      >
                        Verwijderen
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="mt-6 grid gap-4 sm:grid-cols-3">
            <div className="rounded-xl border border-zinc-800 bg-zinc-950 p-4">
              <p className="text-sm text-zinc-500">Totale inleg</p>
              <p className="mt-1 text-2xl font-bold">
                {formatEuro(resultaten.totaleInleg)}
              </p>
            </div>

            <div className="rounded-xl border border-zinc-800 bg-zinc-950 p-4">
              <p className="text-sm text-zinc-500">Huidige waarde</p>
              <p className="mt-1 text-2xl font-bold text-emerald-400">
                {formatEuro(resultaten.totaleWaarde)}
              </p>
            </div>

            <div className="rounded-xl border border-zinc-800 bg-zinc-950 p-4">
              <p className="text-sm text-zinc-500">Resultaat</p>
              <p
                className={`mt-1 text-2xl font-bold ${
                  resultaten.totaleWinst >= 0
                    ? "text-emerald-400"
                    : "text-red-400"
                }`}
              >
                {formatEuro(resultaten.totaleWinst)}
              </p>
            </div>
          </div>
        </section>

        <footer className="mt-12 border-t border-zinc-800 py-8 text-center">
          <p className="font-bold text-emerald-400">Project100K</p>
          <p className="mt-2 text-sm text-zinc-500">
            Building wealth one investment at a time.
          </p>
          <p className="mt-2 text-xs text-zinc-600">
            © 2026 Project100K
          </p>
        </footer>
      </div>
    </main>
  );
}