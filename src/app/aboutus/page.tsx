import Image from "next/image";
import Footer from "../../components/footer"

export default function AboutPage() {
    return (
        <main className="w-full bg-[#FCFFF7]">

            {/* HERO SECTION */}
            <section className="w-full min-h-[70vh] sm:min-h-[80vh] lg:h-screen p-[12px]">
                <div className="relative w-full h-full rounded-[16px] sm:rounded-[20px] lg:rounded-[24px] overflow-hidden">

                    <Image
                        src="/aboutus-bg.png"
                        alt="Buddy’s Burrow animals"
                        width={1920}
                        height={1080}
                        priority
                        className="w-full h-full object-cover"
                    />

                    {/* Glass text */}
                    <div className="absolute bottom-[16px] sm:bottom-[24px] lg:bottom-[40px] left-[16px] sm:left-[24px] lg:left-[32px] z-10 max-w-[280px] sm:max-w-[420px] lg:max-w-[520px]">
                        <div className="bg-black/10 backdrop-blur-md shadow-xl rounded-[10px] sm:rounded-[12px] px-[16px] sm:px-[20px] lg:px-[24px] py-[14px] sm:py-[16px] lg:py-[20px]">
                            <h2 className="text-white text-[20px] sm:text-[28px] lg:text-[48px] font-medium font-poppins leading-tight">
                                Together, We Hold the Power to Change the World
                            </h2>
                        </div>
                    </div>

                </div>
            </section>


            {/* WHO WE ARE SECTION */}

            <section className="w-full">
                <div className="max-w-[900px] mx-auto px-[16px] sm:px-[24px] lg:px-[32px] py-[20px] sm:py-[40px] lg:py-[60px] text-center">

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
                            <div className="relative w-full h-[220px] sm:h-[300px] lg:h-full rounded-[10px] sm:rounded-[12px]overflow-hidden
        ">
                                <Image
                                    src="/about2.jpg"
                                    alt="Our mission"
                                    fill
                                    className="object-cover"
                                />
                            </div>

                            {/* RIGHT INNER CARD */}
                            <div className="border border-[#90B73B] rounded-[14px] sm:rounded-[18px] lg:rounded-[20px] p-[16px] sm:p-[24px] lg:p-[32px]">
                                <h3 className="text-[28px] sm:text-[40px] lg:text-[64px] font-poppins font-medium text-[#00360C]">
                                    We Combine
                                </h3>

                                <p className="mt-[12px] sm:mt-[16px] text-[14px] sm:text-[15px] lg:text-[16px] leading-[1.6]text-[#00360C] font-poppins">
                                    We combine simple, clear educational content with hands-on learning and
                                    real-life environmental activities. Our approach blends structured courses,
                                    interactive assignments, and on-ground events to create a balanced learning
                                    experience that helps students connect knowledge with action. This mix
                                    ensures that learning is both impactful and enjoyable.
                                </p>
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
                            <div className="border border-[#90B73B] rounded-[14px] sm:rounded-[18px] lg:rounded-[20px] p-[16px] sm:p-[24px] lg:p-[32px]">
                                <h3 className="text-[28px] sm:text-[40px] lg:text-[64px]font-poppins font-medium text-white">
                                    Our Mission
                                </h3>

                                <p className="mt-[12px] sm:mt-[16px] text-[14px] sm:text-[15px] lg:text-[16px] leading-[1.6] text-white font-poppins">
                                    Our mission is to make environmental education accessible, engaging, and
                                    meaningful for young learners. We aim to help students develop a deep
                                    understanding of nature, build awareness about the planet, and inspire
                                    actions that contribute to a more sustainable future. Through practical
                                    lessons and real-world experiences, we empower every child to grow into an
                                    informed and responsible guardian of the environment.
                                </p>
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

            <Footer />


        </main>
    );
}
