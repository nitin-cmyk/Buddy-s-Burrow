"use client";

import { useEffect, useState } from "react";
import CourseCard from "../components/CourseCard";
import CreateCourseCard from "../components/CreateCourseCard";
import { supabase } from "@/lib/supabaseClient";

type Course = {
    id: string;
    title: string;
    status: string;
    cover_url: string | null;
    modules: number;
};

export default function CoursesPage() {

    const [courses, setCourses] = useState<Course[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {

        const fetchCourses = async () => {

            // fetch courses
            const { data: courseData, error } = await supabase
                .from("courses")
                .select("*")
                .order("created_at", { ascending: false });

            if (error) {
                console.error("Fetch courses error:", error);
                setLoading(false);
                return;
            }

            // fetch modules counts
            const { data: modulesData } = await supabase
                .from("modules")
                .select("course_id");

            const moduleCountMap: Record<string, number> = {};

            modulesData?.forEach(m => {
                moduleCountMap[m.course_id] =
                    (moduleCountMap[m.course_id] || 0) + 1;
            });

            const formatted = courseData.map(c => ({
                id: c.id,
                title: c.title,
                status: c.status,
                cover_url: c.cover_image_url,
                modules: moduleCountMap[c.id] || 0,
            }));

            setCourses(formatted);
            setLoading(false);
        };

        fetchCourses();

    }, []);

    return (
        <div className="p-2 sm:p-4 lg:p-6">

            <h1 className="text-[25px] font-medium text-[#455F0F] mb-8">
                All Courses
            </h1>

            {loading ? (
                <p className="text-gray-500">Loading courses...</p>
            ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-8">

                    {courses.map(course => (
                        <CourseCard
                            key={course.id}
                            course={{
                                id: course.id,
                                title: course.title,
                                modules: course.modules,
                                status: course.status,
                                image: course.cover_url ?? "/course.jpg"
                            }}
                        />
                    ))}

                    <CreateCourseCard />

                </div>
            )}

        </div>
    );
}
