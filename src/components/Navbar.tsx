"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { Menu, X } from "lucide-react";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      const purposeSection = document.getElementById("purpose");

      if (!purposeSection) return;

      const triggerPoint =
        purposeSection.offsetTop - 100; // adjust for navbar height

      setScrolled(window.scrollY >= triggerPoint);
    };

    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const navBg = scrolled
    ? "bg-[#FCFFF7] text-black shadow-md border border-gray-200"
    : "bg-black/40 text-white backdrop-blur-lg border border-white/20";

  return (
    <>
      {/* ================= NAVBAR ================= */}
      <nav
        className={`fixed top-4 left-1/2 -translate-x-1/2 z-50
        w-[calc(100%-32px)] max-w-7xl
        h-[72px] sm:h-[88px]
        rounded-xl
        flex items-center
        px-4 sm:px-6
        transition-all duration-300
        ${navBg}`}
      >
        {/* LOGO */}
        <div className="flex items-center gap-2">
          <Image
            src={scrolled ? "/logoTrans.png" : "/logo.png"}
            alt="Buddy’s Burrow Logo"
            width={28}
            height={28}
            priority
          />
          <span className="text-base sm:text-lg font-semibold font-poppins whitespace-nowrap">
            Buddy’s Burrow
          </span>
        </div>

        {/* DESKTOP MENU */}
        <div className="hidden md:flex mx-auto items-center gap-8">
          {["About Us", "Courses", "Events", "News & Blogs"].map((item) => (
            <span
              key={item}
              className={`text-sm font-medium font-poppins cursor-pointer transition-colors ${
                scrolled
                  ? "text-black hover:text-gray-600"
                  : "text-white hover:text-white/80"
              }`}
            >
              {item}
            </span>
          ))}
        </div>

        {/* DESKTOP ACTIONS */}
        <div className="hidden md:flex items-center gap-3 ml-auto">
          <button className="px-5 py-2 rounded-md text-sm font-medium font-poppins bg-[#005715] text-white border border-[#90B73B]">
            Login
          </button>
          <button className="px-5 py-2 rounded-md text-sm font-medium font-poppins bg-[#005715] text-white border border-[#90B73B]">
            Donate Us
          </button>
        </div>

        {/* MOBILE MENU BUTTON */}
        <button
          className="ml-auto md:hidden"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          {menuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </nav>

      {/* ================= MOBILE MENU ================= */}
      {menuOpen && (
        <div
          className={`fixed top-[88px] left-1/2 -translate-x-1/2 z-40
          w-[calc(100%-32px)] max-w-7xl
          rounded-xl p-6 flex flex-col gap-4
          transition-all ${navBg}`}
        >
          {["About Us", "Courses", "Events", "News & Blogs"].map((item) => (
            <span
              key={item}
              className={`text-sm font-medium font-poppins ${
                scrolled ? "text-black" : "text-white"
              }`}
            >
              {item}
            </span>
          ))}

          <div className="flex gap-3 pt-4">
            <button className="flex-1 px-4 py-2 rounded-md text-sm font-medium bg-[#005715] text-white border border-[#90B73B]">
              Login
            </button>
            <button className="flex-1 px-4 py-2 rounded-md text-sm font-medium bg-[#005715] text-white border border-[#90B73B]">
              Donate Us
            </button>
          </div>
        </div>
      )}
    </>
  );
}