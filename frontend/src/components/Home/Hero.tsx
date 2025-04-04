import heroBg from "@/assets/Home/Hero.jpg";
import Link from "next/link";
import { FaRegHandPointRight } from "react-icons/fa";
import onlineImg from "@/assets/Home/online.png";
import courseImg from "@/assets/Home/course.png";
import teacherImg from "@/assets/Home/teacher.png";
import Image from "next/image";

function Hero() {
  return (
    <div
      className="relative bg-cover bg-center bg-no-repeat bg-fixed"
      style={{
        backgroundImage: `url(${heroBg.src})`,
      }}
    >
      {/* Overlay */}
      <div className="absolute inset-0 bg-black/80" />

      {/* Main Footer Content */}
      <div className="relative z-10 text-white w-full pt-20 text-center">
        {/* content */}
        <div className="space-y-5 pb-20 px-5 md:px-0">
          <h1 className="text-3xl md:text-4xl font-bold josefin text-white">
            Connecting <span className="text-primary">Minds</span>, Inspiring{" "}
            <span className="text-primary">Growth</span>
          </h1>

          <p className="text-base md:text-lg font-medium max-w-2xl mx-auto">
            Elevate your knowledge through dynamic collaboration, shared
            insights, and collective growth. Join the movement toward academic
            excellence. Start now!
          </p>

          <Link
            href="/"
            className="flex items-center gap-2.5 text-white text-lg bg-primary px-4 py-2 rounded-lg w-fit mx-auto font-semibold hover:scale-105 hover:duration-300"
          >
            Explore Course <FaRegHandPointRight size={24} />
          </Link>
        </div>

        {/* Management */}
        <div className="flex justify-center">
          <div className="bg-white/50 p-3 md:p-10 w-fit h-fit text-center space-y-3">
            <Image
              src={courseImg}
              alt="Course Image"
              className="w-8 md:w-20 h-8 md:h-20 object-cover mx-auto"
            />
            <p className="text-xs md:text-lg font-medium text-white">
              Course Management
            </p>
          </div>

          <div className="bg-primary p-3 md:p-10 w-fit h-fit text-center space-y-3">
            <Image
              src={onlineImg}
              alt="Online Image"
              className="w-8 md:w-20 h-8 md:h-20 object-cover mx-auto"
            />
            <p className="text-xs md:text-lg font-medium text-secondary">
              Online Learn Course
            </p>
          </div>

          <div className="bg-white/50 p-3 md:p-10 w-fit h-fit text-center space-y-3">
            <Image
              src={teacherImg}
              alt="Teacher Image"
              className="w-8 md:w-20 h-8 md:h-20 object-cover mx-auto"
            />
            <p className="text-xs md:text-lg font-medium text-white">
              Teacher Management
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Hero;
