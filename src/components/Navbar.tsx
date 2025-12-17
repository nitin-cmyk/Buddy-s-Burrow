"use client";

import Image from "next/image";

export default function Navbar() {
  return (
    <nav
      className="
        fixed top-6 left-6
        max-w-[1392px]
        w-[calc(100%-48px)]
        h-[88px]
        rounded-[12px]
        flex items-center
        px-[20px]

      
        backdrop-blur-lg
      

        shadow-lg
        border border-white/20
      "
    >
      {/* Left: Logo + Brand */}
      <div className="w-[218px] h-[28px] flex items-center gap-2">
        <Image
          src="/logo.png"
          alt="Buddy’s Burrow Logo"
          width={28}
          height={28}
          className="object-contain"
          priority
        />

        <span className="text-xl font-semibold font-poppins whitespace-nowrap text-amber-50">
          Buddy’s Burrow
        </span>
      </div>

      {/* Center: Menu */}
      <div
        className="
          mx-auto
          w-[832px]
          h-[44px]
          flex
          items-center
          justify-center
          gap-[10px]
        "
      >
        {["About Us", "Courses", "Events", "News & Blogs"].map((item) => (
          <span
            key={item}
            className="
              w-[120px]
              h-[24px]
              text-center
              text-[16px]
              leading-[24px]
              font-medium
              font-poppins
              cursor-pointer
              text-amber-50
              hover:opacity-80
              whitespace-nowrap
            "
          >
            {item}
          </span>
        ))}
      </div>

      {/* Right: Actions */}
      <div className="w-[318px] flex justify-end items-center gap-4 ">
         <button className="px-5 py-2 rounded-md text-white text-[14px] font-medium font-poppins bg-[#005715] border-[#90B73B] border-2">
          Login
        </button>

        <button className="px-5 py-2 rounded-md text-white text-[14px] font-medium font-poppins bg-[#005715] border-[#90B73B] border-2">
          Donate Us
        </button>
      </div>
    </nav>
  );
}
