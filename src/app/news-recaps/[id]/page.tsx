"use client";

import Image from "next/image";
import { supabase } from "@/lib/supabaseClient";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

type News = {
  id: string;
  title: string;
  content: string;
  thumbnail_url: string | null;
  created_at: string;
};

export default function NewsDetailPage() {

  const params = useParams();
  const id = params.id as string;

  const [article, setArticle] = useState<News | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!id) return;

    fetchArticle();
  }, [id]);

  const fetchArticle = async () => {
    try {
      const { data, error } = await supabase
        .from("news_recaps")
        .select("*")
        .eq("id", id)
        .single();

      if (error) throw error;

      setArticle(data);
    } catch (err) {
      console.error("Failed to load article:", err);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-[60vh] text-[#455F0F] text-lg font-medium">
        Loading article…
      </div>
    );
  }

  if (!article) {
    return (
      <div className="flex items-center justify-center h-[60vh] text-[#455F0F] text-lg font-medium">
        Article not found
      </div>
    );
  }

  return (
    <main className="w-full bg-[#FCFFF7]">

      {/* HERO */}
      <section className="w-full h-[90vh] sm:h-[85vh] lg:h-screen p-[12px]">
        <div className="relative w-full h-full rounded-[16px] sm:rounded-[20px] lg:rounded-[24px] overflow-hidden">

          <Image
            src={article.thumbnail_url || "/placeholder.jpg"}
            alt={article.title}
            fill
            priority
            className="object-cover object-center"
          />

        </div>
      </section>

      {/* CONTENT */}
      <section className="w-full">
        <div className="max-w-[1000px] sm:mx-auto mx-[10px] py-[40px] sm:py-[60px] lg:py-[80px]">

          <h1 className="text-[28px] sm:text-[40px] lg:text-[52px] font-poppins text-[#002E0B] font-medium leading-tight">
            {article.title}
          </h1>

          <div className="mt-[24px] text-[16px] sm:text-[18px] lg:text-[20px] font-poppins text-[#00360C] leading-[1.8] whitespace-pre-line">
            {article.content}
          </div>

        </div>
      </section>

      <section className="w-full pb-15">
        <div className="max-w-[1280px] mx-auto px-[16px] sm:px-[24px] lg:px-[32px] pt-15">
          <div className="border border-[#CFE2A7] rounded-[16px] sm:rounded-[20px] lg:rounded-[24px] mx-[0] sm:mx-[24px] lg:mx-[50px] p-[32px]">

            {/* INNER BORDER */}
            <div className="border border-[#CFE2A7] rounded-[16px] p-8 flex flex-col">
              <div className="max-w-[1184px] mx-auto flex flex-col gap-[40px] text-center">
                <h2 className="font-poppins font-medium text-[42px] sm:text-[56px] lg:text-[82px] leading-[64.07px] text-[#00360C]">
                  Donate
                </h2>
                <p className="font-poppins font-normal text-[16px] leading-[24px] text-left text-[#00360C] max-w-[900px] mx-auto">
                  Your support enables us to offer accessible environmental education, develop interactive learning experiences, and organize community-based programs that nurture awareness, responsibility, and eco-friendly action among young learners. Every contribution strengthens our mission to build a greener, more informed future.
                </p>
              </div>
            </div>

          </div>
        </div>
      </section>

    </main>
  );
}