"use client";
import Image from "next/image";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { supabase } from "@/lib/supabaseClient";
import { useRouter } from "next/navigation";
import { Check, Lock } from "lucide-react";



export default function CoursesPage() {

    const params = useParams();
    const courseId = params.courseId as string;
    const router = useRouter();


    type Course = {
        id: string;
        title: string;
        brief: string | null;
        cover_image_url: string | null;
    };

    const [course, setCourse] = useState<Course | null>(null);
    const [loading, setLoading] = useState(true);
    const [modules, setModules] = useState<any[]>([]);
    const [loadingModules, setLoadingModules] = useState(true);
    const [completedModules, setCompletedModules] = useState<string[]>([]);


    useEffect(() => {
        if (!courseId) return;

        fetchCourse();
        fetchModules();
        fetchProgress();

    }, [courseId]);


    const fetchCourse = async () => {
        try {
            const { data, error } = await supabase
                .from("courses")
                .select("id, title, brief, cover_image_url")
                .eq("id", courseId)
                .single();

            if (error) throw error;

            setCourse(data);

        } catch (err) {
            console.error(err);
            alert("Failed to load course");
        } finally {
            setLoading(false);
        }
    };

    const fetchModules = async () => {
        try {
            const { data, error } = await supabase
                .from("modules")
                .select("*")
                .eq("course_id", courseId)
                .order("order_index", { ascending: true });

            if (error) throw error;

            setModules(data || []);

        } catch (err) {
            console.error(err);
            alert("Failed to load modules");
        } finally {
            setLoadingModules(false);
        }
    };

    const fetchProgress = async () => {

        const { data: user } = await supabase.auth.getUser();
        const userId = user.user?.id;

        if (!userId) return;

        const { data } = await supabase
            .from("user_module_progress")
            .select("module_id")
            .eq("user_id", userId)
            .eq("course_id", courseId)
            .eq("passed", true);

        setCompletedModules(data?.map(m => m.module_id) || []);
    };


    if (loading) {
        return (
            <div className="flex items-center justify-center h-[60vh] text-[#455F0F] text-lg font-medium">
                Loading course…
            </div>
        );
    }

    if (!course) {
        return (
            <div className="flex items-center justify-center h-[60vh] text-[#455F0F] text-lg font-medium">
                Course not found
            </div>
        );
    }

    return (
        <main className="w-full bg-[#FCFFF7] overflow-x-hidden">

            {/* ================= HERO SECTION ================= */}
            <section className="w-full h-[75vh] sm:h-[85vh] lg:h-screen p-[12px]">
                <div className="relative w-full h-full rounded-[16px] sm:rounded-[20px] lg:rounded-[24px] overflow-hidden">

                    <Image
                        src={course.cover_image_url || "/coursesimg.jpg"}
                        alt={course.title}
                        fill
                        priority
                        sizes="100vw"
                        className="object-cover object-[80%_50%]"
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
                                {course.title}
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
                        {course.brief || "No description available."}
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

                    {loadingModules && (
                        <div className="text-[#00360C] mt-6">Loading modules...</div>
                    )}

                    {!loadingModules && modules.length === 0 && (
                        <div className="text-[#00360C] mt-6">No modules available</div>
                    )}

                    {modules.map((module, index) => {

                        const previousModule = modules[index - 1];

                        const isCompleted = completedModules.includes(module.id);

                        const isUnlocked =
                            module.order_index === 1 ||
                            completedModules.includes(previousModule?.id);

                        return (
                            <div
                                key={module.id}
                                className={`mt-[16px] w-full min-h-[70px] rounded-[16px]
  flex flex-col sm:flex-row items-start sm:items-center
  justify-between gap-2
  px-[16px] sm:px-[28px] py-[10px]
  ${isCompleted ? "bg-[#90B73B] text-[#00360C]" : isUnlocked ? "bg-[#005715] text-white" : "border border-[#7B7B7B]"}`}
                            >

                                <span className={`text-[14px] sm:text-[22px] font-medium
      ${isUnlocked ? "text-white" : "text-[#00360C]"}`}>
                                    Module {module.order_index}
                                </span>

                                <button
                                    onClick={() => {
                                        if (!isUnlocked) return;
                                        router.push(`/courses/${courseId}/modules/${module.id}`);
                                    }}
                                    className="flex items-center rounded-[8px] justify-between w-[120px] sm:min-w-[200px] bg-white
        border border-[#005715] text-[#005715]
        font-semibold text-[14px] sm:text-[16px]
        overflow-hidden"
                                >

                                    <div className="px-3 sm:px-4 py-[4px] sm:py-[6px]">
                                        {isCompleted
                                            ? "Completed"
                                            : isUnlocked
                                                ? "Start Learning"
                                                : "Locked"}
                                    </div>

                                    <div className={`w-7 h-7 sm:w-8 sm:h-8 flex items-center justify-center
rounded-[6px] mr-[1px] text-white
${isUnlocked ? "bg-[#005715]" : "bg-[#7B7B7B]"}`}>
                                        {isUnlocked ? <Check size={16} /> : <Lock size={16} />}
                                    </div>

                                </button>

                            </div>
                        );
                    })}

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
        </main>
    );
}
