"use client";

import { Pencil, Plus, Trash2 } from "lucide-react";
import { useRouter } from "next/navigation";

export default function EventsPage() {

  const router = useRouter();

  // MOCK DATA
  const events = [
    { id: 1, title: "Event Title comes here", category: "recycle" },
    { id: 2, title: "Event Title comes here", category: "leaf" },
    { id: 3, title: "Event Title comes here", category: "building" },
    { id: 4, title: "Event Title comes here", category: "mountain" },
  ];

  // CATEGORY ICONS (replace with your svgs/images)
  const categoryIcons: Record<string, string> = {
    recycle: "/cleanupdrive.svg",
    leaf: "/ecoworkshop.svg",
    building: "/schoolcampaign.svg",
    mountain: "/naturewalk.svg",
  };

  return (
    <div className="px-4 sm:px-6 lg:px-8 py-6">

      {/* TITLE */}
      <h1 className="text-[24px] font-medium text-[#455F0F] mb-8">
        All Events
      </h1>

      {/* GRID */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-8">

        {events.map(event => (
          <div
            key={event.id}
            className="bg-white rounded-[12px] border border-[#E5E5E5] p-2 shadow-sm"
          >

            {/* ICON AREA */}
            <div className="bg-[#EEF5E6] rounded-[4px] h-[150px] flex items-center justify-center mb-4">

              <img
                src={categoryIcons[event.category]}
                alt=""
                className="h-[50px] w-[50px] sm:h-[60px] sm:w-[60px] object-contain"
              />

            </div>

            {/* TITLE */}
            <p className="text-[14px] text-[#00360C] font-normal mb-3 leading-snug break-words">
              {event.title} : {event.title}
            </p>

            {/* ACTIONS */}
            <div className="flex justify-end gap-2 flex-wrap">

              <button className="flex items-center gap-1 text-red-500 border border-red-300 px-3 py-1 rounded-full text-[12px]">
                Delete
                <Trash2 size={12}/>
              </button>

              <button
                onClick={() => router.push(`/admin/events/${event.id}`)}
                className="flex items-center gap-1 bg-[#455F0F] text-white px-3 py-1 rounded-full text-[12px]"
              >
                Edit
                <Pencil size={12}/>
              </button>

            </div>

          </div>
        ))}

        {/* CREATE CARD */}
        <div className="bg-white rounded-[16px] border border-[#E5E5E5] p-2 shadow-sm">

          <button
            onClick={() => router.push("/admin/events/new")}
            className="bg-[#E9E9E9] rounded-[12px] h-[245px] w-full flex flex-col items-center justify-center gap-2"
          >
            <Plus size={40}/>
            <p className="text-[14px] text-black">
              Post New Event
            </p>
          </button>

        </div>

      </div>

    </div>
  );
}
