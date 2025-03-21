"use client";

import { footerMenus, subMenus } from "@/constants/menuData";

import { useSearch } from "@/context/SearchContext";

import Link from "next/link";

import Card from "../card";
import Dropdown from "../dropdown";

import { CgProfile } from "react-icons/cg";
import { LuLogOut } from "react-icons/lu";
import useUser from "@/hooks/useUser";

const profileMenu = [
  {
    name: "Profile",
    icon: <CgProfile />,
    href: "/profile",
  },
  {
    name: "Logout",
    icon: <LuLogOut />,
    href: "/api/auth/logout",
  },
];

const MainContent = () => {
  const { searchQuery } = useSearch();
  const { user, loading } = useUser();

  // Lọc danh sách footerMenus theo searchQuery
  const filteredFooterMenus = footerMenus.filter((item) =>
    item.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Lọc danh sách subMenus theo searchQuery
  const filteredSubMenus = subMenus
    .flatMap((item) => item.children || []) // Gộp tất cả children thành 1 mảng duy nhất
    .filter((child) => child.isDone)
    .filter((child) =>
      child.name.toLowerCase().includes(searchQuery.toLowerCase())
    );

  return (
    <div className="w-full" suppressHydrationWarning>
      <div className="flex justify-between">
        <div className="flex items-center gap-2 pb-4 cursor-default">
          <p className="text-[40px] font-bold ">Welcome to DevToys</p>
          <span className="text-gray-400 text-sm">v2.0-preview.8</span>
        </div>
        {!loading && user && (
          <div className="me-2">
            <Dropdown image={user.picture || ""} items={profileMenu} />
          </div>
        )}
      </div>

      {/* Recents */}
      {filteredFooterMenus.length > 0 && (
        <>
          <div className="text-sm font-bold cursor-default sticky top-0 bg-white z-10">
            Recents
          </div>
          <div className="w-full border-b-2 border-gray-300"></div>
          <div className="flex flex-wrap gap-4">
            {filteredFooterMenus.map((item, index) => (
              <Card
                key={index}
                name={item.name}
                icon={item.icon}
                detail={item.detail || "Detail"}
                href={item.href}
              />
            ))}
          </div>
        </>
      )}

      {/* All Tools */}
      <div className="text-sm font-bold cursor-default sticky top-0 bg-white z-10">
        All Tools
      </div>
      <div className="w-full border-b-2 border-gray-300"></div>

      <div className="flex flex-wrap gap-4">
        {filteredSubMenus.length > 0 ? (
          filteredSubMenus.map((child, childIndex) => (
            <Link href={child.href} key={childIndex}>
              <Card
                name={child.name}
                icon={child.icon}
                detail={child?.detail || "Detail"}
              />
            </Link>
          ))
        ) : (
          <div className="text-gray-500 text-sm">
            <p>Please pay to unlock the feature 😘</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default MainContent;
