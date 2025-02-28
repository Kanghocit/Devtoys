"use client";
import React, { useState } from "react";
import Button from "./button";
import { GoChevronUp } from "react-icons/go";
import { IoIosArrowDown } from "react-icons/io";

type SubMenuProps = {
  props: {
    name: string;
    icon: React.ReactNode;
    itemsArray: { name: string; icon: React.ReactNode }[];
  };
};

const SubMenu = ({ props }: SubMenuProps) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="w-full " suppressHydrationWarning>
      {/* Nút mở menu */}
      <div
        className="flex items-center justify-between  gap-2 cursor-pointer hover:bg-gray-200 rounded-md"
        onClick={() => setIsOpen(!isOpen)}
      >
        <Button name={props.name} icon={props.icon} />
        {isOpen ? (
          <GoChevronUp className="w-5 h-5 hidden lg:block text-gray-400" />
        ) : (
          <IoIosArrowDown className="w-5 h-5 hidden lg:block text-gray-400" />
        )}
      </div>

      {/* Menu con */}
      {isOpen && (
        <div className="mt-2 w-full p-2 rounded-md ">
          {props.itemsArray.map((item) => (
            <div key={item.name} className="p-1 hover:bg-gray-200 rounded-md">
              <Button name={item.name} icon={item.icon} />
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default SubMenu;
