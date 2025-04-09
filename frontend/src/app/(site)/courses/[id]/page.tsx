"use client";

import { Loader } from "@/components/Loader/Loader";
import { useGetSingleCourse } from "@/hooks/useCourseMutation";
import { useParams } from "next/navigation";
import Image from "next/image";
import { FaStar } from "react-icons/fa";

function CourseDetailsPage() {
  const { id } = useParams();
  const { data: course, isLoading } = useGetSingleCourse(id as string);

  if (isLoading) return <Loader />;
  if (!course)
    return (
      <div className="text-center py-20 text-red-500">Course not found</div>
    );

  return (
    <div className="bg-white text-text">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-primary/10 to-white py-14">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row gap-10 px-4">
          <div className="w-full md:w-1/2 rounded-2xl overflow-hidden shadow-lg">
            <Image
              src={course.thumbnail || "/placeholder.jpg"}
              alt={course.title}
              width={800}
              height={450}
              className="w-full h-auto object-cover"
            />
          </div>
          <div className="flex-1 space-y-5">
            <h1 className="text-4xl font-bold text-heading leading-tight">
              {course.title}
            </h1>
            <p className="text-lg text-text leading-relaxed">
              Unlock the full potential of your development career by mastering
              practical skills with hands-on projects and expert mentorship.
            </p>
            <div className="flex items-center gap-4 text-2xl font-bold text-primary">
              ₹{course.price}
              <span className="text-sm line-through text-gray-400">
                ₹{Number(course.price) + 500}
              </span>
            </div>
            <button className="bg-primary text-white px-6 py-3 rounded-xl font-semibold hover:bg-primary/90 transition w-full sm:w-auto cursor-pointer">
              Enroll Now
            </button>
            <p className="text-sm text-gray-500">
              🔒 Secure checkout • Lifetime access • Certificate included
            </p>
          </div>
        </div>
      </div>

      {/* What You’ll Learn */}
      <div className="max-w-7xl mx-auto py-16 px-4 space-y-10">
        <h2 className="text-3xl font-bold text-heading text-center">
          What You’ll Master
        </h2>
        <ul className="grid md:grid-cols-2 gap-6 text-lg text-text list-disc list-inside">
          <li>
            Craft modern full-stack web apps using industry-standard tools
          </li>
          <li>Integrate APIs and manage databases confidently</li>
          <li>Understand frontend-backend architecture with real projects</li>
          <li>Host and deploy your applications on the cloud</li>
          <li>Follow professional workflows with Git and GitHub</li>
          <li>
            Boost your portfolio with high-quality, production-ready builds
          </li>
        </ul>
      </div>

      {/* Instructor */}
      <div className="bg-secondary text-white py-16 px-4">
        <div className="max-w-5xl mx-auto flex flex-col md:flex-row items-center gap-6">
          <Image
            src="https://i.ibb.co/hCsWc0x/teacher2.jpg"
            alt="Instructor"
            width={100}
            height={100}
            className="rounded-full object-cover"
          />
          <div>
            <h3 className="text-2xl font-semibold">John Doe</h3>
            <p className="text-white/80 text-base">
              Senior Software Engineer at Google • Tech Mentor
            </p>
            <p className="text-sm text-white/70 mt-1">
              With over a decade of real-world experience and 10,000+ students
              taught, John brings clarity to complex concepts and real-world
              applications.
            </p>
          </div>
        </div>
      </div>

      {/* Student Reviews */}
      <div className="max-w-7xl mx-auto py-16 px-4 space-y-6">
        <h2 className="text-3xl font-bold text-heading text-center">
          What Students Are Saying
        </h2>
        <div className="grid md:grid-cols-2 gap-6">
          {[
            {
              name: "Aarav Sharma",
              review:
                "This course exceeded my expectations. I landed my first freelance project within a month of completing it!",
            },
            {
              name: "Riya Patel",
              review:
                "Clear, concise, and incredibly practical. The project-based learning approach is a game-changer.",
            },
          ].map((r, idx) => (
            <div key={idx} className="border rounded-xl p-6 shadow-sm bg-white">
              <div className="flex items-center gap-1 text-yellow-500 mb-2">
                {Array(5)
                  .fill(0)
                  .map((_, i) => (
                    <FaStar key={i} size={16} fill="currentColor" />
                  ))}
              </div>
              <p className="text-sm text-text">“{r.review}”</p>
              <div className="text-xs text-gray-500 mt-2">– {r.name}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Certificate */}
      <div className="bg-primary/10 py-16 px-4 text-center">
        <h2 className="text-3xl font-bold text-heading mb-4">
          Professional Certificate Included
        </h2>
        <p className="text-text mb-6 max-w-3xl mx-auto">
          Showcase your achievement with a downloadable, shareable certificate.
          Perfect for LinkedIn, job applications, or freelance proposals.
        </p>
        <Image
          src="https://i.ibb.co.com/8gJ7nBw0/20775528-tp244-certificate-13.jpg"
          alt="Certificate Preview"
          width={600}
          height={350}
          className="mx-auto rounded-xl shadow-md"
        />
      </div>

      {/* FAQ */}
      <div className="max-w-5xl mx-auto py-16 px-4">
        <h2 className="text-3xl font-bold text-heading mb-6 text-center">
          Frequently Asked Questions
        </h2>
        <div className="space-y-4">
          {[
            {
              q: "How long will I have access to the course?",
              a: "You’ll get lifetime access to all course materials, including future updates.",
            },
            {
              q: "Do I need any prior experience?",
              a: "Basic knowledge of HTML, CSS, and JavaScript is helpful but not mandatory.",
            },
            {
              q: "What if I don’t like the course?",
              a: "We offer a 7-day no-questions-asked refund policy. Your satisfaction is guaranteed.",
            },
          ].map((item, idx) => (
            <div key={idx} className="border p-5 rounded-lg bg-white shadow-sm">
              <h3 className="font-semibold text-heading">{item.q}</h3>
              <p className="text-sm text-text mt-2">{item.a}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Final CTA */}
      <div className="bg-gradient-to-r from-primary to-secondary text-white py-14 text-center">
        <h3 className="text-2xl font-semibold mb-2">
          Start Your Journey Today
        </h3>
        <p className="text-base mb-6 max-w-xl mx-auto">
          Take the leap toward becoming a skilled full-stack developer. Join
          hundreds of students leveling up with us.
        </p>
        <button className="bg-white text-secondary font-semibold px-8 py-3 rounded-xl hover:bg-gray-100 transition">
          Get Instant Access
        </button>
      </div>
    </div>
  );
}

export default CourseDetailsPage;
