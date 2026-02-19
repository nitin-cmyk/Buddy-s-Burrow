"use client";

import { useState, useRef, useEffect } from "react";
import Image from "next/image";
import { Upload, Pencil, Plus, ArrowUp } from "lucide-react";
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

        // ✅ check modules BEFORE publishing
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
                    status: "published",
                    was_published: true,
                    updated_at: new Date().toISOString(),
                })

                .eq("id", courseId);

            if (error) throw error;

            setStatus(newStatus);



            // ✅ redirect AFTER successful publish
            if (newStatus === "published") {
                router.push("/admin/courses");
            }


        } catch (err) {
            console.error("Publish error:", err);
            alert("Failed to publish");
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

                    <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6 sm:gap-8">

                        {modulesList.map((m, i) => (
                            <div key={i} className="bg-white rounded-xl p-2 shadow-sm">

                                <div className="relative h-[140px] w-full rounded-lg overflow-hidden">
                                    <Image src="/coursesimg.jpg" alt="" fill className="object-cover" />
                                </div>

                                <div className="flex flex-col gap-2 mt-3">

                                    <p className="text-[14px] text-[#33470B] line-clamp-1">
                                        {m.title || "Module Title"}
                                    </p>

                                    <Link
                                        href={`/admin/courses/${courseId}/modules/${m.id}`}
                                        className="bg-[#33470B] text-white px-3 py-[2px] rounded-full flex items-center gap-1 text-[10px] self-end"
                                    >
                                        Edit
                                        <Pencil size={9} />
                                    </Link>

                                </div>
                            </div>
                        ))}

                        {/* ADD MODULE */}
                        <div className="bg-white shadow-md rounded-[12px] p-2 min-h-[200px] sm:min-h-[230px]">
                            <Link
                                href={`/admin/courses/${courseId}/modules/new`}
                                className="rounded-[12px] w-full h-full flex flex-col items-center justify-center bg-[#E9E9E9] transition hover:bg-[#E0E0E0] text-center px-4"
                            >
                                <Plus size={36} />
                                <p className="mt-3 text-gray-600 font-medium text-sm sm:text-base">
                                    Add Module
                                </p>
                            </Link>
                        </div>

                    </div>
                </>
            )}

            {/* FOOTER */}
            <div className="flex flex-col sm:flex-row justify-center gap-4 sm:gap-20 mt-12 sm:mt-14">

                {mode === "create" ? (
                    <button
                        onClick={handleSaveDraft}
                        disabled={loading}
                        className="bg-[#455F0F] text-white px-10 py-2 rounded-lg w-full sm:w-auto disabled:opacity-60"
                    >
                        Save & Continue
                    </button>
                ) : (
                    <>
                        <button
                            onClick={handleDelete}
                            disabled={loading}
                            className="border border-red-500 text-red-500 px-8 py-2 rounded-lg w-full sm:w-auto disabled:opacity-60"
                        >
                            Delete
                        </button>

                        <button
                            onClick={handleSaveDraft}
                            disabled={loading}
                            className="border border-gray-400 px-8 py-2 rounded-lg w-full sm:w-auto disabled:opacity-60"
                        >
                            Save Draft
                        </button>

                        <button
                            onClick={handlePublish}
                            disabled={loading}
                            className={`px-8 py-2 rounded-lg flex items-center justify-center gap-2 w-full sm:w-auto text-white disabled:opacity-60
            ${status === "published" ? "bg-gray-500" : "bg-[#455F0F]"}
        `}
                        >
                            {status === "published" ? "Unpublish" : "Publish"}
                            <ArrowUp size={16} />
                        </button>
                    </>

                )}

            </div>

        </div>
    );
}
