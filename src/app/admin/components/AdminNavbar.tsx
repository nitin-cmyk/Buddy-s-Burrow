"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabaseClient";

export default function AdminNavbar() {
    const [name, setName] = useState("Admin");

    useEffect(() => {
        const loadUser = async () => {
            const { data } = await supabase.auth.getUser();

            const userName =
                data.user?.user_metadata?.name ||
                data.user?.email?.split("@")[0] ||
                "Admin";

            setName(userName);
        };

        loadUser();
    }, []);

    return (
        <div className="bg-white px-6 py-4 flex items-center shadow-[1px_1px_5px_0px_#00000040]">

            {/* Greeting */}
            <p className="text-[#90B73B] text-[18px] font-medium hidden md:block">
                Welcome back <span className="font-semibold">{name}</span>!
            </p>

            {/* Profile Right */}
            <div className="ml-auto flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-gray-200" />
                <div>
                    <p className="font-semibold">{name}</p>
                    <p className="text-xs text-gray-500">Admin</p>
                </div>
            </div>

        </div>
    );
}
