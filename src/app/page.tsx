// import Navbar from "../components/Navbar";

export default function Home() {
  return (
    <main className="min-h-screen overflow-x-hidden">

      {/* HERO SECTION */}
      <section
        className="
          relative
          min-h-screen
          bg-[url('/bg.jpg')]
          bg-[length:120%_auto]
          bg-[position:0%_center]
          bg-no-repeat
          rounded-[22px]
        "
      >
        {/* <Navbar /> */}

        {/* Hero Content */}
        <div
          className="
            absolute
            top-[271px]
            left-[92px]
            w-[657px]
          "
        >
          <h1
            className="
              font-poppins
              font-medium
              text-[61px]
              leading-[92px]
              text-white
            "
          >
            Nurturing Kids. Healing the Planet. Building the Future
          </h1>

          <p
            className="
              mt-4
              w-[657px]
              text-white
              text-[18px]
              leading-[28px]
            "
          >
            Learn about biomes, wildlife, ecosystems, and climate through simple,
            engaging lessons made for young learners.
          </p>
        </div>
      </section>

      {/* ABOUT / MISSION SECTION */}
      <section
        className="
          mt-[120px]
          mx-auto
          w-[1166px]
          text-center
        "
      >
        <h2
          className="
            font-poppins
            font-medium
            text-[61px]
            leading-[92px]
            text-black
          "
        >
          We’re here to inspire young changemakers.
        </h2>

        <p
          className="
            mt-6
            text-[18px]
            leading-[28px]
            text-gray-700
          "
        >
          Buddy’s Burrow creates a safe and fun space where students discover
          nature, understand the planet, and learn how their actions can help
          protect it. Every lesson, event, and activity is designed to empower a
          greener future.
        </p>
      </section>

      {/* CONTENT CARD SECTION */}
      <section
        className="
          mt-[120px]
          mx-auto
          w-[1340px]
          rounded-[24px]
          border
          border-gray-200
          p-[32px]
          flex
          justify-between
        "
      >
        {/* Left Content */}
        <div className="w-[620px]">
          <h3
            className="
              font-poppins
              font-medium
              text-[32px]
              leading-[44px]
            "
          >
            Learn. Explore. Protect.
          </h3>

          <p className="mt-4 text-[18px] leading-[28px] text-gray-700">
            Buddy’s Burrow is an environmental learning platform designed to help
            students understand nature in a clear, practical way. Through simple
            explanations, real-world examples, and hands-on activities, we teach
            young people how ecosystems work, why wildlife matters, and how
            small actions can help protect the planet.
          </p>

          <button
            className="
              mt-6
              px-6
              py-3
              rounded-md
              bg-[#005715]
              text-white
              font-medium
            "
          >
            View more
          </button>
        </div>

        {/* Right Placeholder (image/video later) */}
        <div className="w-[620px] h-[560px] bg-gray-100 rounded-xl" />
      </section>

    </main>
  );
}
