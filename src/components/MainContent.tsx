"use client";

import { footerMenus, subMenus } from "@/constants/menuData";
import Card from "./Card";
import Link from "next/link";
const MainContent = () => {
  return (
    <>
      <div className="w-full">
        <div className="flex items-center gap-2 pb-4 cursor-default">
          <p className="text-[40px] font-bold ">Welcome to DevToys</p>
          <span className="text-gray-400 text-sm">v2.0-preview.8</span>
        </div>
        <div className="text-sm font-bold cursor-default">Recents</div>
        <div className="w-full border-b-2 border-gray-300"></div>
        <div className="flex flex-wrap gap-4">
          {footerMenus.map((item, index) => (
            <Card
              key={index}
              name={item.name}
              icon={item.icon}
              detail={item.detail || "Detail"}
              href={item.href}
            />
          ))}
        </div>
        <div className="text-sm font-bold border-b-2 border-gray-300 cursor-default">
          All Tools
        </div>
        <div className="flex flex-wrap gap-4">
          {subMenus
            .flatMap((item) => item.children || []) // Gộp tất cả children thành 1 mảng duy nhất
            .filter((child) => child.isDone) // Lọc ra những item có isDone === true
            .map((child, childIndex) => (
              <Link href={child.href}>
                <Card
                  key={childIndex}
                  name={child.name}
                  icon={child.icon}
                  detail={child?.detail || "Detail"}
                />
              </Link>
            ))}
        </div>
      </div>
    </>
  );
};

export default MainContent;
