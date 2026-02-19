"use client";

import { Plus } from "lucide-react";
import Link from "next/link";

export default function CreateNewsCard() {
    return (
        <div className="bg-white shadow-md rounded-[12px] min-h-[230px] p-2">

            <Link
                href="/admin/news&recaps/new"
                className="
                    rounded-[12px] w-full h-full
                    flex flex-col items-center justify-center
                    bg-[#E9E9E9]
                    transition hover:bg-[#E0E0E0]
                "
            >
                <Plus size={36} />
                <p className="mt-3 text-gray-600 font-medium">
                    Add News / Recap
                </p>
            </Link>

        </div>
    );
}
