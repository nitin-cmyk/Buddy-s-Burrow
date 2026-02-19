"use client";

import Image from "next/image";
import { useState } from "react";
import { Eye, EyeOff, Check, X } from "lucide-react";
import { supabase } from "@/lib/supabaseClient";
import { useRouter } from "next/navigation";

export default function SignupPage() {

    const router = useRouter();

    const [showPassword, setShowPassword] = useState(false);
    const [showConfirm, setShowConfirm] = useState(false);

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirm, setConfirm] = useState("");
    const [agree, setAgree] = useState(false);

    const [emailError, setEmailError] = useState("");
    const [loading, setLoading] = useState(false);

    // ---------- VALIDATORS ----------
    const validateEmail = (val: string) => {
        setEmail(val);
        const ok = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val);
        setEmailError(ok || val === "" ? "" : "Enter a valid email address");
    };

    const passLenValid = password.length >= 8;
    const passAlphaNum = /[a-zA-Z]/.test(password) && /\d/.test(password);
    const confirmValid = confirm === password && confirm !== "";

    const formValid =
        name &&
        email &&
        password &&
        confirm &&
        passLenValid &&
        passAlphaNum &&
        confirmValid &&
        !emailError &&
        agree;

    // ---------- SUBMIT ----------
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!formValid || loading) return;

        setLoading(true);   // LOCK BUTTON

        const cleanEmail = email.trim().toLowerCase();

        const { data, error } = await supabase.auth.signUp({
            email: cleanEmail,
            password,
            options: {
                data: { name }
            }
        });

        setLoading(false);  // UNLOCK BUTTON

        console.log("SIGNUP RESPONSE:", data, error);

        if (error) {
            console.error("SUPABASE ERROR:", error);
            if (error.message.includes("already registered")) {
                alert("Account already exists. Please login.");
            } else {
                alert(error.message);
            }
            return;
        }

        router.push(`/verify-otp?email=${encodeURIComponent(cleanEmail)}&type=signup`);
    };

    // ---------- UI ----------
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
                            sizes="(max-width:1024px) 100vw, 50vw"
                            className="object-cover rounded-[24px] lg:rounded-[32px]"
                        />
                    </div>

                    {/* FORM */}
                    <div className="flex items-center">
                        <form onSubmit={handleSubmit}
                            className="w-full max-w-[460px] mx-auto py-[24px] sm:py-[40px]">

                            <h1 className="font-poppins text-[#00360C] text-[32px] sm:text-[48px] font-medium mb-[8px]">
                                Sign Up
                            </h1>

                            <p className="text-[#7B7B7B] text-[14px] mb-[32px]">
                                Already have an account?{" "}
                                <a href="/login" className="text-[#00360C] font-medium underline">
                                    Log in
                                </a>
                            </p>

                            {/* NAME */}
                            <div className="mb-[20px]">
                                <label className="block text-[16px] text-[#00360C] font-medium mb-[6px]">Name</label>
                                <input
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                    className="w-full rounded-[16px] border border-[#CFE2A7] px-[16px] py-[14px] text-[14px] outline-none focus:border-[#1E4D12]"
                                    placeholder="Enter Name"
                                />
                            </div>

                            {/* EMAIL */}
                            <div className="mb-[20px]">
                                <label className="block text-[16px] text-[#00360C] font-medium mb-[6px]">Email Address</label>
                                <input
                                    value={email}
                                    onChange={(e) => validateEmail(e.target.value)}
                                    className="w-full rounded-[16px] border border-[#CFE2A7] px-[16px] py-[14px] text-[14px] outline-none focus:border-[#1E4D12]"
                                    placeholder="Enter Email Address"
                                />
                                {emailError && <p className="text-red-500 text-[13px] mt-[6px]">{emailError}</p>}
                            </div>

                            {/* PASSWORD */}
                            <div className="mb-[16px]">
                                <label className="block text-[16px] text-[#00360C] font-medium mb-[6px]">Password</label>
                                <div className="relative">
                                    <input
                                        type={showPassword ? "text" : "password"}
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        className="w-full rounded-[16px] border border-[#CFE2A7] px-[16px] py-[14px] pr-[48px] text-[14px] outline-none focus:border-[#1E4D12]"
                                        placeholder="Enter Password"
                                    />
                                    <button type="button" onClick={() => setShowPassword(!showPassword)}
                                        className="absolute right-[14px] top-1/2 -translate-y-1/2">
                                        {showPassword ? <Eye size={20} /> : <EyeOff size={20} />}
                                    </button>
                                </div>

                                {password && (
                                    <div className="flex gap-[18px] mt-[8px] text-[13px]">
                                        <div className={`flex items-center gap-1 ${passLenValid ? "text-green-600" : "text-red-500"}`}>
                                            {passLenValid ? <Check size={14} /> : <X size={14} />}
                                            8 characters
                                        </div>
                                        <div className={`flex items-center gap-1 ${passAlphaNum ? "text-green-600" : "text-red-500"}`}>
                                            {passAlphaNum ? <Check size={14} /> : <X size={14} />}
                                            Letters & numbers
                                        </div>
                                    </div>
                                )}
                            </div>

                            {/* CONFIRM */}
                            <div className="mb-[16px]">
                                <label className="block text-[16px] text-[#00360C] font-medium mb-[6px]">Confirm Password</label>
                                <div className="relative">
                                    <input
                                        type={showConfirm ? "text" : "password"}
                                        value={confirm}
                                        onChange={(e) => setConfirm(e.target.value)}
                                        className="w-full rounded-[16px] border border-[#CFE2A7] px-[16px] py-[14px] pr-[48px] text-[14px] outline-none focus:border-[#1E4D12]"
                                        placeholder="Confirm Password"
                                    />
                                    <button type="button" onClick={() => setShowConfirm(!showConfirm)}
                                        className="absolute right-[14px] top-1/2 -translate-y-1/2">
                                        {showConfirm ? <Eye size={20} /> : <EyeOff size={20} />}
                                    </button>
                                </div>

                                {confirm && (
                                    <div className={`flex items-center gap-1 mt-[6px] text-[13px] ${confirmValid ? "text-green-600" : "text-red-500"}`}>
                                        {confirmValid ? <Check size={14} /> : <X size={14} />}
                                        Passwords match
                                    </div>
                                )}
                            </div>

                            {/* TERMS */}
                            <div className="flex items-center gap-3 mb-[24px] italic">
                                <input
                                    type="checkbox"
                                    checked={agree}
                                    onChange={() => setAgree(!agree)}
                                    className="w-4 h-4 accent-[#005715]"
                                />
                                <p className="text-[14px] text-[#7B7B7B]">
                                    I agree to the{" "}
                                    <span className="text-[#005715] font-medium cursor-pointer underline">
                                        Terms & Conditions
                                    </span>
                                </p>
                            </div>

                            {/* SUBMIT */}
                            <button
                                type="submit"
                                disabled={!formValid || loading}
                                className="w-full bg-[#455F0F] border border-[#CFE2A7] text-white rounded-[16px] py-[16px] text-[16px] font-medium"
                            >
                                {loading ? "Creating Account..." : "Create Account"}
                            </button>

                        </form>
                    </div>

                </div>
            </section>
        </main>
    );
}
