"use client";

import { useState, useRef, useEffect } from "react";
import { Upload, Plus } from "lucide-react";
import { useParams, useRouter } from "next/navigation";
import { supabase } from "@/lib/supabaseClient";


type Topic = {
    heading: string
    text: string
    resource: string
    image: File | null
    thumbnailUrl?: string | null
    previewUrl?: string | null
}


type Question = {
    text: string
    options: string[]
    correct: number
}

export default function ModuleAddEdit() {
    const params = useParams<{ courseId: string; moduleId?: string }>();
    const router = useRouter();

    const courseId = params.courseId as string;

    const moduleId = params.moduleId;

    const mode: "create" | "edit" = moduleId ? "edit" : "create";

    // ================= STATE =================
    const [moduleTitle, setModuleTitle] = useState("");
    const [loading, setLoading] = useState(false);

    const [topics, setTopics] = useState<Topic[]>([
        { heading: "", text: "", resource: "", image: null, thumbnailUrl: null, previewUrl: null }
    ]);

    const [questions, setQuestions] = useState<Question[]>([
        { text: "", options: ["", "", "", ""], correct: 0 }
    ]);

    const questionRefs = useRef<(HTMLInputElement | null)[]>([]);


    const getNextModuleOrder = async () => {
        const { data } = await supabase
            .from("modules")
            .select("order_index")
            .eq("course_id", courseId)
            .order("order_index", { ascending: false })
            .limit(1);

        return data && data.length > 0 ? data[0].order_index + 1 : 1;
    };

    // ================= LOAD MODULE DATA =================
    useEffect(() => {
        if (mode !== "edit" || !moduleId) return;

        const loadModuleData = async () => {
            try {
                setLoading(true);

                // ================= MODULE =================
                const { data: moduleData, error: moduleError } = await supabase
                    .from("modules")
                    .select("title")
                    .eq("id", moduleId)
                    .single();

                if (moduleError) throw moduleError;

                setModuleTitle(moduleData.title);

                // ================= TOPICS =================
                const { data: topicsData, error: topicsError } = await supabase
                    .from("topics")
                    .select("title, content, resource_link, thumbnail_url")
                    .eq("module_id", moduleId)
                    .order("order_index");

                if (topicsError) throw topicsError;

                const mappedTopics: Topic[] = topicsData.map((t) => ({
                    heading: t.title ?? "",
                    text: t.content ?? "",
                    resource: t.resource_link ?? "",
                    image: null,
                    thumbnailUrl: t.thumbnail_url ?? null,
                    previewUrl: null
                }));

                setTopics(mappedTopics.length ? mappedTopics : [
                    { heading: "", text: "", resource: "", image: null, thumbnailUrl: null, previewUrl: null }
                ]);

                // ================= QUESTIONS =================
                const { data: questionsData, error: qError } = await supabase
                    .from("questions")
                    .select("id, question_text")
                    .eq("module_id", moduleId);

                if (qError) throw qError;

                const mappedQuestions: Question[] = [];

                for (const q of questionsData) {

                    const { data: optionsData, error: optError } = await supabase
                        .from("question_options")
                        .select("option_text, option_index, is_correct")
                        .eq("question_id", q.id)
                        .order("option_index");

                    if (optError) throw optError;

                    const options = ["", "", "", ""];
                    let correctIndex = 0;

                    optionsData.forEach((opt) => {
                        options[opt.option_index] = opt.option_text;
                        if (opt.is_correct) correctIndex = opt.option_index;
                    });

                    mappedQuestions.push({
                        text: q.question_text,
                        options,
                        correct: correctIndex
                    });
                }

                setQuestions(mappedQuestions.length ? mappedQuestions : [
                    { text: "", options: ["", "", "", ""], correct: 0 }
                ]);


            } catch (err) {
                console.error("Prefill error:", err);
                alert("Failed to load module data");
            } finally {
                setLoading(false);
            }
        };

        loadModuleData();

    }, [mode, moduleId]);

    // ================= TOPIC HANDLERS =================
    const addTopic = () => {
        setTopics([
            ...topics,
            { heading: "", text: "", resource: "", image: null, thumbnailUrl: null, previewUrl: null }
        ]);
    };

    const updateTopic = <K extends keyof Topic>(
        i: number,
        field: K,
        value: Topic[K]
    ) => {
        setTopics(prev =>
            prev.map((t, idx) =>
                idx === i ? { ...t, [field]: value } : t
            )
        );
    };

    // ================= QUESTION HANDLERS =================
    const addQuestion = () => {
        setQuestions([
            ...questions,
            { text: "", options: ["", "", "", ""], correct: 0 }
        ]);
    };

    const updateQuestion = <K extends keyof Question>(
        qi: number,
        field: K,
        value: Question[K]
    ) => {
        setQuestions(prev =>
            prev.map((q, idx) =>
                idx === qi ? { ...q, [field]: value } : q
            )
        );
    };

    const removeQuestion = (index: number) => {

        if (questions.length === 1) {
            alert("At least one question is required");
            return;
        }

        setQuestions(prev => prev.filter((_, i) => i !== index));
    };

    const insertBlank = (qi: number) => {

        const input = questionRefs.current[qi];
        if (!input) return;

        // Ensure cursor exists
        const cursorPos = input.selectionStart ?? 0;

        const currentText = questions[qi].text;

        const blank = " ______ ";

        const newText =
            currentText.slice(0, cursorPos) +
            blank +
            currentText.slice(cursorPos);

        updateQuestion(qi, "text", newText);

        // Restore cursor position after React state update
        setTimeout(() => {
            input.focus();

            const newPos = cursorPos + blank.length;

            input.setSelectionRange(newPos, newPos);
        }, 0);
    };

    const updateOption = (qi: number, oi: number, value: string) => {
        const updated = [...questions];
        updated[qi].options[oi] = value;
        setQuestions(updated);
    };

    // ================= IMAGE UPLOAD =================
    const imageRefs = useRef<(HTMLInputElement | null)[]>([]);

    const triggerUpload = (i: number) => {
        imageRefs.current[i]?.click();
    };

    const handleImage = (
        e: React.ChangeEvent<HTMLInputElement>,
        i: number
    ) => {
        const file = e.target.files?.[0];
        if (!file) return;


        if (!file.type.startsWith("image/")) {
            alert("Please upload a valid image file");
            return;
        }

        if (file.size > 20 * 1024 * 1024) {
            alert("Image must be less than 20MB");
            return;
        }

        const previewUrl = URL.createObjectURL(file);

        setTopics(prev =>
            prev.map((t, idx) => {

                // cleanup old preview if exists
                if (idx === i && t.previewUrl) {
                    URL.revokeObjectURL(t.previewUrl);
                }

                return idx === i
                    ? {
                        ...t,
                        image: file,
                        thumbnailUrl: null,
                        previewUrl
                    }
                    : t;
            })
        );
        e.target.value = "";
    };

    useEffect(() => {
        return () => {
            topics.forEach(t => {
                if (t.previewUrl) URL.revokeObjectURL(t.previewUrl);
            });
        };
    }, []);

    // ================= SAVE =================
    const handleSave = async () => {

        if (loading) return;

        if (!moduleTitle.trim()) {
            alert("Module title required");
            return;
        }

        const validTopics = topics.filter(t => t.heading.trim());
        if (validTopics.length === 0) {
            alert("Add at least one valid topic");
            return;
        }

        const validQuestions = questions.filter(q => q.text.trim());

        if (validQuestions.length === 0) {
            alert("Add at least one question");
            return;
        }

        setLoading(true);

        try {

            let currentModuleId: string;

            // ================= CREATE =================
            if (mode === "create") {

                const orderIndex = await getNextModuleOrder();

                const { data, error } = await supabase
                    .from("modules")
                    .insert({
                        course_id: courseId,
                        title: moduleTitle.trim(),
                        order_index: orderIndex
                    })
                    .select()
                    .single();

                if (error) throw error;

                currentModuleId = data.id;

            } else {
                // ================= EDIT =================
                currentModuleId = moduleId as string;

                // update module title
                const { error: updateError } = await supabase
                    .from("modules")
                    .update({ title: moduleTitle.trim() })
                    .eq("id", currentModuleId);

                if (updateError) throw updateError;

                // delete topics
                // ================= DELETE OLD TOPIC IMAGES =================
                const { data: oldTopics } = await supabase
                    .from("topics")
                    .select("thumbnail_url")
                    .eq("module_id", currentModuleId);

                if (oldTopics?.length) {

                    const paths = oldTopics
                        .map(t => getStoragePathFromUrl(t.thumbnail_url))
                        .filter(Boolean) as string[];

                    if (paths.length) {
                        await supabase.storage
                            .from("course-assets")
                            .remove(paths);
                    }
                }

                // ================= DELETE TOPICS =================
                const { error: delTopicsError } = await supabase
                    .from("topics")
                    .delete()
                    .eq("module_id", currentModuleId);

                if (delTopicsError) throw delTopicsError;

                // get questions
                const { data: oldQuestions, error: fetchQError } = await supabase
                    .from("questions")
                    .select("id")
                    .eq("module_id", currentModuleId);

                if (fetchQError) throw fetchQError;

                if (oldQuestions?.length) {

                    const ids = oldQuestions.map(q => q.id);

                    const { error: delOptionsError } = await supabase
                        .from("question_options")
                        .delete()
                        .in("question_id", ids);

                    if (delOptionsError) throw delOptionsError;
                }

                const { error: delQuestionsError } = await supabase
                    .from("questions")
                    .delete()
                    .eq("module_id", currentModuleId);

                if (delQuestionsError) throw delQuestionsError;
            }

            // ================= INSERT TOPICS =================
            for (let i = 0; i < validTopics.length; i++) {

                const topic = validTopics[i];

                let thumbnailUrl = topic.thumbnailUrl ?? null;

                if (topic.image) {

                    const fileExt = topic.image.name.split(".").pop();
                    const fileName = `${crypto.randomUUID()}-${i}.${fileExt}`;
                    const filePath = `topics/${fileName}`;

                    const { error: uploadError } = await supabase.storage
                        .from("course-assets")
                        .upload(filePath, topic.image);

                    if (uploadError) throw uploadError;

                    const { data } = supabase.storage
                        .from("course-assets")
                        .getPublicUrl(filePath);

                    thumbnailUrl = data.publicUrl;
                }

                const { error } = await supabase
                    .from("topics")
                    .insert({
                        module_id: currentModuleId,
                        title: topic.heading.trim(),
                        content: topic.text.trim(),
                        thumbnail_url: thumbnailUrl,
                        resource_link: topic.resource.trim(),
                        order_index: i + 1
                    });

                if (error) throw error;
            }

            // ================= INSERT QUESTIONS =================
            for (let qi = 0; qi < validQuestions.length; qi++) {

                const q = validQuestions[qi];

                // ✅ VALIDATE OPTIONS BEFORE INSERT
                if (!q.options.every(opt => opt.trim())) {
                    throw new Error(`Question ${qi + 1} must have all 4 options filled`);
                }

                if (!q.options[q.correct].trim()) {
                    throw new Error(`Question ${qi + 1} correct answer cannot be empty`);
                }

                const { data: questionData, error: qError } = await supabase
                    .from("questions")
                    .insert({
                        module_id: currentModuleId,
                        question_text: q.text.trim()
                    })
                    .select()
                    .single();

                if (qError) throw qError;

                const questionId = questionData.id;

                for (let oi = 0; oi < q.options.length; oi++) {

                    const optText = q.options[oi];
                    if (!optText.trim()) continue;

                    const { error: optError } = await supabase
                        .from("question_options")
                        .insert({
                            question_id: questionId,
                            option_text: optText,
                            option_index: oi,
                            is_correct: q.correct === oi
                        });

                    if (optError) throw optError;
                }
            }


            // ✅ navigate
            router.push(`/admin/courses/${courseId}`);


        } catch (err: any) {
            console.error(err);
            alert(err?.message || "Failed to save module");
        } finally {
            setLoading(false);
        }
    };

    const handleDeleteModule = async () => {

        if (!moduleId) return;

        const confirmDelete = confirm(
            "Are you sure you want to delete this module?\n\nThis action cannot be undone."
        );

        if (!confirmDelete) return;

        try {

            setLoading(true);

            // 🧹 fetch topic images
            const { data: topicsData } = await supabase
                .from("topics")
                .select("thumbnail_url")
                .eq("module_id", moduleId);

            if (topicsData?.length) {

                const paths = topicsData
                    .map(t => getStoragePathFromUrl(t.thumbnail_url))
                    .filter(Boolean) as string[];

                if (paths.length) {
                    await supabase.storage
                        .from("course-assets")
                        .remove(paths);
                }
            }

            // 🗑 delete module (cascade deletes topics/questions)
            const { error } = await supabase
                .from("modules")
                .delete()
                .eq("id", moduleId);

            if (error) throw error;

            alert("Module deleted successfully");

            router.push(`/admin/courses/${courseId}`);

        } catch (err: any) {
            console.error(err);
            alert(err?.message || "Failed to delete module");
        } finally {
            setLoading(false);
        }
    };


    const removeTopic = async (index: number) => {

        if (topics.length === 1) {
            alert("At least one topic is required");
            return;
        }

        const topic = topics[index];

        // 🧹 delete from storage if existing image
        if (topic.thumbnailUrl) {
            const path = getStoragePathFromUrl(topic.thumbnailUrl);

            if (path) {
                await supabase.storage
                    .from("course-assets")
                    .remove([path]);
            }
        }

        if (topic.previewUrl) {
            URL.revokeObjectURL(topic.previewUrl);
        }

        setTopics(prev => prev.filter((_, i) => i !== index));
    };



    const getStoragePathFromUrl = (url: string | null | undefined) => {
        if (!url) return null;

        const parts = url.split("/course-assets/");
        return parts.length > 1 ? parts[1] : null;
    };


    // =====================================================
    return (
        <div className="p-2 sm:p-6 lg:p-10 max-w-[1400px] mx-auto">

            <h1 className="text-[24px] font-medium text-[#455F0F] mb-8">
                {mode === "edit" ? "Edit Module" : "Create Module"}
            </h1>

            {/* MODULE TITLE */}
            <label className="text-[#33470B] text-[20px] font-medium block mb-2">
                Module Title :
            </label>

            <div className="border border-[#CFE2A7] rounded-[12px] px-4 py-3 mb-8">

                <input
                    value={moduleTitle}
                    maxLength={35}
                    onChange={(e) => setModuleTitle(e.target.value)}
                    placeholder="Display Name for Module. (This Text will be shown as the “title of the module”)"
                    className="w-full outline-none placeholder:text-[12px] placeholder:text-[#7B7B7B] bg-transparent"
                />

                {/* Underline + helper */}
                <div className="mt-2">
                    <div className="h-[1px] bg-[#D9D9D9] w-full mb-1"></div>
                    <div className="flex justify-end">
                        <p className="text-[10px] text-[#7B7B7B] font-light right-2">
                            max 35 characters
                        </p>
                    </div>
                </div>

            </div>


            {/* TOPICS */}
            {topics.map((t, i) => (
                <div key={i} className="mb-12">

                    <div className="flex items-center justify-between mb-4">
                        <h2 className="text-[#455F0F] text-[24px] font-medium">
                            Topic {i + 1}
                        </h2>

                        {topics.length > 1 && (
                            <button
                                type="button"
                                onClick={() => removeTopic(i)}
                                className="text-red-500 text-sm font-medium hover:opacity-70"
                            >
                                Delete Topic
                            </button>
                        )}
                    </div>


                    <input
                        type="file"
                        hidden
                        ref={(el) => {
                            if (el) imageRefs.current[i] = el;
                        }}


                        onChange={(e) => handleImage(e, i)}
                    />

                    <h2 className="text-[20px] font-medium text-[#33470B] mb-3">
                        Topic Thumbnail :
                    </h2>

                    <div className="flex flex-col gap-3 border border-[#CFE2A7] rounded-[12px] p-3 mb-4">

                        {/* IMAGE PREVIEW */}
                        {(t.previewUrl || t.thumbnailUrl) && (
                            <div className="relative w-full h-[180px] rounded-lg overflow-hidden">
                                <img
                                    src={t.previewUrl ?? t.thumbnailUrl ?? ""}
                                    alt="preview"
                                    className="w-full h-full object-cover"
                                />
                            </div>
                        )}

                        {/* TEXT + BUTTON ROW */}
                        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">

                            <p className="text-[12px] text-[#7B7B7B]">
                                Upload a visual that related to this topic, choose a landscape image, Image shouldn’t exceed 20 MB
                            </p>

                            <button
                                type="button"
                                onClick={() => triggerUpload(i)}
                                className="flex items-center font-semibold text-[14px] gap-2 bg-[#90B73B] text-white px-4 py-2 rounded-[4px]"
                            >
                                Upload Image
                                <Upload size={22} />
                            </button>

                        </div>
                    </div>



                    <h2 className="text-[20px] font-medium text-[#33470B] mb-3">Resource Link : Optional</h2>
                    <input
                        placeholder="Resource Link (optional)"
                        value={t.resource}
                        onChange={(e) => updateTopic(i, "resource", e.target.value)}
                        className="w-full border text-[12px] text-light border-[#CFE2A7] rounded-xl px-4 py-3 mb-4 text-[#7B7B7B]"
                    />

                    <div className="border border-[#CFE2A7] rounded-[16px] p-4 mb-4">

                        {/* Topic Heading */}
                        <h3 className="text-[20px] font-medium text-[#33470B] mb-2">
                            Topic Heading :
                        </h3>

                        <input
                            placeholder="Enter topic heading"
                            value={t.heading}
                            onChange={(e) => updateTopic(i, "heading", e.target.value)}
                            className="w-full border text-[#7B7B7B] font-light border-[#CFE2A7] rounded-[8px] px-4 py-3 mb-4 outline-none text-[14px]"
                        />

                        {/* Topic Sub Text */}
                        <h3 className="text-[18px] font-medium text-[#33470B] mb-2">
                            Topic Sub Text :
                        </h3>

                        <textarea
                            rows={5}
                            placeholder="Enter topic description"
                            value={t.text}
                            onChange={(e) => updateTopic(i, "text", e.target.value)}
                            className="w-full text-[#7B7B7B] font-light border border-[#CFE2A7] rounded-[8px] px-4 py-3 outline-none text-[14px] resize-none"
                        />

                    </div>

                </div>
            ))}

            <div className="p-2 bg-white rounded-[14px] mb-10">

                <button
                    type="button"
                    onClick={addTopic}
                    className="w-full h-[160px] sm:h-[180px] bg-[#E9E9E9] rounded-[12px] flex flex-col items-center justify-center gap-2 hover:bg-[#E2E2E2] transition"
                >
                    <Plus size={36} className="text-[#455F0F]" />

                    <p className="text-[15px] font-medium text-[#455F0F]">
                        Add Topic
                    </p>

                </button>

            </div>
            {/* ================= KNOWLEDGE CHECK ================= */}
            <div className="border border-[#CFE2A7] rounded-[18px] p-4 sm:p-5">
                <h2 className="text-[#455F0F] text-[22px] font-medium mb-4">
                    Knowledge Check
                </h2>

                <div className="space-y-6">

                    {questions.map((q, qi) => (
                        <div
                            key={qi}
                            className="bg-white border border-[#D9D9D9] rounded-[14px] p-4 sm:p-5"
                        >

                            {/* Question Header */}
                            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-3">

                                <div className="flex flex-wrap items-center gap-2">

                                    <span className="text-[#33470B] font-semibold text-[20px]">
                                        Question {qi + 1} :
                                    </span>

                                    <input
                                        ref={(el) => {
                                            if (el) questionRefs.current[qi] = el;
                                        }}
                                        value={q.text}
                                        onChange={(e) => updateQuestion(qi, "text", e.target.value)}
                                        placeholder="Type your question here"
                                        className="w-full sm:w-[500px] outline-none text-[14px] bg-transparent"
                                    />

                                </div>

                                {questions.length > 1 && (
                                    <button
                                        type="button"
                                        onClick={() => removeQuestion(qi)}
                                        className="text-red-500 text-sm font-medium hover:opacity-70 self-start sm:self-auto"
                                    >
                                        Remove
                                    </button>
                                )}

                                {/* Add Blank */}
                                <button
                                    type="button"
                                    onClick={() => insertBlank(qi)}
                                    className="flex items-center gap-1 text-[13px] text-[#33470B] hover:opacity-70"
                                >
                                    <Plus size={14} />
                                    Add Blank
                                </button>
                            </div>


                            <div className="h-[1px] bg-[#E5E5E5] mb-4"></div>

                            {/* Options */}
                            <div className="space-y-2 sm:space-y-3">

                                {q.options.map((opt, oi) => (
                                    <div key={oi} className="flex items-center gap-3 min-w-0">

                                        <input
                                            type="radio"
                                            checked={q.correct === oi}
                                            onChange={() => updateQuestion(qi, "correct", oi)}
                                            className="appearance-none shrink-0 min-w-[16px] min-h-[16px] w-4 h-4 rounded-full border-2 border-[#90B73B] checked:bg-[#90B73B] checked:border-[#90B73B] relative"
                                            style={{
                                                boxShadow: q.correct === oi ? "inset 0 0 0 2px white" : "none"
                                            }}
                                        />

                                        <input
                                            value={opt}
                                            onChange={(e) => updateOption(qi, oi, e.target.value)}
                                            placeholder={oi === 0 ? "Type your answer here" : ""}
                                            className="flex-1 border-b border-[#E5E5E5] outline-none pb-1 text-[14px]"
                                        />

                                    </div>
                                ))}

                            </div>

                        </div>
                    ))}

                </div>
            </div>


            {/* Add Question Button */}
            <div className="p-2 bg-white rounded-[14px] mt-6">

                <button
                    type="button"
                    onClick={addQuestion}
                    className="w-full h-[140px] sm:h-[160px] bg-[#E9E9E9] rounded-[12px] flex flex-col items-center justify-center gap-2 hover:bg-[#E2E2E2] transition"
                >
                    <Plus size={36} className="text-[#455F0F]" />

                    <p className="text-[15px] font-medium text-[#455F0F]">
                        Add Question
                    </p>

                </button>

            </div>

            {/* FOOTER */}
            <div className="flex flex-col sm:flex-row sm:justify-between gap-3 mt-10">

                {mode === "edit" && (
                    <button
                        type="button"
                        onClick={handleDeleteModule}
                        disabled={loading}
                        className="border w-full sm:w-auto border-red-500 text-red-500 px-6 py-2 rounded-lg disabled:opacity-60"
                    >
                        {loading ? "Deleting..." : "Delete Module"}
                    </button>
                )}

                <button
                    type="button"
                    onClick={handleSave}
                    disabled={loading}
                    className="bg-[#455F0F] w-full sm:w-auto text-white px-6 py-2 rounded-lg disabled:opacity-60"
                >
                    {loading ? "Saving..." : "Save & Exit"}
                </button>

            </div>

        </div>
    );
}
