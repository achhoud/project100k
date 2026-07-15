type StatCardProps = {
  title: string;
  value: string;
  accent?: boolean;
};

export default function StatCard({
  title,
  value,
  accent = false,
}: StatCardProps) {
  return (
    <div className="rounded-2xl border border-zinc-800 bg-zinc-900 p-6">
      <p className="text-sm text-zinc-500">{title}</p>

      <h3
        className={`mt-2 text-3xl font-bold ${
          accent ? "text-emerald-400" : "text-white"
        }`}
      >
        {value}
      </h3>
    </div>
  );
}