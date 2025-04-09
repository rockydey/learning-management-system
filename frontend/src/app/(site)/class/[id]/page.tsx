/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { Loader } from "@/components/Loader/Loader";
import { useGetSingleCourse } from "@/hooks/useCourseMutation";
import AuthWrapper from "@/settings/AuthWrapper";
import Image from "next/image";
import Link from "next/link";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { FaLock, FaCheckCircle } from "react-icons/fa";
import pdfPng from "@/assets/Class/pdf.png";

function ClassPage() {
  const { id } = useParams();
  const { data: course, isLoading } = useGetSingleCourse(id as string);

  const [currentLectureId, setCurrentLectureId] = useState<string | null>(null);
  const [unlockedLectures, setUnlockedLectures] = useState<string[]>([]);
  const [searchQuery, setSearchQuery] = useState<string>("");

  // Get current lecture based on ID
  const getCurrentLecture = () => {
    for (const mod of course?.modules || []) {
      for (const lec of mod.lectures) {
        if (lec._id === currentLectureId) return lec;
      }
    }
    return null;
  };

  const currentLecture = getCurrentLecture();

  // Initialize first lecture
  useEffect(() => {
    if (course && course.modules.length > 0 && unlockedLectures.length === 0) {
      const firstLecture = course.modules[0].lectures[0];
      setUnlockedLectures([firstLecture._id]);
      setCurrentLectureId(firstLecture._id);
    }
  }, [course]);

  const unlockAndPlay = (lecture: any) => {
    if (!unlockedLectures.includes(lecture._id)) {
      setUnlockedLectures((prev) => [...prev, lecture._id]);
    }
    setCurrentLectureId(lecture._id);
  };

  const handleNext = () => {
    if (!course || !currentLecture) return;

    for (let i = 0; i < course.modules.length; i++) {
      const mod = course.modules[i];

      for (let j = 0; j < mod.lectures.length; j++) {
        const lec = mod.lectures[j];

        if (lec._id === currentLecture._id) {
          // Next lecture in same module
          if (mod.lectures[j + 1]) {
            unlockAndPlay(mod.lectures[j + 1]);
            return;
          }

          // First lecture in next module
          if (course.modules[i + 1]?.lectures?.length > 0) {
            unlockAndPlay(course.modules[i + 1].lectures[0]);
            return;
          }

          // No more lectures
          return;
        }
      }
    }
  };

  const getProgress = () => {
    let totalLectures = 0;
    course?.modules.forEach((m: any) => (totalLectures += m.lectures.length));
    return ((unlockedLectures.length / totalLectures) * 100).toFixed(0);
  };

  const filteredLectures = (modules: any[]) => {
    return modules.map((mod) => ({
      ...mod,
      lectures: mod.lectures.filter((lec: any) =>
        lec.title.toLowerCase().includes(searchQuery.toLowerCase())
      ),
    }));
  };

  if (isLoading || !course) return <Loader />;

  return (
    <AuthWrapper>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 flex flex-col lg:flex-row gap-6 text-text">
        {/* Left: Video + Details */}
        <div className="flex-1 bg-secondary p-6 rounded-2xl shadow-lg text-white">
          {/* Progress */}
          <div className="mb-4">
            <div className="h-2 rounded-full bg-gray-300 overflow-hidden">
              <div
                className="h-full bg-primary transition-all"
                style={{ width: `${getProgress()}%` }}
              />
            </div>
            <p className="text-sm mt-1">{getProgress()}% completed</p>
          </div>

          <h2 className="text-2xl sm:text-3xl font-semibold text-white mb-4">
            🎬 {currentLecture?.title || "Select a Lecture"}
          </h2>

          {/* Video */}
          <div className="aspect-video mb-4 rounded overflow-hidden">
            {currentLecture?.videoURL ? (
              <iframe
                className="w-full h-full"
                src={currentLecture.videoURL}
                allowFullScreen
              />
            ) : (
              <div className="w-full h-full bg-gray-800 flex items-center justify-center">
                <p>No Video Available</p>
              </div>
            )}
          </div>

          {/* Next Button */}
          <div className="flex justify-end mb-6">
            <button
              onClick={handleNext}
              className="px-5 py-2 rounded-xl bg-primary hover:bg-green-600 transition font-semibold cursor-pointer"
            >
              Next
            </button>
          </div>

          {/* PDF Downloads as Cards */}
          {currentLecture?.pdfLinks?.length > 0 && (
            <div className="mt-6">
              <h3 className="text-xl font-semibold text-white mb-3">
                📄 Lecture Notes
              </h3>
              <div className="flex gap-4 flex-wrap">
                {currentLecture.pdfLinks.map(
                  (pdf: string, idx: number) =>
                    pdf && (
                      <Link
                        key={idx}
                        href={pdf}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="bg-white text-black p-2 rounded-xl shadow-md hover:bg-gray-100 transition text-center"
                      >
                        <Image
                          src={pdfPng}
                          alt={`PDF ${idx + 1}`}
                          className="w-10 h-10 object-cover mb-3"
                          width={40}
                          height={40}
                        />
                        <p className="text-xs truncate">PDF {idx + 1}</p>
                      </Link>
                    )
                )}
              </div>
            </div>
          )}
        </div>

        {/* Right: Modules & Lectures */}
        <div className="w-full md:w-[350px] space-y-4">
          <div className="p-4 bg-secondary rounded-2xl shadow-md">
            <p className="font-bold text-white text-lg mb-2">{course.title}</p>
            <input
              type="text"
              placeholder="Search Lesson..."
              className="w-full px-4 py-2 focus:outline-0 rounded-md text-sm text-black outline-none bg-white"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>

          {/* Modules */}
          {filteredLectures(course.modules).map((mod: any) => (
            <div
              key={mod._id}
              className="bg-secondary p-4 rounded-2xl shadow-sm text-white"
            >
              <h3 className="font-semibold text-white text-base mb-3">
                MODULE {mod.moduleNumber}: {mod.title}
              </h3>
              <div className="space-y-2">
                {mod.lectures.map((lec: any) => {
                  const isUnlocked = unlockedLectures.includes(lec._id);
                  return (
                    <div
                      key={lec._id}
                      className={`flex items-center justify-between p-3 rounded-lg cursor-pointer border transition ${
                        isUnlocked
                          ? "bg-white text-black border-primary hover:bg-primary hover:text-white"
                          : "bg-gray-700 text-gray-300 border-gray-600"
                      }`}
                      onClick={() => isUnlocked && setCurrentLectureId(lec._id)}
                    >
                      <span className="text-sm">{lec.title}</span>
                      {isUnlocked ? (
                        <FaCheckCircle className="text-primary" />
                      ) : (
                        <FaLock />
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      </div>
    </AuthWrapper>
  );
}

export default ClassPage;
