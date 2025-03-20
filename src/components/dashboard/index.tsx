import React from "react";
import Login from "../button/login";
import { menus, subMenus, footerMenus } from "@/constants/menuData";

const Dashboard = () => {
  // Collect all icons from menuData
  const allIcons = [
    ...menus.map((item) => item.icon),
    ...subMenus.map((item) => item.icon),
    ...subMenus.flatMap(
      (item) => item.children?.map((child) => child.icon) || []
    ),
    ...footerMenus.map((item) => item.icon),
  ].filter(Boolean);

  return (
    <div className="relative flex flex-col items-center justify-center h-screen overflow-hidden">
      {/* Background with icons */}
      <div className="absolute inset-0 grid grid-cols-8 gap-4 p-8 opacity-10">
        {allIcons.map((icon, index) => (
          <div
            key={index}
            className="flex items-center justify-center text-4xl animate-float"
            style={{
              animationDelay: `${index * 0.1}s`,
              animationDuration: `${3 + Math.random() * 2}s`,
            }}
          >
            {icon}
          </div>
        ))}
      </div>

      {/* Content */}
      <div className="relative flex flex-col items-center justify-center gap-4 z-10">
        <h1 className="text-7xl font-bold text-center bg-gradient-to-r from-orange-500 via-pink-500 to-purple-500 bg-clip-text text-transparent animate-[gradientMove_3s_ease-in-out_infinite]">
          Welcome to Devtoys
        </h1>
        <Login />
      </div>
    </div>
  );
};

export default Dashboard;
