/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import CourseCard from "@/components/Course/CourseCard";
import { Loader } from "@/components/Loader/Loader";
import { useGetCourse } from "@/hooks/useCourseMutation";

function CoursePage() {
  const { data: courses, isLoading } = useGetCourse();

  if (isLoading) {
    return <Loader />;
  }

  return (
    <div className="max-w-7xl mx-auto px-5 xl:px-0 py-16">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {courses?.length > 0 &&
          courses?.map((course: any) => (
            <CourseCard key={course?._id} course={course} />
          ))}
      </div>
    </div>
  );
}

export default CoursePage;
