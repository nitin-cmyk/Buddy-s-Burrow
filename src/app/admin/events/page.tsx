"use client";

import { Pencil, Plus } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabaseClient";

type Event = {
  id: string;
  category: string;
  location: string;
  event_date: string;
  start_time: string;
  end_time: string;
};

export default function EventsPage() {

  const router = useRouter();

  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);

  // CATEGORY CONFIG (single source of truth)
  const categories = [
    { value: "Clean-Up Drives", label: "Clean-Up Drives", icon: "/cleanupdrive.svg" },
    { value: "Eco Workshops", label: "Eco Workshops", icon: "/ecoworkshop.svg" },
    { value: "School Campaigns", label: "School Campaigns", icon: "/schoolcampaign.svg" },
    { value: "Nature walks", label: "Nature walks", icon: "/naturewalk.svg" },
  ];

  useEffect(() => {
    fetchEvents();
  }, []);

  const fetchEvents = async () => {
    try {
      const { data, error } = await supabase
        .from("events")
        .select("*")
        .order("event_date", { ascending: true });

      if (error) throw error;

      setEvents(data || []);

    } catch (err) {
      console.error(err);
      alert("Failed to load events");
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-[60vh] text-[#455F0F] text-lg font-medium">
        Loading events…
      </div>
    );
  }

  return (
    <div className="px-4 sm:px-6 lg:px-8 py-6">

      <h1 className="text-[24px] font-medium text-[#455F0F] mb-8">
        All Events
      </h1>

      {events.length === 0 && (
        <div className="text-center text-[#7B7B7B] py-20">
          No events yet
        </div>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-8">

        {events.map(event => {

          // Find matching category config
          const category = categories.find(c => c.value === event.category);

          return (
            <div
              key={event.id}
              className="bg-white rounded-[12px] border border-[#E5E5E5] p-2 shadow-sm"
            >

              {/* ICON */}
              <div className="bg-[#EEF5E6] rounded-[4px] h-[180px] flex items-center justify-center mb-4">
                <img
                  src={category?.icon || "/cleanupdrive.svg"}
                  alt={category?.label || "Event"}
                  className="h-[60px] w-[60px] object-contain"
                />
              </div>

              {/* TITLE */}
              <p className="text-[14px] text-[#00360C] font-medium mb-1 break-words">
                {category?.label || event.category}
              </p>


              {/* ACTION */}
              <div className="flex justify-end">
                <button
                  onClick={() => router.push(`/admin/events/${event.id}`)}
                  className="flex items-center gap-1 bg-[#455F0F] text-white px-3 py-1 rounded-full text-[12px]"
                >
                  Edit
                  <Pencil size={12} />
                </button>
              </div>

            </div>
          );
        })}

        {/* CREATE CARD */}
        <div className="bg-white rounded-[16px] border border-[#E5E5E5] p-2 shadow-sm">

          <button
            onClick={() => router.push("/admin/events/new")}
            className="bg-[#E9E9E9] rounded-[12px] h-[245px] w-full flex flex-col items-center justify-center gap-2"
          >
            <Plus size={40} />
            <p className="text-[14px] text-black">
              Post New Event
            </p>
          </button>

        </div>

      </div>

    </div>
  );
}
