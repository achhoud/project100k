"use client";

import { useMemo, useState } from "react";

type Coin = {
  name: string;
  symbol: string;
  amount: number;
  buyPrice: number;
  currentPrice: number;
};

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
      name: "Bitcoin",
      symbol: "BTC",
      amount: 0.08,
      buyPrice: 52000,
      currentPrice: 65000,
    },
    {
      name: "Ethereum",
      symbol: "ETH",
      amount: 1.2,
      buyPrice: 2100,
      currentPrice: 2600,
    },
    {
      name: "Bittensor",
      symbol: "TAO",
      amount: 3,
      buyPrice: 280,
      currentPrice: 420,
    },
    {
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

    const besteCoin =
      [...coinData].sort(
        (a, b) => b.winstPercentage - a.winstPercentage,
      )[0] ?? null;

    return {
      coinData,
      totaleWaarde,
      totaleInleg,
      totaleWinst,
      besteCoin,
    };
  }, [coins]);

  function updateCoin(
    index: number,
    field: keyof Coin,
    value: string,
  ) {
    setCoins((huidigeCoins) =>
      huidigeCoins.map((coin, coinIndex) =>
        coinIndex === index
          ? {
              ...coin,
              [field]:
                field === "name" || field === "symbol"
                  ? value
                  : Number(value),
            }
          : coin,
      ),
    );
  }

  return (
    <main className="min-h-screen bg-zinc-950 px-6 py-12 text-white">
      <div className="mx-auto max-w-6xl">
        <header>
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
        </header>

        <section className="mt-10 grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
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

        <section className="mt-6 rounded-2xl border border-zinc-800 bg-zinc-900 p-6">
          <p className="text-sm text-zinc-500">Portefeuilleverdeling</p>
          <h2 className="mt-1 text-2xl font-bold">Jouw coins</h2>

          <div className="mt-6 space-y-5">
            {resultaten.coinData.map((coin) => {
              const percentage =
                resultaten.totaleWaarde > 0
                  ? (coin.waarde / resultaten.totaleWaarde) * 100
                  : 0;

              return (
                <div key={coin.symbol}>
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
                      className="h-full rounded-full bg-emerald-500"
                      style={{
                        width: `${Math.min(100, Math.max(0, percentage))}%`,
                      }}
                    />
                  </div>
                </div>
              );
            })}
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
            <table className="w-full min-w-[900px] text-left">
              <thead>
                <tr className="border-b border-zinc-800 text-sm text-zinc-400">
                  <th className="px-4 py-3 font-medium">Coin</th>
                  <th className="px-4 py-3 font-medium">Aantal</th>
                  <th className="px-4 py-3 font-medium">Aankoopprijs</th>
                  <th className="px-4 py-3 font-medium">Huidige prijs</th>
                  <th className="px-4 py-3 font-medium">Waarde</th>
                  <th className="px-4 py-3 font-medium">Winst</th>
                </tr>
              </thead>

              <tbody>
                {resultaten.coinData.map((coin, index) => (
                  <tr
                    key={coin.symbol}
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
                        value={coin.amount}
                        onChange={(event) =>
                          updateCoin(index, "amount", event.target.value)
                        }
                        className="w-28 rounded-lg border border-zinc-700 bg-zinc-950 px-3 py-2 outline-none focus:border-emerald-500"
                      />
                    </td>

                    <td className="px-4 py-4">
                      <input
                        type="number"
                        step="any"
                        value={coin.buyPrice}
                        onChange={(event) =>
                          updateCoin(index, "buyPrice", event.target.value)
                        }
                        className="w-32 rounded-lg border border-zinc-700 bg-zinc-950 px-3 py-2 outline-none focus:border-emerald-500"
                      />
                    </td>

                    <td className="px-4 py-4">
                      <input
                        type="number"
                        step="any"
                        value={coin.currentPrice}
                        onChange={(event) =>
                          updateCoin(
                            index,
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
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="mt-6 grid gap-4 sm:grid-cols-2">
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
          </div>
        </section>
      </div>
    </main>
  );
}