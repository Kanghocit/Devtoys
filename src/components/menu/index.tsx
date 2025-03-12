"use client";

import clsx from "clsx";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
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
  const pathname = usePathname();

  // Tính toán trực tiếp các dropdowns cần mở dựa trên pathname
  const getOpenDropdowns = (pathname: string) =>
    items
      .filter((item) =>
        item.children?.some((child) => pathname.split("/")[1] === child.href)
      )
      .map((item) => item.name);
  
  const [openDropdowns, setOpenDropdowns] = useState<string[]>(() => getOpenDropdowns(pathname));
  
  const toggleDropdown = (itemName: string) => {
    setOpenDropdowns((prev) =>
      prev.includes(itemName)
        ? prev.filter((name) => name !== itemName)
        : [...prev, itemName]
    );
  };
  
  useEffect(() => {
    setOpenDropdowns(getOpenDropdowns(pathname));
  }, [pathname]);
  
  return (
    <ul className="space-y-1">
      {items.map((item) => (
        <li key={item.name}>
          <Link href={item.href || "#"}>
            <div
              className={clsx(
                "flex items-center justify-between px-4 py-2 cursor-pointer",
                "hover:bg-gray-100/90 rounded-md transition-all duration-300 ease-in-out",
                "text-xl relative",
                openDropdowns.includes(item.name) && "bg-gray-50"
              )}
              onClick={() => toggleDropdown(item.name)}
            >
              <div className="flex items-center">
                {!collapsed ? (
                  <div className="text-2xl">{item.icon}</div>
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
                    openDropdowns.includes(item.name)
                      ? "rotate-180"
                      : "rotate-0"
                  )}
                />
              )}
            </div>
          </Link>

          {item.children && collapsed && (
            <div
              className={clsx(
                "overflow-hidden transition-all duration-300 ease-in-out",
                openDropdowns.includes(item.name)
                  ? "max-h-[500px] opacity-100"
                  : "max-h-0 opacity-0"
              )}
            >
              <ul className="pl-4 py-1 space-y-1 bg-gray-100/50 rounded-md">
                {item.children.map((child, index) => (
                  <li
                    key={child.name}
                    className={clsx(
                      "transform transition-all duration-200",
                      openDropdowns.includes(item.name)
                        ? "translate-y-0 opacity-100"
                        : "-translate-y-4 opacity-0",
                      `delay-[${Math.min(index * 30, 100)}ms]`
                    )}
                  >
                    <Link href={child.href}>
                      <div
                        className={clsx(
                          "flex items-center px-4 py-2 rounded-md",
                          "transition-all duration-300 ease-in-out",
                          "hover:bg-gray-100/90 hover:translate-x-1",
                          pathname.split("/")[1] === child.href
                            ? "bg-blue-100/90 text-blue-500"
                            : ""
                        )}
                      >
                        <span className="transform transition-transform duration-300 group-hover:scale-110">
                          {child.icon}
                        </span>
                        <span className="ml-2">{child.name}</span>
                      </div>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </li>
      ))}
    </ul>
  );
};

export default Menu;
