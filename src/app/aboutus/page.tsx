import Image from "next/image";
import Footer from "../../components/footer"

export default function AboutPage() {
    return (
        <main className="w-full bg-[#FCFFF7]">

            {/* HERO SECTION */}
            <section className="w-full h-screen p-3">
                <div className="relative w-full h-full rounded-[24px] overflow-hidden">

                    {/* Image */}
                    <Image
                        src="/aboutus-bg.png"
                        alt="Buddy’s Burrow animals"
                        width={1920}
                        height={1080}
                        priority
                        className="w-full h-full object-cover"
                    />

                    {/* Bottom-left glass text */}
                    <div className="absolute bottom-10 left-6 z-10 max-w-lg">
                        <div
                            className="bg-black/10 backdrop-blur-md shadow-xl rounded-[12px] px-6 py-5"
                        >
                            <h2 className="text-white text-[48px] font-medium font-poppins leading-tight">
                                Together, We Hold the Power to Change the World
                            </h2>
                        </div>
                    </div>

                </div>
            </section>

            {/* WHO WE ARE SECTION */}

            <section className="w-full">
                <div className="max-w-5xl mx-auto px-6 py-20 text-center">
                    <h3 className="text-[61px] font-poppins text-[#002E0B] font-medium">
                        Who we are
                    </h3>

                    <p className="mt-6 text-left text-[25px] font-poppins font-medium text-[#00360C]">
                        We’re a community of educators, environmentalists, and mentors who believe every young person can make a difference. Buddy’s Burrow helps students explore how nature works through fun lessons, hands on activities, and real-world events. We make learning about the planet easy, exciting, and designed for curious minds ready to take the next step
                    </p>
                </div>
            </section>

            <section className="w-full">
                <div className="max-w-7xl mx-auto px-6 py-20">

                    {/* Outer Card */}
                    <div className="border border-[#CFE2A7] rounded-[24px] mx-[50px]">

                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center m-[32px]">

                            {/* Left IMAGE */}
                            <div className="relative h-full w-full rounded-[12px] overflow-hidden">
                                <Image
                                    src="/about2.jpg"
                                    alt="Our mission"
                                    fill
                                    className="object-cover"
                                />
                            </div>

                            {/* Right INNER CARD */}
                            <div className="border border-[#90B73B] rounded-[20px] p-6 md:p-8">
                                <h3 className="text-[64px] font-poppins font-medium text-[#00360C]">
                                    We Combine
                                </h3>

                                <p className="mt-4 text-[16px] text-[#00360C] font-poppins">
                                    We combine simple, clear educational content with hands-on learning and real-life environmental activities. Our approach blends structured courses, interactive assignments, and on-ground events to create a balanced learning experience that helps students connect knowledge with action. This mix ensures that learning is both impactful and enjoyable.
                                </p>
                            </div>

                        </div>
                    </div>

                </div>
            </section>

            <section className="w-full bg-[#005715]">
                <div className="max-w-7xl mx-auto px-6 py-20">

                    {/* Outer Card */}
                    <div className="border border-[#CFE2A7] rounded-[24px] mx-[50px]">

                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center m-[32px]">

                            {/* Left INNER CARD */}
                            <div className="border border-[#90B73B] rounded-[20px] p-6 md:p-8">
                                <h3 className="text-[64px] font-poppins font-medium text-white">
                                    Our Mission
                                </h3>

                                <p className="mt-4 text-[16px] text-white font-poppins">
                                    Our mission is to make environmental education accessible, engaging, and meaningful for young learners. We aim to help students develop a deep understanding of nature, build awareness about the planet, and inspire actions that contribute to a more sustainable future. Through practical lessons and real-world experiences, we empower every child to grow into an informed and responsible guardian of the environment.
                                </p>
                            </div>

                            {/* Right IMAGE */}
                            <div className="relative h-full w-full rounded-[12px] overflow-hidden">
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
                <div className="max-w-7xl mx-auto px-6 py-20">

                    {/* Outer Card */}
                    <div className="border border-[#CFE2A7] rounded-[24px] mx-[50px]">

                        <div className="items-center m-[32px]">

                            {/* Left INNER CARD */}
                            <div className="border border-[#90B73B] rounded-[20px] p-6 md:p-8">
                                <h3 className="text-[64px] font-poppins font-medium text-[#00360C] text-center">
                                    What makes us Different
                                </h3>

                                <p className="mt-4 text-[16px] text-[#00360C] font-poppins">
                                    What makes us different is our commitment to youth-centered environmental education. We teach in a way that is easy to understand, engaging, and designed specifically for young minds. By integrating fun activities, real community programs, and accessible online learning, we create an environment where students feel excited to learn - and inspired to make a difference.
                                </p>
                            </div>

                        </div>
                    </div>

                </div>
            </section>
            <Footer/>

        </main>
    );
}
