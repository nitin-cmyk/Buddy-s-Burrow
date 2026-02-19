import Image from "next/image";

export default function AboutPage() {
    return (
        <main className="w-full bg-[#FCFFF7] overflow-x-hidden">

            {/* ================= HERO SECTION ================= */}
            <section className="w-full h-[75vh] sm:h-[85vh] lg:h-screen p-[12px]">
                <div className="relative w-full h-full rounded-[16px] sm:rounded-[20px] lg:rounded-[24px] overflow-hidden">

                    <Image
                        src="/coursesimg.jpg"
                        alt="Buddy’s Burrow animals"
                        width={1920}
                        height={1080}
                        priority
                        className="w-full h-full object-cover object-[80%_50%]"
                    />

                    {/* Glass text */}
                    <div className="absolute bottom-[16px] sm:bottom-[28px] lg:bottom-[80px]
                          left-[12px] sm:left-[24px] lg:left-[92px]
                          z-10 max-w-[260px] sm:max-w-[420px] lg:max-w-[520px]">
                        <div className="bg-black/20 backdrop-blur-[10px] shadow-xl
                            rounded-[10px] sm:rounded-[12px]
                            px-[14px] sm:px-[20px] lg:px-[24px]
                            py-[12px] sm:py-[16px] lg:py-[20px]">
                            <h2 className="text-white
                             text-[16px] sm:text-[28px] lg:text-[52px]
                             font-medium font-poppins
                             leading-tight sm:leading-[1.2] lg:leading-[62px]">
                                Course Title - This is just a sample text text, the original text goes here
                            </h2>
                        </div>
                    </div>

                </div>
            </section>

            {/* ================= INTRO ================= */}
            <section className="w-full">
                <div className="max-w-[900px] mx-auto px-[16px] sm:px-[24px] lg:px-[32px]
                        py-[24px] sm:py-[40px] lg:py-[60px] text-center">

                    <h3 className="text-[24px] sm:text-[40px] lg:text-[61px]
                         font-poppins text-[#002E0B] font-medium">
                        In this Course
                    </h3>

                    <p className="mt-[16px] sm:mt-[20px]
                        text-left text-[14px] sm:text-[18px] lg:text-[25px]
                        font-poppins font-medium text-[#00360C]">
                        We’re a community of educators, environmentalists, and mentors who believe every young person can make a difference. Buddy’s Burrow helps students explore how nature works through fun lessons, hands-on activities, and real-world events. We make learning about the planet easy, exciting, and designed for curious minds ready to take the next step
                    </p>
                </div>
            </section>

            {/* ================= MODULES 1–2 ================= */}
            <section>
                <div className="max-w-[900px] mx-auto px-[16px] sm:px-[24px] lg:px-[32px]
                        py-[24px] sm:py-[40px] lg:py-[60px] text-center">

                    <h3 className="text-[24px] sm:text-[40px] lg:text-[61px]
                         font-poppins text-[#002E0B] font-medium">
                        Explore every Module
                    </h3>

                    {[1, 2].map((num) => (
                        <div
                            key={num}
                            className="mt-[16px] w-full min-h-[70px] bg-[#90B73B] rounded-[16px]
                         flex flex-col sm:flex-row items-start sm:items-center
                         justify-between gap-2
                         px-[16px] sm:px-[28px] py-[10px]"
                        >
                            <span className="text-[#00360C] text-[14px] sm:text-[22px] font-medium">
                                {num}. Module {num === 1 ? "One" : "Two"}
                            </span>

                            <button className="flex items-center rounded-[8px] bg-white
                                 border border-[#005715] text-[#005715]
                                 font-semibold text-[14px] sm:text-[16px]
                                 overflow-hidden self-end sm:self-auto">
                                <div className="px-3 sm:px-4 py-[4px] sm:py-[6px]">
                                    Completed
                                </div>
                                <div className="w-7 h-7 sm:w-8 sm:h-8 flex items-center justify-center
                                bg-[#005715] rounded-[6px] mr-[1px] text-white">
                                    ✓
                                </div>
                            </button>
                        </div>
                    ))}
                </div>
            </section>

            {/* ================= BREAK SECTION ================= */}
            <section className="w-full bg-[#005715]">
                <div className="max-w-[1280px] mx-auto px-[16px] sm:px-[24px] lg:px-[32px]
                        py-[60px] sm:py-[80px] lg:py-[120px]">

                    <div className="border border-[#CFE2A7] rounded-[20px]
                          p-[12px] sm:p-[32px]
                          mx-[0] sm:mx-[24px] lg:mx-[50px]">

                        <div className="border border-[#90B73B] rounded-[12px] text-white">

                            <h3 className="text-white
                             text-[26px] sm:text-[48px] lg:text-[60px]
                             text-center font-medium pt-[20px] sm:pt-[28px]">
                                Take a Short Break
                            </h3>

                            <p className="p-[16px] sm:p-[30px]
                            text-[14px] sm:text-[16px]
                            leading-[1.7] sm:leading-[1.8]">
                                Great work so far! You’ve taken time and effort to move through this part
                                of the course, and that deserves appreciation. Learning about the
                                environment is a journey, and taking short breaks helps your mind absorb
                                new ideas more effectively. Take a moment to pause, relax, and reflect on
                                what you’ve learned before continuing. When you’re ready, you can move
                                ahead feeling refreshed and confident for the next module.
                            </p>

                        </div>
                    </div>
                </div>
            </section>

            {/* ================= MODULES 3–8 ================= */}
            <section>
                <div className="max-w-[900px] mx-auto px-[16px] sm:px-[24px] lg:px-[32px]
                        py-[24px] sm:py-[40px] lg:py-[60px]">

                    {[3, 4, 5, 6, 7, 8].map((num) => (
                        <div
                            key={num}
                            className={`mt-[16px] w-full min-h-[70px] rounded-[16px]
                          flex flex-col sm:flex-row items-start sm:items-center
                          justify-between gap-2
                          px-[16px] sm:px-[28px] py-[10px]
                          ${num === 3 ? "bg-[#005715] text-white" : "border border-[#7B7B7B]"}`}
                        >
                            <span className={`text-[14px] sm:text-[22px] font-medium
                                ${num === 3 ? "text-white" : "text-[#00360C]"}`}>
                                {num}. Module {["Three", "Four", "Five", "Six", "Seven", "Eight"][num - 3]}
                            </span>

                            <button className="flex items-center rounded-[8px] bg-white
                                 border border-[#005715] text-[#005715]
                                 font-semibold text-[14px] sm:text-[16px]
                                 overflow-hidden self-end sm:self-auto">
                                <div className="px-3 sm:px-4 py-[4px] sm:py-[6px]">
                                    {num === 3 ? "Start Learning" : "Locked"}
                                </div>
                                <div className="w-7 h-7 sm:w-8 sm:h-8 flex items-center justify-center
                                bg-[#005715] rounded-[6px] mr-[1px] text-white">
                                    ✓
                                </div>
                            </button>
                        </div>
                    ))}

                </div>
            </section>

        </main>
    );
}
