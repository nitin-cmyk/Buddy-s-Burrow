import Image from "next/image";

export default function Home() {
  return (
    <main className="min-h-screen p-3 overflow-x-hidden bg-[#FCFFF7]">

      {/* ================= HERO SECTION ================= */}
      <section className="relative min-h-screen bg-[url('/bg.jpg')]  bg-cover bg-center rounded-2xl">
        <div className="max-w-7xl mx-auto px-6 pt-40 lg:pt-56">
          <div className="max-w-[657px] backdrop-blur-md bg-black/40 rounded-2xl p-6 sm:p-8">
            <h1 className="font-poppins font-medium text-white text-3xl sm:text-4xl md:text-5xl lg:text-[61px] leading-tight lg:leading-[92px]">
              Nurturing Kids Healing the Planet Building the Future
            </h1>

            <p className="mt-4 text-white/90 text-base sm:text-lg leading-relaxed max-w-xl">
              Learn about biomes, wildlife, ecosystems, and climate through simple,
              engaging lessons made for young learners.
            </p>
          </div>
        </div>
      </section>

     {/* ================= PURPOSE SECTION ================= */}
<section id="purpose" className="mt-24">
  <div className="max-w-[1166px] mx-auto px-4 flex flex-col gap-[30px] text-center">
    
    {/* Heading */}
    <h2 className="font-poppins font-medium text-[36px] sm:text-[48px] lg:text-[61px] leading-[92px] text-[#002E0B]">
      Our Purpose
    </h2>

    {/* Description */}
    <p className="font-poppins font-medium text-[18px] sm:text-[22px] lg:text-[25px] leading-[38px] text-[#00360C]">
      We’re here to inspire young changemakers. Buddy’s Burrow creates a safe and fun space where students discover nature, understand the planet, and learn how their actions can help protect it. Every lesson, event, and activity is designed to empower a greener future.
    </p>

  </div>
</section>


     {/* ================= ABOUT + IMAGE SECTION ================= */}
<section className="mt-16 sm:mt-20 lg:mt-24">
  <div className="max-w-7xl mx-auto px-4 sm:px-6">
    <div className="rounded-2xl border border-gray-200 p-4 sm:p-6 lg:p-10 flex flex-col lg:flex-row gap-8 lg:gap-12 items-center">

      {/* LEFT CONTENT */}
      <div className="flex-1 rounded-2xl border border-gray-200 p-5 sm:p-8 lg:p-20">
        <h3 className="font-poppins font-medium text-xl sm:text-2xl lg:text-3xl">
          About Us
        </h3>

        <p className="mt-3 sm:mt-4 text-sm sm:text-base lg:text-lg leading-relaxed text-gray-700">
          Buddy’s Burrow is an environmental learning platform designed to help
          students understand nature in a clear, practical way. Through simple
          explanations, real-world examples, and hands-on activities, we teach
          how ecosystems work, why wildlife matters, and how small actions can
          protect the planet.
        </p>

        <button className="mt-5 sm:mt-6 px-5 sm:px-6 py-2.5 sm:py-3 rounded-md bg-[#005715] text-white font-medium text-sm sm:text-base">
          View more
        </button>
      </div>

      {/* RIGHT IMAGE */}
      <div className="relative w-full lg:w-[620px] h-[220px] sm:h-[320px] lg:h-[560px] rounded-xl overflow-hidden flex-shrink-0">
        <Image
          src="/about.jpg"
          alt="About Buddy’s Burrow"
          fill
          className="object-cover"
          priority
        />
      </div>

    </div>
  </div>
</section>



      {/* ================= COURSES SECTION ================= */}
      <section
        id="courses"
        className="
    mt-24
    w-full
     bg-[#005715]
    px-6
    lg:px-[50px]
    py-[30px]
    flex
    justify-center
  "
      >
        <div
          className="
      w-full
      max-w-[1340px]
      border
      border-[#CFE2A7]
      rounded-[24px]
      p-6
      sm:p-8
      flex
      flex-col
      lg:flex-row
      gap-9
      items-center
    "
        >
          {/* LEFT IMAGE */}
          <div
            className="
        relative
        w-full
        lg:w-[620px]
        h-[260px]
        sm:h-[360px]
        lg:h-[560px]
        rounded-xl
        overflow-hidden
        flex-shrink-0
      "
          >
            <Image
              src="/courses.jpg"   // put image in /public
              alt="Courses"
              fill
              className="object-cover"
              priority
            />
          </div>

          {/* RIGHT CONTENT */}
          <div
            className="
        w-full
        lg:w-[620px]
        flex
        flex-col
        justify-center
      "
          >
            <h2
              className="
          font-poppins
          font-medium
          text-white
          text-4xl
          sm:text-5xl
          lg:text-[82px]
          leading-tight
          lg:leading-[92px]
        "
            >
              Courses
            </h2>

            <p
              className="
          mt-6
          text-white/90
          text-base
          sm:text-lg
          leading-relaxed
        "
            >
              Explore engaging, age-appropriate courses designed to teach kids about
              ecosystems, wildlife, climate, and sustainability through interactive
              lessons and activities.
            </p>

            <button
              className="
          mt-8
          w-fit
          px-8
          py-3
          rounded-md
          bg-white
          text-[#005715]
          font-medium
          font-poppins
        "
            >
              View Courses
            </button>
          </div>
        </div>
      </section>

      <section id="events" className="mt-24">
        {/* OUTER WRAPPER */}
        <div className="max-w-[1440px] mx-auto px-6 lg:px-[50px] py-8">
          {/* CARD */}
          <div
            className="
        max-w-[1340px]
        mx-auto
        rounded-2xl
        border border-[#CFE2A7]
        p-6
        sm:p-8
        flex
        flex-col
        lg:flex-row
        gap-9
        justify-between
      "
          >
            {/* LEFT CONTENT */}
            <div
              className="
          w-full
          lg:w-[620px]
          h-auto
          lg:h-[560px]
          bg-[#FCFFF7]
          rounded-xl
          p-6
          sm:p-8
          flex
          flex-col
          justify-center
        "
            >
              <h2
                className="
            font-poppins
            font-medium
            text-4xl
            sm:text-5xl
            lg:text-[82px]
            leading-tight
            lg:leading-[92px]
            text-[#005715]
          "
              >
                Events
              </h2>

              <p
                className="
            mt-6
            font-poppins
            font-normal
            text-base
            leading-6
            text-[#00360C]
          "
              >
                Buddy’s Burrow events are built to connect learning with real-life
                experiences. Students can participate in clean-up drives, nature walks,
                environmental workshops, school outreach activities, and community
                awareness programs that make learning hands-on and memorable.
                <br /><br />
                These events help young people see the impact of their actions,
                understand local environmental challenges, and engage directly with
                nature. Every event is designed to be safe, meaningful, and inspiring,
                allowing students to take what they learn and apply it in the real
                world.
              </p>
            </div>

            {/* RIGHT IMAGE */}
            <div
              className="
              relative
          w-full
          lg:w-[620px]
          h-[260px]
          sm:h-[360px]
          lg:h-[560px]
          rounded-xl
          overflow-hidden
          bg-gray-200
        "
            >
              {/* Image goes here */}
              <Image
                src="/events.jpg"
                alt="Buddy’s Burrow Events"
                fill
                className="object-cover"
                priority
              />
            </div>
          </div>
        </div>
      </section>
     <section id="donate" className="w-full px-4 sm:px-6 lg:px-[50px] mt-16 lg:mt-20">
  <div className="max-w-[1340px] mx-auto border border-[#CFE2A7] rounded-[24px] bg-[#FCFFF7] p-8">
    <div className="max-w-[1276px] mx-auto border border-[#CFE2A7] rounded-[16px] p-8 flex flex-col gap-[36px]">
      <div className="max-w-[1184px] mx-auto flex flex-col gap-[40px] text-center">
        <h2 className="font-poppins font-medium text-[42px] sm:text-[56px] lg:text-[82px] leading-[64.07px] text-[#00360C]">
          Donate
        </h2>
        <p className="font-poppins font-normal text-[16px] leading-[24px] text-[#00360C] max-w-[900px] mx-auto">
          Your support enables us to offer accessible environmental education, develop interactive learning experiences, and organize community-based programs that nurture awareness, responsibility, and eco-friendly action among young learners. Every contribution strengthens our mission to build a greener, more informed future.
        </p>
      </div>
    </div>
  </div>
</section>


    </main>
  );
}
