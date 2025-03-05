"use client";

import clsx from "clsx";
import Link from "next/link";
import { useRouter, usePathname } from "next/navigation";
import { IoChevronDown } from "react-icons/io5";
import { useState } from "react";

interface MenuItem {
  icon?: React.ReactNode;
  href?: string;
  name: string;
  children?: {
    name: string;
    icon: React.ReactNode;
    detail: string;
    href: string;
    isDone: boolean;
  }[];
}

interface MenuProps {
  items: MenuItem[];
}

const Menu: React.FC<MenuProps> = ({ items }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);

  return (
    <ul>
      {items.map((item) => (
        <li key={item.name}>
          <Link href={item.href || ""}>
            <div className="flex items-center justify-between px-4 py-2 cursor-pointer hover:bg-gray-100 transition-colors duration-300 ease-in-out rounded-md    ">
              <div className="flex items-center">
                {item.icon}
                <span className="ml-2">{item.name}</span>
              </div>
              {item.children && (
                <IoChevronDown
                  className={clsx(
                    "w-4 h-4 transition-transform duration-300 ease-in-out",
                    openDropdown === item.name ? "rotate-180" : "rotate-0"
                  )}
                />
              )}
            </div>
            {/* {item.children && openDropdown === item.name && ( */}
            <ul className="ml-4 border-l border-gray-300 overflow-hidden transition-all duration-300 ease-in-out">
              {item.children?.map((child) => (
                <li key={child.name}>
                  <Link href={child.href}>
                    <div className="flex items-center px-4 py-2 hover:bg-gray-100">
                      {child.icon}
                      <span className="ml-2">{child.name}</span>
                    </div>
                  </Link>
                </li>
              ))}
            </ul>
            {/* )} */}
          </Link>
        </li>
      ))}
    </ul>
  );
};

export default Menu;
