"use client";

import Image from "next/image";
import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import { supabase } from "@/lib/supabaseClient";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const router = useRouter();

  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // ---------- EMAIL VALIDATION ----------
  const isValidEmail = (val: string) =>
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val);


  // ---------- LOGIN ----------
  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!email || !password) {
      setError("Please enter email and password");
      return;
    }

    if (!isValidEmail(email)) {
      setError("Please enter a valid email address");
      return;
    }

    setLoading(true);

    // 🔐 LOGIN
    const { data, error } = await supabase.auth.signInWithPassword({
      email: email.trim().toLowerCase(),
      password,
    });

    console.log("1. signInWithPassword result:", { data, error });

    if (error) {
      setLoading(false);
      setError("Incorrect email or password");
      return;
    }

    // ✅ GET USER
    const { data: { user } } = await supabase.auth.getUser();
    console.log("2. getUser result:", user);

    if (!user) {
      setLoading(false);
      router.push("/");
      return;
    }

    // ✅ FETCH ROLE
    const { data: profile, error: profileError } = await supabase
      .from("profiles")
      .select("role")
      .eq("id", user.id)
      .single();

    console.log("3. profile fetch result:", { profile, profileError });

    setLoading(false);

    if (profileError || !profile) {
      router.push("/");
      return;
    }

    console.log("4. role is:", profile.role);

    // 🎯 REDIRECT BASED ON ROLE
    if (profile.role === "admin") {
      console.log("5. redirecting to admin dashboard...");
      router.refresh();
      router.replace("/admin/dashboard");
    } else {
      router.refresh();
      router.push("/");
    }
  };


  return (
    <main className="h-screen bg-[#FCFFF7] overflow-hidden">
      <section className="min-h-screen p-[12px] flex items-center justify-center">

        <div className="w-full max-w-[1400px] h-[calc(100vh-24px)] overflow-hidden grid grid-cols-1 lg:grid-cols-2 gap-[32px] lg:gap-[64px]">

          {/* IMAGE */}
          <div className="relative hidden lg:block h-full overflow-hidden rounded-[32px]">
            <Image
              src="/loginimg.png"
              alt="Buddy’s Burrow Rabbit"
              fill
              priority
              sizes="50vw"
              className="object-cover"
            />
          </div>

          {/* FORM */}
          <div className="flex items-center h-full overflow-y-auto">
            <form
              onSubmit={handleLogin}
              className="w-full max-w-[460px] mx-auto py-[24px] sm:py-[40px]"
            >

              <h1 className="font-poppins text-[#00360C] text-[32px] sm:text-[48px] font-medium mb-[8px]">
                Login
              </h1>

              <p className="text-[#7B7B7B] text-[14px] mb-[32px]">
                Don’t have an account?{" "}
                <a href="/signup" className="text-[#00360C] font-medium underline">
                  Sign up
                </a>
              </p>

              {/* EMAIL */}
              <div className="mb-[20px]">
                <label className="block text-[16px] text-[#00360C] font-medium mb-[6px]">
                  Email Address
                </label>

                <input
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full rounded-[16px] border border-[#CFE2A7] px-[16px] py-[14px] text-[14px] text-[#7B7B7B] outline-none focus:border-[#1E4D12]"
                  placeholder="Enter Email Address"
                />
              </div>

              {/* PASSWORD */}
              <div className="mb-[12px]">
                <label className="block text-[16px] text-[#00360C] font-medium mb-[6px]">
                  Password
                </label>

                <div className="relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full rounded-[16px] border border-[#CFE2A7] px-[16px] py-[14px] pr-[48px] text-[14px] text-[#7B7B7B] outline-none focus:border-[#1E4D12]"
                    placeholder="Enter Password"
                  />

                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-[14px] top-1/2 -translate-y-1/2 text-[#6B6B6B]"
                  >
                    {showPassword ? <Eye size={20} /> : <EyeOff size={20} />}
                  </button>
                </div>
              </div>

              {/* FORGOT */}
              <div className="text-right mb-[16px]">
                <a href="/forgot-password" className="text-[#00360C] text-[14px] font-medium underline">
                  Forgot Password?
                </a>
              </div>

              {/* ERROR */}
              {error && (
                <p className="text-red-500 text-[13px] mb-[16px]">
                  {error}
                </p>
              )}

              {/* BUTTON */}
              <button
                type="submit"
                disabled={loading}
                className="w-full bg-[#455F0F] cursor-pointer border border-[#CFE2A7] text-white rounded-[16px] py-[16px] text-[16px] font-medium"
              >
                {loading ? "Logging in..." : "Login"}
              </button>

            </form>
          </div>
        </div>

      </section>
    </main>
  );
}
