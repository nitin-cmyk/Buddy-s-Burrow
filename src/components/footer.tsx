"use client";

import Image from "next/image";
import {
  Facebook,
  Instagram,
  Twitter,
  Youtube,
  ArrowUpRight,
} from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-[#0A2B0A] text-white mt-24">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-[50px] py-14 sm:py-16">

        {/* ================= FOOTER CONTENT ================= */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 mb-14">

          {/* ================= LEFT: NEWSLETTER ================= */}
          <div className="lg:col-span-6">
            {/* BRAND */}
            <div className="flex items-center gap-3 mb-6 sm:mb-8">
              <Image
                src="/logo.png"
                alt="Buddy’s Burrow Logo"
                width={32}
                height={32}
                priority
              />
              <span className="font-poppins font-semibold text-lg">
                Buddy&apos;s Burrow
              </span>
            </div>

            <h3 className="font-poppins font-semibold text-lg mb-3">
              Join the Burrow!
            </h3>

            <p className="text-[#B8D4B8] text-sm leading-relaxed mb-6 max-w-lg">
              Sign up to get new lessons, fun activities and event updates
              straight to your email!
            </p>

            {/* FORM */}
            <form className="space-y-4 max-w-[50vw]">
              <div className="flex flex-col sm:flex-row gap-3">
                <input
                  type="email"
                  placeholder="E mail"
                  className="
                    flex-1
                    bg-[#1A3D1A]
                    border border-[#2D5F2E]
                    px-4 py-3
                    rounded-lg
                    text-white
                    placeholder-[#7A9D7A]
                    text-sm
                    focus:outline-none
                    focus:border-[#90B73B]
                  "
                />

                <button
                  type="submit"
                  className="
                    w-full sm:w-12
                    h-12
                    flex items-center justify-center
                    border-2 border-white
                    rounded-lg
                    hover:bg-white
                    transition-colors
                    group
                  "
                >
                  <ArrowUpRight
                    size={18}
                    className="text-white group-hover:text-[#0A2B0A]"
                  />
                </button>
              </div>

              <label className="flex items-start gap-2 text-xs text-[#B8D4B8]">
                <input type="checkbox" className="mt-0.5 cursor-pointer" />
                <span>
                  I agree with the{" "}
                  <a href="#" className="underline">
                    privacy policy
                  </a>
                </span>
              </label>
            </form>
          </div>

          {/* ================= RIGHT: NAV + LOCATIONS ================= */}
          <div className="lg:col-span-6 p-5 flex flex-col sm:flex-row justify-end gap-36">

            {/* NAVIGATION */}
            <div>
              <h3 className="font-poppins font-semibold text-base mb-4">
                Navigation
              </h3>
              <ul className="space-y-3">
                {["About Us", "Courses", "Events", "News & Blogs"].map((item) => (
                  <li key={item}>
                    <a
                      href={
                        item === "Courses"
                          ? "#courses"
                          : item === "Events"
                          ? "#events"
                          : "#"
                      }
                      className="text-[#B8D4B8] text-sm hover:text-white transition-colors"
                    >
                      {item}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* LOCATIONS */}
            <div>
              <h3 className="font-poppins font-semibold text-base mb-4">
                Locations
              </h3>
              <ul className="space-y-3">
                <li className="text-[#B8D4B8] text-sm">New York, USA</li>
                <li className="text-[#B8D4B8] text-sm">Hyderabad, India</li>
              </ul>
            </div>
          </div>
        </div>

        {/* ================= FOOTER BOTTOM ================= */}
        <div
          className="
            pt-6
            border-t border-[#2D5F2E]
            flex
            flex-col sm:flex-row
            items-center
            justify-center sm:justify-end
            gap-4 sm:gap-6
          "
        >
          <span className="font-poppins font-semibold text-sm">
            Join Our Community
          </span>

          {/* SOCIAL ICONS */}
          <div className="flex items-center gap-3 flex-wrap justify-center">
            {[Facebook, Instagram, Twitter, Youtube].map((Icon, index) => (
              <a
                key={index}
                href="#"
                className="
                  w-9 h-9
                  border-2 border-white
                  rounded
                  flex items-center justify-center
                  hover:bg-white
                  transition-colors
                  group
                "
              >
                <Icon
                  size={18}
                  className="text-white group-hover:text-[#0A2B0A]"
                />
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
