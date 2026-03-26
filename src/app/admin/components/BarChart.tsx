"use client";
import { BarChart, Bar, XAxis, YAxis, Tooltip } from "recharts";

const data = [
  { name: "Jan", value: 7000 },
  { name: "Feb", value: 5000 },
  { name: "Mar", value: 22000 },
  { name: "Apr", value: 12000 },
  { name: "May", value: 7000 },
  { name: "Jun", value: 9000 },
];

export default function DonationsChart() {
  return (
    <BarChart width={400} height={250} data={data}>
      <XAxis dataKey="name" />
      <YAxis />
      <Tooltip />
      <Bar dataKey="value" fill="#3f6212" radius={[8, 8, 0, 0]} />
    </BarChart>
  );
}