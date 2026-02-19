"use client";

import CourseEditor from "../../components/CourseAddEdit";
import { useParams } from "next/navigation";

export default function EditCoursePage() {
  const { courseId } = useParams();

  // Later fetch from DB
  const mockModules = [
    { title: "Introduction" },
    { title: "Ocean Basics" }
  ];

  return (
    <CourseEditor
      mode="edit"
      initialTitle="Loaded Title"
      initialBrief="Loaded Brief"
      modules={mockModules}
    />
  );
}
