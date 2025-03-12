"use client";

import clsx from "clsx";
import { useState } from "react";
import { GoSearch } from "react-icons/go";
import { RxHamburgerMenu } from "react-icons/rx";
import Menu from "../menu";
import Input from "@/components/input";
import { menus, subMenus, footerMenus } from "@/constants/menuData";
import { useSearch } from "@/context/SearchContext";

const SideBar = () => {
  const [collapsed, setCollapsed] = useState(true);
  const toggleCollapsed = () => {
    setCollapsed(!collapsed);
  };
  const { searchQuery, setSearchQuery } = useSearch();

  return (
    <div
      className={clsx(
        "rounded-tr-lg border-r-1 border-gray-300",
        collapsed && "min-w-[300px]"
      )}
    >
      <div className="flex flex-col justify-between h-screen gap-2 ">
        <div>
          <div
            className="px-3 py-2 text-2xl ms-1 cursor-pointer"
            onClick={toggleCollapsed}
          >
            <RxHamburgerMenu />
          </div>

          {collapsed ? (
            <Input
              type="text"
              placeholder="Search..."
              suffix={<GoSearch />}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          ) : (
            <div className="px-3 pt-4 pb-3 text-2xl ms-1 cursor-pointer">
              <GoSearch />
            </div>
          )}
          <div className="border-b-1 border-gray-300">
            <Menu items={menus} collapsed={collapsed} />
          </div>
          <Menu items={subMenus} collapsed={collapsed} />
        </div>
        <div className="border-t-1 border-gray-300">
          <Menu items={footerMenus} collapsed={collapsed} />
        </div>
      </div>
    </div>
  );
};

export default SideBar;
