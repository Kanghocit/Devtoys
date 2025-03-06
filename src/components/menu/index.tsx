"use client";

import clsx from "clsx";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { IoChevronDown } from "react-icons/io5";

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
  collapsed: boolean;
}

const Menu: React.FC<MenuProps> = ({ items, collapsed }) => {
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const pathname = usePathname();

  console.log(pathname.split("/")[1]);

  return (
    <ul suppressHydrationWarning>
      {items.map((item) => (
        <li key={item.name}>
          <div
            className="flex items-center justify-between px-4 py-2 cursor-pointer hover:bg-gray-100/90 rounded-r-md transition-colors duration-300 ease-in-out rounded-md text-xl"
            onClick={() =>
              setOpenDropdown((prev) => (prev === item.name ? null : item.name))
            }
          >
            <div className="flex items-center">
              {!collapsed ? (
                <div className="text-2xl ">{item.icon}</div>
              ) : (
                <>
                  {item.icon}
                  <span className="ml-2">{item.name}</span>
                </>
              )}
            </div>
            {item.children && collapsed && (
              <IoChevronDown
                className={clsx(
                  "w-4 h-4 transition-transform duration-300 ease-in-out",
                  openDropdown === item.name ? "rotate-180" : "rotate-0"
                )}
              />
            )}
          </div>
          {item.children && openDropdown === item.name && collapsed && (
            <ul className="ml-4 border-l border-gray-300 overflow-hidden transition-all duration-300 ease-in-out text-xl">
              {item.children.map((child) => (
                <li key={child.name}>
                  <Link href={child.href}>
                    <div
                      className={clsx(
                        "flex items-center px-4 py-2 hover:bg-gray-100/90 rounded-r-md mt-1",
                        pathname.split("/")[1] === child.href
                          ? "bg-blue-100/90 text-blue-500"
                          : ""
                      )}
                    >
                      {child.icon}
                      <span className="ml-2">{child.name}</span>
                    </div>
                  </Link>
                </li>
              ))}
            </ul>
          )}
        </li>
      ))}
    </ul>
  );
};

export default Menu;
