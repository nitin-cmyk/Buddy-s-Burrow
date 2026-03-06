"use client";

import { useState, useRef, useEffect } from "react";
import { Upload, Save } from "lucide-react";
import { useParams, useRouter } from "next/navigation";
import { supabase } from "@/lib/supabaseClient";

type NewsEditorProps = {
    mode: "create" | "edit";
};



export default function NewsEditor({ mode }: NewsEditorProps) {


    const router = useRouter();
    const params = useParams();

    const newsId = mode === "edit" ? (params.id as string) : undefined;

    const [previewUrl, setPreviewUrl] = useState<string | null>(null);
    const [existingThumbnail, setExistingThumbnail] = useState<string | null>(null);


    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const [image, setImage] = useState<File | null>(null);
    const [loading, setLoading] = useState(false);
    const [fetching, setFetching] = useState(false);


    const fileRef = useRef<HTMLInputElement>(null);

    const handleUploadClick = () => {
        fileRef.current?.click();
    };

    useEffect(() => {
        if (mode !== "edit" || !newsId) return;

        const fetchBlog = async () => {
            try {
                setFetching(true);

                const { data, error } = await supabase
                    .from("news_recaps")
                    .select("*")
                    .eq("id", newsId)
                    .single();

                if (error) throw error;

                setTitle(data.title || "");
                setContent(data.content || "");
                setExistingThumbnail(data.thumbnail_url || null);
                setPreviewUrl(data.thumbnail_url || null);

            } catch (err) {
                console.error(err);
                alert("Failed to load blog");
            } finally {
                setFetching(false);
            }
        };

        fetchBlog();
    }, [mode, newsId]);



    useEffect(() => {
        return () => {
            if (previewUrl?.startsWith("blob:")) {
                URL.revokeObjectURL(previewUrl);
            }
        };
    }, [previewUrl]);



    const handleSave = async () => {

        if (loading) return;

        if (!title.trim()) {
            alert("Title is required");
            return;
        }

        if (!content.trim()) {
            alert("Content is required");
            return;
        }

        // ✅ IMAGE VALIDATION
        if (mode === "create" && !image) {
            alert("Thumbnail image is required");
            return;
        }

        if (mode === "edit" && !image && !existingThumbnail) {
            alert("Thumbnail image is required");
            return;
        }


        setLoading(true);


        try {

            // ================= UPLOAD IMAGE =================
            let finalThumbnail: string | null = existingThumbnail;

            if (image) {


                const fileExt = image.name.split(".").pop();
                const fileName = `${crypto.randomUUID()}.${fileExt}`;
                const filePath = `news/${fileName}`;

                const { error: uploadError } = await supabase.storage
                    .from("news-assets")
                    .upload(filePath, image);

                if (uploadError) throw uploadError;

                const { data } = supabase.storage
                    .from("news-assets")
                    .getPublicUrl(filePath);

                if (!data?.publicUrl) throw new Error("Failed to get image URL");

                finalThumbnail = data.publicUrl;

                // DELETE OLD IMAGE AFTER SUCCESSFUL UPLOAD
                if (mode === "edit" && existingThumbnail) {


                    const oldPath = getStoragePath(existingThumbnail);

                    if (oldPath) {
                        const { error: removeError } = await supabase.storage
                            .from("news-assets")
                            .remove([oldPath]);

                        if (removeError) {
                            console.warn("Old image cleanup failed", removeError);
                        }
                    }
                }
            }

            // ================= INSERT ==============

            if (mode === "create") {

                const { error } = await supabase
                    .from("news_recaps")
                    .insert({
                        title: title.trim(),
                        content: content.trim(),
                        thumbnail_url: finalThumbnail
                    });

                if (error) throw error;

                alert("Blog created successfully");

            } else {

                if (!newsId) throw new Error("Missing news ID");

                const { error } = await supabase
                    .from("news_recaps")
                    .update({
                        title: title.trim(),
                        content: content.trim(),
                        thumbnail_url: finalThumbnail
                    })
                    .eq("id", newsId);


                if (error) throw error;

                alert("Blog updated successfully");
            }

            router.push("/admin/news&recaps");


        } catch (err: any) {
            console.error(err);
            alert(err?.message || "Failed to save blog");
        } finally {
            setLoading(false);
        }
    };

    const getStoragePath = (url: string) => {
        if (!url) return "";

        try {
            const decoded = decodeURIComponent(url);
            const parts = decoded.split("/news-assets/");
            return parts.length > 1 ? parts[1] : "";
        } catch {
            return "";
        }
    };




    if (fetching) {
        return (
            <div className="flex items-center justify-center h-[60vh] text-[#455F0F] text-lg font-medium">
                Loading blog…
            </div>
        );
    }


    return (
        <div className="px-3 sm:px-6 lg:px-10 py-4 max-w-[1400px] mx-auto">

            {/* GO BACK */}
            <button
                onClick={() => router.back()}
                className="border border-[#455F0F] px-3 sm:px-4 py-2 rounded-lg text-[#455F0F] mb-6 text-sm sm:text-base"
            >
                ← Go back
            </button>

            {/* TITLE */}
            <h1 className="text-[22px] sm:text-[25px] font-medium text-[#455F0F] mb-8">
                {mode === "create" ? "Create Blog" : "Edit Blog"}
            </h1>

            {/* ================= THUMBNAIL ================= */}
            <h2 className="text-[18px] sm:text-[20px] font-medium text-[#33470B] mb-3">
                Blog Thumbnail :
            </h2>

            <div className="border border-[#CFE2A7] rounded-[12px] p-4 mb-8 flex flex-col gap-4">

                {(previewUrl || existingThumbnail) && (
                    <div className="w-full h-[180px] rounded-lg overflow-hidden mb-3">
                        <img
                            src={previewUrl || existingThumbnail!}
                            alt="preview"
                            className="w-full h-full object-cover"
                        />
                    </div>
                )}

                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                    <p className="text-[12px] font-light text-[#7B7B7B] max-w-full sm:max-w-[70%]">
                        Upload a visual that related to this blog or event, choose a landscape image, Image shouldn’t exceed 20 MB
                    </p>

                    <input
                        type="file"
                        hidden
                        ref={fileRef}
                        onChange={(e) => {
                            const file = e.target.files?.[0];
                            if (!file) return;

                            if (!file.type.startsWith("image/")) {
                                alert("Please upload a valid image");
                                return;
                            }

                            if (file.size > 20 * 1024 * 1024) {
                                alert("Image must be less than 20MB");
                                return;
                            }

                            if (previewUrl) URL.revokeObjectURL(previewUrl);

                            setImage(file);

                            const url = URL.createObjectURL(file);
                            setPreviewUrl(url);
                        }}
                    />

                    <button
                        onClick={handleUploadClick}
                        className="flex text-[14px] sm:text-[16px] items-center gap-2 bg-[#90B73B] text-white px-4 py-2 rounded-[4px] font-semibold self-start sm:self-auto"
                    >
                        Upload Image
                        <Upload size={18} />
                    </button>
                </div>
            </div>

            {/* ================= TITLE ================= */}
            <h2 className="text-[18px] sm:text-[20px] font-medium text-[#33470B] mb-2">
                Blog Title :
            </h2>

            <div className="border border-[#CFE2A7] rounded-[12px] px-4 py-3 mb-8">

                <input
                    value={title}
                    maxLength={120}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="Display Name for Blog. (This Text will be shown as the title)"
                    className="w-full outline-none placeholder:text-[12px] text-[14px] bg-transparent"
                />

                <div className="mt-2">
                    <div className="h-[1px] bg-[#D9D9D9] w-full mb-1"></div>
                    <div className="flex justify-end">
                        <p className="text-[10px] text-[#7B7B7B]">
                            max 120 characters
                        </p>
                    </div>
                </div>

            </div>

            {/* ================= CONTENT ================= */}
            <div className="border border-[#CFE2A7] rounded-[18px] p-3 sm:p-4 shadow-[1px_1px_2px_0px_#0000001A,-1px_-1px_2px_0px_#0000001A] mb-10">

                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">

                    <h2 className="text-[18px] sm:text-[20px] font-medium text-[#33470B]">
                        Blog Sub Text :
                    </h2>

                    {/* Toolbar */}
                    <div className="flex gap-4 text-[#33470B]">
                        <span className="font-bold cursor-pointer">B</span>
                        <span className="cursor-pointer">•</span>
                        <span className="cursor-pointer">≡</span>
                    </div>

                </div>

                <div className="border border-[#CFE2A7] rounded-[14px] p-2 mt-3">

                    <textarea
                        value={content}
                        onChange={(e) => setContent(e.target.value)}
                        rows={10}
                        placeholder="Write your blog content..."
                        className="w-full outline-none text-[14px] text-[#7B7B7B] resize-none"
                    />

                </div>

            </div>

            {/* ================= ACTIONS ================= */}
            <div className="flex flex-col sm:flex-row justify-center gap-4 sm:gap-8">

                {mode === "edit" && (
                    <button
                        disabled={loading}
                        onClick={async () => {

                            if (!confirm("Are you sure you want to delete this blog?")) return;

                            if (existingThumbnail) {
                                const path = getStoragePath(existingThumbnail);

                                if (path) {
                                    await supabase.storage
                                        .from("news-assets")
                                        .remove([path]);
                                }
                            }

                            if (!newsId) {
                                alert("Missing news ID");
                                return;
                            }

                            const { error } = await supabase
                                .from("news_recaps")
                                .delete()
                                .eq("id", newsId);

                            if (error) {
                                alert(error.message);
                                return;
                            }

                            alert("Blog deleted");
                            router.push("/admin/news&recaps");
                        }}

                        className="border border-red-500 text-red-500 px-6 sm:px-8 py-3 rounded-lg font-medium"
                    >
                        Delete Blog
                    </button>

                )}

                <button
                    onClick={handleSave}
                    disabled={loading}
                    className="bg-[#455F0F] text-white px-8 sm:px-10 py-3 rounded-lg flex items-center justify-center gap-2 font-medium disabled:opacity-50"
                >
                    {loading ? "Saving..." : "Save Changes"}
                    <Save size={18} />
                </button>

            </div>

        </div >
    );
}
