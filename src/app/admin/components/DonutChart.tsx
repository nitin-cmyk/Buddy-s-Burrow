"use client";
import { PieChart, Pie, Cell } from "recharts";

const data = [
  { name: "Monthly", value: 1000 },
  { name: "One-time", value: 7250 },
];

const COLORS = ["#90B73B", "#455F0F"];

export default function DonutChart() {
  return (
    <PieChart width={255} height={250}>
      <Pie
        data={data}
        innerRadius={60}
        outerRadius={100}
        dataKey="value"
      >
        {data.map((entry, index) => (
          <Cell key={index} fill={COLORS[index]} />
        ))}
      </Pie>
    </PieChart>
  );
}