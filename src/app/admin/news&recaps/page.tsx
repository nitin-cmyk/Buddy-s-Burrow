"use client";

import { useEffect, useState } from "react";
import NewsCard from "../components/NewsCard";
import CreateNewsCard from "../components/CreateNewscard";
import { supabase } from "@/lib/supabaseClient";

type NewsItem = {
  id: string;
  title: string;
  thumbnail_url: string;
  created_at: string;
};

export default function NewsPage() {

  const [news, setNews] = useState<NewsItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {

    const fetchNews = async () => {

      setLoading(true);

      const { data, error } = await supabase
        .from("news_recaps")
        .select("*")
        .order("created_at", { ascending: false });

      if (error) {
        console.error(error);
        setLoading(false);
        return;
      }

      setNews(data || []);
      setLoading(false);
    };

    fetchNews();

  }, []);

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-IN", {
      day: "2-digit",
      month: "short",
      year: "numeric"
    });
  };

  return (
    <div className="p-2 sm:p-4 lg:p-6">

      <h1 className="text-[25px] font-medium text-[#455F0F] mb-8">
        News & Recaps
      </h1>

      {loading && (
        <div className="text-center text-[#455F0F] mb-6">
          Loading news...
        </div>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-8">

        {news.map(item => (
          <NewsCard
            key={item.id}
            item={{
              id: item.id,
              title: item.title,
              date: formatDate(item.created_at),
              status: "published",
              image: item.thumbnail_url
            }}
          />
        ))}

        <CreateNewsCard />

      </div>

    </div>
  );
}
