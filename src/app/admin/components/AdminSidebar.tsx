"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

import { LayoutDashboard, BookOpen, Calendar, Newspaper, DollarSign, LogOut, Menu, X } from "lucide-react";

export default function AdminSidebar() {

    const pathname = usePathname();

    const navItems = [
        { label: "Dashboard", icon: <LayoutDashboard size={18} />, href: "/admin/dashboard" },
        { label: "Courses", icon: <BookOpen size={18} />, href: "/admin/courses" },
        { label: "Events", icon: <Calendar size={18} />, href: "/admin/events" },
        { label: "News & Recaps", icon: <Newspaper size={18} />, href: "/admin/news&recaps" },
        { label: "Donations", icon: <DollarSign size={18} />, href: "/admin/donations" },
    ];


    const [open, setOpen] = useState(false);

    return (
        <>
            {/* MOBILE TOP BAR BUTTON */}
            <div className="lg:hidden fixed top-4 left-4 z-[60]">
                <button onClick={() => setOpen(true)} className="bg-white p-2 rounded-lg shadow">
                    <Menu size={22} />
                </button>
            </div>

            {/* OVERLAY */}
            {open && (
                <div
                    onClick={() => setOpen(false)}
                    className="fixed inset-0 bg-black/30 z-[55] lg:hidden"
                />
            )}

            {/* SIDEBAR */}
            <aside className={`
                fixed top-0 left-0 h-screen w-64 bg-white px-6 py-6 flex flex-col justify-between
                shadow-[1px_1px_5px_0px_#00000040] z-[60]
                transform transition-transform duration-300
                ${open ? "translate-x-0" : "-translate-x-full"}
                lg:translate-x-0
            `}>

                {/* CLOSE BUTTON MOBILE */}
                <div className="lg:hidden absolute top-4 right-4">
                    <button onClick={() => setOpen(false)}>
                        <X size={22} />
                    </button>
                </div>

                {/* TOP */}
                <div>

                    <div className="flex items-center gap-3 mb-10">
                        <Image src="/logoTrans.png" alt="Buddy’s Burrow Logo" width={38} height={38} priority />
                        <h2 className="font-medium text-[21px] text-[#90B73B] whitespace-nowrap">
                            Buddy’s Burrow
                        </h2>
                    </div>

                    <nav className="space-y-3">

                        {navItems.map((item, i) => (
                            <Link
                                key={i}
                                href={item.href}
                                onClick={() => setOpen(false)}
                            >
                                <SideItem
                                    icon={item.icon}
                                    label={item.label}
                                    active={pathname === item.href}
                                />
                            </Link>
                        ))}

                    </nav>


                </div>

                {/* LOGOUT */}
                <button className="flex items-center justify-center gap-2 border border-[#B91C1C] text-[#B91C1C] py-2 rounded-[8px] hover:bg-red-50 transition">
                    Log Out
                    <LogOut size={16} />
                </button>

            </aside>
        </>
    );
}

function SideItem({ icon, label, active }: any) {
    return (
        <div className={`flex items-center gap-3 px-4 py-2 text-[16px] rounded-[8px] h-[52px] cursor-pointer font-medium ${active ? "bg-[#455F0F] text-white" : "text-[#00360C] hover:bg-gray-100"}`}>
            {icon}
            {label}
        </div>
    );
}
