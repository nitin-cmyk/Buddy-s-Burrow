"use client";

import Image from "next/image";
import { useState } from "react";

export default function EventsPage() {
  const [selectedActivity, setSelectedActivity] = useState(0);

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

  return (
    <main className="w-full min-h-screen bg-[#FCFFF7]">

     {/* ================= HERO SECTION ================= */}
<section className="w-full px-[12px] pt-[12px] sm:p-[12px]">
  <div
    className="
      relative
      w-full
      min-h-[70svh]
      sm:min-h-[80vh]
      lg:h-screen
      rounded-[16px]
      sm:rounded-[20px]
      lg:rounded-[24px]
      overflow-hidden
      bg-black
    "
  >
    {/* Background Image */}
    <Image
      src="/events-bg.png"
      alt="Buddy's Burrow animals"
      fill
      priority
      className="object-cover"
    />

    {/* Glass Text Card */}
    <div className="absolute bottom-[12px] sm:bottom-[24px] lg:bottom-[40px] left-[12px] sm:left-[24px] lg:left-[32px] z-10 max-w-[280px] sm:max-w-[420px] lg:max-w-[520px]">
      <div className="bg-black/10 backdrop-blur-md shadow-xl rounded-[10px] sm:rounded-[12px] px-[16px] sm:px-[20px] lg:px-[24px] py-[14px] sm:py-[16px] lg:py-[20px]">
        <h2 className="text-white text-[20px] sm:text-[28px] lg:text-[48px] font-medium font-poppins leading-tight">
          Together, We Hold the Power to Change the World
        </h2>
      </div>
    </div>
  </div>
</section>


      {/* ================= WHY OUR EVENTS MATTER SECTION ================= */}
      <section className="w-full px-4 sm:px-6 lg:px-[74px] mt-12 lg:mt-16">
        <div className="max-w-[1292px] mx-auto">
          <div className="text-center space-y-[30px]">
            <h2 className="font-poppins font-semibold text-2xl sm:text-3xl lg:text-[32px] text-[#00360C]">
              Why Our Events Matter
            </h2>
            <p className="font-poppins font-normal text-sm sm:text-base leading-relaxed text-[#00360C] max-w-[900px] mx-auto">
              Buddy's Burrow events bring learning to life. Far more than classroom walks or school awareness campaigns and environmental workshops, every event gives students a chance to make a visible impact. These experiences help young learners understand environmental issues, build confidence in their ability to create change, and see the direct results of collective action.
            </p>
          </div>
        </div>
      </section>

    
{/* ================= UPCOMING EVENTS SECTION ================= */}
<section className="w-full px-4 sm:px-6 lg:px-[82px] mt-24">
  <div className="max-w-[1276px] mx-auto flex flex-col gap-[36px]">

    {/* ================= EVENT ROW 1 ================= */}
    <div className="flex flex-col lg:flex-row gap-[36px]">

      {/* LEFT: Event Details */}
      <div className="w-full lg:w-[620px] bg-[#FCFFF7] border border-[#CFE2A7] rounded-[24px] p-6 sm:p-8 lg:p-[50px] flex flex-col gap-[15px]">
        <h3 className="font-poppins font-medium text-[20px] sm:text-[24px] lg:text-[31px] leading-[32px] lg:leading-[47px] text-[#00360C]">
          Event Name or Title – Clean up drive at Hell&apos;s Kitchen
        </h3>

        <p className="font-poppins font-medium text-[18px] sm:text-[22px] lg:text-[31px] leading-[30px] lg:leading-[47px] text-[#00360C]">
          Venue – New York, Hell&apos;s Kitchen, Street No – 24, Manhattan
        </p>

        <p className="font-poppins font-medium text-[18px] sm:text-[22px] lg:text-[31px] leading-[30px] lg:leading-[47px] text-[#00360C]">
          Date – 13 – Jan – 2026
        </p>

        <p className="font-poppins font-medium text-[18px] sm:text-[22px] lg:text-[31px] leading-[30px] lg:leading-[47px] text-[#00360C]">
          Time – 10:00 AM to 01:00 PM
        </p>

        <p className="font-poppins font-normal text-[14px] sm:text-[16px] leading-[22px] lg:leading-[24px] text-[#00360C] mt-2">
          Help restore a public space and learn how waste impacts local ecosystems.
        </p>
      </div>

      {/* RIGHT: Date Card (Glass) */}
      <div className="relative w-full lg:w-[620px] border border-[#CFE2A7] rounded-[24px] p-6 sm:p-8 lg:p-[50px] flex flex-col items-center justify-center gap-[8px] overflow-hidden group">

        {/* Glass layers */}
        <div className="absolute inset-0 bg-white/20 backdrop-blur-xl" />
        <div className="absolute inset-0 bg-gradient-to-br from-white/40 via-transparent to-transparent blur-2xl rotate-[-45deg] scale-150 transition-all duration-500 group-hover:rotate-[45deg]" />
        <div className="absolute inset-0 bg-white/5" />

        {/* Content */}
        <div className="relative z-10 w-full text-center">
          <p className="font-poppins font-bold text-[28px] sm:text-[42px] lg:text-[61px] leading-tight text-[#002E0B] pb-3">
            January 2026
          </p>
          <div className="w-full h-[1px] bg-[#CFE2A7]" />
        </div>

        <p className="relative z-10 font-poppins font-bold text-[120px] sm:text-[180px] lg:text-[250px] leading-none lg:leading-[260px] text-[#002E0B]">
          13
        </p>

        <p className="relative z-10 font-poppins font-bold text-[28px] sm:text-[40px] lg:text-[56px] leading-tight text-[#002E0B]">
          Tuesday
        </p>
      </div>
    </div>

    {/* 🔹 MOBILE DIVIDER BETWEEN EVENTS */}
    <div className="lg:hidden w-full flex items-center justify-center">
      <div className="w-full h-[1px] bg-[#CFE2A7]" />
    </div>

    {/* ================= EVENT ROW 2 (SWAPPED) ================= */}
    <div className="flex flex-col lg:flex-row gap-[36px]">

      {/* LEFT: Date Card */}
      <div className="relative w-full lg:w-[620px] border border-[#CFE2A7] rounded-[24px] p-6 sm:p-8 lg:p-[50px] flex flex-col items-center justify-center gap-[8px] overflow-hidden group">

        <div className="absolute inset-0 bg-white/20 backdrop-blur-xl" />
        <div className="absolute inset-0 bg-gradient-to-br from-white/40 via-transparent to-transparent blur-2xl rotate-[-45deg] scale-150 transition-all duration-500 group-hover:rotate-[45deg]" />
        <div className="absolute inset-0 bg-white/5" />

        <div className="relative z-10 w-full text-center">
          <p className="font-poppins font-bold text-[28px] sm:text-[42px] lg:text-[61px] leading-tight text-[#002E0B] pb-3">
            February 2026
          </p>
          <div className="w-full h-[1px] bg-[#CFE2A7]" />
        </div>

        <p className="relative z-10 font-poppins font-bold text-[120px] sm:text-[180px] lg:text-[250px] leading-none lg:leading-[260px] text-[#002E0B]">
          20
        </p>

        <p className="relative z-10 font-poppins font-bold text-[28px] sm:text-[40px] lg:text-[56px] leading-tight text-[#002E0B]">
          Thursday
        </p>
      </div>

      {/* RIGHT: Event Details */}
      <div className="w-full lg:w-[620px] bg-[#FCFFF7] border border-[#CFE2A7] rounded-[24px] p-6 sm:p-8 lg:p-[50px] flex flex-col gap-[15px]">
        <h3 className="font-poppins font-medium text-[20px] sm:text-[24px] lg:text-[31px] leading-[32px] lg:leading-[47px] text-[#00360C]">
          Event Name or Title – Nature Walk at Central Park
        </h3>

        <p className="font-poppins font-medium text-[18px] sm:text-[22px] lg:text-[31px] leading-[30px] lg:leading-[47px] text-[#00360C]">
          Venue – New York, Central Park, North Meadow
        </p>

        <p className="font-poppins font-medium text-[18px] sm:text-[22px] lg:text-[31px] leading-[30px] lg:leading-[47px] text-[#00360C]">
          Date – 20 – Feb – 2026
        </p>

        <p className="font-poppins font-medium text-[18px] sm:text-[22px] lg:text-[31px] leading-[30px] lg:leading-[47px] text-[#00360C]">
          Time – 09:00 AM to 12:00 PM
        </p>

        <p className="font-poppins font-normal text-[14px] sm:text-[16px] leading-[22px] lg:leading-[24px] text-[#00360C] mt-2">
          Explore local ecosystems and learn about native plants and wildlife.
        </p>
      </div>
    </div>

  </div>
</section>

      {/* ================= WHAT WE DO SECTION ================= */}
      <section className="w-full bg-[#005715] px-4 sm:px-6 lg:px-[82px] py-12 lg:py-16 mt-16 lg:mt-20">
        <div className="max-w-[1276px] mx-auto">
          <h2 className="font-poppins font-semibold text-2xl sm:text-3xl lg:text-[32px] text-center text-white mb-8">
            What We Do <span>@Buddy&apos;s Burrow</span>
          </h2>

          <p className="font-poppins font-normal text-sm sm:text-base text-center text-white/90 leading-relaxed max-w-[900px] mx-auto mb-12">
            Every event we conduct is thoughtfully planned to make a meaningful experience for students while keeping safety our top priority. We provide clear guidance, supervision, and support so that kids feel confident in their actions and understand the purpose behind every task.
          </p>

          {/* Icons Grid */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 lg:gap-4 mb-12 place-items-center">
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
              bg-[#004512]
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
                w-full lg:w-[620px]
                h-auto lg:h-[560px]
                border border-[#90B73B]
                rounded-[16px]
                p-6
                flex flex-col justify-center
              "
            >
              <div className="flex items-start gap-3 mb-4">
                <div className="relative w-10 h-10 bg-white/10 backdrop-blur-md rounded-lg flex items-center justify-center flex-shrink-0 overflow-hidden"
                  style={{
                    boxShadow: 'inset 0 0 15px rgba(255,255,255,0.3), 0 4px 16px rgba(0,0,0,0.1)'
                  }}
                >
                  {/* Glass effect */}
                  <div 
                    className="absolute inset-0 bg-gradient-to-br from-white/30 via-transparent to-transparent"
                    style={{
                      transform: 'rotate(45deg) scale(1.5)',
                      filter: 'blur(15px)',
                    }}
                  />
                  
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
        className="w-full px-4 sm:px-6 lg:px-[50px] mt-16 lg:mt-20"
      >
        {/* Outer Container */}
        <div
          className="
            max-w-[1340px]
            h-auto lg:h-[384px]
            mx-auto
            border border-[#CFE2A7]
            rounded-[24px]
            bg-[#FCFFF7]
            flex items-center
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
              gap-[36px]
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