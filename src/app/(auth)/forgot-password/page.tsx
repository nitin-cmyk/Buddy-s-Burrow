"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { supabase } from "@/lib/supabaseClient";
import { useRouter } from "next/navigation";
// import { useSearchParams } from "next/navigation";


export default function ForgotPasswordPage() {

    const router = useRouter();

    const [email, setEmail] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    // const params = useSearchParams();
    // const expired = params.get("expired");


    // ---------- EMAIL VALID ----------
    const isValidEmail = (val: string) =>
        /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val);

    // ---------- SUBMIT ----------
    const sendOtp = async (e: React.FormEvent) => {
        e.preventDefault();
        setError("");

        if (!email) {
            setError("Please enter your email");
            return;
        }

        if (!isValidEmail(email)) {
            setError("Enter a valid email address");
            return;
        }

        setLoading(true);

        const cleanEmail = email.trim().toLowerCase();

        const { error } = await supabase.auth.resetPasswordForEmail(
            cleanEmail,
            {
                redirectTo: `${window.location.origin}/update-password`,
            }
        );

        setLoading(false);

        if (error) {
            console.log("SUPABASE ERROR:", error);

            if (error.message.includes("rate limit")) {
                setError("Too many requests. Please wait a minute.");
            } else if (error.message.includes("User not found")) {
                setError("This email is not registered.");
            } else {
                setError("Unable to send OTP. Try again.");
            }
            return;
        }



        router.push(`/verify-otp?email=${cleanEmail}&type=recovery`);
    };


    return (
        <main className="min-h-screen bg-[#FCFFF7]">
            <section className="min-h-screen p-[12px] flex items-center justify-center">

                <div className="w-full max-w-[1400px] h-[calc(100vh-24px)] grid grid-cols-1 lg:grid-cols-2 gap-[32px] lg:gap-[64px]">

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
                        <form
                            onSubmit={sendOtp}
                            className="w-full max-w-[460px] mx-auto py-[24px] sm:py-[40px]"
                        >

                            {/* BACK */}
                            <Link
                                href="/login"
                                className="inline-flex items-center gap-2 mb-[24px] text-[#00360C] border px-3 py-1 rounded-full"
                            >
                                ← Back
                            </Link>

                            {/* TITLE */}
                            <h1 className="font-poppins text-[#00360C] text-[32px] sm:text-[48px] font-medium mb-[8px]">
                                Forgot Password
                            </h1>

                            <p className="text-[#7B7B7B] text-[14px] mb-[32px]">
                                Enter your registered email address and we’ll send a one-time code to reset your password.
                            </p>

                            {/* EMAIL */}
                            <div className="mb-[12px]">
                                <label className="block text-[16px] text-[#00360C] font-medium mb-[6px]">
                                    Email Address
                                </label>

                                <input
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    placeholder="Enter Email Address"
                                    className="w-full rounded-[16px] border border-[#CFE2A7] px-[16px] py-[14px] text-[14px] outline-none focus:border-[#1E4D12]"
                                />
                            </div>

                            {/* ERROR
                            <div className="h-[22px] mb-[16px]">
                                {expired && (
                                    <p className="text-[#FF5A3C] text-[13px]">
                                        Your reset session expired. Please request a new code.
                                    </p>
                                )}

                                {error && (
                                    <p className="text-[#FF5A3C] text-[13px]">
                                        {error}
                                    </p>
                                )}
                            </div> */}


                            {/* BUTTON */}
                            <button
                                type="submit"
                                disabled={loading}
                                className="w-full bg-[#455F0F] text-white rounded-[16px] py-[16px] font-medium mb-[14px]"
                            >
                                {loading ? "Sending..." : "Send OTP"}
                            </button>

                            {/* LOGIN LINK */}
                            <p className="text-center text-[14px] text-[#7B7B7B]">
                                Remembered your password?{" "}
                                <Link
                                    href="/login"
                                    className="text-[#00360C] font-medium underline"
                                >
                                    Log in
                                </Link>
                            </p>

                        </form>
                    </div>

                </div>

            </section>
        </main>
    );
}
