"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Image from "next/image";
import { supabase } from "@/lib/supabaseClient";
import { useRouter } from "next/navigation";

type Module = {
    id: string;
    title: string;
};

type Topic = {
    id: string;
    title: string;
    content: string | null;
    thumbnail_url: string | null;
    order_index: number;
};

type Option = {
    id: string;
    option_text: string;
    is_correct: boolean;
};

type Question = {
    id: string;
    question_text: string;
    options: Option[];
};

export default function ModulePage() {

    const router = useRouter();

    const params = useParams();
    const courseId = params.courseId as string;
    const moduleId = params.moduleId as string;

    const [userId, setUserId] = useState<string | null>(null);

    const [module, setModule] = useState<Module | null>(null);
    const [topics, setTopics] = useState<Topic[]>([]);
    const [questions, setQuestions] = useState<Question[]>([]);

    const [answers, setAnswers] = useState<Record<string, string>>({});
    const [submitted, setSubmitted] = useState(false);
    const [score, setScore] = useState(0);

    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [courseCompleted, setCourseCompleted] = useState(false);

    useEffect(() => {
        if (!moduleId) return;

        const load = async () => {
            const { data } = await supabase.auth.getUser();
            const uid = data.user?.id || null;

            setUserId(uid);

            await fetchData(uid);
        };

        load();
    }, [moduleId]);

    const fetchData = async (uid: string | null) => {
        try {

            // get module info first
            const { data: moduleData } = await supabase
                .from("modules")
                .select("id, title, course_id, order_index")
                .eq("id", moduleId)
                .maybeSingle();

            if (!moduleData) return;

            // MODULE LOCK CHECK
            if (uid && moduleData.order_index > 1) {

                const { data: previous } = await supabase
                    .from("modules")
                    .select("id")
                    .eq("course_id", moduleData.course_id)
                    .eq("order_index", moduleData.order_index - 1)
                    .single();

                const prevModuleId = previous?.id;

                const { data: progress } = await supabase
                    .from("user_module_progress")
                    .select("passed")
                    .eq("user_id", uid)
                    .eq("module_id", prevModuleId)
                    .maybeSingle();

                if (!progress || !progress.passed) {
                    alert("Please complete the previous module first");
                    window.history.back();
                    return;
                }
            }

            // SAFE TO LOAD CONTENT
            setModule({
                id: moduleData.id,
                title: moduleData.title
            });

            const { data: topicsData } = await supabase
                .from("topics")
                .select("*")
                .eq("module_id", moduleId)
                .order("order_index");

            setTopics(topicsData || []);

            const { data: questionsData } = await supabase
                .from("questions")
                .select(`
        id,
        question_text,
        question_options (
          id,
          option_text,
          is_correct
        )
      `)
                .eq("module_id", moduleId);

            const formatted = questionsData?.map((q: any) => ({
                id: q.id,
                question_text: q.question_text,
                options: q.question_options
            })) || [];

            setQuestions(formatted);

        } catch (err) {
            console.error(err);
            alert("Failed to load module");
        } finally {
            setLoading(false);
        }
    };

    const selectAnswer = (questionId: string, optionId: string) => {
        setAnswers(prev => ({ ...prev, [questionId]: optionId }));
    };

    const submitQuiz = async () => {

        if (saving) return;
        setSaving(true);

        if (Object.keys(answers).length !== questions.length) {
            alert("Please answer all questions before submitting.");
            setSaving(false);
            return;
        }

        let correct = 0;

        questions.forEach(q => {
            const selected = answers[q.id];
            const correctOption = q.options.find(o => o.is_correct);

            if (selected === correctOption?.id) correct++;
        });

        setScore(correct);
        setSubmitted(true);

        const passingScore = Math.ceil(questions.length * 0.6);

        if (correct < passingScore || !userId) {
            setSaving(false);
            return;
        }

        try {

            // get module info
            const { data: moduleData } = await supabase
                .from("modules")
                .select("course_id")
                .eq("id", moduleId)
                .single();

            const courseId = moduleData?.course_id;

            await supabase
                .from("user_module_progress")
                .upsert({
                    user_id: userId,
                    course_id: courseId,
                    module_id: moduleId,
                    score: correct,
                    passed: true,
                    completed_at: new Date()
                });

            await checkCourseCompletion(courseId);

        } catch (err) {
            console.error("Progress save error", err);
        } finally {
            setSaving(false);
        }
    };

    const checkCourseCompletion = async (courseId: string) => {

        if (!userId) return;

        try {

            const { data: modules } = await supabase
                .from("modules")
                .select("id")
                .eq("course_id", courseId);

            const totalModules = modules?.length || 0;

            const { data: completed } = await supabase
                .from("user_module_progress")
                .select("module_id")
                .eq("user_id", userId)
                .eq("course_id", courseId)
                .eq("passed", true);

            const completedCount = completed?.length || 0;

            if (completedCount === totalModules) {

                setCourseCompleted(true); // 👈 important

                await supabase
                    .from("user_course_progress")
                    .upsert({
                        user_id: userId,
                        course_id: courseId,
                        completed: true,
                        completed_at: new Date()
                    });

            }

        } catch (err) {
            console.error("Course completion check failed", err);
        }
    };

    if (loading) return <div className="p-10">Loading...</div>;
    if (!module) return <div className="p-10">Module not found</div>;

    return (
        <main className="w-full bg-[#FCFFF7]">

            {/* ================= TITLE ================= */}
            <section className="max-w-[1100px] mx-auto px-2 pt-28 pb-6">
                <h1 className="text-[28px] lg:text-[42px] font-medium text-[#455F0F] leading-tight">
                    {module.title}
                </h1>
            </section>

            {/* ================= TOPICS ================= */}
            <section className="max-w-[1100px] mx-auto px-2 py-8 space-y-16">

                {topics.map((topic, index) => (
                    <div key={topic.id} className="space-y-5">

                        {/* IMAGE */}
                        {topic.thumbnail_url && (
                            <div className="w-full h-[280px] sm:h-[380px] lg:h-[460px] relative rounded-[14px] overflow-hidden shadow-sm">
                                <Image
                                    src={topic.thumbnail_url}
                                    alt={topic.title}
                                    fill
                                    sizes="100vw"
                                    className="object-cover"
                                />
                            </div>
                        )}

                        {/* TEXT */}
                        <div className="space-y-3 mt-10">

                            <h2 className="text-[42px] font-medium text-[#002E0B]">
                                {topic.title}
                            </h2>

                            {topic.content && (
                                <p className="text-[#00360C] leading-[1.85] whitespace-pre-line text-[22px]">
                                    {topic.content}
                                </p>
                            )}

                        </div>

                        {/* DIVIDER (not after last topic) */}
                        {index !== topics.length && (
                            <div className="mt-10 border-t border-[#CFE2A7]" />
                        )}

                    </div>
                ))}

            </section>

            {/* ================= QUIZ CTA ================= */}
            <section className="max-w-[1100px] mx-auto px-2 py-12 border-b-[1px] border-[#CFE2A7]">

                <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-8">

                    {/* LEFT TEXT */}
                    <h3 className="text-[18px] lg:text-[25px] font-medium text-[#002E0B] leading-tight">
                        Answer 5 short questions to complete this module.
                    </h3>

                    {/* RIGHT CARD */}
                    <button
                        onClick={() =>
                            document.getElementById("quiz-section")?.scrollIntoView({ behavior: "smooth" })
                        }
                        className="flex items-stretch border border-[#005715] rounded-[8px] overflow-hidden hover:shadow-lg transition"
                    >

                        {/* TEXT */}
                        <div className="px-6 py-6 bg-[#FCFFF7] text-left">
                            <p className="text-[#00360C] font-semibold text-[16px]">
                                Continue to
                            </p>
                            <p className="text-[#00360C] font-semibold text-[16px]">
                                Knowledge Check
                            </p>
                        </div>

                        {/* ICON BLOCK */}
                        <div className="bg-[#005715] px-6 m-[2px] rounded-[6px] flex items-center justify-center">
                            <svg
                                width="32"
                                height="32"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="white"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            >
                                <path d="M9 11l3 3L22 4" />
                                <path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11" />
                            </svg>
                        </div>

                    </button>

                </div>

            </section>

            {/* ================= QUIZ ================= */}
            {questions.length > 0 && (
                <section id="quiz-section" className="bg-[#005715] mt-24 py-20">

                    <div className="max-w-[1100px] mx-auto px-4">

                        {/* OUTER BORDER */}
                        <div className="border border-[#CFE2A7] rounded-[24px] p-4 sm:p-8">

                            {/* INNER BORDER */}
                            <div className="border border-[#90B73B] rounded-[12px] p-6 sm:p-10 text-white">

                                {/* HEADER */}
                                <h2 className="text-[32px] sm:text-[60px] font-medium text-center mb-6">
                                    Final Knowledge Check
                                </h2>

                                {/* HOW IT WORKS */}
                                <div className="mb-8">
                                    <h3 className="text-[48px] font-medium mb-4">How this works :</h3>

                                    <ul className="space-y-4 text-white text-[22px]">
                                        <li>• You’ll answer 5 fill-in-the-blank questions based on this module.</li>
                                        <li>• You need to answer at least 3 questions correctly to pass this module.</li>
                                        <li>• All questions are based on what you’ve just learned in this module.</li>
                                    </ul>
                                </div>

                                <div className="h-[1px] bg-[#CFE2A7] mb-10"></div>

                                {/* QUESTIONS */}
                                {questions.map((q, i) => (
                                    <div key={q.id} className="mb-12">

                                        <p className="text-white text-[28px] font-medium mb-2">
                                            Question {i + 1}
                                        </p>

                                        <p className="mb-5 text-white text-[22px] leading-relaxed">
                                            {q.question_text}
                                        </p>

                                        <div className="space-y-4">

                                            {q.options.map(option => {

                                                const selected = answers[q.id] === option.id;

                                                return (
                                                    <div
                                                        key={option.id}
                                                        onClick={() => selectAnswer(q.id, option.id)}
                                                        className="flex items-center gap-3 cursor-pointer group"
                                                    >

                                                        {/* RADIO */}
                                                        <div
                                                            className={`w-[16px] h-[16px] rounded-full border flex items-center justify-center transition
            ${selected ? "border-white" : "border-white/60"}
          `}
                                                        >
                                                            {selected && (
                                                                <div className="w-[8px] h-[8px] rounded-full bg-white"></div>
                                                            )}
                                                        </div>

                                                        {/* TEXT */}
                                                        <span
                                                            className={`text-[16px] transition
            ${selected ? "underline text-white" : "text-white/90 group-hover:text-white"}
          `}
                                                        >
                                                            {option.option_text}
                                                        </span>

                                                    </div>
                                                );
                                            })}

                                        </div>

                                        {i !== questions.length - 1 && (
                                            <div className="h-[1px] bg-[#CFE2A7] mt-10"></div>
                                        )}

                                    </div>
                                ))}

                            </div>
                        </div>

                    </div>

                </section>
            )}


            {/* ================= SUBMIT CARD ================= */}
            {questions.length > 0 && !submitted && (

                <section className="max-w-[1100px] mx-auto px-4 py-14 border-b border-[#CFE2A7] flex justify-center">

                    <button
                        onClick={submitQuiz}
                        disabled={saving}
                        className="flex items-stretch border border-[#005715] rounded-[10px] overflow-hidden hover:shadow-md transition"
                    >

                        {/* TEXT */}
                        <div className="px-8 py-7 bg-[#FCFFF7] text-left">
                            <p className="text-[#00360C] font-semibold text-[18px] leading-tight">
                                Submit
                            </p>
                            <p className="text-[#00360C] font-semibold text-[18px] leading-tight">
                                Answers
                            </p>
                        </div>

                        {/* ICON BLOCK */}
                        <div className="bg-[#005715] px-8 m-[3px] rounded-[8px] flex items-center justify-center">
                            <svg
                                width="28"
                                height="28"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="white"
                                strokeWidth="3"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            >
                                <polyline points="20 6 9 17 4 12" />
                            </svg>
                        </div>

                    </button>

                </section>

            )}

            {/* ================= RESULTS ================= */}
            {submitted && (
                <section className="max-w-[1100px] mx-auto px-4 py-16">

                    {/* TITLE */}
                    <h3 className="text-[24px] font-semibold text-[#33470B] mb-8">
                        Answers :
                    </h3>

                    {/* SCORE + STATUS */}
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-10 gap-3">
                        <p className="text-[#33470B] text-[15px]">
                            You answered <span className="font-semibold">{score}</span> out of{" "}
                            <span className="font-semibold">{questions.length}</span> questions correctly
                        </p>

                        <p className="text-[#33470B] font-medium flex items-center gap-2">
                            Status :
                            <span className={`font-semibold ${score >= 3 ? "text-green-700" : "text-[#C89100]"}`}>
                                {score >= 3 ? "Module Completed" : "Not Passed"}
                            </span>

                            <span className={score >= 3 ? "text-green-600" : "text-[#C89100]"}>
                                {score >= 3 ? "✔" : "⚠"}
                            </span>
                        </p>
                    </div>

                    {/* QUESTION REVIEW */}
                    <div className="space-y-10">

                        {questions.map((q, i) => {

                            const correctOption = q.options.find(o => o.is_correct);
                            const selectedOption = q.options.find(o => o.id === answers[q.id]);
                            const isCorrect = selectedOption?.id === correctOption?.id;

                            return (
                                <div key={q.id} className="border-b border-[#E6EAD8] pb-8">

                                    {/* QUESTION */}
                                    <p className="text-[#33470B] font-medium mb-3">
                                        Q{i + 1}. {q.question_text}
                                    </p>

                                    {/* CORRECT ANSWER */}
                                    <div className="flex items-start gap-2 text-[#33470B] text-[14px] mb-1">
                                        <span className="text-green-600 mt-[2px]">✔</span>
                                        <span>
                                            Correct Answer :{" "}
                                            <span className="font-medium">{correctOption?.option_text}</span>
                                        </span>
                                    </div>

                                    {/* USER ANSWER IF WRONG */}
                                    {!isCorrect && selectedOption && (
                                        <div className="flex items-start gap-2 text-red-600 text-[14px]">
                                            <span className="mt-[2px]">✖</span>
                                            <span>
                                                Your Answer :{" "}
                                                <span className="italic">{selectedOption.option_text}</span>
                                            </span>
                                        </div>
                                    )}

                                </div>
                            );
                        })}

                    </div>

                    {submitted && score < 3 && (
                        <section className="max-w-[1100px] mx-auto px-4 py-10 border-b border-[#E6C76A]">

                            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-6">

                                {/* TEXT */}
                                <div>
                                    <h3 className="text-[28px] font-semibold text-[#C89100] mb-2">
                                        Almost There!
                                    </h3>

                                    <p className="text-[#C89100] max-w-[700px]">
                                        You need a few more correct answers to pass this module. Take a moment to review
                                        the content and attempt the knowledge check again with a fresh set of questions.
                                    </p>
                                </div>

                                {/* BUTTON */}
                                <button
                                    onClick={() => {
                                        setSubmitted(false);
                                        setAnswers({});
                                        setScore(0);
                                        window.scrollTo({ top: 0, behavior: "smooth" });
                                    }}
                                    className="flex items-stretch border border-[#C89100] rounded-[10px] overflow-hidden hover:shadow-md transition"
                                >

                                    {/* TEXT */}
                                    <div className="px-8 py-6 text-left">
                                        <p className="text-[#C89100] font-semibold text-[18px] leading-tight">
                                            Review &
                                        </p>
                                        <p className="text-[#C89100] font-semibold text-[18px] leading-tight">
                                            Retry
                                        </p>
                                    </div>

                                    {/* ICON */}
                                    <div className="bg-[#C89100] px-8 m-[3px] rounded-[8px] flex items-center justify-center">
                                        <svg
                                            width="28"
                                            height="28"
                                            viewBox="0 0 24 24"
                                            fill="none"
                                            stroke="white"
                                            strokeWidth="2.5"
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                        >
                                            <polyline points="23 4 23 10 17 10" />
                                            <polyline points="1 20 1 14 7 14" />
                                            <path d="M3.51 9a9 9 0 0114.13-3.36L23 10M1 14l5.36 4.36A9 9 0 0020.49 15" />
                                        </svg>
                                    </div>

                                </button>

                            </div>

                        </section>
                    )}

                    {/* SUCCESS MESSAGE */}
                    {score >= 3 && courseCompleted && (
                        <>
                            <p className="text-green-700 font-semibold mb-2 mt-10">
                                Congratulations! Course Completed Successfully 🎉
                            </p>

                            <p className="text-[#33470B] text-[14px]">
                                Your course certificate is now available to download.
                            </p>
                        </>
                    )}

                    {score >= 3 && !courseCompleted && (
                        <p className="text-green-700 font-semibold mb-2 mt-10">
                            Congratulations! Module Completed Successfully 🎉
                        </p>
                    )}

                    {score >= 3 && !courseCompleted && (
                        <section className="max-w-[1100px] mx-auto px-4 py-10 flex justify-center">

                            <button
                                onClick={() => router.push(`/courses/${courseId}`)}
                                className="flex items-stretch border border-[#005715] rounded-[10px] overflow-hidden hover:shadow-md transition"
                            >

                                {/* TEXT */}
                                <div className="px-7 py-7 bg-[#FCFFF7] text-left cursor-pointer">
                                    <p className="text-[#005715] font-semibold text-[16px] leading-tight mb-1">
                                        Go to
                                    </p>
                                    <p className="text-[#005715] font-semibold text-[16px] leading-tight">
                                        Modules
                                    </p>
                                </div>

                                {/* ICON BLOCK */}
                                <div className="bg-[#005715] px-8 m-[3px] rounded-[8px] flex items-center justify-center">
                                    <svg
                                        width="28"
                                        height="28"
                                        viewBox="0 0 24 24"
                                        fill="none"
                                        stroke="white"
                                        strokeWidth="3"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                    >
                                        <line x1="5" y1="12" x2="19" y2="12" />
                                        <polyline points="12 5 19 12 12 19" />
                                    </svg>
                                </div>

                            </button>

                        </section>
                    )}

                </section>
            )}

        </main>
    );
}
