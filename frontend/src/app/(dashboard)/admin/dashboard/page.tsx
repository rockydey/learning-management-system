/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import CourseCard from "@/components/Course/CourseCard";
import { Loader } from "@/components/Loader/Loader";
// import Loader from "@/components/Loader/Loader";
import { useGetCourse } from "@/hooks/useCourseMutation";
import { getToken } from "@/hooks/useToken";
import { FaPlus } from "react-icons/fa";

function AdminDashboard() {
  const token = getToken();
  const { data: courses, isLoading } = useGetCourse(token as string);

  console.log(courses);

  if (isLoading) {
    return <Loader />;
  }

  return (
    <div className="py-5">
      <div className="flex justify-between items-center border-b border-secondary/25 pb-3">
        <h3 className="text-2xl font-bold text-secondary">All Courses</h3>
        <button className="flex items-center gap-1.5 bg-secondary text-white px-4 py-2 rounded-xl cursor-pointer text-lg font-semibold">
          <FaPlus /> Add Course
        </button>
      </div>

      <div className="grid grid-cols-3 gap-6 mt-5">
        {courses.length &&
          courses.map((course: any) => (
            <CourseCard key={course?._id} course={course} />
          ))}
      </div>
    </div>
  );
}

export default AdminDashboard;
