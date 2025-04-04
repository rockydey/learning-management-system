"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import LogoIcon from "@/assets/Shared/LogoIcon.png";
import Image from "next/image";
import { GiHamburgerMenu } from "react-icons/gi";
import { useEffect, useState } from "react";
import { MdHighlightOff } from "react-icons/md";

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
  const [toggle, setToggle] = useState(false);

  console.log(pathname);

  useEffect(() => {
    setToggle(false);
  }, [pathname]);

  return (
    <nav className="bg-primary py-5 shadow-lg fixed top-0 w-full z-40">
      <div className="max-w-7xl mx-auto flex items-center justify-between px-5 xl:px-0 relative">
        <Link href="/" className="flex items-center gap-1.5">
          <Image
            src={LogoIcon}
            alt="Logo Icon"
            className="lg:w-12 w-10 lg:h-12 h-10 object-cover"
          />
          <h2 className="text-secondary text-2xl lg:text-3xl font-bold josefin">
            Academix
          </h2>
        </Link>
        {/* Desktop Menu */}
        <div className="space-x-6 text-base lg:text-lg font-semibold hidden md:block">
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
        <div className="hidden md:block">
          <Link
            href="/login"
            className="text-base lg:text-lg font-semibold text-secondary border-2 px-3.5 lg:px-4 py-1.5 lg:py-2 rounded-full border-secondary"
          >
            Login
          </Link>
        </div>

        {/* Mobile Menu */}
        <div className="md:hidden flex items-center gap-2">
          <Link
            href="/login"
            className="text-base font-semibold text-secondary border-2 px-3.5 py-1.5 rounded-full border-secondary"
          >
            Login
          </Link>
          <button
            onClick={() => setToggle(!toggle)}
            className="text-secondary cursor-pointer"
          >
            {toggle ? (
              <MdHighlightOff size={24} />
            ) : (
              <GiHamburgerMenu size={24} />
            )}
          </button>
        </div>

        {/* Toggle Mobile Menu */}
        <div
          className={`absolute top-0 left-0 w-full bg-white 
          transition-transform duration-500 shadow-md py-5 space-y-2 z-50 ease-in-out
          ${
            toggle
              ? "transform translate-y-[60px]"
              : "transform -translate-y-80"
          }`}
        >
          {menus.map((menu) => (
            <p key={menu.path} className="px-5">
              <Link
                href={menu.path}
                className={`${
                  pathname === menu.path ? "text-primary" : "text-secondary"
                }
                hover:text-primary hover:duration-300 transition-all font-semibold
              `}
              >
                {menu.title}
              </Link>
            </p>
          ))}
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
