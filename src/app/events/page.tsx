"use client";

import Image from "next/image";
import { useState } from "react";
import { Leaf, Sprout, Users, TreePine } from "lucide-react";

export default function EventsPage() {
  const [selectedActivity, setSelectedActivity] = useState(0);

  const activities = [
    {
      icon: Leaf,
      title: "Clean-Up Drives",
      description: "Clean-up drives are one of the most impactful ways for students to directly improve their environment. Whether it's a local park, beach, or school ground, these events show young people the visible effects of waste and the difference they can make by working together. Students learn about proper waste segregation, the dangers of littering, and how small, collective efforts can restore natural spaces. Each clean-up drive builds environmental awareness and instills a sense of responsibility that stays with participants long after the event.",
      image: "/cleanup.jpg"
    },
    {
      icon: TreePine,
      title: "Nature Walks",
      description: "Nature walks provide students with hands-on opportunities to explore local ecosystems and observe wildlife in their natural habitats. These guided experiences help young learners understand biodiversity, identify native species, and appreciate the interconnectedness of natural systems. Through careful observation and expert guidance, students develop deeper respect for nature and learn how human activities impact these delicate environments.",
      image: "/nature-walk.jpg"
    },
    {
      icon: Users,
      title: "Community Workshops",
      description: "Our community workshops bring together students, families, and local leaders to address environmental challenges through collaborative learning. These interactive sessions cover topics like sustainable living, recycling practices, and climate action. Participants engage in hands-on activities, group discussions, and problem-solving exercises that empower them to become environmental advocates in their communities.",
      image: "/workshop.jpg"
    },
    {
      icon: Sprout,
      title: "School Outreach",
      description: "School outreach programs connect environmental education with classroom learning through engaging presentations, demonstrations, and interactive activities. We work directly with teachers and students to integrate sustainability concepts into their curriculum, making environmental awareness a core part of their educational journey. These programs inspire young minds to think critically about their role in protecting the planet.",
      image: "/outreach.jpg"
    }
  ];

  const ActivityIcon = activities[selectedActivity].icon;

  return (
    <main className="w-full min-h-screen bg-[#FCFFF7]">
      
      {/* ================= HERO SECTION ================= */}
      <section className="w-full min-h-[70vh] sm:min-h-[80vh] lg:h-screen p-[12px]">
        <div className="relative w-full h-full rounded-[16px] sm:rounded-[20px] lg:rounded-[24px] overflow-hidden bg-black">

          {/* Background Image */}
          <Image
            src="/events-bg.png"
            alt="Buddy's Burrow animals"
            width={1920}
            height={1080}
            priority
            className="w-full h-full object-cover"
          />

          {/* Glass Text Card */}
          <div className="absolute bottom-[16px] sm:bottom-[24px] lg:bottom-[40px] left-[16px] sm:left-[24px] lg:left-[32px] z-10 max-w-[280px] sm:max-w-[420px] lg:max-w-[520px]">
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
      <section className="w-full px-4 sm:px-6 lg:px-[82px] mt-16 lg:mt-20">
        <div className="max-w-[1276px] mx-auto">
          <h2 className="font-poppins font-semibold text-2xl sm:text-3xl lg:text-[32px] text-center text-[#00360C] mb-12">
            Upcoming Events
          </h2>

          {/* Events Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-[36px]">
            
            {/* Event Card 1 */}
            <div className="bg-white border border-[#CFE2A7] rounded-[16px] p-6 sm:p-8 flex flex-col sm:flex-row gap-6">
              {/* Left Content */}
              <div className="flex-1 space-y-4">
                <h3 className="font-poppins font-semibold text-base text-[#00360C]">
                  Event Name or Title – <span className="font-normal">Clean-up drive with kids (action)</span>
                </h3>
                
                <div className="space-y-1 text-sm text-[#00360C]">
                  <p><span className="font-semibold">Venue -</span> New york, india kitchen, street no. 25, Manhattan</p>
                  <p><span className="font-semibold">Date -</span> 13 – Jun – 2025</p>
                  <p><span className="font-semibold">Time -</span> 10:00 AM to 03:00 PM</p>
                </div>

                <p className="text-xs text-gray-600 leading-relaxed">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                </p>

                <button className="flex items-center gap-2 px-5 py-2 bg-[#005715] text-white rounded-md font-poppins text-sm hover:bg-[#004512] transition-colors">
                  Learn More
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd" />
                  </svg>
                </button>
              </div>

              {/* Right Date Card */}
              <div className="flex-shrink-0 w-[180px] text-center">
                <div className="bg-white border border-[#CFE2A7] rounded-lg p-6">
                  <p className="font-poppins font-medium text-base text-[#00360C] mb-3">January 2026</p>
                  <p className="font-poppins font-bold text-[80px] leading-none text-[#005715] mb-2">13</p>
                  <p className="font-poppins font-medium text-base text-[#00360C]">Tuesday</p>
                </div>
              </div>
            </div>

            {/* Event Card 2 */}
            <div className="bg-white border border-[#CFE2A7] rounded-[16px] p-6 sm:p-8 flex flex-col sm:flex-row gap-6">
              {/* Left Date Card */}
              <div className="flex-shrink-0 w-[180px] text-center">
                <div className="bg-white border border-[#CFE2A7] rounded-lg p-6">
                  <p className="font-poppins font-medium text-base text-[#00360C] mb-3">January 2026</p>
                  <p className="font-poppins font-bold text-[80px] leading-none text-[#005715] mb-2">26</p>
                  <p className="font-poppins font-medium text-base text-[#00360C]">Monday</p>
                </div>
              </div>

              {/* Right Content */}
              <div className="flex-1 space-y-4">
                <div className="flex items-start gap-2">
                  <svg className="w-5 h-5 text-[#005715] flex-shrink-0 mt-1" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <div>
                    <h3 className="font-poppins font-semibold text-base text-[#00360C]">
                      Event Name or Title – <span className="font-normal">Nature walk in cornwalltake</span>
                    </h3>
                  </div>
                </div>
                
                <div className="space-y-1 text-sm text-[#00360C]">
                  <p><span className="font-semibold">Venue -</span> New york, Cornwall street, Lucknow</p>
                  <p><span className="font-semibold">Ramon villa -</span> 12- headquaters</p>
                  <p><span className="font-semibold">Date -</span> 26 – Jan – 2025</p>
                  <p><span className="font-semibold">Time -</span> 10:00 AM to 03:00 PM</p>
                </div>

                <button className="flex items-center gap-2 px-5 py-2 bg-[#005715] text-white rounded-md font-poppins text-sm hover:bg-[#004512] transition-colors">
                  Learn More
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd" />
                  </svg>
                </button>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ================= WHAT WE DO SECTION ================= */}
      <section className="w-full bg-[#005715] px-4 sm:px-6 lg:px-[82px] py-12 lg:py-16 mt-16 lg:mt-20">
        <div className="max-w-[1276px] mx-auto">
          <h2 className="font-poppins font-semibold text-2xl sm:text-3xl lg:text-[32px] text-center text-white mb-8">
            What We Do at Buddy's Burrow
          </h2>
          
          <p className="font-poppins font-normal text-sm sm:text-base text-center text-white/90 leading-relaxed max-w-[900px] mx-auto mb-12">
            Every event we conduct is thoughtfully planned to make a meaningful experience for students while keeping safety our top priority. We provide clear guidance, supervision, and support so that kids feel confident in their actions and understand the purpose behind every task.
          </p>

          {/* Icons Grid */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8 mb-12">
            {activities.map((activity, index) => {
              const Icon = activity.icon;
              return (
                <button
                  key={index}
                  onClick={() => setSelectedActivity(index)}
                  className={`flex flex-col items-center gap-3 transition-all ${
                    selectedActivity === index ? 'opacity-100' : 'opacity-60 hover:opacity-80'
                  }`}
                >
                  <div className={`w-16 h-16 rounded-lg flex items-center justify-center transition-colors ${
                    selectedActivity === index ? 'bg-white' : 'bg-white/10'
                  }`}>
                    <Icon className={`w-8 h-8 transition-colors ${
                      selectedActivity === index ? 'text-[#005715]' : 'text-white'
                    }`} />
                  </div>
                </button>
              );
            })}
          </div>

          {/* Activity Display Card */}
          <div className="bg-[#004512] border border-[#90B73B] rounded-[16px] p-6 sm:p-8 flex flex-col lg:flex-row gap-8 items-center">
            {/* Image */}
            <div className="relative w-full lg:w-[350px] h-[250px] rounded-xl overflow-hidden flex-shrink-0">
              <Image
                src={activities[selectedActivity].image}
                alt={activities[selectedActivity].title}
                fill
                className="object-cover"
              />
            </div>

            {/* Content */}
            <div className="flex-1">
              <div className="flex items-start gap-3 mb-4">
                <div className="w-10 h-10 bg-white/10 rounded-lg flex items-center justify-center flex-shrink-0">
                  <ActivityIcon className="w-5 h-5 text-white" />
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

    </main>
  );
}