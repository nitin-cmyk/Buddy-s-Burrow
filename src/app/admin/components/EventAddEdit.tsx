"use client";

import { useState } from "react";
import { useRouter, useParams } from "next/navigation";
import { ChevronDown, Trash2, ArrowUp } from "lucide-react";

const categories = [
    {
        value: "cleanup",
        label: "Clean-Up Drives",
        icon: "/cleanupdrive.svg",
    },
    {
        value: "workshop",
        label: "Eco Workshops",
        icon: "/ecoworkshop.svg",
    },
    {
        value: "school",
        label: "School Campaigns",
        icon: "/schoolcampaign.svg",
    },
    {
        value: "nature",
        label: "Nature walks",
        icon: "/naturewalk.svg",
    },
];


export default function EventEditor() {

    const router = useRouter();
    const params = useParams();

    const [open, setOpen] = useState(false);

    const eventId = params.eventId as string;
    const mode = eventId === "new" ? "create" : "edit";

    const [category, setCategory] = useState("");
    const [location, setLocation] = useState("");
    const [time, setTime] = useState("");
    const [date, setDate] = useState("");
    const [link, setLink] = useState("");

    return (
        <div className="px-3 sm:px-6 lg:px-10 py-5 sm:py-6 max-w-[900px] mx-auto">

            {/* GO BACK */}
            <button
                onClick={() => router.back()}
                className="border border-[#455F0F] px-4 py-2 rounded-lg text-[#455F0F] mb-5 sm:mb-6 text-[14px]"
            >
                ← Go back
            </button>

            {/* TITLE */}
            <h1 className="text-[22px] sm:text-[25px] font-medium text-[#455F0F] mb-6 sm:mb-8">
                Create / Edit Event
            </h1>

            {/* CATEGORY */}
            <h2 className="text-[16px] sm:text-[20px] font-medium text-[#33470B] mb-2">
                Select Event Type :
            </h2>

            <div className="relative mb-5 sm:mb-6">
                <button
                    type="button"
                    onClick={() => setOpen(!open)}
                    className="w-full border border-[#CFE2A7] rounded-[12px] px-4 py-3 flex items-center justify-between bg-white"
                >
                    <div className="flex items-center gap-3">
                        {category ? (
                            <>
                                <img
                                    src={categories.find(c => c.value === category)?.icon}
                                    alt=""
                                    className="w-5 h-5"
                                />
                                <span className="text-[#33470B] text-[14px]">
                                    {categories.find(c => c.value === category)?.label}
                                </span>
                            </>
                        ) : (
                            <span className="text-[#7B7B7B] text-[14px]">
                                Select the event category
                            </span>
                        )}
                    </div>

                    <ChevronDown className={`text-[#455F0F] transition ${open ? "rotate-180" : ""}`} />
                </button>

                {open && (
                    <div className="absolute z-20 mt-2 w-full bg-white border border-[#E5E5E5] rounded-[12px] shadow-[1px_1px_2px_0px_#0000001A,-1px_-1px_2px_0px_#0000001A] overflow-hidden divide-y divide-[#E5E5E5] max-h-[260px] overflow-y-auto">
                        {categories.map(item => (
                            <button
                                key={item.value}
                                onClick={() => {
                                    setCategory(item.value);
                                    setOpen(false);
                                }}
                                className="w-full px-4 py-3 flex items-center gap-3 hover:bg-[#EEF5E6] transition text-left"
                            >
                                <img src={item.icon} alt="" className="w-5 h-5" />
                                <span className="text-[#33470B] text-[14px]">
                                    {item.label}
                                </span>
                            </button>
                        ))}
                    </div>
                )}
            </div>

            {/* LOCATION */}
            <h2 className="text-[16px] sm:text-[20px] font-medium text-[#33470B] mb-2">
                Location :
            </h2>

            <div className="border border-[#CFE2A7] rounded-[12px] px-4 py-3 mb-5 sm:mb-6">
                <input
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                    placeholder="Enter the event location"
                    className="w-full outline-none text-[14px] bg-transparent placeholder:text-[#7B7B7B]"
                />

                <div className="mt-2">
                    <div className="h-[1px] bg-[#D9D9D9] w-full mb-1"></div>
                    <div className="flex justify-end">
                        <p className="text-[10px] text-[#7B7B7B]">
                            max 56 characters
                        </p>
                    </div>
                </div>
            </div>

            {/* TIME */}
            <h2 className="text-[16px] sm:text-[20px] font-medium text-[#33470B] mb-2">
                Time :
            </h2>

            <input
                type="time"
                value={time}
                onChange={(e) => setTime(e.target.value)}
                className="w-full border border-[#CFE2A7] rounded-[12px] px-4 py-3 mb-5 sm:mb-6 outline-none text-[14px]"
            />

            {/* DATE */}
            <h2 className="text-[16px] sm:text-[20px] font-medium text-[#33470B] mb-2">
                Date :
            </h2>

            <input
                type="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                className="w-full border border-[#CFE2A7] rounded-[12px] px-4 py-3 mb-5 sm:mb-6 outline-none text-[14px]"
            />

            {/* LINK */}
            <h2 className="text-[16px] sm:text-[20px] font-medium text-[#33470B] mb-2">
                Luma Link : Required
            </h2>

            <input
                value={link}
                onChange={(e) => setLink(e.target.value)}
                placeholder="Paste event link"
                className="w-full border border-[#CFE2A7] rounded-[12px] px-4 py-3 mb-8 sm:mb-10 outline-none text-[14px]"
            />

            {/* ACTIONS */}
            <div className="flex flex-col sm:flex-row justify-center gap-3 sm:gap-8">

                {mode === "edit" && (
                    <button className="w-full sm:w-auto border border-red-500 text-red-500 px-8 py-3 rounded-lg flex items-center justify-center gap-2">
                        Delete Event
                        <Trash2 size={16} />
                    </button>
                )}

                <button className="w-full sm:w-auto bg-[#455F0F] text-white px-10 py-3 rounded-lg flex items-center justify-center gap-2">
                    Save & Post
                    <ArrowUp size={16} />
                </button>

            </div>

        </div>
    );
}
