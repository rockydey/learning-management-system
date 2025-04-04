"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import LogoIcon from "@/assets/Shared/LogoIcon.png";
import Image from "next/image";

const menus = [
  {
    title: "Home",
    path: "/",
  },
  {
    title: "About",
    path: "/about",
  },
  {
    title: "Courses",
    path: "/courses",
  },
  {
    title: "Instructors",
    path: "/instructors",
  },
  {
    title: "Blog",
    path: "/blogs",
  },
];

function Navbar() {
  const pathname = usePathname();

  return (
    <nav className="bg-primary py-5 shadow-lg fixed top-0 w-full">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <Link href="/" className="flex items-center gap-1.5">
          <Image
            src={LogoIcon}
            alt="Logo Icon"
            className="w-12 h-12 object-cover"
          />
          <h2 className="text-secondary text-3xl font-bold josefin">
            Academix
          </h2>
        </Link>
        <div className="space-x-6 text-lg font-semibold">
          {menus.map((menu) => (
            <Link
              key={menu.path}
              href={menu.path}
              className={`${
                pathname === menu.path
                  ? "text-secondary border-b-2"
                  : " text-white"
              } hover:text-secondary hover:duration-300 transition-all`}
            >
              {menu.title}
            </Link>
          ))}
        </div>
        <div>
          <Link
            href="/login"
            className="text-lg font-semibold text-secondary border-2 px-4 py-2 rounded-full border-secondary"
          >
            Login
          </Link>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
