import Image from "next/image";
import Link from "next/link";
import { supabase } from "@/lib/supabaseClient";

export default async function NewsAndRecapsPage() {

    // const WeCombineBorder = () => (
    //     <svg
    //         viewBox="0 0 620 560"
    //         className="absolute inset-0 w-full h-full pointer-events-none"
    //         fill="none"
    //         xmlns="http://www.w3.org/2000/svg"
    //         preserveAspectRatio="none"
    //     >
    //         {/* INSIDE STROKE MASK */}
    //         <mask id="we-combine-mask" fill="white">
    //             <path d="M608 0C614.627 0 620 5.37258 620 12V488C620 492.418 616.418 496 612 496H428C421.373 496 416 501.373 416 508V552C416 556.418 412.418 560 408 560H12C5.37258 560 0 554.627 0 548V84C0 79.5817 3.58172 76 8 76H68C72.4183 76 76 72.4183 76 68V8C76 3.58172 79.5817 0 84 0H608Z" />
    //         </mask>

    //         {/* BORDER (STROKE ONLY) */}
    //         <path
    //             d="M608 0C614.627 0 620 5.37258 620 12V488C620 492.418 616.418 496 612 496H428C421.373 496 416 501.373 416 508V552C416 556.418 412.418 560 408 560H12C5.37258 560 0 554.627 0 548V84C0 79.5817 3.58172 76 8 76H68C72.4183 76 76 72.4183 76 68V8C76 3.58172 79.5817 0 84 0H608Z"
    //             fill="none"
    //             stroke="#90B73B"
    //             strokeWidth="2"
    //             mask="url(#we-combine-mask)"
    //             vectorEffect="non-scaling-stroke"
    //         />
    //     </svg>
    // );


    const { data: newsRecaps, error } = await supabase
        .from("news_recaps")
        .select("id, title, thumbnail_url, created_at")
        .order("created_at", { ascending: false });

    if (error) {
        console.error(error);
    }


    return (
        <main className="w-full bg-[#FCFFF7]">

            {/* HERO SECTION */}
            <section className="w-full h-[90vh] sm:h-[85vh] lg:h-screen p-[12px]">
                <div className="relative w-full h-full rounded-[16px] sm:rounded-[20px] lg:rounded-[24px] overflow-hidden">

                    <Image
                        src="/newsrecaps-bg.png"
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
                                Global Climate News & Event Recaps
                            </h2>
                        </div>
                    </div>

                </div>
            </section>

            <section className="w-full">
                <div className="max-w-[1166px] mx-auto px-[16px] sm:px-[24px] lg:px-[32px] py-[20px] sm:py-[40px] lg:py-[60px] text-center">

                    <h3 className="text-[28px] sm:text-[40px] lg:text-[52px] font-poppins text-[#002E0B] font-medium">
                        Climate News and Community Impact
                    </h3>

                    <p className="mt-[20px] text-left text-[16px] sm:text-[18px] lg:text-[25px] font-poppins font-medium text-[#00360C]">
                        This section brings together important climate and environmental updates from around the world, along with highlights from Buddy’s Burrow community initiatives. By combining global climate news with real-world actions and event recaps, it helps learners understand how environmental challenges connect to everyday choices and community efforts that create positive change.
                    </p>

                </div>
            </section>

            {/* ================= NEWS & EVENT LIST ================= */}
            <section className="w-full bg-[#005715] py-[40px] sm:py-[40px] lg:py-[50px] px-[16px] sm:px-[24px] lg:px-[32px]">
                <div className="max-w-[1280px] mx-auto">

                    {/* Header Row */}
                    <div className="grid grid-cols-1 sm:grid-cols-3 items-center gap-4 mb-[32px]">

                        {/* LEFT EMPTY SPACE */}
                        <div className="hidden sm:block" />

                        {/* CENTER TITLE */}
                        <div className="flex justify-center">
                            <span className="px-4 sm:px-5 py-2 sm:py-3 rounded-full border font-poppins font-medium border-[#CFE2A7]/20 text-white text-[18px] sm:text-[22px] lg:text-[24px]">
                                News and Event Recaps
                            </span>
                        </div>

                        {/* RIGHT FILTERS */}
                        <div className="flex flex-row sm:flex-col items-center sm:items-end gap-2 sm:gap-3 text-white text-[13px] sm:text-[14px]">
                            <button className="flex items-center gap-2 opacity-80 hover:opacity-100 whitespace-nowrap">
                                Filter List
                                <span>☰</span>
                            </button>
                            <button className="flex items-center gap-2 opacity-80 hover:opacity-100 whitespace-nowrap">
                                Recent First
                                <span>⇅</span>
                            </button>
                            <button className="flex items-center gap-2 opacity-80 hover:opacity-100 whitespace-nowrap">
                                Oldest First
                                <span>⇅</span>
                            </button>
                        </div>

                    </div>


                    {/* Cards */}
                    <div className="flex flex-col gap-[40px] sm:gap-[56px] lg:gap-[75px]">
                        {newsRecaps?.map((item) => (
                            <Link key={item.id} href={`/news-recaps/${item.id}`}>
                                <div className="relative border border-[#CFE2A7]/40 rounded-[20px] p-[16px] sm:p-[24px] lg:p-[32px] cursor-pointer">

                                    <div className="relative h-[220px] sm:h-[280px] md:h-[320px] lg:h-[360px] rounded-[16px] overflow-hidden">

                                        <Image
                                            src={item.thumbnail_url}
                                            alt={item.title}
                                            fill
                                            className="object-cover"
                                        />

                                        <div className="absolute inset-x-[12px] sm:inset-x-[20px] lg:inset-x-[32px] bottom-[12px] sm:bottom-[20px]">
                                            <div className="bg-black/30 backdrop-blur-md rounded-[12px] px-[16px] sm:px-[24px] py-[14px] flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4">

                                                <h3 className="text-white font-medium leading-snug text-[18px] sm:text-[24px] lg:text-[32px] 2xl:text-[40px] max-w-full sm:max-w-[75%]">
                                                    {item.title}
                                                </h3>

                                            </div>
                                        </div>

                                    </div>

                                    <div className="flex justify-end mt-[16px]">
                                        <div className="shrink-0 bg-white text-[#0B4F1E] text-[12px] font-semibold px-4 py-2 rounded-[8px] flex items-center gap-2">
                                            Read More
                                            <span className="bg-[#0B4F1E] text-white w-6 h-6 flex items-center justify-center rounded">
                                                ↗
                                            </span>
                                        </div>
                                    </div>

                                </div>
                            </Link>
                        ))}
                    </div>

                    {/* View More */}
                    <div className="flex justify-center mt-[48px]">
                        <button className="flex items-center gap-3 px-6 py-4 rounded-[12px] border border-white text-white text-[14px]">
                            View More Articles
                            <span className="bg-white text-[#0B4F1E] w-10 h-10 flex items-center justify-center rounded-[8px]">
                                ↻
                            </span>
                        </button>
                    </div>  
                </div>
            </section>

            <section className="w-full pb-15">
                <div className="max-w-[1280px] mx-auto px-[16px] sm:px-[24px] lg:px-[32px] pt-15">
                    <div className="border border-[#CFE2A7] rounded-[16px] sm:rounded-[20px] lg:rounded-[24px] mx-[0] sm:mx-[24px] lg:mx-[50px] p-[32px]">

                        {/* INNER BORDER */}
                        <div className="border border-[#CFE2A7] rounded-[16px] p-8 flex flex-col">
                            <div className="max-w-[1184px] mx-auto flex flex-col gap-[40px] text-center">
                                <h2 className="font-poppins font-medium text-[32px] sm:text-[56px] lg:text-[64px] text-[#00360C]">
                                    Why These Stories Matter
                                </h2>
                                <p className="font-poppins font-normal text-[16px] leading-[24px] text-left text-[#00360C] max-w-[900px] mx-auto">
                                    The stories we share highlight real environmental challenges and the efforts being made to create positive change. By showcasing climate news and community events, we help students understand how global issues connect to everyday actions. These updates encourage awareness, responsibility, and thoughtful action — inspiring young minds to learn, care, and contribute toward a healthier planet.
                                </p>
                            </div>
                        </div>

                    </div>
                </div>
            </section>


        </main>
    );
}
