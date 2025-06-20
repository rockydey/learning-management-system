/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { Loader } from "@/components/Loader/Loader";
import { useGetModuleById, useUpdateModule } from "@/hooks/useModuleMutation"; // Assuming you have an `useEditModule` hook for updating
import { getToken } from "@/hooks/useToken";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import toast from "react-hot-toast";
import { FaChevronLeft } from "react-icons/fa";

type Lecture = {
  title: string;
  videoURL: string;
  pdfLinks: string[];
};

function EditModule() {
  const { id } = useParams();
  const token = getToken();
  const [title, setTitle] = useState("");
  const [lectures, setLectures] = useState<Lecture[]>([
    { title: "", videoURL: "", pdfLinks: [] },
  ]);
  const router = useRouter();

  // Assuming useEditModule is a hook for updating the module
  const { mutate: editModule, isPending } = useUpdateModule(id as string);
  const { data: module, isLoading } = useGetModuleById(id as string);

  // Effect to set form fields when module data is fetched
  useEffect(() => {
    if (module) {
      setTitle(module.title);
      setLectures(
        module.lectures || [{ title: "", videoURL: "", pdfLinks: [] }]
      );
    }
  }, [module]);

  const handleLectureChange = (
    index: number,
    key: keyof Lecture,
    value: string
  ) => {
    const updated = [...lectures];
    (updated[index][key] as string) = value;
    setLectures(updated);
  };

  const handlePDFChange = (
    lectureIndex: number,
    pdfIndex: number,
    value: string
  ) => {
    const updated = [...lectures];
    updated[lectureIndex].pdfLinks[pdfIndex] = value;
    setLectures(updated);
  };

  const addPDFLink = (lectureIndex: number) => {
    const updated = [...lectures];
    updated[lectureIndex].pdfLinks.push("");
    setLectures(updated);
  };

  const addLecture = () => {
    setLectures([...lectures, { title: "", videoURL: "", pdfLinks: [] }]);
  };

  const removeLecture = (index: number) => {
    const updated = [...lectures];
    updated.splice(index, 1);
    setLectures(updated);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const moduleData = {
      title,
      course: module?.course || "",
      lectures,
      accessToken: token as string,
    };

    // Trigger the mutation to update the module
    editModule(moduleData, {
      onSuccess: () => {
        toast.success("Module updated successfully!");
        router.push(`/admin/manage-module/${module?.course}`);
      },
      onError: (error: any) => {
        const errorMessage =
          error?.response?.data?.message || "Module update failed!";
        toast.error(errorMessage);
      },
    });
  };

  // Handle loading state
  if (isLoading) {
    return <Loader />;
  }

  return (
    <div className="max-w-4xl mx-auto xl:px-5 py-5">
      <Link
        href={`/admin/manage-module/${id}`}
        className="flex items-center gap-1.5 text-base font-semibold"
      >
        <FaChevronLeft /> Back
      </Link>

      <div className="bg-white p-6 shadow-xl rounded-2xl border border-gray-100 mt-2">
        <h1 className="text-3xl font-bold text-heading text-center mb-3">
          Edit Module
        </h1>

        <form onSubmit={handleSubmit} className="space-y-8">
          <div>
            <label
              className="block text-sm font-semibold mb-1"
              style={{ color: "var(--color-heading)" }}
            >
              Module Title
            </label>
            <input
              type="text"
              value={title}
              required
              onChange={(e) => setTitle(e.target.value)}
              className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none "
              placeholder="e.g., Getting Started with Backend APIs"
            />
          </div>

          <div>
            <h2
              className="text-xl font-semibold mb-2"
              style={{ color: "var(--color-heading)" }}
            >
              Lectures
            </h2>

            {lectures.map((lecture, index) => (
              <div
                key={index}
                className="p-4 bg-gray-50 border rounded-xl mb-4 space-y-4 relative"
              >
                <p className="bg-secondary text-white w-6 h-6 rounded-full flex items-center justify-center absolute top-1 right-1">
                  {index + 1}
                </p>
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Lecture Title
                  </label>
                  <input
                    type="text"
                    required
                    value={lecture.title}
                    onChange={(e) =>
                      handleLectureChange(index, "title", e.target.value)
                    }
                    className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none "
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Video URL
                  </label>
                  <input
                    type="text"
                    value={lecture.videoURL}
                    required
                    onChange={(e) =>
                      handleLectureChange(index, "videoURL", e.target.value)
                    }
                    className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none "
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    PDF Links
                  </label>
                  {lecture.pdfLinks.map((pdf, pdfIndex) => (
                    <input
                      key={pdfIndex}
                      type="text"
                      value={pdf}
                      onChange={(e) =>
                        handlePDFChange(index, pdfIndex, e.target.value)
                      }
                      className="w-full mb-2 border border-gray-300 rounded-lg px-4 py-2 focus:outline-none "
                      placeholder="https://example.com/pdf"
                    />
                  ))}
                  <button
                    type="button"
                    className="text-sm text-primary hover:underline cursor-pointer"
                    onClick={() => addPDFLink(index)}
                  >
                    + Add PDF Link
                  </button>
                </div>

                <div className="text-right">
                  <button
                    type="button"
                    className="text-sm text-red-600 hover:underline cursor-pointer"
                    onClick={() => removeLecture(index)}
                  >
                    Remove Lecture
                  </button>
                </div>
              </div>
            ))}

            <button
              type="button"
              className="bg-primary cursor-pointer text-white px-3 py-1.5 rounded-md hover:opacity-90 transition"
              onClick={addLecture}
            >
              + Add Lecture
            </button>
          </div>

          <button
            type="submit"
            // disabled={isPending}
            className="bg-secondary cursor-pointer text-white px-6 py-3 rounded-lg font-medium hover:bg-secondary/90 transition"
          >
            {isPending ? "Updating..." : "Update Module"}
          </button>
        </form>
      </div>
    </div>
  );
}

export default EditModule;
