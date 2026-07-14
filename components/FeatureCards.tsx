import Link from "next/link";

const features = [
  {
    title: "Vermogenscalculator",
    description:
      "Bereken hoe jouw vermogen groeit met maandelijkse inleg en rendement.",
    link: "/calculator",
    icon: "📈",
  },
  {
    title: "Dashboard",
    description:
      "Bekijk je voortgang richting €100.000 in één overzicht.",
    link: "/dashboard",
    icon: "📊",
  },
  {
    title: "ETF Calculator",
    description:
      "Binnenkort beschikbaar.",
    link: "#",
    icon: "💰",
  },
  {
    title: "Crypto Dashboard",
    description:
      "Binnenkort beschikbaar.",
    link: "#",
    icon: "₿",
  },
];

export default function FeatureCards() {
  return (
    <section className="mx-auto mt-8 max-w-7xl px-6">
      <div className="mb-8">
        <p className="text-sm font-semibold uppercase tracking-wider text-emerald-400">
          Tools
        </p>

        <h2 className="mt-2 text-4xl font-bold">
          Alles om jouw vermogen te laten groeien
        </h2>

        <p className="mt-3 max-w-2xl text-zinc-400">
          Bouw stap voor stap aan jouw financiële toekomst met slimme calculators
          en dashboards.
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
        {features.map((feature) => (
          <Link
            key={feature.title}
            href={feature.link}
            className="group rounded-2xl border border-zinc-800 bg-zinc-900 p-6 transition hover:-translate-y-1 hover:border-emerald-500 hover:bg-zinc-800"
          >
            <div className="text-5xl">{feature.icon}</div>

            <h3 className="mt-5 text-xl font-bold">
              {feature.title}
            </h3>

            <p className="mt-3 text-sm leading-7 text-zinc-400">
              {feature.description}
            </p>

            <div className="mt-6 text-sm font-semibold text-emerald-400">
              Open tool →
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}