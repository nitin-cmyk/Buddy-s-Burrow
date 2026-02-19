"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Menu, X, User, LogOut } from "lucide-react";
import { supabase } from "@/lib/supabaseClient";


const NAV_LINKS = [
  { label: "About Us", href: "/aboutus" },
  { label: "Courses", href: "/courses" },

  { label: "Events", href: "/events" },
  { label: "News & Recaps", href: "/news&recaps" },

];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [session, setSession] = useState<any>(null);
  const [loadingAuth, setLoadingAuth] = useState(true);
  const [dropdownOpen, setDropdownOpen] = useState(false);


  useEffect(() => {
    const onScroll = () => {
      const triggerPoint = window.innerHeight * 0.8;
      setScrolled(window.scrollY >= triggerPoint);
    };

    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // ADD THIS NEW useEffect
  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => {
      setSession(data.session);
      setLoadingAuth(false);
    });

    const { data: listener } = supabase.auth.onAuthStateChange(
      (_event, session) => {
        setSession(session);
      }
    );

    return () => listener.subscription.unsubscribe();
  }, []);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    setDropdownOpen(false);
  };


  const navBg = scrolled
    ? "bg-[#FCFFF7] text-black shadow-md border border-gray-200"
    : "bg-black/40 text-white backdrop-blur-lg border border-white/20";

  return (
    <>
      {/* ================= NAVBAR ================= */}
      <nav
        className={`fixed 2xl:top-6 top-[18px] left-1/2 -translate-x-1/2 z-50
        2xl:w-[calc(100%-48px)] w-[calc(100%-36px)]
        h-[72px] sm:h-[84px]
        rounded-xl
        flex items-center justify-between
        px-4 sm:px-6
        transition-all duration-300
        ${navBg}`}
      >
        {/* LOGO */}
        <Link href="/" className="flex items-center gap-[10px]">
          <Image
            src={scrolled ? "/logoTrans.png" : "/logo.png"}
            alt="Buddy’s Burrow Logo"
            width={48}
            height={48}
            priority
          />
          <span className="sm:text-[24px] text-[18px] font-medium font-poppins whitespace-nowrap">
            Buddy’s Burrow
          </span>
        </Link>

        {/* DESKTOP MENU */}
        <div className="flex justify-between gap-16">
          <div className="hidden md:flex mx-auto items-center gap-[58px]">
            {NAV_LINKS.map((item) => (
              <Link
                key={item.label}
                href={item.href}
                className={`text-[16px] font-normal font-poppins transition-colors ${scrolled
                  ? "text-black hover:text-gray-600"
                  : "text-white hover:text-white/80"
                  }`}
              >
                {item.label}
              </Link>
            ))}
          </div>

          {/* DESKTOP ACTIONS */}
          <div className="hidden md:flex items-center gap-3 ml-auto">
            {!loadingAuth && (
              session ? (
                <div
                  className="relative"
                  onMouseEnter={() => setDropdownOpen(true)}
                  onMouseLeave={() => setDropdownOpen(false)}
                >
                  {/* ICON */}
                  <div className="w-[38px] h-[38px] rounded-[8px] bg-[#005715] text-white border border-[#90B73B] flex items-center justify-center cursor-pointer">
                    <User size={18} />
                  </div>

                  {/* DROPDOWN */}
                  {dropdownOpen && (
                    <div className="absolute right-0 mt-2 w-[160px] bg-white text-black rounded-xl shadow-lg border border-gray-200 overflow-hidden z-50">

                      <Link
                        href="/profile"
                        className="block px-4 py-3 text-sm hover:bg-gray-100"
                      >
                        Profile
                      </Link>

                      <button
                        onClick={handleLogout}
                        className="w-full text-left px-4 py-3 text-sm hover:bg-gray-100 flex items-center gap-2"
                      >
                        <LogOut size={16} />
                        Logout
                      </button>

                    </div>
                  )}
                </div>
              ) : (
                  <Link
                    href="/login"
                    className="px-5 py-2 rounded-md text-sm font-medium font-poppins bg-[#005715] text-white border border-[#90B73B]"
                  >
                    Login
                  </Link>
                )
            )}

            <Link
              href="/donateus"
              className="px-5 py-2 rounded-md text-sm font-medium font-poppins bg-[#005715] text-white border border-[#90B73B]"
            >
              Donate Us
            </Link>
          </div>
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
          {NAV_LINKS.map((item) => (
            <Link
              key={item.label}
              href={item.href}
              onClick={() => setMenuOpen(false)}
              className={`text-sm font-medium font-poppins ${scrolled ? "text-black" : "text-white"
                }`}
            >
              {item.label}
            </Link>
          ))}

          <div className="flex gap-3 pt-4">
            <Link
              href="/login"
              onClick={() => setMenuOpen(false)}
              className="flex-1 px-4 py-2 rounded-md text-sm font-medium bg-[#005715] text-white border border-[#90B73B] text-center"
            >
              Login
            </Link>

            <Link
              href="/#donate"
              onClick={() => setMenuOpen(false)}
              className="flex-1 px-4 py-2 rounded-md text-sm font-medium bg-[#005715] text-white border border-[#90B73B] text-center"
            >
              Donate Us
            </Link>
          </div>
        </div>
      )}
    </>
  );
}