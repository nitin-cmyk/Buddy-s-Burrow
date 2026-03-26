"use client";

import { useState } from "react";
import YearlyBarChart from "../components/YearlyBarChart";
import PaymentStatusDonut from "../components/PaymentDonutChart";
import { SlidersHorizontal, ChevronDown } from "lucide-react";

export default function DonationsPage() {

    const donations = Array(7).fill({
        name: "Donor Name",
        id: "54345345353543",
        date: "01-01-2026",
        type: "Monthly Autopay",
        amount: "$ 50",
        status: "Success"
    });

    return (
        <div className="min-h-screen bg-[#f5f7f2] p-6">

            {/* Page Header */}
            <div className="mb-6">
                <h1 className="text-2xl font-bold text-[#3f6212]">
                    Donations Dashboard
                </h1>
                <p className="text-gray-500 text-sm">
                    Overview of all contributions and trends
                </p>
            </div>

            {/* Grid Layout */}
            <div className="flex flex-col gap-6">

                {/* Left Card */}
                <YearlyBarChart />

                {/* Right Card (placeholder for future charts) */}
                <PaymentStatusDonut />

            </div>

            <div className="bg-white rounded-xl p-6 shadow-sm mt-10">

                <div className="flex justify-between items-center mb-4">
                    <h2 className="text-[25px] font-semibold text-[#455F0F]">Donations List</h2>

                    <FilterDropdown />

                </div>

                <div className="overflow-auto border border-[#D9D9D9] rounded-[12px]">

                    <table className="w-full border-collapse">

                        {/* HEADER */}
                        <thead className="text-[#00360C] text-[16px]">
                            <tr>
                                <th className="px-4 py-4 border-r border-b border-[#D9D9D9] text-left font-medium">Donor Name</th>
                                <th className="px-4 py-4 border-r border-b border-[#D9D9D9] text-left font-medium">Transaction ID</th>
                                <th className="px-4 py-4 border-r border-b border-[#D9D9D9] text-left font-medium">Date</th>
                                <th className="px-4 py-4 border-r border-b border-[#D9D9D9] text-left font-medium">Type</th>
                                <th className="px-4 py-4 border-r border-b border-[#D9D9D9] text-left font-medium">Amount ($)</th>
                                <th className="px-4 py-4 border-b border-[#D9D9D9] text-left font-medium">Status</th>
                            </tr>
                        </thead>

                        {/* BODY */}
                        <tbody>
                            {donations.map((d, i) => (
                                <tr key={i} className="text-[#00360C] text-[14px]">
                                    <td className="px-4 py-4 border-r border-b border-[#D9D9D9]">{d.name}</td>
                                    <td className="px-4 py-4 border-r border-b border-[#D9D9D9]">{d.id}</td>
                                    <td className="px-4 py-4 border-r border-b border-[#D9D9D9]">{d.date}</td>
                                    <td className="px-4 py-4 border-r border-b border-[#D9D9D9]">{d.type}</td>
                                    <td className="px-4 py-4 border-r border-b border-[#D9D9D9] font-medium">{d.amount}</td>

                                    <td className="px-6 py-4 border-b border-[#D9D9D9]">
                                        <span className={`px-5 py-1.5 rounded-[4px] text-[12px] font-medium ${d.status === "Success"
                                            ? "bg-[#90B73B] text-white"
                                            : "border border-red-500 text-red-500"
                                            }`}>
                                            {d.status}
                                        </span>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}

function FilterDropdown() {
    const [open, setOpen] = useState(false);
    const [selected, setSelected] = useState("Filters");

    const options = [
        "Last week",
        "Last 30 Days",
        "Monthly AutoPay's"
    ];

    return (
        <div className="relative inline-block">

            {/* BUTTON */}
            <button
                onClick={() => setOpen(!open)}
                className="flex items-center gap-2 text-[#3C5E0E] font-medium"
            >
                <SlidersHorizontal size={18} />
                {selected}
                <ChevronDown size={16} />
            </button>

            {/* DROPDOWN */}
            {open && (
                <div className="absolute left-1/2 -translate-x-1/2 mt-3 w-35 bg-white rounded-[8px] shadow-[1px_1px_5px_0px_#00000040] overflow-hidden z-50">

                    {options.map((opt, i) => (
                        <div
                            key={i}
                            onClick={() => {
                                setSelected(opt);
                                setOpen(false);
                            }}
                            className={`py-4 text-center cursor-pointer text-[#3C5E0E] text-[12px] hover:bg-[#F6FBE9] ${i !== options.length - 1 ? "border-b border-[#E3E3E3]" : ""
                                }`}
                        >
                            {opt}
                        </div>
                    ))}

                </div>
            )}
        </div>
    );
}