import { FaCheckCircle } from "react-icons/fa";

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-white text-black flex flex-col justify-center items-center p-8">
      <header className="text-center mb-12">
        <h1 className="text-5xl sm:text-6xl font-extrabold text-[#0a0a0a] tracking-wide leading-tight">
          About Our Learning Management System
        </h1>
        <p className="text-xl sm:text-2xl text-[#454545] mt-4">
          Your gateway to a better learning experience with tailored tools and
          features.
        </p>
      </header>

      <main className="max-w-3xl w-full space-y-12">
        {/* Welcome Section */}
        <section className="bg-[#f9fafb] text-black p-10 rounded-2xl shadow-xl transform transition-all hover:scale-105 hover:shadow-2xl duration-300 ease-in-out">
          <h2 className="text-3xl sm:text-4xl font-semibold text-[#0a0a0a] mb-4">
            Welcome to Our LMS!
          </h2>
          <p className="text-lg sm:text-xl text-[#454545] mb-6">
            Our Learning Management System (LMS) is a comprehensive solution
            designed to help educational institutions and organizations manage,
            deliver, and track learning materials. It’s built for both
            instructors and learners, enabling an immersive learning experience.
          </p>
          <button className="bg-[#2eca7f] text-white py-3 px-6 rounded-lg hover:bg-[#000042] transition-all">
            Learn More
          </button>
        </section>

        {/* Mission Section */}
        <section className="bg-[#f9fafb] text-black p-10 rounded-2xl shadow-xl transform transition-all hover:scale-105 hover:shadow-2xl duration-300 ease-in-out">
          <h3 className="text-2xl sm:text-3xl font-semibold text-[#0a0a0a] mb-4">
            Our Mission
          </h3>
          <p className="text-lg sm:text-xl text-[#454545] mb-6">
            Our mission is to create a seamless and engaging learning experience
            for students and educators. We aim to provide a platform that
            enables efficient course delivery, tracking progress, and fostering
            collaboration among learners.
          </p>
        </section>

        {/* Features Section */}
        <section className="bg-[#f9fafb] text-black p-10 rounded-2xl shadow-xl transform transition-all hover:scale-105 hover:shadow-2xl duration-300 ease-in-out">
          <h3 className="text-2xl sm:text-3xl font-semibold text-[#0a0a0a] mb-4">
            Key Features
          </h3>
          <ul className="list-none text-lg sm:text-xl text-[#454545] mb-6 space-y-5">
            <li className="flex items-center space-x-2">
              <FaCheckCircle className="text-[#2eca7f]" />
              <span>Interactive course modules</span>
            </li>
            <li className="flex items-center space-x-2">
              <FaCheckCircle className="text-[#2eca7f]" />
              <span>Real-time progress tracking</span>
            </li>
            <li className="flex items-center space-x-2">
              <FaCheckCircle className="text-[#2eca7f]" />
              <span>Communication tools for students and instructors</span>
            </li>
            <li className="flex items-center space-x-2">
              <FaCheckCircle className="text-[#2eca7f]" />
              <span>Customizable learning paths</span>
            </li>
            <li className="flex items-center space-x-2">
              <FaCheckCircle className="text-[#2eca7f]" />
              <span>Easy-to-use dashboard</span>
            </li>
          </ul>
          <button className="bg-[#2eca7f] text-white py-3 px-6 rounded-lg hover:bg-[#000042] transition-all">
            Explore Features
          </button>
        </section>

        {/* Why Choose Us Section */}
        <section className="bg-[#f9fafb] text-black p-10 rounded-2xl shadow-xl transform transition-all hover:scale-105 hover:shadow-2xl duration-300 ease-in-out">
          <h3 className="text-2xl sm:text-3xl font-semibold text-[#0a0a0a] mb-4">
            Why Choose Us?
          </h3>
          <p className="text-lg sm:text-xl text-[#454545] mb-6">
            We are committed to creating a positive and enriching experience for
            both students and instructors. Our LMS platform focuses on
            usability, innovation, and accessibility to ensure everyone achieves
            their learning goals with ease.
          </p>
          <button className="bg-[#2eca7f] text-white py-3 px-6 rounded-lg hover:bg-[#000042] transition-all">
            Join Us Now
          </button>
        </section>
      </main>
    </div>
  );
}
