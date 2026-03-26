"use client";

import { PieChart, Pie, Cell, ResponsiveContainer } from "recharts";

const data = [
  { name: "Successful Monthly", value: 53, color: "#84cc16" },
  { name: "Successful One-Time", value: 320, color: "#3f6212" },
  { name: "Failed Monthly", value: 29, color: "#ff5a1f" },
  { name: "Failed One-Time", value: 53, color: "#b91c1c" },
];

const total = data.reduce((acc, item) => acc + item.value, 0);

export default function PaymentStatusDonut() {
  return (
    <div className="bg-white rounded-2xl p-6 shadow-sm flex flex-col lg:flex-row items-center justify-between gap-6">

      {/* Donut Chart */}
      <div className="relative w-[280px] h-[280px]">

        <ResponsiveContainer>
          <PieChart>
            <Pie
              data={data}
              innerRadius={55}
              outerRadius={100}
              dataKey="value"
              stroke="none"
            >
              {data.map((entry, index) => (
                <Cell key={index} fill={entry.color} />
              ))}
            </Pie>
          </PieChart>
        </ResponsiveContainer>

        {/* Floating Percentage Bubbles */}
        {data.map((item, index) => {
          const percent = ((item.value / total) * 100).toFixed(0);

          const positions = [
            "top-[10%] right-[10%]",
            "bottom-[5%] left-[5%]",
            "left-[0%] top-[30%]",
            "top-[0%] left-[40%]",
          ];

          return (
            <div
              key={index}
              className={`absolute ${positions[index]} bg-gray-100 w-16 h-16 rounded-full flex items-center justify-center text-sm font-semibold shadow`}
            >
              {percent}%
            </div>
          );
        })}
      </div>

      {/* Legend */}
      <div className="flex flex-col gap-4 w-full max-w-[300px]">

        {data.map((item, index) => (
          <div key={index} className="flex items-center justify-between">
            
            <div className="flex items-center gap-3">
              <div
                className="w-4 h-4 rounded-full"
                style={{ backgroundColor: item.color }}
              />
              <span className="text-gray-600 text-sm">
                {item.name}
              </span>
            </div>

            <span className="font-semibold text-black">
              {item.value}
            </span>

          </div>
        ))}

      </div>
    </div>
  );
}