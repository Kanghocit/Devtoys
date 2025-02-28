"use client";
import React, { useState } from "react";
import Menu from "./menu";
import { useMenu } from "@/context/MenuContext";
import Button from "./button";
import { IoChevronForward, IoChevronBack } from "react-icons/io5";

const SideBar = () => {
  const { menus, subMenus, footerMenus } = useMenu();
  const [collapsed, setCollapsed] = useState(false);
  const toggleCollapsed = () => {
    setCollapsed(!collapsed);
  };

  return (
    <div className="bg-red-50/50 rounded-tr-lg">
      <div className="fixed top-0 left-0 border-b-2  bg-red-50">
        <div
          className=" w-8 h-8 rounded-2xl flex items-center bg-red-50/50  z-10 justify-center hover:bg-red-100/50 cursor-pointer"
          onClick={() => toggleCollapsed()}
        >
          {collapsed ? <IoChevronBack /> : <IoChevronForward />}
        </div>
        <Menu items={menus} collapsed={collapsed} />
      </div>
      <div className="flex flex-col items-center mt-25">
        <Menu items={subMenus} collapsed={collapsed} />
      </div>
      <div className="fixed bottom-0 left-0 border-t-2 bg-red-50">
        <Menu items={footerMenus} collapsed={collapsed} />
      </div>
    </div>
  );
};

export default SideBar;
