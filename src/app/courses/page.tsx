"use client";
import { useState } from "react";
import Image from "next/image";
import { Plus } from "lucide-react";

export default function CoursesPage() {

    function FAQAccordion() {
        const [openIndex, setOpenIndex] = useState<number | null>(0);

        const faqs = [
            {
                q: "What are Buddy’s Burrow courses about?",
                a: "Buddy’s Burrow courses are designed to help young learners understand important environmental topics such as nature, ecosystems, climate change, wildlife, and sustainability. Each course combines clear explanations, real-world examples, and engaging activities so students don’t just learn concepts, but understand how they apply to everyday life.",
            },
            {
                q: "Who are these courses designed for?",
                a: "Our courses are thoughtfully created for students between the ages of 10 and 15. The content, language, and activities are carefully tailored to match their curiosity, learning level, and attention span, making the experience both educational and enjoyable.",
            },
            {
                q: "Are there activities or practical tasks included?",
                a: "Yes. Many courses include optional hands-on activities and reflection tasks that encourage students to apply what they’ve learned. These activities help connect lessons to real-world actions, making learning more meaningful and memorable.",
            },
            {
                q: "Do students receive a certificate?",
                a: "Yes, students receive a certificate after completing the course and associated learning activities, recognizing their effort and understanding.",
            },
        ];

        return (
            <div className="flex flex-col">
                {faqs.map((faq, index) => {
                    const isOpen = openIndex === index;

                    return (
                        <div
                            key={index}
                            className="border-b border-[#CFE2A7] bg-[#005715]"
                        >
                            {/* Question */}
                            <button
                                onClick={() => setOpenIndex(isOpen ? null : index)}
                                className="w-full flex items-center justify-between gap-[12px] text-left p-[16px] sm:p-[24px] lg:p-[30px]"
                            >
                                <span className="text-[15px] sm:text-[18px] lg:text-[25px] font-poppins font-medium text-white">
                                    {faq.q}
                                </span>

                                <Plus
                                    className={`w-[18px] h-[18px] sm:w-[22px] sm:h-[22px] lg:w-[24px] lg:h-[24px] text-white transition-transform duration-300 ${isOpen ? "rotate-45" : "rotate-0"
                                        }`}
                                />
                            </button>

                            {/* Answer */}
                            <div
                                className={`overflow-hidden transition-all duration-300 ease-out ${isOpen ? "max-h-[500px] opacity-100" : "max-h-0 opacity-0"
                                    }`}
                            >
                                <p className="px-[16px] sm:px-[24px] lg:px-[30px] pb-[16px] sm:pb-[24px] text-[13px] sm:text-[15px] lg:text-[16px] font-poppins text-white leading-[1.6]">
                                    {faq.a}
                                </p>
                            </div>
                        </div>
                    );
                })}
            </div>
        );
    }

    return (
        <main className="w-full bg-[#FCFFF7]">

            {/* HERO SECTION */}
            <section className="w-full h-[90vh] sm:h-[85vh] lg:h-screen p-[12px]">
                <div className="relative w-full h-full rounded-[16px] sm:rounded-[20px] lg:rounded-[24px] overflow-hidden">

                    <Image
                        src="/courses-hero.png"
                        alt="Buddy’s Burrow books"
                        width={1920}
                        height={1080}
                        priority
                        className="w-full h-full object-cover"
                    />

                    {/* Glass text */}
                    <div className="absolute bottom-[20px] sm:bottom-[28px] lg:bottom-[40px] left-[16px] sm:left-[24px] lg:left-[32px] z-10 max-w-[300px] sm:max-w-[420px] lg:max-w-[520px]">
                        <div className="bg-black/20 backdrop-blur-[10px] shadow-xl rounded-[10px] sm:rounded-[12px] px-[16px] sm:px-[20px] lg:px-[24px] py-[14px] sm:py-[16px] lg:py-[20px]">
                            <h2 className="text-white text-[22px] sm:text-[28px] lg:text-[48px] font-medium font-poppins leading-tight">
                                Where Curiosity Meets Conservation
                            </h2>
                        </div>
                    </div>

                </div>
            </section>


            {/* Introduction */}

            <section className="w-full">
                <div className="max-w-[900px] mx-auto px-[16px] sm:px-[24px] lg:px-[32px] py-[20px] sm:py-[40px] lg:py-[60px] text-center">

                    <h3 className="text-[28px] sm:text-[40px] lg:text-[61px] font-poppins text-[#002E0B] font-medium">
                        Introduction
                    </h3>

                    <p className="mt-[20px] text-left text-[16px] sm:text-[18px] lg:text-[25px] font-poppins font-medium text-[#00360C]">
                        We’re a community of educators, environmentalists, and mentors who believe every young person can make a difference. Buddy’s Burrow helps students explore how nature works through fun lessons, hands-on activities, and real-world events. We make learning about the planet easy, exciting, and designed for curious minds ready to take the next step
                    </p>
                </div>
            </section>

            <section className="w-full bg-[#005715]">
                <div className="max-w-[1280px] mx-auto px-[16px] sm:px-[24px] lg:px-[32px] pt-[30px] pb-[30px]">

                    {/* OUTER BORDER */}
                    <div className="border border-[#CFE2A7] rounded-[16px] sm:rounded-[20px] lg:rounded-[24px] mx-[0] sm:mx-[24px] lg:mx-[50px] p-[16px] sm:p-[24px] lg:p-[32px]">

                        {/* INNER BORDER */}
                        <div className="border border-[#90B73B] rounded-[14px] sm:rounded-[18px] lg:rounded-[20px] p-[20px] sm:p-[28px] lg:p-[36px]">

                            {/* TITLE */}
                            <h3 className="text-[22px] sm:text-[40px] lg:text-[61px] font-poppins font-medium text-white text-center mb-[28px] sm:mb-[36px] lg:mb-[48px]">
                                How Our Courses Work
                            </h3>

                            {/* ICON GRID */}
                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-[20px] sm:gap-[28px] lg:gap-[40px]">

                                {/* ITEM 1 */}
                                <div className="flex flex-col items-center text-center">
                                    <div className="relative w-[64px] h-[64px] sm:w-[76px] sm:h-[76px] lg:w-[88px] lg:h-[88px] rounded-[16px] flex items-center justify-center bg-black/5 backdrop-blur-[10px] shadow-xl transition-all duration-500 ease-out hover:bg-gradient-to-tl before:content-[''] before:absolute before:inset-0 before:rounded-[16px] sm:before:rounded-[18px] lg:before:rounded-[20px] before:shadow-[inset_0_1px_2px_rgba(255,255,255,0.25)] before:pointer-events-none mb-[10px] sm:mb-[12px]">
                                        <Image src="/search-icon.svg" alt="Choose course" width={28} height={28} className="sm:w-[36px] sm:h-[36px] lg:w-[44px] lg:h-[44px]" />
                                    </div>
                                    <p className="text-[14px] sm:text-[16px] lg:text-[20px] font-medium text-white font-poppins leading-[1.4]">
                                        1. Choose Your Course
                                    </p>
                                </div>

                                {/* ITEM 2 */}
                                <div className="flex flex-col items-center text-center">
                                    <div className="relative w-[64px] h-[64px] sm:w-[76px] sm:h-[76px] lg:w-[88px] lg:h-[88px] rounded-[16px] flex items-center justify-center bg-black/5 backdrop-blur-[10px] shadow-xl transition-all duration-500 ease-out hover:bg-gradient-to-tl before:content-[''] before:absolute before:inset-0 before:rounded-[16px] sm:before:rounded-[18px] lg:before:rounded-[20px] before:shadow-[inset_0_1px_2px_rgba(255,255,255,0.25)] before:pointer-events-none mb-[10px] sm:mb-[12px]">
                                        <Image src="/video-icon.svg" alt="Start course" width={28} height={28} className="sm:w-[36px] sm:h-[36px] lg:w-[44px] lg:h-[44px]" />
                                    </div>
                                    <p className="text-[14px] sm:text-[16px] lg:text-[20px] font-medium text-white font-poppins leading-[1.4]">
                                        2. Start the Course
                                    </p>
                                </div>

                                {/* ITEM 3 */}
                                <div className="flex flex-col items-center text-center">
                                    <div className="relative w-[64px] h-[64px] sm:w-[76px] sm:h-[76px] lg:w-[88px] lg:h-[88px] rounded-[16px] flex items-center justify-center bg-black/5 backdrop-blur-[10px] shadow-xl transition-all duration-500 ease-out hover:bg-gradient-to-tl before:content-[''] before:absolute before:inset-0 before:rounded-[16px] sm:before:rounded-[18px] lg:before:rounded-[20px] before:shadow-[inset_0_1px_2px_rgba(255,255,255,0.25)] before:pointer-events-none mb-[10px] sm:mb-[12px]">
                                        <Image src="/book-icon.svg" alt="Learn concepts" width={28} height={28} className="sm:w-[36px] sm:h-[36px] lg:w-[44px] lg:h-[44px]" />
                                    </div>
                                    <p className="text-[14px] sm:text-[16px] lg:text-[20px] font-medium text-white font-poppins leading-[1.4]">
                                        3. Learn the Concepts
                                    </p>
                                </div>

                                {/* ITEM 4 */}
                                <div className="flex flex-col items-center text-center">
                                    <div className="relative w-[64px] h-[64px] sm:w-[76px] sm:h-[76px] lg:w-[88px] lg:h-[88px] rounded-[16px] flex items-center justify-center bg-black/5 backdrop-blur-[10px] shadow-xl transition-all duration-500 ease-out hover:bg-gradient-to-tl before:content-[''] before:absolute before:inset-0 before:rounded-[16px] sm:before:rounded-[18px] lg:before:rounded-[20px] before:shadow-[inset_0_1px_2px_rgba(255,255,255,0.25)] before:pointer-events-none mb-[10px] sm:mb-[12px]">
                                        <Image src="/para-icon.svg" alt="Read" width={28} height={28} className="sm:w-[36px] sm:h-[36px] lg:w-[44px] lg:h-[44px]" />
                                    </div>
                                    <p className="text-[14px] sm:text-[16px] lg:text-[20px] font-medium text-white font-poppins leading-[1.4]">
                                        4. Read and Understand
                                    </p>
                                </div>

                                {/* ITEM 5 */}
                                <div className="flex flex-col items-center text-center">
                                    <div className="relative w-[64px] h-[64px] sm:w-[76px] sm:h-[76px] lg:w-[88px] lg:h-[88px] rounded-[16px] flex items-center justify-center bg-black/5 backdrop-blur-[10px] shadow-xl transition-all duration-500 ease-out hover:bg-gradient-to-tl before:content-[''] before:absolute before:inset-0 before:rounded-[16px] sm:before:rounded-[18px] lg:before:rounded-[20px] before:shadow-[inset_0_1px_2px_rgba(255,255,255,0.25)] before:pointer-events-none mb-[10px] sm:mb-[12px]">
                                        <Image src="/assessment-icon.svg" alt="Assessment" width={28} height={28} className="sm:w-[36px] sm:h-[36px] lg:w-[44px] lg:h-[44px]" />
                                    </div>
                                    <p className="text-[14px] sm:text-[16px] lg:text-[20px] font-medium text-white font-poppins leading-[1.4]">
                                        5. Assessment & Activity
                                    </p>
                                </div>

                                {/* ITEM 6 */}
                                <div className="flex flex-col items-center text-center">
                                    <div className="relative w-[64px] h-[64px] sm:w-[76px] sm:h-[76px] lg:w-[88px] lg:h-[88px] rounded-[16px] flex items-center justify-center bg-black/5 backdrop-blur-[10px] shadow-xl transition-all duration-500 ease-out hover:bg-gradient-to-tl before:content-[''] before:absolute before:inset-0 before:rounded-[16px] sm:before:rounded-[18px] lg:before:rounded-[20px] before:shadow-[inset_0_1px_2px_rgba(255,255,255,0.25)] before:pointer-events-none mb-[10px] sm:mb-[12px]">
                                        <Image src="/certification-icon.svg" alt="Certificate" width={28} height={28} className="sm:w-[36px] sm:h-[36px] lg:w-[44px] lg:h-[44px]" />
                                    </div>
                                    <p className="text-[14px] sm:text-[16px] lg:text-[20px] font-medium text-white font-poppins leading-[1.4]">
                                        6. Earn Your Certificate
                                    </p>
                                </div>

                            </div>
                        </div>
                    </div>
                </div>
            </section>


            <section className="w-full bg-[#FCFFF7]">
                <div className="max-w-[1280px] mx-auto my-[40px] sm:my-[50px] lg:my-[60px] px-[16px] sm:px-[24px] lg:px-[32px] pt-[60px] sm:pt-[70px] lg:pt-[90px] pb-[40px] sm:pb-[50px] lg:pb-[60px] border border-[#CFE2A7] rounded-[16px]">


                    {/* Section Title */}
                    <h3 className="text-[22px] sm:text-[36px] lg:text-[61px] font-poppins font-medium text-[#00360C] text-center mb-[24px] sm:mb-[36px] lg:mb-[50px]">
                        BROWSE OUR COURSES
                    </h3>

                    {/* Courses Grid */}
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-[20px] sm:gap-[28px] lg:gap-[40px]">

                        {/* COURSE CARD (reuse this block) */}
                        <div className="border border-[#90B73B] rounded-[12px] overflow-hidden bg-white">

                            {/* Image Wrapper */}
                            <div className="relative w-full h-[200px] sm:h-[240px] lg:h-[400px]">

                                <Image
                                    src="/coursesimg.jpg"
                                    alt="Course"
                                    fill
                                    className="object-cover"
                                />

                                {/* Centered Glass Title */}
                                <div className="absolute inset-0 flex items-center justify-center px-[16px] sm:px-[32px] lg:px-[100px]">
                                    <div className="bg-black/20 backdrop-blur-[10px] rounded-[12px] px-[16px] sm:px-[20px] lg:px-[24px] py-[10px] sm:py-[12px] shadow-[0_8px_24px_rgba(0,0,0,0.25)]">
                                        <h4 className="text-[16px] sm:text-[24px] lg:text-[39px] font-poppins font-medium text-white text-center leading-tight">
                                            Lorem Ipsum – This is just a sample text, the original text may vary
                                        </h4>
                                    </div>
                                </div>

                            </div>

                            {/* Button */}
                            <div className="p-[14px] sm:p-[18px] lg:p-[24px]">
                                <button className="px-[18px] sm:px-[20px] py-[8px] sm:py-[10px] rounded-[8px] border border-[#00360C] text-[13px] sm:text-[15px] lg:text-[16px] font-poppins font-medium text-[#00360C] hover:bg-[#00360C] hover:text-white transition-all duration-300">
                                    Continue
                                </button>
                            </div>

                        </div>
                        {/* COURSE CARD (reuse this block) */}
                        <div className="border border-[#90B73B] rounded-[12px] overflow-hidden bg-white">

                            {/* Image Wrapper */}
                            <div className="relative w-full h-[200px] sm:h-[240px] lg:h-[400px]">

                                <Image
                                    src="/coursesimg.jpg"
                                    alt="Course"
                                    fill
                                    className="object-cover"
                                />

                                {/* Centered Glass Title */}
                                <div className="absolute inset-0 flex items-center justify-center px-[16px] sm:px-[32px] lg:px-[100px]">
                                    <div className="bg-black/20 backdrop-blur-[10px] rounded-[12px] px-[16px] sm:px-[20px] lg:px-[24px] py-[10px] sm:py-[12px] shadow-[0_8px_24px_rgba(0,0,0,0.25)]">
                                        <h4 className="text-[16px] sm:text-[24px] lg:text-[39px] font-poppins font-medium text-white text-center leading-tight">
                                            Lorem Ipsum – This is just a sample text, the original text may vary
                                        </h4>
                                    </div>
                                </div>

                            </div>

                            {/* Button */}
                            <div className="p-[14px] sm:p-[18px] lg:p-[24px]">
                                <button className="px-[18px] sm:px-[20px] py-[8px] sm:py-[10px] rounded-[8px] border border-[#00360C] text-[13px] sm:text-[15px] lg:text-[16px] font-poppins font-medium text-[#00360C] hover:bg-[#00360C] hover:text-white transition-all duration-300">
                                    Continue
                                </button>
                            </div>

                        </div>
                        {/* COURSE CARD (reuse this block) */}
                        <div className="border border-[#90B73B] rounded-[12px] overflow-hidden bg-white">

                            {/* Image Wrapper */}
                            <div className="relative w-full h-[200px] sm:h-[240px] lg:h-[400px]">

                                <Image
                                    src="/coursesimg.jpg"
                                    alt="Course"
                                    fill
                                    className="object-cover"
                                />

                                {/* Centered Glass Title */}
                                <div className="absolute inset-0 flex items-center justify-center px-[16px] sm:px-[32px] lg:px-[100px]">
                                    <div className="bg-black/20 backdrop-blur-[10px] rounded-[12px] px-[16px] sm:px-[20px] lg:px-[24px] py-[10px] sm:py-[12px] shadow-[0_8px_24px_rgba(0,0,0,0.25)]">
                                        <h4 className="text-[16px] sm:text-[24px] lg:text-[39px] font-poppins font-medium text-white text-center leading-tight">
                                            Lorem Ipsum – This is just a sample text, the original text may vary
                                        </h4>
                                    </div>
                                </div>

                            </div>

                            {/* Button */}
                            <div className="p-[14px] sm:p-[18px] lg:p-[24px]">
                                <button className="px-[18px] sm:px-[20px] py-[8px] sm:py-[10px] rounded-[8px] border border-[#00360C] text-[13px] sm:text-[15px] lg:text-[16px] font-poppins font-medium text-[#00360C] hover:bg-[#00360C] hover:text-white transition-all duration-300">
                                    Continue
                                </button>
                            </div>

                        </div>
                        {/* COURSE CARD (reuse this block) */}
                        <div className="border border-[#90B73B] rounded-[12px] overflow-hidden bg-white">

                            {/* Image Wrapper */}
                            <div className="relative w-full h-[200px] sm:h-[240px] lg:h-[400px]">

                                <Image
                                    src="/coursesimg.jpg"
                                    alt="Course"
                                    fill
                                    className="object-cover"
                                />

                                {/* Centered Glass Title */}
                                <div className="absolute inset-0 flex items-center justify-center px-[16px] sm:px-[32px] lg:px-[100px]">
                                    <div className="bg-black/20 backdrop-blur-[10px] rounded-[12px] px-[16px] sm:px-[20px] lg:px-[24px] py-[10px] sm:py-[12px] shadow-[0_8px_24px_rgba(0,0,0,0.25)]">
                                        <h4 className="text-[16px] sm:text-[24px] lg:text-[39px] font-poppins font-medium text-white text-center leading-tight">
                                            Lorem Ipsum – This is just a sample text, the original text may vary
                                        </h4>
                                    </div>
                                </div>

                            </div>

                            {/* Button */}
                            <div className="p-[14px] sm:p-[18px] lg:p-[24px]">
                                <button className="px-[18px] sm:px-[20px] py-[8px] sm:py-[10px] rounded-[8px] border border-[#00360C] text-[13px] sm:text-[15px] lg:text-[16px] font-poppins font-medium text-[#00360C] hover:bg-[#00360C] hover:text-white transition-all duration-300">
                                    Continue
                                </button>
                            </div>

                        </div>
                        {/* COURSE CARD (reuse this block) */}
                        <div className="border border-[#90B73B] rounded-[12px] overflow-hidden bg-white">

                            {/* Image Wrapper */}
                            <div className="relative w-full h-[200px] sm:h-[240px] lg:h-[400px]">

                                <Image
                                    src="/coursesimg.jpg"
                                    alt="Course"
                                    fill
                                    className="object-cover"
                                />

                                {/* Centered Glass Title */}
                                <div className="absolute inset-0 flex items-center justify-center px-[16px] sm:px-[32px] lg:px-[100px]">
                                    <div className="bg-black/20 backdrop-blur-[10px] rounded-[12px] px-[16px] sm:px-[20px] lg:px-[24px] py-[10px] sm:py-[12px] shadow-[0_8px_24px_rgba(0,0,0,0.25)]">
                                        <h4 className="text-[16px] sm:text-[24px] lg:text-[39px] font-poppins font-medium text-white text-center leading-tight">
                                            Lorem Ipsum – This is just a sample text, the original text may vary
                                        </h4>
                                    </div>
                                </div>

                            </div>

                            {/* Button */}
                            <div className="p-[14px] sm:p-[18px] lg:p-[24px]">
                                <button className="px-[18px] sm:px-[20px] py-[8px] sm:py-[10px] rounded-[8px] border border-[#00360C] text-[13px] sm:text-[15px] lg:text-[16px] font-poppins font-medium text-[#00360C] hover:bg-[#00360C] hover:text-white transition-all duration-300">
                                    Continue
                                </button>
                            </div>

                        </div>


                    </div>
                </div>
            </section>

            <section className="w-full bg-[#005715] px-[16px] sm:px-[32px] lg:px-[70px] py-[40px] sm:py-[45px] lg:py-[50px]">
                <div className="max-w-[1200px] mx-auto">

                    <FAQAccordion />

                </div>
            </section>
        </main>
    );
}