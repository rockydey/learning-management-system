/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useCreateModule } from "@/hooks/useModuleMutation";
import { getToken } from "@/hooks/useToken";
import { useParams } from "next/navigation";
import { useState } from "react";
import toast from "react-hot-toast";

type Lecture = {
  title: string;
  videoURL: string;
  pdfLinks: string[];
};

function AddModule() {
  const { id } = useParams();
  const token = getToken();
  const [title, setTitle] = useState("");
  const [lectures, setLectures] = useState<Lecture[]>([
    { title: "", videoURL: "", pdfLinks: [""] },
  ]);

  const { mutate: createModule, isPending } = useCreateModule();

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
    setLectures([...lectures, { title: "", videoURL: "", pdfLinks: [""] }]);
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
      course: id as string,
      lectures,
      accessToken: token as string,
    };

    // Trigger the mutation to create the module
    createModule(moduleData, {
      onSuccess: () => {
        toast.success("Course added successfully!");
        // Reset form fields
        setTitle("");
        setLectures([{ title: "", videoURL: "", pdfLinks: [""] }]);
      },
      onError: (error: any) => {
        const errorMessage =
          error?.response?.data?.message || "Module creation failed!";
        toast.error(errorMessage);
      },
    });
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-10">
      <h1
        className="text-3xl font-bold mb-2"
        style={{ color: "var(--color-heading)" }}
      >
        Create Module
      </h1>

      <form
        onSubmit={handleSubmit}
        className="space-y-8 bg-white p-6 shadow-xl rounded-2xl border border-gray-100"
      >
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
          disabled={isPending}
          className="bg-secondary cursor-pointer text-white px-6 py-3 rounded-lg font-medium hover:bg-secondary/90 transition"
        >
          {isPending ? "Adding..." : "Add Module"}
        </button>
      </form>
    </div>
  );
}

export default AddModule;
