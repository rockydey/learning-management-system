"use client";

import Image from "next/image";
import LogoIcon from "@/assets/Shared/LogoIcon.png";
import Link from "next/link";
import { FaHome } from "react-icons/fa";
import { IoMdLogOut } from "react-icons/io";
import { useAuth } from "@/context/AuthContext";
import { SIDENAV_ITEMS } from "@/constant/constant";
import { usePathname } from "next/navigation";

const Sidebar = () => {
  const { logout, user } = useAuth();
  const pathname = usePathname();

  // Filter the items based on role
  const filteredItems = SIDENAV_ITEMS?.filter((item) => {
    if (user?.role === "user" && item.path.startsWith("/user")) return true;
    if (user?.role === "admin" && item.path.startsWith("/admin")) return true;
    return false;
  });

  return (
    <div
      className={`h-[calc(100vh-40px)] py-5 px-8 rounded-lg duration-300 overflow-y-hidden bg-secondary text-white flex flex-col`}
    >
      <div className="flex items-center gap-1.5 mb-10">
        <Image
          src={LogoIcon}
          alt="Logo Icon"
          className="lg:w-12 w-10 lg:h-12 h-10 object-cover"
        />
        <h2 className="text-primary text-2xl lg:text-3xl font-bold josefin">
          Academix
        </h2>
      </div>

      <div className="text-xl space-y-5 font-semibold">
        {filteredItems.map((item, index) => (
          <Link
            key={index}
            href={item?.path}
            className={`flex items-center gap-1.5 ${
              pathname === item.path && "text-primary"
            }`}
          >
            {item?.icon}
            {item?.title}
          </Link>
        ))}
      </div>

      <div className="text-xl mt-auto space-y-5 font-semibold">
        <Link href="/" className="flex items-center gap-1.5">
          <FaHome />
          Home
        </Link>
        <button
          onClick={() => logout()}
          className="flex items-center gap-1.5 cursor-pointer"
        >
          <IoMdLogOut />
          Logout
        </button>
      </div>
    </div>
  );
};

export default Sidebar;
