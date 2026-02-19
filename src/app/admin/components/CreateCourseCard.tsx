"use client";

import { Plus } from "lucide-react";
import Link from "next/link";

export default function CreateCourseCard() {
    return (
        <div className="bg-white shadow-md rounded-[12px] min-h-[200px] sm:min-h-[230px] p-2 w-full">

            <Link
                href="/admin/courses/new"
                className="
                    rounded-[12px] w-full h-full
                    flex flex-col items-center justify-center
                    bg-[#E9E9E9]
                    transition hover:bg-[#E0E0E0]
                    text-center
                    px-4
                "
            >
                <Plus size={36} />

                <p className="mt-3 text-gray-600 font-medium text-sm sm:text-base">
                    Create New Course
                </p>

            </Link>

        </div>
    );
}
