import notFoundImg from "@/assets/Not Found/NotFoundImg.jpg";
import Image from "next/image";
import Link from "next/link";

function NotFound() {
  return (
    <div className="relative h-[49.5vh] w-full">
      {/* Background Image */}
      <Image
        src={notFoundImg}
        alt="Not Found"
        fill
        style={{ objectFit: "cover" }}
      />

      {/* Overlay */}
      <div className="absolute top-0 left-0 w-full h-full bg-secondary opacity-75"></div>

      {/* Content over the background and overlay */}
      <div className="absolute top-0 left-0 w-full h-full flex items-center justify-center text-white z-10">
        <div className="text-center">
          <h1 className="text-4xl font-bold">404 - Page Not Found</h1>
          <p className="mt-2">
            Sorry, the page you are looking for doesn&apos;t exist.
          </p>
          <Link
            href="/"
            className="mt-4 inline-block bg-primary text-secondary py-2 px-4 rounded-md"
          >
            Go to Homepage
          </Link>
        </div>
      </div>
    </div>
  );
}

export default NotFound;
