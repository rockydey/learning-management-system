/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useState } from "react";
import { Loader } from "@/components/Loader/Loader";
import { useGetSingleCourse } from "@/hooks/useCourseMutation";
import Link from "next/link";
import { useParams } from "next/navigation";
import { FaPlus } from "react-icons/fa";

function ManageModule() {
  const { id } = useParams();
  const { data: course, isLoading } = useGetSingleCourse(id as string);
  const [showLecture, setShowLecture] = useState<Record<string, boolean>>({});

  // Handle loading state
  if (isLoading) {
    return <Loader />;
  }

  const handleToggleLectures = (moduleId: string) => {
    setShowLecture((prevState) => ({
      ...prevState,
      [moduleId]: !prevState[moduleId], // Toggle visibility for the specific module
    }));
  };

  return (
    <div className="xl:px-5 py-5 ">
      {/* Course Title */}
      <div className="mb-5 flex items-center justify-between">
        <h2 className="text-lg md:text-2xl font-semibold text-secondary">
          {course?.title}
        </h2>
        <Link
          href={`/admin/add-module/${id}`}
          className="flex items-center gap-1.5 bg-secondary text-white px-4 py-2 rounded-xl cursor-pointer text-base md:text-lg font-semibold"
        >
          <FaPlus /> Add Module
        </Link>
      </div>

      {/* Modules List */}
      <div className="space-y-6">
        {course?.modules.map((module: any) => (
          <div
            key={module._id}
            className="bg-white shadow-md rounded-lg p-3 md:p-4 xl:p-6 hover:shadow-lg transition flex flex-col space-y-4 border border-secondary"
          >
            <div className="flex flex-col xl:flex-row justify-between xl:items-center gap-5 xl:gap-0">
              <div>
                <h4 className="text-base md:text-lg xl:text-xl font-bold text-primary">
                  Module {module?.moduleNumber}: {module?.title}
                </h4>
                <p className="text-xs md:text-sm xl:text-base font-semibold">
                  Lectures: {module?.lectures?.length}
                </p>
              </div>
              <div className="space-x-1.5 md:space-x-3">
                <button
                  onClick={() => handleToggleLectures(module._id)}
                  className="bg-primary text-white py-1.5 md:py-2 px-2 md:px-4 rounded-md hover:bg-primary/90 transition cursor-pointer font-medium md:text-base text-[13px]"
                >
                  {showLecture[module._id] ? "Hide" : "View"} Lectures
                </button>
                <button className="bg-blue-500 text-white py-1.5 md:py-2 px-2 md:px-4 rounded-md hover:bg-blue-600 transition cursor-pointer font-medium md:text-base text-[13px]">
                  Edit Module
                </button>
                <button className="bg-red-500 text-white py-1.5 md:py-2 px-2 md:px-4 rounded-md hover:bg-red-600 transition cursor-pointer font-medium md:text-base text-[13px]">
                  Delete Module
                </button>
              </div>
            </div>

            {/* Conditionally Render Lectures */}
            {showLecture[module._id] && (
              <div className="mt-4 space-y-3">
                {module?.lectures.map((lecture: any) => (
                  <div
                    key={lecture._id}
                    className="p-4 bg-gray-100 rounded-md shadow-sm"
                  >
                    <h5 className="font-semibold text-lg">{lecture.title}</h5>
                    <p className="text-sm text-gray-600">
                      Video URL:{" "}
                      <Link
                        href={lecture.videoURL}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-sm text-blue-600"
                      >
                        {lecture.videoURL}
                      </Link>
                    </p>
                    {lecture.pdfLinks?.length > 0 && (
                      <div className="mt-2">
                        <p className="font-medium">PDF Links:</p>
                        <ul>
                          {lecture.pdfLinks.map(
                            (link: string, index: number) => (
                              <li key={index} className="text-sm text-blue-600">
                                <Link href={link} target="_blank">
                                  {link}
                                </Link>
                              </li>
                            )
                          )}
                        </ul>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
        ))}

        {course?.modules.length === 0 && (
          <p className="text-center text-red-500">No module found!</p>
        )}
      </div>
    </div>
  );
}

export default ManageModule;
