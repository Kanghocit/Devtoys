"use client";

import { useState } from "react";
import Link from "next/link";

interface MenuItem {
  name: string;
  icon: React.ReactNode;
  children?: {
    name: string;
    icon: React.ReactNode;
    detail: string;
    href: string;
  }[];
}

interface MenuComponentProps {
  menuItems?: MenuItem[];
}

const MenuIcon = () => (
  <div className="w-6 h-6 bg-gray-600 rounded-sm relative">
    <span className="block w-full h-0.5 bg-white absolute top-1"></span>
    <span className="block w-full h-0.5 bg-white absolute top-3"></span>
    <span className="block w-full h-0.5 bg-white absolute top-5"></span>
  </div>
);

const ChevronIcon = ({ isOpen }: { isOpen: boolean }) => (
  <div
    className={`w-4 h-4 border-t-2 border-r-2 border-gray-600 transform ${
      isOpen ? "rotate-180" : "rotate-45"
    }`}
  ></div>
);

const sampleMenuItems: MenuItem[] = [
  {
    name: "Dashboard",
    icon: <div className="w-4 h-4 bg-blue-500"></div>,
    children: [
      {
        name: "Overview",
        icon: <div className="w-3 h-3 bg-gray-400"></div>,
        detail: "Summary",
        href: "/dashboard/overview",
      },
      {
        name: "Stats",
        icon: <div className="w-3 h-3 bg-gray-400"></div>,
        detail: "Statistics",
        href: "/dashboard/stats",
      },
    ],
  },
  {
    name: "Settings",
    icon: <div className="w-4 h-4 bg-green-500"></div>,
    children: [
      {
        name: "Profile",
        icon: <div className="w-3 h-3 bg-gray-400"></div>,
        detail: "User Info",
        href: "/settings/profile",
      },
      {
        name: "Security",
        icon: <div className="w-3 h-3 bg-gray-400"></div>,
        detail: "Account Security",
        href: "/settings/security",
      },
    ],
  },
];

const MenuComponent: React.FC<MenuComponentProps> = ({
  menuItems = sampleMenuItems,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);

  return (
    <nav className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="p-2 rounded-md bg-gray-200 hover:bg-gray-300"
      >
        <MenuIcon />
      </button>

      {isOpen && menuItems.length > 0 && (
        <ul className="absolute top-full left-0 mt-2 w-48 bg-white shadow-lg rounded-md border border-gray-200 transition-opacity duration-300 ease-in-out opacity-100">
          {menuItems.map((item) => (
            <li key={item.name} className="relative">
              <div
                className="flex items-center justify-between px-4 py-2 cursor-pointer hover:bg-gray-100"
                onClick={() =>
                  setOpenDropdown(openDropdown === item.name ? null : item.name)
                }
              >
                <div className="flex items-center">
                  {item.icon}
                  <span className="ml-2">{item.name}</span>
                </div>
                {item.children && (
                  <ChevronIcon isOpen={openDropdown === item.name} />
                )}
              </div>
              {item.children && openDropdown === item.name && (
                <ul className="ml-4 border-l border-gray-300 overflow-hidden transition-all duration-300 ease-in-out">
                  {item.children.map((child) => (
                    <li key={child.name}>
                      <Link
                        href={child.href}
                        className="flex items-center px-4 py-2 hover:bg-gray-100"
                      >
                        {child.icon}
                        <span className="ml-2">{child.name}</span>
                      </Link>
                    </li>
                  ))}
                </ul>
              )}
            </li>
          ))}
        </ul>
      )}
    </nav>
  );
};

export default MenuComponent;
