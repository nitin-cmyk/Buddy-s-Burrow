"use client";

import Image from "next/image";
import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabaseClient";

export default function EventsPage() {
  const [selectedActivity, setSelectedActivity] = useState(0);
  const [events, setEvents] = useState<any[]>([]);
  const [loadingEvents, setLoadingEvents] = useState(true);

  const NotchedBorder = () => (
    <svg
      viewBox="0 0 620 560"
      className="absolute inset-0 w-full h-full pointer-events-none"
      style={{ pointerEvents: "none" }} 
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      preserveAspectRatio="none"
    >
      <mask id="notch-mask" fill="white">
        <path d="M608 0C614.627 0 620 5.37258 620 12V488C620 492.418 616.418 496 612 496H428C421.373 496 416 501.373 416 508V552C416 556.418 412.418 560 408 560H12C5.37258 560 0 554.627 0 548V84C0 79.5817 3.58172 76 8 76H68C72.4183 76 76 72.4183 76 68V8C76 3.58172 79.5817 0 84 0H608Z" />
      </mask>

      <path
        d="M608 0C614.627 0 620 5.37258 620 12V488C620 492.418 616.418 496 612 496H428C421.373 496 416 501.373 416 508V552C416 556.418 412.418 560 408 560H12C5.37258 560 0 554.627 0 548V84C0 79.5817 3.58172 76 8 76H68C72.4183 76 76 72.4183 76 68V8C76 3.58172 79.5817 0 84 0H608Z"
        stroke="#CFE2A7"
        strokeWidth="2"
        mask="url(#notch-mask)"
        vectorEffect="non-scaling-stroke"
      />
    </svg>
  );

  const activities = [
    {
      iconImage: "/cleanupicon.png",
      title: "Clean-Up Drives",
      description: "Clean-up drives are one of our most impactful activities. Students come together to restore parks, beaches, playgrounds, and community areas by collecting waste, identifying recyclables, and learning how pollution affects ecosystems. These drives help young volunteers understand the real consequences of littering and the importance of taking responsibility for the spaces we share. Each event is fully supervised by our team, ensuring safety while giving students the chance to make a visible and meaningful difference in their environment.",
      image: "/cleanup.jpg"
    },
    {
      iconImage: "/naturewalkicon.png",
      title: "Nature Walks",
      description: "Nature walks give students the opportunity to observe the environment up close. Led by trained educators, these guided explorations help participants learn about native plants, local wildlife, soil types, micro-ecosystems, and ecological relationships. Students develop curiosity, observation skills, and an appreciation for the natural world. These sessions also promote mindfulness and help young learners reconnect with nature — something rarely experienced in a screen-filled world. Every walk is conducted safely with planned routes and full supervision.",
      image: "/nature-walk.jpg"
    },
    {
      iconImage: "/workshopicon.png",
      title: "Eco Workshops",
      description: "Our workshops turn learning into creativity. Students participate in hands-on activities like recycling crafts, eco-art, compost demonstrations, climate awareness games, and simple science experiments that explain environmental concepts in a fun, practical way. These workshops build problem-solving skills, teamwork, and confidence while helping students understand how small habits can lead to big change. Every activity is safe, supervised, and designed to make students feel excited about taking care of the planet.",
      image: "/workshop.jpg"
    },
    {
      iconImage: "/outreachicon.png",
      title: "School Campaigns",
      description: "Our awareness campaigns bring environmental education directly to classrooms. We introduce students to topics like climate change, biodiversity, waste management, and sustainable living in a way that is simple, relatable, and exciting. Through demonstrations, visual learning tools, and interactive challenges, students gain the knowledge they need to make informed decisions and develop strong habits that protect the planet. Every session is designed to inspire and empower participants while maintaining a safe and supportive environment.",
      image: "/outreach.jpg"
    }
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
      console.error("Events fetch error:", err);
    } finally {
      setLoadingEvents(false);
    }
  };

  const formatEventDate = (dateString: string) => {
    const date = new Date(dateString);

    return {
      monthYear: date.toLocaleDateString("en-US", {
        month: "long",
        year: "numeric",
      }),
      day: date.getDate(),
      weekday: date.toLocaleDateString("en-US", {
        weekday: "long",
      }),
    };
  };

  return (
    <main className="w-full min-h-screen bg-[#FCFFF7]">

      {/* ================= HERO SECTION ================= */}
      {/* HERO SECTION */}
      <section className="w-full h-[90vh] sm:h-[85vh] lg:h-screen p-[12px]">
        <div className="relative w-full h-full rounded-[16px] sm:rounded-[20px] lg:rounded-[24px] overflow-hidden">

          <Image
            src="/events-bg.png"
            alt="Buddy’s Burrow animals"
            width={1920}
            height={1080}
            priority
            className="w-full h-full object-cover object-[60%_center]"
          />

          {/* Glass text */}
          <div className="absolute bottom-[20px] sm:bottom-[28px] lg:bottom-[80px] left-[16px] sm:left-[24px] lg:left-[92px] z-10 max-w-[300px] sm:max-w-[420px] lg:max-w-[520px]">
            <div className="bg-black/20 backdrop-blur-[10px]  shadow-xl rounded-[10px] sm:rounded-[12px] px-[16px] sm:px-[20px] lg:px-[24px] py-[14px] sm:py-[16px] lg:py-[20px]">
              <h2 className="text-white text-[22px] sm:text-[28px] lg:text-[52px] font-medium font-poppins">
                Join Hands, Take Action, Make an Impact.
              </h2>
            </div>
          </div>

        </div>
      </section>


      {/* ================= WHY OUR EVENTS MATTER SECTION ================= */}
      <section className="w-full">
        <div className="max-w-[1166px] mx-auto px-[16px] sm:px-[24px] lg:px-[32px] py-[20px] sm:py-[40px] lg:py-[60px] text-center">

          <h3 className="text-[28px] sm:text-[40px] lg:text-[61px] font-poppins text-[#002E0B] font-medium">
            Why Our Events Matter
          </h3>

          <p className="mt-[20px] text-left text-[16px] sm:text-[18px] lg:text-[25px] font-poppins font-medium text-[#00360C]">
            Buddy’s Burrow events bring learning into the real world. From clean-up drives and nature walks to school awareness campaigns and environmental workshops, every event gives students a chance to make a visible impact. These experiences help young learners understand environmental problems, work together, and build a habit of caring for the planet — not just in theory, but in action.
          </p>

        </div>
      </section>


      {/* ================= UPCOMING EVENTS SECTION ================= */}
      <section className="w-full px-4 sm:px-6 lg:px-[82px] mt-10">
        <div className="max-w-[1276px] mx-auto flex flex-col gap-[36px]">

          <h3 className="text-[28px] sm:text-[40px] text-center lg:text-[61px] font-poppins text-[#002E0B] font-medium">
            Upcoming Events
          </h3>

          {loadingEvents && (
            <div className="text-center text-[#00360C]">Loading events...</div>
          )}

          {!loadingEvents && events.length === 0 && (
            <div className="text-center text-[#00360C]">No events scheduled</div>
          )}

          {!loadingEvents && events.map((event, index) => {

            const { monthYear, day, weekday } = formatEventDate(event.event_date);
            const isSwapped = index % 2 !== 0;

            const DetailCard = (
              <div className="relative w-full isolate lg:basis-1/2 rounded-[12px] aspect-[620/560]">

                {/* SVG BORDER */}
                <div className="absolute inset-0 z-[1] pointer-events-none">
                  <NotchedBorder />
                </div>

                {/* CONTENT */}
                <div className="absolute inset-0 z-[10] px-6 sm:px-8 lg:px-[50px] flex flex-col justify-center">

                  {/* TOP SAFE AREA (top notch = 76px) */}
                  <div className="pt-[13.6%] flex flex-col gap-[clamp(8px,1.2vw,15px)]">

                    <h3 className="font-poppins font-medium text-[18px] sm:text-[22px] lg:text-[25px] text-[#00360C]">
                      <span className="text-[clamp(18px,2.4vw,31px)]">{event.category}</span>
                    </h3>

                    <p className="font-poppins font-medium text-[18px] sm:text-[22px] lg:text-[25px] text-[#00360C]">
                      <span className="text-[clamp(18px,2.4vw,31px)]">Location</span> – {event.location}
                    </p>

                    <p className="font-poppins font-medium text-[18px] sm:text-[22px] lg:text-[31px] text-[#00360C]">
                      Time – {event.start_time} to {event.end_time}
                    </p>

                    <p className="font-poppins text-[14px] sm:text-[16px] italic text-[#00360C]">
                      This event is supervised by the Buddy’s Burrow team and follows all safety guidelines.
                    </p>

                  </div>

                </div>

                {/* BUTTON — notch placement */}

                <div
                  className="absolute z-[50] pointer-events-auto"
                  style={{
                    right: "0.1%",
                    bottom: "0.23%",
                    width: "31%",
                    height: "9.30%",
                  }}
                >

                  <a
                    href={event.link}
                    target="_blank"
                    rel="noopener noreferrer" className="w-full h-full flex items-center gap-[2px] sm:gap-[4px] lg:gap-[7px] border-[1px] border-[#005715] rounded-[4px] sm:rounded-[8px] pl-[4%] pr-[1%] bg-[#FCFFF7]">

                    <span className="font-poppins font-medium text-[#005715] whitespace-nowrap text-wrap text-[12px] sm:text-[16px]">
                      Show Interest
                    </span>

                    <span className="bg-[#005715] text-white rounded-[4px] sm:rounded-[6px]
                 flex items-center justify-center
                 h-[90%] aspect-square shrink-0">
                      <img
                        src="/arrow-up-icon.svg"
                        alt=""
                        className="w-[30%] h-[30%] sm:w-[35%] sm:h-[35%] lg:w-[40%] lg:h-[40%]"
                      />
                    </span>
                  </a>
                </div>
              </div>
            );

            const DateCard = (
              <div className="relative w-full lg:basis-1/2 rounded-[24px] aspect-[620/560] p-4 sm:p-6 lg:p-[30px] flex flex-col items-center justify-center gap-[6px] overflow-hidden shadow-sm">
                <div className="absolute inset-0 bg-white/2" />

                <div className="relative z-10 w-full text-center">
                  <p className="font-poppins font-bold text-[28px] sm:text-[42px] lg:text-[58px] text-[#002E0B] pb-3">
                    {monthYear}
                  </p>
                  <div className="w-full h-[1px] bg-[#CFE2A7]" />
                </div>

                <p className="relative z-10 font-poppins font-bold text-[120px] sm:text-[180px] lg:text-[200px] text-[#002E0B]">
                  {day}
                </p>

                <p className="relative z-10 font-poppins font-bold text-[28px] sm:text-[40px] lg:text-[48px] text-[#002E0B]">
                  {weekday}
                </p>
              </div>
            );

            return (
              <div key={event.id} className="flex flex-col lg:flex-row gap-[36px]">
                {!isSwapped && DetailCard}
                {DateCard}
                {isSwapped && DetailCard}
              </div>
            );
          })}

        </div>
      </section>

      {/* ================= WHAT WE DO SECTION ================= */}
      <section className="w-full bg-[#005715] px-4 sm:px-6 lg:px-[82px] py-12 lg:py-16 mt-16 lg:mt-20">
        <div className="max-w-[1276px] mx-auto">
          <h2 className="font-poppins font-medium text-2xl sm:text-3xl lg:text-[58px] text-center text-white mb-8">
            What We Do <span>@Buddy&apos;s Burrow</span>
          </h2>

          <p className="font-poppins font-normal text-[16px] sm:text-[20px] text-center text-white/90 leading-relaxed max-w-[1200px] mx-auto mb-12">
            Every event we conduct is thoughtfully planned to make a meaningful experience for students while keeping safety our top priority. We provide clear guidance, supervision, and support so that kids feel confident in their actions and understand the purpose behind every task.
          </p>

          {/* Icons Grid */}
          <div className="flex flex-row flex-wrap gap-12 items-center justify-center mb-12 place-items-center">
            {activities.map((activity, index) => {
              return (
                <button
                  key={index}
                  onClick={() => setSelectedActivity(index)}
                  className={`group flex flex-col items-center gap-2 transition-all ${selectedActivity === index
                    ? 'opacity-100'
                    : 'opacity-60 hover:opacity-80'
                    }`}
                >
                  <div
                    className={`
                      relative w-20 h-20 rounded-2xl flex items-center justify-center 
                      transition-all duration-500 overflow-hidden
                      ${selectedActivity === index ? 'bg-white/20 backdrop-blur-xl' : 'bg-white/10 backdrop-blur-md'}
                    `}
                    style={{
                      boxShadow: selectedActivity === index
                        ? 'inset 0 0 20px rgba(255,255,255,0.5), 0 8px 32px rgba(0,0,0,0.1)'
                        : 'inset 0 0 10px rgba(255,255,255,0.2), 0 4px 16px rgba(0,0,0,0.05)'
                    }}
                  >
                    {/* Glass refraction effect */}
                    <div
                      className={`
                        absolute inset-0 transition-all duration-500
                        ${selectedActivity === index
                          ? 'bg-gradient-to-br from-white/40 via-transparent to-transparent'
                          : 'bg-gradient-to-tl from-white/20 via-transparent to-transparent group-hover:from-white/30'
                        }
                      `}
                      style={{
                        transform: selectedActivity === index
                          ? 'rotate(45deg) scale(1.5)'
                          : 'rotate(-45deg) scale(1.5)',
                        filter: 'blur(20px)',
                      }}
                    />

                    {/* Frost overlay */}
                    <div
                      className="absolute inset-0 bg-white/5"
                      style={{
                        backdropFilter: 'blur(50px)',
                      }}
                    />

                    {/* Icon Image */}
                    <Image
                      src={activity.iconImage}
                      alt={activity.title}
                      width={48}
                      height={48}
                      className={`
                        relative z-10 transition-all duration-300
                        ${selectedActivity === index ? 'scale-110' : 'scale-100 group-hover:scale-105'}
                      `}
                      style={{
                        filter: selectedActivity === index
                          ? 'drop-shadow(0 4px 8px rgba(0,0,0,0.2))'
                          : 'drop-shadow(0 2px 4px rgba(0,0,0,0.1))'
                      }}
                    />
                  </div>
                </button>
              );
            })}
          </div>

          {/* Activity Display Card */}
          <div
            className="
              border border-[#90B73B]
              rounded-[24px]
              p-8
              flex flex-col lg:flex-row
              items-center
              gap-[18px]
              h-auto lg:h-[624px]
            "
          >
            {/* Image */}
            <div
              className="
                relative
                w-full lg:w-[560px]
                h-[260px] lg:h-[560px]
                rounded-xl
                overflow-hidden
                flex-shrink-0
              "
            >
              <Image
                src={activities[selectedActivity].image}
                alt={activities[selectedActivity].title}
                fill
                sizes="(max-width: 1024px) 100vw, 420px"
                className="object-cover object-center"
                priority
              />
            </div>

            {/* Text Content (Right Side with Border) */}
            <div
              className="
                flex-1 min-h-[320px]
                h-auto lg:h-[560px]
                border border-[#90B73B]
                rounded-[16px]
                p-6
                flex flex-col justify-center
              "
            >
              <div className="flex items-start gap-3 mb-4">
                <div className="relative w-10 h-10 rounded-lg flex items-center justify-center overflow-hidden"
                  style={{
                    boxShadow: 'inset 0 0 15px rgba(255,255,255,0.3), 0 4px 16px rgba(0,0,0,0.1)'
                  }}
                >

                  <Image
                    src={activities[selectedActivity].iconImage}
                    alt={activities[selectedActivity].title}
                    width={24}
                    height={24}
                    className="relative z-10"
                  />
                </div>
                <h3 className="font-poppins font-semibold text-xl sm:text-2xl text-white">
                  {activities[selectedActivity].title}
                </h3>
              </div>

              <p className="font-poppins font-normal text-sm sm:text-base text-white/90 leading-relaxed">
                {activities[selectedActivity].description}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ================= SAFETY & SUPERVISION SECTION ================= */}
      <section
        id="safety"
        className="w-full px-4 sm:px-6 lg:px-[50px] mt-16 lg:mt-20 pb-16"
      >
        {/* Outer Container */}
        <div
          className="
            max-w-[1340px] p-6
            h-auto lg:h-[384px]
            mx-auto
            border border-[#CFE2A7]
            rounded-[24px]
            bg-[#FCFFF7]
            flex items-center justify-center
          "
        >
          {/* Inner Container */}
          <div
            className="
              w-full
              max-w-[1276px]
              h-auto lg:h-[320px]
              mx-auto
              border border-[#CFE2A7]
              rounded-[16px]
              p-8
              flex flex-col
              gap-[36px] items-center justify-center
            "
          >
            {/* Content Wrapper */}
            <div
              className="
                w-full
                max-w-[1184px]
                flex flex-col
                gap-[40px]
              "
            >
              {/* Heading */}
              <h2
                className="
                  font-poppins
                  font-medium
                  text-[42px] sm:text-[56px] lg:text-[82px]
                  leading-[64.07px]
                  text-[#00360C]
                  text-center
                  mx-auto
                "
              >
                Safety &amp; Supervision
              </h2>

              {/* Description */}
              <p
                className="
                  font-poppins
                  font-normal
                  text-[16px]
                  leading-[24px]
                  text-[#00360C]
                  max-w-[1184px]
                "
              >
                What makes us different is our commitment to youth-centered environmental education.
                We teach in a way that is easy to understand, engaging, and designed specifically
                for young minds. By integrating fun activities, real community programs, and
                accessible online learning, we create an environment where students feel excited
                to learn — and inspired to make a difference.
              </p>
            </div>
          </div>
        </div>
      </section>

    </main>
  );
}