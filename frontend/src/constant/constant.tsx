import { JSX } from "react";
import { FaUser } from "react-icons/fa";
import { FaUserGroup } from "react-icons/fa6";
import { MdClass } from "react-icons/md";

export type SideNavItem = {
  title: string;
  path: string;
  icon?: JSX.Element;
};

export const SIDENAV_ITEMS: SideNavItem[] = [
  {
    title: "My Classes",
    path: "/user/dashboard",
    icon: <MdClass />,
  },
  {
    title: "Profile",
    path: "/user/profile",
    icon: <FaUser />,
  },
  {
    title: "Profile",
    path: "/admin/profile",
    icon: <FaUser />,
  },
  {
    title: "Users",
    path: "/admin/user-list",
    icon: <FaUserGroup />,
  },
];
