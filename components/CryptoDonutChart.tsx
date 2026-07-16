"use client";

import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Tooltip,
} from "recharts";

const data = [
  { name: "Bitcoin", value: 5200 },
  { name: "Ethereum", value: 3120 },
  { name: "Bittensor", value: 1260 },
  { name: "Render", value: 850 },
];

const COLORS = [
  "#10b981",
  "#22c55e",
  "#34d399",
  "#6ee7b7",
];

export default function CryptoDonutChart() {
  return (
    <div className="rounded-2xl border border-zinc-800 bg-zinc-900 p-6">
      <p className="text-sm text-zinc-500">
        Portfolioverdeling
      </p>

      <h2 className="mt-2 text-2xl font-bold">
        Portfolio
      </h2>

      <div className="mt-6 h-80">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={data}
              innerRadius={80}
              outerRadius={120}
              paddingAngle={3}
              dataKey="value"
            >
              {data.map((entry, index) => (
                <Cell
                  key={index}
                  fill={COLORS[index % COLORS.length]}
                />
              ))}
            </Pie>

            <Tooltip />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}