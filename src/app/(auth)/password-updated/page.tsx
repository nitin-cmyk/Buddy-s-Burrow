"use client";

import Image from "next/image";
import { Check } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function PasswordUpdatedPage() {

    // useEffect(() => {
    //     const t = setTimeout(() => {
    //         router.push("/login");
    //     }, 3000);

    //     return () => clearTimeout(t);
    // }, []);

    const router = useRouter();

    return (
        <main className="min-h-screen bg-[#FCFFF7]">
            <section className="min-h-screen p-[12px] flex items-center justify-center">

                <div className="w-full max-w-[1400px] min-h-[calc(100vh-24px)] grid grid-cols-1 lg:grid-cols-2 gap-[32px] lg:gap-[64px]">

                    {/* LEFT IMAGE */}
                    <div className="relative w-full h-[300px] sm:h-[420px] lg:h-full overflow-hidden rounded-[32px]">
                        <Image
                            src="/loginimg.png"
                            alt="Buddy’s Burrow Rabbit"
                            fill
                            priority
                            className="object-cover rounded-[24px] lg:rounded-[32px]"
                        />
                    </div>

                    {/* RIGHT CONTENT */}
                    <div className="flex items-center justify-center">
                        <div className="w-full max-w-[460px] text-center">

                            {/* ICON */}
                            <div className="flex justify-center mb-[20px]">
                                <div className="bg-[#1CB91C] rounded-full p-[18px]">
                                    <Check size={42} color="white" strokeWidth={3} />
                                </div>
                            </div>

                            {/* TITLE */}
                            <h1 className="font-poppins text-[#00360C] text-[32px] sm:text-[48px] font-medium mb-[8px]">
                                Password Updated 
                            </h1>

                            {/* SUBTEXT */}
                            <p className="text-[#7B7B7B] text-[14px] mb-[32px]">
                                Your password has been changed. You can now log in with your new password.
                            </p>

                            {/* BUTTON */}
                            <button
                                onClick={() => router.push("/login")}
                                className="w-full bg-[#455F0F] hover:bg-[#3F560E] text-white rounded-[16px] py-[16px] font-medium"
                            >
                                Go to Login
                            </button>

                        </div>
                    </div>

                </div>

            </section>
        </main>
    );
}
