"use client";

import { useState } from "react";
import { supabase } from "@/lib/supabaseClient";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

import { LayoutDashboard, BookOpen, Calendar, Newspaper, DollarSign, LogOut, Menu, X } from "lucide-react";

export default function AdminSidebar() {

    const pathname = usePathname();
    const router = useRouter();
    const [confirmOpen, setConfirmOpen] = useState(false);
    const [loggingOut, setLoggingOut] = useState(false);

    const navItems = [
        { label: "Dashboard", icon: <LayoutDashboard size={18} />, href: "/admin/dashboard" },
        { label: "Courses", icon: <BookOpen size={18} />, href: "/admin/courses" },
        { label: "Events", icon: <Calendar size={18} />, href: "/admin/events" },
        { label: "News & Recaps", icon: <Newspaper size={18} />, href: "/admin/news&recaps" },
        { label: "Donations", icon: <DollarSign size={18} />, href: "/admin/donations" },
    ];


    const [open, setOpen] = useState(false);

    const handleLogout = async () => {
        setLoggingOut(true);

        await supabase.auth.signOut();

        setLoggingOut(false);
        setConfirmOpen(false);

        window.location.href = "/login";
    };

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
                <button
                    onClick={() => setConfirmOpen(true)}
                    className="flex items-center font-medium text-[16px] justify-center gap-2 border border-[#B91C1C] text-[#B91C1C] py-3 rounded-[8px] hover:bg-red-50 transition"
                >
                    Log Out
                    <LogOut size={20} />
                </button>
            </aside>

            {confirmOpen && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/40 backdrop-blur-sm">

                    <div className="bg-white w-[90%] max-w-[380px] rounded-[16px] p-6 shadow-xl">

                        <h3 className="text-[20px] font-semibold text-[#00360C] mb-2">
                            Confirm Logout
                        </h3>

                        <p className="text-[#6B7280] text-[14px] mb-6">
                            Are you sure you want to log out?
                        </p>

                        <div className="flex justify-end gap-3">

                            <button
                                onClick={() => setConfirmOpen(false)}
                                className="px-4 py-2 rounded-lg border border-gray-300 text-gray-600 hover:bg-gray-100"
                            >
                                Cancel
                            </button>

                            <button
                                onClick={handleLogout}
                                disabled={loggingOut}
                                className="px-4 py-2 rounded-lg bg-[#B91C1C] text-white hover:bg-red-700"
                            >
                                {loggingOut ? "Logging out..." : "Logout"}
                            </button>

                        </div>

                    </div>

                </div>
            )}
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


