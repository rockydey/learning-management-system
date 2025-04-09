"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";

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
  return (
    <div className="bg-white rounded-2xl overflow-hidden w-full max-w-sm border-2 border-secondary">
      <div className="relative w-full h-48">
        <Image
          src={course.thumbnail}
          alt={course.title}
          fill
          className="object-cover"
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
            ${Number(course.price).toFixed(2)}
          </span>
          <Link
            href={`/add-modules/${course?._id}`}
            className="px-4 py-1.5 bg-secondary text-white text-sm font-medium rounded-md hover:bg-secondary/90 transition cursor-pointer"
          >
            Add Modules
          </Link>
        </div>
      </div>
    </div>
  );
};

export default CourseCard;
