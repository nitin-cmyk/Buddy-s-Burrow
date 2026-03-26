"use client";

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const data = [
  { month: "Jan", monthly: 1200, oneTime: 400 },
  { month: "Feb", monthly: 5000, oneTime: 600 },
  { month: "Mar", monthly: 12000, oneTime: 2000 },
  { month: "Apr", monthly: 15000, oneTime: 5000 },
  { month: "May", monthly: 8000, oneTime: 2000 },
  { month: "Jun", monthly: 15000, oneTime: 5000 },
  { month: "Jul", monthly: 10000, oneTime: 800 },
  { month: "Aug", monthly: 8000, oneTime: 1200 },
  { month: "Sep", monthly: 5000, oneTime: 900 },
  { month: "Oct", monthly: 12000, oneTime: 2000 },
  { month: "Nov", monthly: 8000, oneTime: 3500 },
  { month: "Dec", monthly: 18000, oneTime: 5000 },
];

export default function YearlyContribution() {
  return (
    <div className="bg-white rounded-2xl p-6 shadow-md w-full">
      
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-[#3f6212] text-xl font-semibold">
          Yearly Contribution
        </h2>

        <div className="text-[#3f6212] font-medium cursor-pointer">
          2025 ⌄
        </div>
      </div>

      {/* Chart */}
      <div className="w-full h-[300px]">
        <ResponsiveContainer>
          <BarChart data={data} barCategoryGap={20}>
            
            <XAxis
              dataKey="month"
              tick={{ fill: "#9ca3af" }}
              axisLine={false}
              tickLine={false}
            />

            <YAxis
              tick={{ fill: "#9ca3af" }}
              axisLine={false}
              tickLine={false}
            />

            <Tooltip />

            {/* Light green (background/top) */}
            <Bar
              dataKey="monthly"
              stackId="a"
              fill="#cfe7b0"
              radius={[10, 10, 0, 0]}
            />

            {/* Dark green (front/bottom) */}
            <Bar
              dataKey="oneTime"
              stackId="a"
              fill="#3f6212"
              radius={[10, 10, 0, 0]}
            />
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Footer Legend */}
      <div className="flex justify-between mt-6 text-sm text-gray-600">
        
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 rounded-full bg-[#cfe7b0]" />
          Total Monthly Payment Contributions
          <span className="ml-4 font-semibold text-black">$1,000</span>
        </div>

        <div className="flex items-center gap-2">
          <div className="w-4 h-4 rounded-full bg-[#3f6212]" />
          Total One Time Contributions
          <span className="ml-4 font-semibold text-black">$7,250</span>
        </div>

      </div>
    </div>
  );
}