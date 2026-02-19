"use client";

import Image from "next/image";
import { Pencil } from "lucide-react";
import { useRouter } from "next/navigation";

export default function CourseCard({ course }: any) {

    const published = course.status === "published";
    const router = useRouter();

    return (
        <div className="bg-white rounded-[12px] p-2 shadow-sm w-full">

            {/* IMAGE */}
            <div className="relative w-full h-[140px] sm:h-[160px] rounded-lg overflow-hidden">
                <Image
                    src={course.image}
                    alt={course.title}
                    fill
                    className="object-cover"
                />
            </div>

            {/* TITLE */}
            <h3 className="mt-3 text-[#00360C] font-medium text-[15px] line-clamp-1 break-words">
                {course.title}
            </h3>

            {/* FOOTER */}
            <div className="flex flex-wrap items-center justify-between mt-3 gap-2">

                <p className="text-[13px] text-gray-500 whitespace-nowrap">
                    Modules : {course.modules}
                </p>

                <div className="flex flex-wrap items-center gap-2">

                    {/* STATUS */}
                    <span className={`
                        px-3 py-1 text-[12px] rounded-full whitespace-nowrap
                        ${published
                            ? "bg-[#90B73B] text-white"
                            : "bg-gray-200 text-gray-700"}
                    `}>
                        {published ? "Published" : "Draft"}
                    </span>

                    {/* EDIT */}
                    <button
                        onClick={() => router.push(`/admin/courses/${course.id}`)}
                        className="bg-[#455F0F] text-white px-3 py-1 rounded-full flex items-center gap-1 text-[12px] whitespace-nowrap"
                    >
                        Edit
                        <Pencil size={12} />
                    </button>

                </div>

            </div>
        </div>
    );
}
