"use client";

import { useState } from "react";
import { BookOpen, Leaf, Globe, DollarSign, SlidersHorizontal, ChevronDown } from "lucide-react";
import DonutChart from "../components/DonutChart";
import BarChart from "../components/BarChart";

export default function AdminDashboard() {

    const donations = Array(7).fill({
        name: "Donor Name",
        id: "54345345353543",
        date: "01-01-2026",
        type: "Monthly Autopay",
        amount: "$ 50",
        status: "Success"
    });

    return (
        <div className="min-h-screen bg-[#FEFFFD]">
            {/* MAIN */}
            <main>
                {/* CONTENT */}
                <div className="p-4">

                    <h1 className="text-[25px] font-medium text-[#455F0F] mb-6">Dashboard</h1>

                    {/* STAT CARDS */}
                    <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">

                        <Stat icon={<BookOpen size={24} />} value="4" label="Courses" sub="Active Courses" />
                        <Stat icon={<Leaf size={24} />} value="0" label="Events" sub="Active Upcoming events" />
                        <Stat icon={<Globe size={24} />} value="12" label="Blogs" sub="News & Recaps posted" />
                        <Stat icon={<DollarSign size={24} />} value="2563" label="Dollars" sub="Total Donations received" />

                    </div>

                    {/* DONATION TABLE */}
                    {/* <div className="bg-white rounded-xl p-6 shadow-sm">

                        <div className="flex justify-between items-center mb-4">
                            <h2 className="text-[25px] font-semibold text-[#455F0F]">Donations List</h2>

                            <FilterDropdown />

                        </div> */}

                    {/* <div className="overflow-auto border border-[#D9D9D9] rounded-[12px]">

                            <table className="w-full border-collapse"> */}

                    {/* HEADER */}
                    {/* <thead className="text-[#00360C] text-[16px]">
                                    <tr>
                                        <th className="px-4 py-4 border-r border-b border-[#D9D9D9] text-left font-medium">Donor Name</th>
                                        <th className="px-4 py-4 border-r border-b border-[#D9D9D9] text-left font-medium">Transaction ID</th>
                                        <th className="px-4 py-4 border-r border-b border-[#D9D9D9] text-left font-medium">Date</th>
                                        <th className="px-4 py-4 border-r border-b border-[#D9D9D9] text-left font-medium">Type</th>
                                        <th className="px-4 py-4 border-r border-b border-[#D9D9D9] text-left font-medium">Amount ($)</th>
                                        <th className="px-4 py-4 border-b border-[#D9D9D9] text-left font-medium">Status</th>
                                    </tr>
                                </thead> */}

                    {/* BODY */}
                    {/* <tbody>
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
                                </tbody> */}

                    {/* </table>
                        </div>
                    </div> */}
                    <div className="bg-white rounded-2xl p-6 shadow-md">
                        <h2 className="text-green-800 font-semibold text-lg">
                            Revenue Distribution
                        </h2>
                        <div className="flex flex-row justify-between">
                            <DonutChart />
                            <BarChart />
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
}

//
// COMPONENTS
//

function SideItem({ label, active }: any) {
    return (
        <div className={`px-4 py-2 rounded-lg cursor-pointer ${active ? "bg-[#4B6F12] text-white" : "hover:bg-gray-100"}`}>
            {label}
        </div>
    );
}

function Stat({ icon, value, label, sub }: any) {
    return (
        <div className="bg-white rounded-[16px] p-6 shadow-[1px_1px_2px_0px_#0000001A,-1px_-1px_2px_0px_#0000001A] relative">

            {/* ICON TOP RIGHT */}
            <div className="absolute top-5 right-5 text-[#455F0F]">
                {icon}
            </div>

            {/* VALUE + LABEL */}
            <div className="flex items-end gap-3 mt-4">
                <span className="text-[42px] font-medium text-[#455F0F] leading-none">
                    {value}
                </span>

                <span className="text-[18px] text-[#00360C]">
                    {label}
                </span>
            </div>

            {/* DIVIDER */}
            <div className="border-t-[0.5px] border-[#D9D9D9] my-5"></div>

            {/* SUBTEXT */}
            <p className="text-[14px] text-[#00360C]">
                {sub}
            </p>

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


