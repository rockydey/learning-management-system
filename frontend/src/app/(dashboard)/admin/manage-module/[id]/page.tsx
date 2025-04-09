/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { Loader } from "@/components/Loader/Loader";
import { useGetSingleCourse } from "@/hooks/useCourseMutation";
import { getToken } from "@/hooks/useToken";
import Link from "next/link";
import { useParams } from "next/navigation";
import React from "react";
import { FaPlus } from "react-icons/fa";

function ManageModule() {
  const { id } = useParams();
  const token = getToken();
  const { data: course, isLoading } = useGetSingleCourse(
    id as string,
    token as string
  );

  // Handle loading state
  if (isLoading) {
    return <Loader />;
  }

  return (
    <div className="p-5">
      {/* Course Title */}
      <div className="mb-5 flex items-center justify-between">
        <h2 className="text-2xl font-semibold text-secondary">
          {course?.title}
        </h2>
        <Link
          href={`/admin/add-module/${id}`}
          className="flex items-center gap-1.5 bg-secondary text-white px-4 py-2 rounded-xl cursor-pointer text-lg font-semibold"
        >
          <FaPlus /> Add Module
        </Link>
      </div>

      {/* Modules List */}
      <div className="space-y-6">
        {course?.modules.map((module: any) => (
          <div
            key={module._id}
            className="bg-whit shadow-md rounded-lg p-6 hover:shadow-lg transition flex items-center justify-between border border-secondary"
          >
            <div>
              <h4 className="text-xl font-bold text-primary">
                Module {module?.moduleNumber}: {module?.title}
              </h4>
              <p className="font-semibold">
                Lectures: {module?.lectures?.length}
              </p>
            </div>
            <div className="space-x-3">
              <button className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 transition cursor-pointer">
                Edit Module
              </button>
              <button className="bg-red-500 text-white py-2 px-4 rounded-md hover:bg-red-600 transition cursor-pointer">
                Delete Module
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ManageModule;
