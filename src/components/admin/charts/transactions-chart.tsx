"use client";

import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";

interface TransactionsChartProps {
  data?: Array<{ name: string; amount: number; count: number }>;
}

export function TransactionsChart({ data }: TransactionsChartProps) {
  const defaultData = [
    { name: "Lun", amount: 2400, count: 5 },
    { name: "Mar", amount: 3210, count: 8 },
    { name: "Mié", amount: 1290, count: 3 },
    { name: "Jue", amount: 3800, count: 12 },
    { name: "Vie", amount: 2210, count: 9 },
    { name: "Sáb", amount: 2290, count: 7 },
    { name: "Dom", amount: 2000, count: 4 },
  ];

  return (
    <ResponsiveContainer width="100%" height={300}>
      <LineChart data={data || defaultData}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Line 
          type="monotone" 
          dataKey="amount" 
          stroke="#3b82f6" 
          strokeWidth={2}
          name="Monto ($)"
          dot={{ fill: "#3b82f6", r: 4 }}
          activeDot={{ r: 6 }}
        />
        <Line 
          type="monotone" 
          dataKey="count" 
          stroke="#10b981" 
          strokeWidth={2}
          name="Cantidad"
          dot={{ fill: "#10b981", r: 4 }}
          activeDot={{ r: 6 }}
        />
      </LineChart>
    </ResponsiveContainer>
  );
}
