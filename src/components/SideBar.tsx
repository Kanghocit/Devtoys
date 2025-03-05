"use client";
import { useMenu } from "@/context/MenuContext";
import clsx from "clsx";
import { useState } from "react";
import { IoChevronBack, IoChevronForward } from "react-icons/io5";
import Menu from "./menu";

const SideBar = () => {
  const { menus, subMenus, footerMenus } = useMenu();
  const [collapsed, setCollapsed] = useState(false);
  const toggleCollapsed = () => {
    setCollapsed(!collapsed);
  };

  return (
    <div className="bg-gray-200/50 rounded-tr-lg min-h-screen">
      <div className="fixed top-0 left-0 border-b-1 bg-gray-200">
        <div
          className={clsx(
            " w-8 h-8 rounded-2xl flex items-center bg-gray-200/50  z-10 justify-center hover:bg-gray-300/50 cursor-pointer",
            !collapsed && "mx-auto"
          )}
          onClick={() => toggleCollapsed()}
        >
          {collapsed ? <IoChevronBack /> : <IoChevronForward />}
        </div>
        <Menu items={menus} collapsed={collapsed} />
      </div>
      <div className="flex flex-col items-center mt-25">
        <Menu items={subMenus} collapsed={collapsed} />
      </div>
      <div className="fixed bottom-0 left-0 border-t-1 bg-gray-50 pt-2">
        <Menu items={footerMenus} collapsed={collapsed} />
      </div>
    </div>
  );
};

export default SideBar;
