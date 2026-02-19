"use client";

import Image from "next/image";
import { useState } from "react";

export default function DonateUsPage() {
    const [frequency, setFrequency] = useState<"ONE_TIME" | "MONTHLY">("ONE_TIME");
    const [amount, setAmount] = useState<number | null>(40);
    const [customAmount, setCustomAmount] = useState<string>("");



    return (
        <main className="min-h-screen overflow-x-hidden bg-[#FCFFF7]">

            {/* HERO SECTION */}
            <section className="w-full h-[90vh] sm:h-[85vh] lg:h-screen p-[12px]">
                <div className="relative w-full h-full rounded-[16px] sm:rounded-[20px] lg:rounded-[24px] overflow-hidden">

                    <Image
                        src="/donateus-bg.png"
                        alt="Buddy’s Burrow animals"
                        width={1920}
                        height={1080}
                        priority
                        className="w-full h-full object-cover object-[80%_50%]"
                    />

                    {/* Glass text */}
                    <div className="absolute bottom-[20px] sm:bottom-[28px] lg:bottom-[80px] left-[16px] sm:left-[24px] lg:left-[92px] z-10 max-w-[300px] sm:max-w-[420px] lg:max-w-[520px]">
                        <div className="bg-black/20 backdrop-blur-[10px]  shadow-xl rounded-[10px] sm:rounded-[12px] px-[16px] sm:px-[20px] lg:px-[24px] py-[14px] sm:py-[16px] lg:py-[20px]">
                            <h2 className="text-white text-[22px] sm:text-[28px] lg:text-[52px] font-medium font-poppins leading-[62px]">
                                Together, We Grow a Greener Future
                            </h2>
                        </div>
                    </div>
                </div>
            </section>
            {/* ================= DONATION SECTION ================= */}
            <section className="w-full py-[40px] sm:py-[60px] lg:py-[80px]">
                <div className="max-w-[1280px] mx-auto px-[20px] sm:px-[32px] lg:px-[48px]">

                    {/* Heading */}
                    <h2 className="text-center font-poppins font-medium text-[#33470B] text-[32px] sm:text-[48px] lg:text-[64px] mb-[40px]">
                        Donate to Buddy’s Burrow
                    </h2>

                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-[32px] lg:gap-[48px] items-stretch">

                        {/* LEFT INFO CARD */}
                        <div className="rounded-[24px] p-[24px] sm:p-[32px] lg:p-[40px] text-[#33470B] font-medium text-[16px] sm:text-[24px] leading-[1.8]">
                            <p>
                                Your contribution directly supports environmental education,
                                community programs, and hands-on learning experiences that help
                                young minds grow into responsible caretakers of our planet.
                            </p>
                        </div>

                        {/* RIGHT DONATION CONTROLS */}
                        <div className="flex flex-col gap-[24px]">

                            {/* Frequency */}
                            <div className="flex gap-[32px] text-[14px] sm:text-[16px]">
                                <label className="flex items-center gap-2 cursor-pointer text-[20px] text-[#33470B]" onClick={() => setFrequency("ONE_TIME")}>
                                    <span className={`w-4 h-4 rounded-full border-2 border-[#2F5F12] flex items-center justify-center`}>
                                        {frequency === "ONE_TIME" && <span className="w-2 h-2 rounded-full bg-[#2F5F12]" />}
                                    </span>
                                    ONE TIME
                                </label>

                                <label className="flex items-center gap-2 cursor-pointer text-[20px] text-[#33470B]" onClick={() => setFrequency("MONTHLY")}>
                                    <span className={`w-4 h-4 rounded-full border-2 border-[#2F5F12] flex items-center justify-center`}>
                                        {frequency === "MONTHLY" && <span className="w-2 h-2 rounded-full bg-[#2F5F12]" />}
                                    </span>
                                    MONTHLY
                                </label>
                            </div>


                            {/* Amount Buttons */}
                            <div className="grid grid-cols-2 sm:grid-cols-3 gap-[40px]">
                                {[10, 20, 40, 60].map((amt) => (
                                    <button
                                        key={amt}
                                        onClick={() => setAmount(amt)}
                                        className={`border border-[#90B73B] rounded-[8px] py-[20px] text-[20px] font-medium ${amount === amt ? "bg-[#0B5F14] text-white" : "text-[#33470B]"
                                            }`}
                                    >
                                        ${amt}
                                    </button>
                                ))}
                            </div>


                            {/* Other Amount */}
                            <div className="flex items-center border border-[#90B73B] rounded-[12px] overflow-hidden">
                                <span className="px-[16px] text-[#33470B] text-[18px]">$</span>
                                <input
                                    type="number"
                                    inputMode="numeric"
                                    value={customAmount}
                                    placeholder="Other amount"
                                    onChange={(e) => {
                                        const val = e.target.value;

                                        if (val === "" || Number(val) >= 0) {
                                            setCustomAmount(val);
                                            setAmount(null);
                                        }
                                    }}
                                    onBlur={() => {
                                        if (customAmount !== "") {
                                            setAmount(Number(customAmount));
                                        }
                                    }}
                                    className="flex-1 bg-transparent px-[16px] py-[20px] text-[#33470B] font-medium placeholder:text-[#33470B] outline-none"
                                />

                            </div>


                            {/* CTA */}
                            <button className="mt-[16px] bg-[#005715] hover:bg-[#0E6F18] transition text-white rounded-[8px] py-[20px] text-[20px] font-medium">
                                Continue to Payment Mode
                            </button>

                        </div>
                    </div>
                </div>
            </section>

            <section className="w-full mb-15">
                <div className="max-w-[1280px] mx-auto px-[16px] sm:px-[24px] lg:px-[32px] pt-15">
                    <div className="border border-[#CFE2A7] rounded-[16px] sm:rounded-[20px] lg:rounded-[24px] mx-[0] sm:mx-[24px] lg:mx-[50px] p-[32px]">

                        {/* INNER BORDER */}
                        <div className="border border-[#CFE2A7] rounded-[16px] p-8 flex flex-col">
                            <div className="max-w-[1184px] mx-auto flex flex-col gap-[40px] text-center">
                                <h2 className="font-poppins font-medium text-[32px] sm:text-[56px] lg:text-[64px] text-[#00360C]">
                                    Why Your Support Matters
                                </h2>
                                <p className="font-poppins font-normal text-[16px] leading-[24px] text-left text-[#00360C] max-w-[900px] mx-auto">
                                    Every contribution to Buddy’s Burrow helps turn environmental learning into meaningful action. Your support enables us to create engaging courses, organize awareness programs, and provide hands-on activities that help young learners understand their role in protecting the planet.
                                    By donating, you’re not just supporting an organization - you’re helping inspire responsibility, care, and conscious action in the next generation. Together, these small acts of support grow into long term impact for a healthier and more sustainable future.
                                </p>
                            </div>
                        </div>

                    </div>
                </div>
            </section>
        </main>
    );
}