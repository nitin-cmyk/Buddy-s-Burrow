"use client";

import Image from "next/image";
import { useRef, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { supabase } from "@/lib/supabaseClient";


export default function VerifyOTPPage() {
  const OTP_LENGTH = 6;

  const [otp, setOtp] = useState(Array(OTP_LENGTH).fill(""));
  const inputs = useRef<(HTMLInputElement | null)[]>([]);
  const [error, setError] = useState("");
  const params = useSearchParams();
  const router = useRouter();
  const email = params.get("email");
  const [loading, setLoading] = useState(false);
  const flowType = params.get("type"); // signup | recovery



  // ---------- INPUT CHANGE ----------
  const handleChange = (value: string, index: number) => {
    if (!/^\d*$/.test(value)) return;

    const newOtp = [...otp];
    newOtp[index] = value.slice(-1);
    setOtp(newOtp);

    // Move forward
    if (value && index < OTP_LENGTH - 1) {
      inputs.current[index + 1]?.focus();
    }
  };

  // ---------- BACKSPACE NAV ----------
  const handleKeyDown = (e: React.KeyboardEvent, index: number) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      inputs.current[index - 1]?.focus();
    }
  };

  // ---------- PASTE FULL OTP ----------
  const handlePaste = (e: React.ClipboardEvent<HTMLInputElement>) => {
    e.preventDefault();

    const paste = e.clipboardData.getData("text").trim();

    if (!/^\d+$/.test(paste)) return;

    const digits = paste.slice(0, OTP_LENGTH).split("");

    const newOtp = Array(OTP_LENGTH).fill("");

    digits.forEach((d, i) => {
      newOtp[i] = d;
    });

    setOtp(newOtp);

    // focus last filled box
    const focusIndex = Math.min(digits.length, OTP_LENGTH - 1);
    inputs.current[focusIndex]?.focus();
  };


  const code = otp.join("");

  // ---------- VERIFY ----------
  const verify = async () => {

    if (!email || !flowType) {
      router.replace("/signup");
      return;
    }

    if (code.length < OTP_LENGTH) {
      setError("Please enter full code");
      return;
    }

    setLoading(true);

    const { error } = await supabase.auth.verifyOtp({
      email,
      token: code,
      type: flowType === "recovery"
        ? "recovery"
        : "signup",
    });


    setLoading(false);

    if (error) {
      setError(error.message);
      return;
    }

    // ---------- ROUTING ----------
    if (flowType === "recovery") {
      router.push("/reset-password");
    } else {
      router.push("/email-verified");
    }
  };


  const resend = async () => {
    if (!email) return;

    setError("");

    const resendType =
      flowType === "recovery"
        ? "recovery"
        : "signup";

    const { error } = await supabase.auth.resend({
      email,
      type: resendType as unknown as "signup",
    });

    if (error) {
      setError(error.message);
      return;
    }

    setError("OTP sent again ✅");
  };


  return (
    <main className="min-h-screen bg-[#FCFFF7]">
      <section className="min-h-screen p-[12px] flex items-center justify-center">

        <div className="w-full max-w-[1400px] min-h-[calc(100vh-24px)] grid grid-cols-1 lg:grid-cols-2 gap-[32px] lg:gap-[64px]">

          {/* IMAGE */}
          <div className="relative w-full h-[300px] sm:h-[420px] lg:h-full overflow-hidden rounded-[32px]">
            <Image
              src="/loginimg.png"
              alt="Buddy’s Burrow Rabbit"
              fill
              priority
              className="object-cover rounded-[24px] lg:rounded-[32px]"
            />
          </div>

          {/* FORM */}
          <div className="flex items-center">
            <div className="w-full max-w-[460px] mx-auto py-[24px] sm:py-[40px]">

              <h1 className="font-poppins text-[#00360C] text-[32px] sm:text-[48px] font-medium mb-[8px]">
                {flowType === "recovery"
                  ? "Verify Reset Code"
                  : "Verify your email"}
              </h1>


              <p className="text-[#7B7B7B] text-[14px] mb-[32px]">
                {flowType === "recovery"
                  ? "Enter the code to reset your password."
                  : "We’ve sent a 6-digit code to verify your email."}
              </p>


              {/* OTP INPUT */}
              <label className="block text-[#00360C] font-medium mb-[10px]">
                Enter OTP
              </label>

              <div className="flex gap-[12px] mb-[10px] flex-wrap">
                {otp.map((digit, i) => (
                  <input
                    key={i}
                    ref={(el) => {
                      inputs.current[i] = el;
                    }}
                    value={digit}
                    onChange={(e) => handleChange(e.target.value, i)}
                    onKeyDown={(e) => handleKeyDown(e, i)}
                    onPaste={handlePaste}
                    maxLength={1}
                    className="w-[52px] h-[60px] sm:w-[64px] sm:h-[64px] text-center text-[22px] rounded-[14px] border border-[#CFE2A7] outline-none focus:border-[#1E4D12]"
                  />
                ))}

              </div>

              {error && (
                <p className="text-[#FF5A3C] text-[13px] mb-[16px]">
                  {error}
                </p>
              )}

              {/* VERIFY BUTTON */}
              <button
                onClick={verify}
                disabled={loading || code.length !== OTP_LENGTH}
                className="w-full bg-[#455F0F] text-white rounded-[16px] py-[16px] font-medium mt-[10px]"
              >
                {loading ? "Verifying..." : "Verify Code"}
              </button>


              {/* RESEND */}
              <p className="text-center text-[14px] text-[#7B7B7B]">
                Didn’t receive the code?{" "}
                <span onClick={resend} className="text-[#455F0F] font-medium underline cursor-pointer">
                  Resend OTP
                </span>
              </p>

            </div>
          </div>

        </div>
      </section>
    </main>
  );
}
