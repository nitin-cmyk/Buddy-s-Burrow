"use client";

import { useState, useRef, useEffect } from "react";
import Image from "next/image";
import { Upload, Pencil, Plus, ArrowUp, ArrowDown, Trash2, FileEdit } from "lucide-react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { supabase } from "@/lib/supabaseClient";
import { useRouter } from "next/navigation";


type Props = {
    mode: "create" | "edit";
    initialTitle?: string;
    initialBrief?: string;
    modules?: any[];

};

export default function CourseEditor({
    mode,
    initialTitle = "",
    initialBrief = "",
    modules = [],
}: Props) {

    const [title, setTitle] = useState(initialTitle);
    const [brief, setBrief] = useState(initialBrief);
    const [loading, setLoading] = useState(false);
    const [modulesList, setModulesList] = useState<any[]>([]);
    const [coverFile, setCoverFile] = useState<File | null>(null);
    const [coverUrl, setCoverUrl] = useState<string | null>(null);
    const [status, setStatus] = useState<"draft" | "published">("draft");


    const router = useRouter();

    const [coverPreview, setCoverPreview] = useState<string | null>(null);

    const params = useParams();
    const courseId = params?.courseId as string | undefined;
    const isValid = title.trim().length > 0;

    const fileInputRef = useRef<HTMLInputElement>(null);


    const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;

        setCoverFile(file);

        const url = URL.createObjectURL(file);
        setCoverPreview(url);
    };


    const handleSaveDraft = async () => {
        if (!isValid) return;

        setLoading(true);

        try {
            if (mode === "create") {
                let coverUrl = null;

                if (coverFile) {
                    coverUrl = await uploadCoverImage();
                }

                const { data, error } = await supabase
                    .from("courses")
                    .insert({
                        title,
                        brief,
                        cover_image_url: coverUrl,
                        status: "draft",
                    })
                    .select()
                    .single();

                if (error) throw error;

                // redirect to edit page after create
                router.push(`/admin/courses/${data.id}`);
            } else {
                let coverUrl = undefined;

                if (coverFile) {
                    coverUrl = await uploadCoverImage();
                }

                const { error } = await supabase
                    .from("courses")
                    .update({
                        title,
                        brief,
                        cover_image_url: coverUrl,
                        status: "draft",
                        updated_at: new Date().toISOString(),
                    })

                    .eq("id", courseId);

                if (error) throw error;
            }

        } catch (err) {
            console.error("Save draft error:", err);
            alert("Failed to save draft");
        } finally {
            setLoading(false);
        }
    };


    const handlePublish = async () => {
        if (!isValid || mode !== "edit") return;

        if (status === "draft" && modulesList.length === 0) {
            alert("Please add at least one module before publishing.");
            return;
        }

        setLoading(true);

        let coverUrl = undefined;

        if (coverFile) {
            coverUrl = await uploadCoverImage();
        }

        try {
            const newStatus = status === "published" ? "draft" : "published";

            const { error } = await supabase
                .from("courses")
                .update({
                    title,
                    brief,
                    cover_image_url: coverUrl,
                    status: newStatus,
                    was_published: true,
                    updated_at: new Date().toISOString(),
                })
                .eq("id", courseId);

            if (error) throw error;

            setStatus(newStatus);

            if (newStatus === "published") {
                router.push("/admin/courses");
            }

        } catch (err) {
            console.error("Publish error:", err);
            alert("Failed to update course status");
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async () => {
        if (!courseId) return;

        const confirmDelete = confirm("Are you sure you want to delete this course?");
        if (!confirmDelete) return;

        setLoading(true);

        try {
            const { error } = await supabase
                .from("courses")
                .delete()
                .eq("id", courseId);

            if (error) throw error;

            router.push("/admin/courses");

        } catch (err) {
            console.error("Delete error:", err);
            alert("Failed to delete course");
        } finally {
            setLoading(false);
        }
    };

    const uploadCoverImage = async () => {
        if (!coverFile) return null;

        const fileExt = coverFile.name.split(".").pop();
        const fileName = `${Date.now()}.${fileExt}`;
        const filePath = `courses/${fileName}`;

        const { error } = await supabase.storage
            .from("course-assets")
            .upload(filePath, coverFile);

        if (error) throw error;

        const { data } = supabase.storage
            .from("course-assets")
            .getPublicUrl(filePath);

        return data.publicUrl;
    };

    const prevPreviewRef = useRef<string | null>(null);

    useEffect(() => {
        if (prevPreviewRef.current && prevPreviewRef.current !== coverPreview) {
            URL.revokeObjectURL(prevPreviewRef.current);
        }

        prevPreviewRef.current = coverPreview;

        return () => {
            if (prevPreviewRef.current) {
                URL.revokeObjectURL(prevPreviewRef.current);
            }
        };
    }, [coverPreview]);


    useEffect(() => {
        if (mode !== "edit" || !courseId) return;

        const fetchCourse = async () => {
            const { data, error } = await supabase
                .from("courses")
                .select("*")
                .eq("id", courseId)
                .single();

            if (error) {
                console.error("Fetch course error:", error);
                return;
            }

            setTitle(data.title || "");
            setBrief(data.brief || "");
            setStatus(data.status);

            if (data.cover_image_url) {
                setCoverPreview(data.cover_image_url);
                setCoverUrl(data.cover_image_url);
            }
        };

        fetchCourse();
    }, [mode, courseId]);

    useEffect(() => {
        if (mode !== "edit" || !courseId) return;

        const fetchModules = async () => {
            const { data, error } = await supabase
                .from("modules")
                .select("*")
                .eq("course_id", courseId)
                .order("order_index", { ascending: true });

            if (error) {
                console.error("Fetch modules error:", error);
                return;
            }

            setModulesList(data || []);
        };

        fetchModules();
    }, [mode, courseId]);

    function getStoragePathFromUrl(url: string | null) {
        if (!url) return null;

        try {
            const parts = url.split("/course-assets/");
            return parts[1] || null;
        } catch {
            return null;
        }
    }


    const handleDeleteModule = async (moduleId: string) => {

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

            // 🗑 delete module
            const { error } = await supabase
                .from("modules")
                .delete()
                .eq("id", moduleId);

            if (error) throw error;

            // ✅ remove module from UI instantly
            setModulesList(prev => prev.filter(m => m.id !== moduleId));

        } catch (err: any) {
            console.error(err);
            alert(err?.message || "Failed to delete module");
        } finally {
            setLoading(false);
        }
    };



    return (
        <div className="px-4 py-6 sm:px-6 lg:px-10 max-w-[1400px] mx-auto">

            {/* PAGE TITLE */}
            <h1 className="text-[22px] sm:text-[25px] font-medium text-[#455F0F] mb-6 sm:mb-8">
                {mode === "create" ? "Create Course" : "Edit Course"}
            </h1>

            {/* COVER IMAGE */}
            <div className="mb-8">
                <label className="text-[#33470B] font-medium block mb-3 text-[18px] sm:text-[20px]">
                    Course Cover Image :
                </label>

                <div className="border border-[#CFE2A7] rounded-[12px] p-4 flex flex-col gap-4">


                    {/* PREVIEW */}
                    {coverPreview && (
                        <div className="relative w-full h-[180px] rounded-lg overflow-hidden">
                            <Image src={coverPreview} alt="" fill className="object-cover" />
                        </div>
                    )}

                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">

                        <p className="text-[12px] text-gray-500 max-w-[520px]">
                            Upload a visual that represents the theme of this course.
                        </p>

                        <input
                            type="file"
                            accept="image/*"
                            ref={fileInputRef}
                            onChange={handleFileSelect}
                            className="hidden"
                        />

                        <button
                            onClick={() => fileInputRef.current?.click()}
                            className="flex items-center justify-center text-[14px] sm:text-[16px] gap-2 bg-[#90B73B] text-white px-4 sm:px-5 py-2 rounded-lg whitespace-nowrap w-full sm:w-auto"
                        >
                            Upload Image
                            <Upload size={18} />
                        </button>
                    </div>
                </div>
            </div>

            {/* TITLE */}
            <div className="mb-8">
                <label className="text-[#33470B] font-medium block mb-3 text-[18px] sm:text-[20px]">
                    Course Title :
                </label>

                <input
                    autoFocus={mode === "create"}
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="Display Name for Course"
                    className="w-full border border-[#CFE2A7] rounded-[12px] px-4 py-3 outline-none placeholder:text-[12px]"
                />

                {!title && (
                    <p className="text-[12px] text-red-500 mt-2">
                        This Field should not be empty
                    </p>
                )}
            </div>

            {/* BRIEF */}
            <div className="mb-12">
                <label className="text-[#00360C] font-medium text-[18px] sm:text-[20px] block mb-2">
                    Course Brief :
                </label>

                <textarea
                    value={brief}
                    onChange={(e) => setBrief(e.target.value)}
                    rows={5}
                    placeholder="Give a brief about the course"
                    className="w-full border border-[#CFE2A7] rounded-xl px-4 py-3 outline-none resize-none placeholder:text-[12px]"
                />
            </div>

            {/* MODULES */}

            {mode === "edit" && (
                <>
                    <h2 className="text-[20px] sm:text-[22px] font-medium text-[#455F0F] mb-6">
                        Add/Edit Modules
                    </h2>

                    <div className="flex flex-col gap-9">

                        {modulesList.map((m, i) => (
                            <div
                                key={m.id}
                                className="flex items-center justify-between border border-[#90B73B] rounded-[12px] px-6 py-3 hover:bg-[#F7FAF0] transition"
                            >
                                {/* LEFT SIDE - ONLY NUMBER */}
                                <p className="text-[#33470B] text-[18px] sm:text-[22px] font-medium">
                                    {i + 1}. Module {i + 1}
                                </p>

                                {/* RIGHT SIDE - ACTIONS */}
                                <div className="flex items-center gap-4">

                                    {/* DELETE */}
                                    <button
                                        onClick={() => handleDeleteModule(m.id)}
                                        className="bg-white border border-red-500 text-red-500 p-2 rounded-[8px] hover:bg-red-50 transition"
                                    >
                                        <Trash2 size={22} />
                                    </button>

                                    {/* EDIT */}
                                    <Link
                                        href={`/admin/courses/${courseId}/modules/${m.id}`}
                                        className="bg-[#FCFFF7] text-[#33470B] p-2 rounded-[8px] border border-[#455F0F] hover:bg-[#e4e9d3] transition"
                                    >
                                        <Pencil size={22} />
                                    </Link>

                                </div>
                            </div>
                        ))}

                        {/* ADD MODULE */}
                        <Link
                            href={`/admin/courses/${courseId}/modules/new`}
                            className="flex items-center justify-center gap-4 border border-[#90B73B] bg-[#EBF8CD] text-[#33470B] rounded-[12px] py-4 text-[22px] font-medium hover:bg-[#e6efcd] transition"
                        >
                            <Plus size={36} />
                            Add module
                        </Link>

                    </div>
                </>
            )}

            {/* FOOTER */}
            <div className="flex flex-col lg:flex-row justify-between mt-14">

                {mode === "create" ? (
                    <button
                        onClick={handleSaveDraft}
                        disabled={loading}
                        className="bg-[#455F0F] text-white px-6 py-3 rounded-[8px] flex items-center justify-center gap-3 text-[16px] font-medium disabled:opacity-60"
                    >
                        Save & Continue
                    </button>
                ) : (
                    <>
                        {/* DELETE */}
                        <button
                            onClick={handleDelete}
                            disabled={loading}
                            className="border-1 border-[#B91C1C] text-[#B91C1C] px-6 py-3 rounded-[8px] flex items-center justify-center gap-3 text-[16px] font-medium hover:bg-red-50 transition disabled:opacity-60"
                        >
                            Delete Course
                            <Trash2 size={22} />
                        </button>

                        {/* DRAFT */}
                        <button
                            onClick={handleSaveDraft}
                            disabled={loading}
                            className="border-1 border-[#7B7B7B] text-[#3E3E3E] px-6 py-3 rounded-[8px] flex items-center justify-center gap-3 text-[16px] font-medium hover:bg-gray-100 transition disabled:opacity-60"
                        >
                            Draft
                            <FileEdit size={20} />
                        </button>

                        {/* PUBLISH */}
                        <button
                            onClick={handlePublish}
                            disabled={loading}
                            className={`px-6 py-3 rounded-[8px] flex items-center justify-center gap-3 text-[16px] font-medium transition disabled:opacity-60
          ${status === "published"
                                    ? "text-[#FF5A1E] border border-[#FF5A1E]"
                                    : "bg-[#455F0F] hover:bg-[#3c530c] text-white"
                                }
        `}
                        >
                            {status === "published" ? "Unpublish" : "Publish"}

                            {status === "published" ? (
                                <ArrowDown size={22} />
                            ) : (
                                <ArrowUp size={22} />
                            )}
                        </button>
                    </>
                )}
            </div>

        </div>
    );
}
