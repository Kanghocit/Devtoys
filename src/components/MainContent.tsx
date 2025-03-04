"use client";

import { useMenu } from "@/context/MenuContext";
import Card from "./Card";

const MainContent = () => {
  const { subMenus, footerMenus } = useMenu();

  return (
    <>
      <div className="w-full">
        <div className="flex items-center gap-2 pb-4">
          <p className="text-[40px] font-bold ">Welcome to DevToys</p>
          <span className="text-gray-400 text-sm">v2.0-preview.8</span>
        </div>
        <div className="text-sm font-bold">Recents</div>
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
        <div className="text-sm font-bold border-b-2 border-gray-300">
          All Tools
        </div>
        <div className="flex flex-wrap gap-4">
          {subMenus
            .flatMap((item) => item.children || []) // Gộp tất cả children thành 1 mảng duy nhất
            .map((child, childIndex) => (
              <Card
                key={childIndex}
                name={child.name}
                icon={child.icon}
                detail={child?.detail || "Detail"}
                href={child?.href}
              />
            ))}
        </div>
      </div>
    </>
  );
};

export default MainContent;
