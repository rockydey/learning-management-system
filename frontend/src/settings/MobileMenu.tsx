"use client";

import { useState } from "react";
import { FaBars, FaHome, FaTimes } from "react-icons/fa";
import { SIDENAV_ITEMS } from "@/constant/constant";
import { useAuth } from "@/context/AuthContext";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Image from "next/image";
import LogoIcon from "@/assets/Shared/LogoIcon.png";

const MobileMenu = () => {
  const { logout, user } = useAuth();
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

  // Filter the items based on the role
  const filteredItems = SIDENAV_ITEMS?.filter((item) => {
    if (user?.role === "user" && item.path.startsWith("/user")) return true;
    if (user?.role === "admin" && item.path.startsWith("/admin")) return true;
    return false;
  });

  const toggleMenu = () => setIsOpen(!isOpen);

  return (
    <div>
      <div className="flex justify-between items-center shadow-md p-5">
        <Link href="/" className="flex items-center gap-1.5">
          <Image
            src={LogoIcon}
            alt="Logo Icon"
            className="lg:w-12 w-10 lg:h-12 h-10 object-cover"
          />
          <h2 className="text-primary text-2xl lg:text-3xl font-bold josefin">
            Academix
          </h2>
        </Link>

        {/* Hamburger Icon */}
        <div className="lg:hidden flex items-center gap-3 text-secondary">
          <button onClick={toggleMenu}>
            {isOpen ? <FaTimes size={30} /> : <FaBars size={30} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <div
        className={`${
          isOpen ? "translate-x-0" : "translate-x-full"
        } fixed inset-0 bg-secondary/25 backdrop-blur z-50 flex justify-end items-center transition-transform duration-500 ease-in-out`}
        onClick={toggleMenu}
      >
        <div
          className="bg-secondary text-white p-5 w-[80%] h-full max-w-md space-y-6"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Close button inside the mobile menu */}
          <div className="flex justify-end">
            <button onClick={() => setIsOpen(false)} className="text-white">
              <FaTimes size={30} />
            </button>
          </div>

          <div className="text-xl space-y-5 font-semibold">
            {filteredItems.map((item, index) => (
              <Link
                key={index}
                href={item?.path}
                className={`flex items-center gap-1.5 p-3 rounded-lg transition-colors duration-300 ${
                  pathname === item.path
                    ? "text-primary bg-secondary/50"
                    : "text-white hover:bg-secondary/40"
                }`}
                onClick={toggleMenu} // Close menu after clicking a link
              >
                {item?.icon}
                {item?.title}
              </Link>
            ))}
          </div>

          {/* Footer */}
          <div className="text-xl mt-auto space-y-5 font-semibold">
            <Link
              href="/"
              className="flex items-center gap-1.5 p-3 rounded-lg text-white hover:bg-secondary/40 transition-colors"
              onClick={toggleMenu}
            >
              <FaHome />
              Home
            </Link>
            <button
              onClick={() => {
                logout();
                setIsOpen(false); // Close the menu after logging out
              }}
              className="flex items-center gap-1.5 cursor-pointer p-3 rounded-lg text-white hover:bg-secondary/40 transition-colors"
            >
              <FaTimes />
              Logout
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MobileMenu;
