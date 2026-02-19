"use client";

import Image from "next/image";
import { Pencil } from "lucide-react";
import { useRouter } from "next/navigation";

export default function NewsCard({ item }: any) {

    const router = useRouter();
    const published = item.status === "published";

    return (
        <div className="bg-white rounded-[12px] p-2 shadow-sm">

            <div className="relative w-full h-[160px] rounded-lg overflow-hidden">
                <Image
                    src={item.image}
                    alt=""
                    fill
                    className="object-cover"
                />
            </div>

            <h3 className="mt-3 text-[#00360C] font-medium text-[15px] line-clamp-1">
                {item.title}
            </h3>

            <div className="flex items-center justify-between mt-3">

                {/* <p className="text-[13px] text-gray-500">
                    {item.date}
                </p> */}

                <div className="flex items-center gap-2">

                    {/* STATUS */}
                    <span className={`
                        px-3 py-1 text-[12px] rounded-full
                        ${published
                            ? "bg-[#90B73B] text-white"
                            : "bg-gray-200 text-gray-700"}
                    `}>
                        {published ? "Published" : "Draft"}
                    </span>

                    {/* EDIT */}
                    <button
                        onClick={() => router.push(`/admin/news&recaps/${item.id}`)}
                        className="bg-[#455F0F] text-white px-3 py-1 rounded-full flex items-center gap-1 text-[12px]"
                    >
                        Edit
                        <Pencil size={12} />
                    </button>

                </div>

            </div>

        </div>
    );
}
