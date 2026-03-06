import Image from "next/image";
export default function AboutPage() {

    const WeCombineBorder = () => (
        <svg
            viewBox="0 0 620 560"
            className="absolute inset-0 w-full h-full pointer-events-none"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            preserveAspectRatio="none"
        >
            {/* INSIDE STROKE MASK */}
            <mask id="we-combine-mask" fill="white">
                <path d="M608 0C614.627 0 620 5.37258 620 12V488C620 492.418 616.418 496 612 496H428C421.373 496 416 501.373 416 508V552C416 556.418 412.418 560 408 560H12C5.37258 560 0 554.627 0 548V84C0 79.5817 3.58172 76 8 76H68C72.4183 76 76 72.4183 76 68V8C76 3.58172 79.5817 0 84 0H608Z" />
            </mask>

            {/* BORDER (STROKE ONLY) */}
            <path
                d="M608 0C614.627 0 620 5.37258 620 12V488C620 492.418 616.418 496 612 496H428C421.373 496 416 501.373 416 508V552C416 556.418 412.418 560 408 560H12C5.37258 560 0 554.627 0 548V84C0 79.5817 3.58172 76 8 76H68C72.4183 76 76 72.4183 76 68V8C76 3.58172 79.5817 0 84 0H608Z"
                fill="none"
                stroke="#90B73B"
                strokeWidth="2"
                mask="url(#we-combine-mask)"
                vectorEffect="non-scaling-stroke"
            />
        </svg>
    );



    return (
        <main className="w-full bg-[#FCFFF7]">

            {/* HERO SECTION */}
            <section className="w-full h-[90vh] sm:h-[85vh] lg:h-screen p-[12px]">
                <div className="relative w-full h-full rounded-[16px] sm:rounded-[20px] lg:rounded-[24px] overflow-hidden">

                    <Image
                        src="/aboutus-bg.png"
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
                                Together, We Hold the Power to Change the World
                            </h2>
                        </div>
                    </div>

                </div>
            </section>



            {/* WHO WE ARE SECTION */}

            <section className="w-full">
                <div className="max-w-[1166px] mx-auto px-[16px] sm:px-[24px] lg:px-[32px] py-[20px] sm:py-[40px] lg:py-[60px] text-center">

                    <h3 className="text-[28px] sm:text-[40px] lg:text-[61px] font-poppins text-[#002E0B] font-medium">
                        Who we are
                    </h3>

                    <p className="mt-[20px] text-left text-[16px] sm:text-[18px] lg:text-[25px] font-poppins font-medium text-[#00360C]">
                        We’re a community of educators, environmentalists, and mentors who believe every
                        young person can make a difference. Buddy’s Burrow helps students explore how
                        nature works through fun lessons, hands on activities, and real-world events.
                        We make learning about the planet easy, exciting, and designed for curious minds
                        ready to take the next step.
                    </p>

                </div>
            </section>


            <section className="w-full">
                <div className="max-w-[1280px] mx-auto px-[16px] sm:px-[24px] lg:px-[32px] py-[20px] sm:py-[40px] lg:py-[60px]">

                    {/* Outer Card */}
                    <div className="border border-[#CFE2A7] rounded-[16px] sm:rounded-[20px] lg:rounded-[24px] mx-[0] sm:mx-[24px] lg:mx-[50px]">

                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-[20px] sm:gap-[24px] lg:gap-[32px] items-center m-[16px] sm:m-[24px] lg:m-[32px]">

                            {/* LEFT IMAGE */}
                            <div className="relative w-full h-[220px] sm:h-[300px] lg:h-full rounded-[12px] sm:rounded-[12px] overflow-hidden
        ">
                                <Image
                                    src="/about2.jpg"
                                    alt="Our mission"
                                    fill
                                    className="object-cover"
                                />
                            </div>

                            <div className="relative p-[32px] sm:p-[40px] lg:p-[56px]">
                                {/* SVG BORDER */}
                                <WeCombineBorder />

                                {/* ICON — TOP CLIP SPACE */}
                                <div
                                    className=" absolute top-[2px] left-[2px] w-[56px] h-[56px] sm:w-[64px] sm:h-[64px] flex items-center justify-center rounded-[14px "
                                >
                                    <Image
                                        src="/wecombineicon.png"
                                        alt="We Combine icon"
                                        width={72}
                                        height={72}
                                        className="object-contain"
                                        priority
                                    />
                                </div>

                                {/* CONTENT */}
                                <h3
                                    className="text-[36px] sm:text-[48px] lg:text-[64px] font-poppins font-medium text-[#00360C] mt-[32px]"
                                >
                                    We Combine
                                </h3>

                                <p className="mt-6 text-[#00360C] leading-[1.7] max-w-[720px] mb-[64px]">
                                    We combine simple, clear educational content with hands-on learning and
                                    real-life environmental activities. Our approach blends structured courses,
                                    interactive assignments, and on-ground events to create a balanced learning
                                    experience that helps students connect knowledge with action.
                                </p>

                                {/* BUTTON — BOTTOM RIGHT CLIP SPACE */}
                                <div
                                    className=" absolute bottom-[1px] right-[1px]"
                                >
                                    <button
                                        className=" flex items-center gap-3 px-1 py-1 rounded-[8px] border-[1px] border-[#005715] text-[#005715] font-semibold text-[15px] transition"
                                    >
                                        View courses
                                        <span
                                            className="flex items-center justify-center w-9 h-9 rounded-[6px] bg-[#005715] text-white"
                                        >
                                            <img
                                                src="/arrow-up-icon.svg"
                                                alt=""
                                                className="w-[30%] h-[30%] sm:w-[35%] sm:h-[35%] lg:w-[40%] lg:h-[40%]"
                                            />
                                        </span>
                                    </button>
                                </div>
                            </div>


                        </div>
                    </div>
                </div>
            </section>


            <section className="w-full bg-[#005715]">
                <div className="max-w-[1280px] mx-auto px-[16px] sm:px-[24px] lg:px-[32px] py-[60px] sm:py-[80px] lg:py-[120px]">

                    {/* Outer Card */}
                    <div className="border border-[#CFE2A7] rounded-[16px] sm:rounded-[20px] lg:rounded-[24px] mx-[0] sm:mx-[24px] lg:mx-[50px]">

                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-[20px] sm:gap-[24px] lg:gap-[32px] items-center m-[16px] sm:m-[24px] lg:m-[32px]">

                            {/* LEFT INNER CARD */}
                            <div className="relative p-[16px] sm:p-[24px] lg:p-[32px] [--pad:16px] sm:[--pad:24px] lg:[--pad:32px]">

                                {/* SVG BORDER */}
                                <WeCombineBorder />

                                {/* ICON — TOP CLIP SPACE */}
                                <div className="absolute top-[calc(var(--pad)-28px)] left-[calc(var(--pad)-28px)] w-[48px] h-[48px] sm:w-[56px] sm:h-[56px] lg:w-[64px] lg:h-[64px] flex items-center justify-center rounded-[14px]">
                                    <Image
                                        src="/earth-icon.png"
                                        alt="Our Mission icon"
                                        width={72}
                                        height={72}
                                        className="object-contain"
                                        priority
                                    />
                                </div>

                                {/* CONTENT */}
                                <h3 className="mt-[32px] text-[28px] sm:text-[40px] lg:text-[64px] font-poppins font-medium text-white">
                                    Our Mission
                                </h3>

                                <p className="mt-[12px] sm:mt-[16px] text-[14px] sm:text-[15px] lg:text-[16px] leading-[1.6] text-white font-poppins mb-[64px]">
                                    Our mission is to make environmental education accessible, engaging,
                                    and meaningful for young learners. We aim to help students develop a
                                    deep understanding of nature, build awareness about the planet, and
                                    inspire actions that contribute to a more sustainable future. Through
                                    practical lessons and real-world experiences, we empower every child
                                    to grow into an informed and responsible guardian of the environment.
                                </p>

                                {/* BUTTON — BOTTOM RIGHT CLIP SPACE */}
                                <div className="absolute bottom-[calc(var(--pad)-32px)] right-[calc(var(--pad)-30px)]">
                                    <button className="flex items-center gap-3 px-3 py-1 rounded-[8px] border border-[#CFE2A7] text-[#005715] font-semibold text-[15px] bg-white transition">
                                        Learn more
                                        <span className="flex items-center justify-center w-9 h-9 rounded-[8px] bg-[#005715] text-white">
                                            <img
                                                src="/arrow-up-icon.svg"
                                                alt=""
                                                className="w-[30%] h-[30%] sm:w-[35%] sm:h-[35%] lg:w-[40%] lg:h-[40%]"
                                            />
                                        </span>
                                    </button>
                                </div>

                            </div>

                            {/* RIGHT IMAGE */}
                            <div className="relative w-full h-[220px] sm:h-[300px] lg:h-full rounded-[10px] sm:rounded-[12px] overflow-hidden">
                                <Image
                                    src="/girlwatering.jpg"
                                    alt="Our mission"
                                    fill
                                    className="object-cover"
                                />
                            </div>

                        </div>
                    </div>

                </div>
            </section>


            <section className="w-full">
                <div
                    className="max-w-[1280px] mx-auto px-[16px] sm:px-[24px] lg:px-[32px] pt-[40px] sm:pt-[60px] lg:pt-[80px]">
                    {/* Outer Card */}
                    <div
                        className="border border-[#CFE2A7] rounded-[16px] sm:rounded-[20px] lg:rounded-[24px] mx-[0] sm:mx-[24px] lg:mx-[50px]">
                        <div
                            className="m-[16px] sm:m-[24px] lg:m-[32px]">
                            {/* Inner Card */}
                            <div
                                className="border border-[#90B73B] rounded-[14px] sm:rounded-[18px] lg:rounded-[20px] p-[16px] sm:p-[24px] lg:p-[32px]">
                                <h3
                                    className="text-[28px] sm:text-[40px] lg:text-[64px] font-poppins font-medium text-[#00360C] text-center">
                                    What makes us Different
                                </h3>

                                <p
                                    className=" mt-[12px] sm:mt-[16px] text-[14px] sm:text-[15px] lg:text-[16px] leading-[1.6] text-[#00360C] font-poppins"
                                >
                                    What makes us different is our commitment to youth-centered environmental
                                    education. We teach in a way that is easy to understand, engaging, and
                                    designed specifically for young minds. By integrating fun activities,
                                    real community programs, and accessible online learning, we create an
                                    environment where students feel excited to learn – and inspired to make
                                    a difference.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <section className="w-full">
                <div
                    className="max-w-[1280px] mx-auto px-[16px] sm:px-[24px] lg:px-[32px] pt-[40px] sm:pt-[60px] lg:pt-[80px] pb-[60px] sm:pb-[80px] lg:pb-[120px]">
                    {/* Section Title */}
                    <h3
                        className="text-[28px] sm:text-[40px] lg:text-[64px] font-poppins font-medium text-[#00360C] text-center mb-[32px] sm:mb-[48px] lg:mb-[64px]">
                        Our Impact
                    </h3>

                    {/* Cards Grid */}
                    <div
                        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-[16px] sm:gap-[24px] lg:gap-[32px]">
                        {/* Card 1 */}
                        <div
                            className="border border-[#90B73B] rounded-[6px] sm:rounded-[8px] p-[16px] sm:p-[24px] lg:p-[32px]"
                        >
                            <h4
                                className="text-[42px] sm:text-[60px] lg:text-[82px] font-poppins font-medium text-[#00360C]"
                            >
                                120+
                            </h4>
                            <p
                                className="mt-[12px] sm:mt-[16px] text-[14px] sm:text-[15px] lg:text-[16px] leading-[1.6] font-poppins text-[#00360C]"
                            >
                                Empowering young learners with practical skills and guided learning to
                                shape brighter futures.
                            </p>
                        </div>

                        {/* Card 2 */}
                        <div
                            className="border border-[#90B73B] rounded-[6px] sm:rounded-[8px] p-[16px] sm:p-[24px] lg:p-[32px]"
                        >
                            <h4
                                className="text-[42px] sm:text-[60px] lg:text-[82px] font-poppins font-medium text-[#00360C]"
                            >
                                40+
                            </h4>
                            <p
                                className="mt-[12px] sm:mt-[16px] text-[14px] sm:text-[15px] lg:text-[16px] leading-[1.6] font-poppins text-[#00360C]"
                            >
                                Spreading knowledge, building confidence, and inspiring students through
                                meaningful school outreach initiatives.
                            </p>
                        </div>

                        {/* Card 3 */}
                        <div
                            className="border border-[#90B73B] rounded-[6px] sm:rounded-[8px] p-[16px] sm:p-[24px] lg:p-[32px]"
                        >
                            <h4
                                className="text-[42px] sm:text-[60px] lg:text-[82px] font-poppins font-medium text-[#00360C]"
                            >
                                950+
                            </h4>
                            <p
                                className="mt-[12px] sm:mt-[16px] text-[14px] sm:text-[15px] lg:text-[16px] leading-[1.6] font-poppins text-[#00360C]"
                            >
                                A growing community of supporters helping us drive lasting impact and
                                support those who need it most.
                            </p>
                        </div>
                    </div>
                </div>
            </section>


            <section className="w-full">
                <div
                    className="max-w-[1280px] mx-auto px-[16px] sm:px-[24px] lg:px-[32px] py-[20px] sm:py-[40px] lg:py-[60px]"
                >
                    {/* Section Title */}
                    <h3
                        className="text-[28px] sm:text-[40px] lg:text-[64px] font-poppins font-medium text-[#00360C] text-center mb-[32px] sm:mb-[48px] lg:mb-[64px]"
                    >
                        Our Team
                    </h3>

                    {/* OUTER BORDER WRAPPER */}
                    <div
                        className="border border-[#CFE2A7] rounded-[12px] sm:rounded-[16px] lg:rounded-[24px] p-[16px] sm:p-[24px] lg:p-[32px]"
                    >
                        {/* Team Grid */}
                        <div
                            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-[16px] sm:gap-[24px] lg:gap-[32px]"
                        >
                            {/* Team Member 1 */}
                            <div className="relative w-full h-[200px] sm:h-[240px] lg:h-[300px] rounded-[8px] overflow-hidden">
                                <Image src="/team1.jpg" alt="Team member" fill className="object-cover" />
                            </div>

                            {/* Team Member 2 */}
                            <div className="relative w-full h-[200px] sm:h-[240px] lg:h-[300px] rounded-[8px] overflow-hidden">
                                <Image src="/team2.jpg" alt="Team member" fill className="object-cover" />
                            </div>

                            {/* Team Member 3 */}
                            <div className="relative w-full h-[200px] sm:h-[240px] lg:h-[300px] rounded-[8px] overflow-hidden">
                                <Image src="/team3.jpg" alt="Team member" fill className="object-cover" />
                            </div>

                            {/* Team Member 4 */}
                            <div className="relative w-full h-[200px] sm:h-[240px] lg:h-[300px] rounded-[8px] overflow-hidden">
                                <Image src="/team4.jpg" alt="Team member" fill className="object-cover" />
                            </div>
                        </div>
                    </div>
                </div>
            </section>

        </main>
    );
}
