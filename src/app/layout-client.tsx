"use client";

import { usePathname } from "next/navigation";
import Navbar from "@/components/Navbar";
import Footer from "@/components/footer";

export default function LayoutClient({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  const authRoutes = ["/login", "/signup", "/forgot-password", "/verify-otp", "/email-verified", "/reset-password", "/password-updated", "/admin/dashboard", "/admin/courses", "/admin/events", "/admin/news", "/admin/donations",];
  const hideChrome =
    authRoutes.includes(pathname) ||
    pathname.startsWith("/admin");


  return (
    <>
      {!hideChrome && <Navbar />}
      {children}
      {!hideChrome && <Footer />}
    </>
  );
}
