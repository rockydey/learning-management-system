/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import CourseCard from "@/components/Course/CourseCard";
import { Loader } from "@/components/Loader/Loader";
import Input from "@/components/Shared/Input";
import Modal from "@/components/Shared/Modal";
import { useCreateCourse, useGetCourse } from "@/hooks/useCourseMutation";
import { getToken } from "@/hooks/useToken";
import { useState } from "react";
import toast from "react-hot-toast";
import { FaPlus } from "react-icons/fa";

interface FromDataProps {
  title: string;
  description: string;
  price: number;
}

function AdminDashboard() {
  const token = getToken();
  const { data: courses, isLoading } = useGetCourse(token as string);
  const [isVisible, setIsVisible] = useState<boolean>(false);
  const [formData, setFormData] = useState<FromDataProps>({
    title: "",
    description: "",
    price: 0,
  });
  const [thumbnail, setThumbnail] = useState<File | null>(null);

  const { mutate: createCourse, isPending } = useCreateCourse();

  const handleChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = event.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!thumbnail) {
      toast.error("Please provide a thumbnail for the course.");
      return;
    }
    if (!token) {
      toast.error("Authentication token is missing.");
      return;
    }

    createCourse(
      {
        ...formData,
        thumbnail,
        accessToken: token,
      },
      {
        onSuccess: () => {
          toast.success("Course added successfully!");
          onClose();
          setFormData({ title: "", description: "", price: 0 });
          setThumbnail(null);
        },
        onError: (error: any) => {
          const errorMessage =
            error?.response?.data?.message || "Login failed!";
          toast.error(errorMessage);
        },
      }
    );
  };

  function onClose() {
    setIsVisible(false);
  }

  if (isLoading) {
    return <Loader />;
  }

  return (
    <div className="py-5">
      <div className="flex justify-between items-center border-b border-secondary/25 pb-3">
        <h3 className="text-2xl font-bold text-secondary">All Courses</h3>
        <button
          onClick={() => setIsVisible(true)}
          className="flex items-center gap-1.5 bg-secondary text-white px-4 py-2 rounded-xl cursor-pointer text-lg font-semibold"
        >
          <FaPlus /> Add Course
        </button>
      </div>

      <div className="grid grid-cols-4 gap-6 mt-5">
        {courses &&
          courses.map((course: any) => (
            <CourseCard key={course?._id} course={course} />
          ))}
      </div>

      {/* Modal */}
      <Modal isVisible={isVisible} onClose={onClose}>
        <div>
          <h2 className="text-center text-xl font-bold mb-4">
            Add a New Course
          </h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <Input
              type="text"
              title="Course Title"
              required
              onChange={handleChange}
              name="title"
              value={formData.title}
              placeholder="Course Title"
            />

            {/* Description */}
            <div>
              <label
                htmlFor="description"
                className="block font-medium text-[15px] relative cursor-pointer mb-2"
              >
                Description
                <span className="text-red-500">*</span>
              </label>
              <textarea
                id="description"
                value={formData.description}
                onChange={handleChange}
                required
                className="w-full focus:outline-0 border border-text px-5 py-2 rounded"
                placeholder="Course description"
                rows={4}
                name="description"
              />
            </div>

            {/* Price */}
            <Input
              title="Price"
              type="number"
              onChange={handleChange}
              value={formData.price}
              name="price"
              placeholder="Course Price"
              required
            />

            {/* Thumbnail */}
            <div>
              <label
                htmlFor="thumbnail"
                className="block font-medium text-[15px] relative cursor-pointer mb-2"
              >
                Upload Thumbnail
                <span className="text-red-500">*</span>
              </label>
              <input
                type="file"
                required
                id="thumbnail"
                accept="image/*"
                onChange={(e) => {
                  if (e.target.files && e.target.files[0]) {
                    setThumbnail(e.target.files[0]);
                  }
                }}
                className="w-full focus:outline-0 border border-text px-5 py-2 rounded cursor-pointer"
              />
            </div>

            {/* Submit Button */}
            <div className="flex justify-center">
              <button
                type="submit"
                disabled={isPending}
                className="my-4 px-6 py-2 bg-secondary text-white font-semibold rounded-lg hover:bg-secondary/90 focus:outline-none cursor-pointer"
              >
                {isPending ? "Adding..." : "Add Course"}
              </button>
            </div>
          </form>
        </div>
      </Modal>
    </div>
  );
}

export default AdminDashboard;
