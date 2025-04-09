/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import CourseCard from "@/components/Course/CourseCard";
import { Loader } from "@/components/Loader/Loader";
import { useGetUser } from "@/hooks/useGetUser";
import { getToken } from "@/hooks/useToken";

function MyClasses() {
  const token = getToken();
  const { data: user, isLoading } = useGetUser(token as string);

  const purchaseCourses = user?.purchaseCourse;

  if (isLoading) {
    return <Loader />;
  }

  return (
    <div className="xl:px-5 py-5">
      <div className="flex justify-between items-center border-b border-secondary/25 pb-3 gap-6">
        <h3 className="text-lg md:text-xl lg:text-2xl font-bold text-secondary">
          My Classes
        </h3>

        <input
          type="text"
          className="w-[210px] md:w-fit focus:outline-0 border border-text px-5 py-2 rounded-lg"
          placeholder="Search Course"
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-6 mt-5">
        {purchaseCourses &&
          purchaseCourses.map((course: any) => (
            <CourseCard key={course?._id} course={course} />
          ))}
      </div>
    </div>
  );
}

export default MyClasses;
