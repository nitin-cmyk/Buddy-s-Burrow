"use client";

import NewsCard from "../components/NewsCard";
import CreateNewsCard from "../components/CreateNewscard";

export default function NewsPage() {

    // MOCK DATA
    const news = [
        {
            id: 1,
            title: "Tree Plantation Drive",
            date: "12 Feb 2026",
            status: "draft",
            image: "/coursesimg.jpg"
        },
        {
            id: 2,
            title: "Wildlife Awareness Camp",
            date: "05 Feb 2026",
            status: "published",
            image: "/coursesimg.jpg"
        },
        {
            id: 3,
            title: "Beach Cleanup Recap",
            date: "29 Jan 2026",
            status: "draft",
            image: "/coursesimg.jpg"
        },
    ];

    return (
        <div className="p-2 sm:p-4 lg:p-6">

            <h1 className="text-[25px] font-medium text-[#455F0F] mb-8">
                News & Recaps
            </h1>

            <div className="
                grid
                grid-cols-1
                sm:grid-cols-2
                xl:grid-cols-3
                gap-8
            ">

                {news.map(item => (
                    <NewsCard key={item.id} item={item} />
                ))}

                <CreateNewsCard />

            </div>

        </div>
    );
}
