import Image from "next/image";
import Link from "next/link";

export default function Home() {
  const WeCombineBorder = () => (
    <svg
      viewBox="0 0 620 560"
      className="absolute inset-0 w-full h-full pointer-events-none"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      preserveAspectRatio="none"
    >
      {/* INSIDE STROKE MASK */}
      <mask id="we-combine-mask" fill="white">
        <path d="M608 0C614.627 0 620 5.37258 620 12V488C620 492.418 616.418 496 612 496H428C421.373 496 416 501.373 416 508V552C416 556.418 412.418 560 408 560H12C5.37258 560 0 554.627 0 548V84C0 79.5817 3.58172 76 8 76H68C72.4183 76 76 72.4183 76 68V8C76 3.58172 79.5817 0 84 0H608Z" />
      </mask>

      {/* BORDER (STROKE ONLY) */}
      <path
        d="M608 0C614.627 0 620 5.37258 620 12V488C620 492.418 616.418 496 612 496H428C421.373 496 416 501.373 416 508V552C416 556.418 412.418 560 408 560H12C5.37258 560 0 554.627 0 548V84C0 79.5817 3.58172 76 8 76H68C72.4183 76 76 72.4183 76 68V8C76 3.58172 79.5817 0 84 0H608Z"
        fill="none"
        stroke="#90B73B"
        strokeWidth="2"
        mask="url(#we-combine-mask)"
        vectorEffect="non-scaling-stroke"
      />
    </svg>
  );
  return (
    <main className="min-h-screen overflow-x-hidden bg-[#FCFFF7]">

      {/* HERO SECTION */}
      <section className="w-full h-[90vh] sm:h-[85vh] lg:h-screen p-[12px]">
        <div className="relative w-full h-full rounded-[16px] sm:rounded-[20px] lg:rounded-[24px] overflow-hidden">

          <Image
            src="/home-bg.png"
            alt="Buddy’s Burrow animals"
            width={1920}
            height={1080}
            priority
            className="w-full h-full object-cover"
          />

          {/* Glass text */}
          <div className="absolute bottom-[20px] sm:bottom-[28px] lg:bottom-[80px] left-[16px] sm:left-[24px] lg:left-[92px] z-10 max-w-[300px] sm:max-w-[420px] lg:max-w-[520px]">
            <div className="bg-black/20 backdrop-blur-[10px]  shadow-xl rounded-[10px] sm:rounded-[12px] px-[16px] sm:px-[20px] lg:px-[24px] py-[14px] sm:py-[16px] lg:py-[20px]">
              <h2 className="text-white text-[24px] sm:text-[28px] lg:text-[52px] lg:leading-[62px] font-medium font-poppins">
                Where Curious Minds Discover Nature
              </h2>
              <p className="text-white text-[18px] pt-2">
                Learn about biomes, wildlife, ecosystems, and climate through simple, engaging lessons made for young learners.
              </p>
            </div>
          </div>

        </div>
      </section>

      {/* ================= PURPOSE SECTION ================= */}
      <section className="w-full">
        <div className="max-w-[1166px] mx-auto px-[16px] sm:px-[24px] lg:px-[32px] py-[20px] sm:py-[40px] lg:py-[60px] text-center">

          <h3 className="text-[28px] sm:text-[40px] lg:text-[61px] font-poppins text-[#002E0B] font-medium">
            Our Purpose
          </h3>

          <p className="mt-[20px] text-left text-[16px] sm:text-[18px] lg:text-[25px] font-poppins font-medium text-[#00360C]">
            We’re here to inspire young changemakers. Buddy’s Burrow creates a safe and fun space where students discover nature, understand the planet, and learn how their actions can help protect it. Every lesson, event, and activity is designed to empower a greener future.
          </p>

        </div>
      </section>


      {/* ================= ABOUT + IMAGE SECTION ================= */}
      <section className="w-full">
        <div className="max-w-[1280px] 2xl:max-w-[1340px] mx-auto px-[16px] sm:px-[24px] lg:px-[32px] py-[20px] sm:py-[40px] lg:py-[60px]">

          {/* Outer Card */}
          <div className="border border-[#CFE2A7] rounded-[16px] sm:rounded-[20px] lg:rounded-[24px] mx-auto max-w-[1180px]">


            <div className="grid grid-cols-1 md:grid-cols-2 gap-[24px] lg:gap-[40px] items-start md:items-stretch p-[16px] sm:p-[24px] lg:p-[40px]">



              <div className="relative w-full md:h-full rounded-[12px] overflow-hidden">



                {/* SVG BORDER */}
                <WeCombineBorder />

                {/* ICON — TOP CLIP SPACE */}
                <div
                  className=" absolute top-[2px] left-[2px] w-[56px] h-[56px] sm:w-[64px] sm:h-[64px] flex items-center justify-center rounded-[14px "
                >
                  <Image
                    src="/aboutus-icon.svg"
                    alt="About Us icon"
                    width={72}
                    height={72}
                    className="object-contain"
                    priority
                  />
                </div>

                {/* CONTENT */}
                <div className="relative z-10 flex flex-col h-full px-[24px] sm:px-[32px] lg:px-[40px] pt-[56px] pb-[56px]">
                  <h3
                    className="text-[36px] sm:text-[48px] lg:text-[52px] 2xl:text-[72px] font-poppins font-medium text-[#00360C] mt-[32px]"
                  >
                    About Us
                  </h3>

                  <p className="mt-6 text-[#00360C] text-[14px] sm:text-[15px] lg:text-[16px] 2xl:text-[18px] leading-[1.8] max-w-[720px] mb-[64px]">
                    Buddy’s Burrow is an environmental learning platform designed to help students understand nature in a clear, practical way. Through simple explanations, real - world examples, and hands-on activities, we teach young people how ecosystems work, why wildlife matters, and how small actions can help protect the planet. Our mission is to build a generation that understands the environment - and feels empowered to care for it.
                  </p>

                </div>

                {/* BUTTON — BOTTOM RIGHT CLIP SPACE */}
                <div
                  className=" absolute bottom-[1px] right-[1px] z-50"
                >
                  <Link href="/aboutus"
                    className=" flex items-center gap-3 px-1 py-1 rounded-[8px] border-[1px] border-[#005715] text-[#005715] font-semibold text-[15px] transition"
                  >
                    View more
                    <span
                      className="flex items-center justify-center w-9 h-9 rounded-[6px] bg-[#005715] text-white"
                    >
                      <img
                        src="/arrow-up-icon.svg"
                        alt=""
                        className="w-[30%] h-[30%] sm:w-[35%] sm:h-[35%] lg:w-[40%] lg:h-[40%]"
                      />
                    </span>
                  </Link>
                </div>
              </div>

              {/* LEFT IMAGE */}
              <div className="relative w-full h-[220px] sm:h-[280px] md:h-full rounded-[12px] overflow-hidden">
                <Image
                  src="/about.jpg"
                  alt="About us"
                  fill
                  className="object-cover"
                />
              </div>


            </div>
          </div>
        </div>
      </section>

      <section className="w-full bg-[#005715]">
        <div className="max-w-[1280px] mx-auto px-[16px] sm:px-[24px] lg:px-[32px] py-[20px] sm:py-[40px] lg:py-[60px]">

          {/* Outer Card */}
          <div className="border border-[#CFE2A7] rounded-[16px] sm:rounded-[20px] lg:rounded-[24px] mx-[0] sm:mx-[24px] lg:mx-[50px]">

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-[20px] sm:gap-[24px] lg:gap-[32px] items-center m-[16px] sm:m-[24px] lg:m-[32px]">

              {/* LEFT IMAGE */}
              <div className="relative w-full h-[220px] sm:h-[300px] lg:h-full rounded-[12px] sm:rounded-[12px] overflow-hidden
              ">
                <Image
                  src="/about2.jpg"
                  alt="Our mission"
                  fill
                  className="object-cover"
                />
              </div>

              <div className="relative p-[32px] sm:p-[40px] lg:p-[56px]">
                {/* SVG BORDER */}
                <WeCombineBorder />

                {/* ICON — TOP CLIP SPACE */}
                <div
                  className=" absolute top-[2px] left-[2px] w-[56px] h-[56px] sm:w-[64px] sm:h-[64px] flex items-center justify-center rounded-[14px]"
                >
                  <Image
                    src="/course-icon.svg"
                    alt="We Combine icon"
                    width={72}
                    height={72}
                    className="object-contain"
                    priority
                  />
                </div>

                {/* CONTENT */}
                <h3
                  className="text-[36px] sm:text-[48px] lg:text-[64px] font-poppins font-medium text-white mt-[32px]"
                >
                  Courses
                </h3>

                <p className="mt-6 text-[#00360C] leading-[1.7] text-white max-w-[720px] mb-[64px] text-[16px]">
                  Our courses break down environmental science into clear, engaging lessons for teens. Whether it’s understanding biomes, studying wildlife, learning about climate change, or exploring how ecosystems interact, each course lets students learn at their own pace. Assignments, activities, and certificate pathways reinforce learning, giving them knowledge and a sense of accomplishment while sparking curiosity and building lasting environmental awareness.
                </p>

                {/* BUTTON — BOTTOM RIGHT CLIP SPACE */}
                <div
                  className=" absolute bottom-[1px] right-[1px]"
                >
                  <Link href="/courses"
                    className=" flex items-center gap-3 px-1 py-1 rounded-[8px] border-[1px] bg-white border-[#005715] text-[#005715] font-semibold text-[15px] transition"
                  >
                    View courses
                    <span
                      className="flex items-center justify-center w-9 h-9 rounded-[6px] bg-[#005715] text-white"
                    >
                      <img
                        src="/arrow-up-icon.svg"
                        alt=""
                        className="w-[30%] h-[30%] sm:w-[35%] sm:h-[35%] lg:w-[40%] lg:h-[40%]"
                      />
                    </span>
                  </Link>
                </div>
              </div>


            </div>
          </div>
        </div>
      </section>

      <section className="w-full">
        <div className="max-w-[1280px] mx-auto px-[16px] sm:px-[24px] lg:px-[32px] pt-15">

          {/* Outer Card */}
          <div className="border border-[#CFE2A7] rounded-[16px] sm:rounded-[20px] lg:rounded-[24px] mx-[0] sm:mx-[24px] lg:mx-[50px]">

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-[20px] sm:gap-[24px] lg:gap-[32px] items-center m-[16px] sm:m-[24px] lg:m-[32px]">


              <div className="relative p-[32px] sm:p-[40px] lg:p-[56px]">
                {/* SVG BORDER */}
                <WeCombineBorder />

                {/* ICON — TOP CLIP SPACE */}
                <div
                  className=" absolute top-[2px] left-[2px] w-[56px] h-[56px] sm:w-[64px] sm:h-[64px] flex items-center justify-center rounded-[14px "
                >
                  <Image
                    src="/event-icon.svg"
                    alt="Events icon"
                    width={72}
                    height={72}
                    className="object-contain"
                    priority
                  />
                </div>

                {/* CONTENT */}
                <h3
                  className="text-[36px] sm:text-[48px] lg:text-[64px] font-poppins font-medium text-[#00360C] mt-[32px]"
                >
                  EVENTS
                </h3>

                <p className="mt-6 text-[#00360C] leading-[1.7] max-w-[720px] mb-[64px]">
                  Buddy’s Burrow events are built to connect learning with real-life experiences. Students can participate in clean-up drives, nature walks, environmental workshops, school outreach activities, and community awareness programs that make learning hands-on and memorable. These events help young people see the impact of their actions, understand local environmental challenges, and engage directly with nature. Every event is designed to be safe, meaningful, and inspiring, allowing students to take what they learn and apply it in the real world.
                </p>

                {/* BUTTON — BOTTOM RIGHT CLIP SPACE */}
                <div
                  className=" absolute bottom-[1px] right-[1px]"
                >
                  <Link href="/events"
                    className=" flex items-center gap-3 px-1 py-1 rounded-[8px] border-[1px] border-[#005715] text-[#005715] font-semibold text-[15px] transition"
                  >
                    Explore events
                    <span
                      className="flex items-center justify-center w-9 h-9 rounded-[6px] bg-[#005715] text-white"
                    >
                      <img
                        src="/arrow-up-icon.svg"
                        alt=""
                        className="w-[30%] h-[30%] sm:w-[35%] sm:h-[35%] lg:w-[40%] lg:h-[40%]"
                      />
                    </span>
                  </Link>
                </div>
              </div>

              {/* Right IMAGE */}
              <div className="relative w-full h-[220px] sm:h-[300px] lg:h-full rounded-[12px] sm:rounded-[12px] overflow-hidden
              ">
                <Image
                  src="/events.jpg"
                  alt="Our mission"
                  fill
                  className="object-cover"
                />
              </div>

            </div>
          </div>
        </div>
      </section>


      <section className="w-full mb-15">
        <div className="max-w-[1280px] mx-auto px-[16px] sm:px-[24px] lg:px-[32px] pt-15">
          <div className="border border-[#CFE2A7] rounded-[16px] sm:rounded-[20px] lg:rounded-[24px] mx-[0] sm:mx-[24px] lg:mx-[50px] p-[32px]">

            {/* INNER BORDER */}
            <div className="border border-[#CFE2A7] rounded-[16px] p-8 flex flex-col">
              <div className="max-w-[1184px] mx-auto flex flex-col gap-[40px] text-center">
                <h2 className="font-poppins font-medium text-[42px] sm:text-[56px] lg:text-[82px] leading-[64.07px] text-[#00360C]">
                  Donate
                </h2>
                <p className="font-poppins font-normal text-[16px] leading-[24px] text-left text-[#00360C] max-w-[900px] mx-auto">
                  Your support enables us to offer accessible environmental education, develop interactive learning experiences, and organize community-based programs that nurture awareness, responsibility, and eco-friendly action among young learners. Every contribution strengthens our mission to build a greener, more informed future.
                </p>
              </div>
            </div>

          </div>
        </div>
      </section>

    </main>
  );
}
