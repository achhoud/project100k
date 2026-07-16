export type CoinGeckoPrice = {
  eur: number;
};

const COINS = [
  "bitcoin",
  "ethereum",
  "render-token",
  "bittensor",
];

export async function getCryptoPrices() {
  const url = `https://api.coingecko.com/api/v3/simple/price?ids=${COINS.join(
    ",",
  )}&vs_currencies=eur`;

  const response = await fetch(url, {
    headers: {
      Accept: "application/json",
    },
    next: {
      revalidate: 60,
    },
  });

  if (!response.ok) {
    const foutTekst = await response.text();

    throw new Error(
      `CoinGecko-fout ${response.status}: ${foutTekst || response.statusText}`,
    );
  }

  return response.json() as Promise<
    Record<string, CoinGeckoPrice>
  >;
}