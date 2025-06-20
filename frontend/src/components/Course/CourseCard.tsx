/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Swal from "sweetalert2";
import { useDeleteCourse } from "@/hooks/useCourseMutation";
import toast from "react-hot-toast";

interface ICourse {
  _id: string;
  thumbnail: string;
  title: string;
  description: string;
  price: number;
}

interface ICourseCardProps {
  course: ICourse;
}

const CourseCard: React.FC<ICourseCardProps> = ({ course }) => {
  const pathname = usePathname();
  const { mutate: deleteCourse, isPending } = useDeleteCourse();

  const handleDeleteCourse = (id: string) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        deleteCourse(id, {
          onSuccess: () => {
            toast.success("Course deleted successfully!");
          },
          onError: (error: any) => {
            const errorMessage =
              error?.response?.data?.message || "Course creation failed!";
            toast.error(errorMessage);
          },
        });
      }
    });
  };

  return (
    <div className="bg-white rounded-2xl overflow-hidden w-full max-w-sm border-2 border-secondary">
      <div className="relative w-full h-48">
        <Image
          src={course.thumbnail}
          alt={course.title}
          className="object-cover w-full h-full"
          fill
          priority
        />
      </div>
      <div className="p-4 flex flex-col justify-between h-[200px]">
        <div>
          <h2 className="josefin text-xl font-semibold text-secondary mb-1 line-clamp-1">
            {course.title}
          </h2>
          <p className="text-sm text-text mb-3 line-clamp-3">
            {course.description}
          </p>
        </div>
        <div className="flex items-center justify-between mt-auto">
          <span className="text-lg font-bold text-secondary">
            ₹{Number(course.price).toFixed(2)}
          </span>
          {pathname === "/courses" ? (
            <Link
              href={`courses/${course?._id}`}
              className="px-4 py-1.5 bg-secondary text-white text-base rounded-md hover:bg-secondary/90 transition cursor-pointer font-semibold"
            >
              View Details
            </Link>
          ) : pathname === "/user/dashboard" ? (
            <Link
              href={`/class/${course?._id}`}
              className="px-4 py-1.5 bg-secondary text-white text-base rounded-md hover:bg-secondary/90 transition cursor-pointer font-semibold"
            >
              See Class
            </Link>
          ) : (
            <>
              <Link
                href={`/admin/manage-module/${course?._id}`}
                className="px-4 py-1.5 bg-secondary text-white text-base rounded-md hover:bg-secondary/90 transition cursor-pointer font-semibold"
              >
                Manage Modules
              </Link>
              <button
                onClick={() => handleDeleteCourse(course?._id)}
                className={`px-4 py-1.5 bg-red-500 text-white text-base rounded-md hover:bg-red-600 transition cursor-pointer font-semibold ${
                  isPending && "cursor-not-allowed"
                }`}
              >
                {isPending ? "Deleting..." : "Delete"}
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default CourseCard;
