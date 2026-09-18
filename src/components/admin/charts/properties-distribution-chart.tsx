"use client";

import { PieChart, Pie, Cell, Legend, Tooltip, ResponsiveContainer } from "recharts";

interface PropertyDistributionChartProps {
  data?: Array<{ name: string; value: number }>;
}

export function PropertiesDistributionChart({ data }: PropertyDistributionChartProps) {
  const defaultData = [
    { name: "Casas", value: 45 },
    { name: "Departamentos", value: 28 },
    { name: "Locales", value: 18 },
    { name: "Terrenos", value: 9 },
  ];

  const COLORS = ["#3b82f6", "#10b981", "#f59e0b", "#ef4444"];

  return (
    <ResponsiveContainer width="100%" height={300}>
      <PieChart>
        <Pie
          data={data || defaultData}
          cx="50%"
          cy="50%"
          labelLine={false}
          label={({ name, value }) => `${name}: ${value}`}
          outerRadius={100}
          fill="#8884d8"
          dataKey="value"
        >
          {(data || defaultData).map((entry, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
          ))}
        </Pie>
        <Tooltip formatter={(value) => `${value} propiedades`} />
        <Legend />
      </PieChart>
    </ResponsiveContainer>
  );
}
