"use client";

import Button from "@/components/button";
import { footerMenus } from "@/constants/menuData";
import Link from "next/link";
import { AiOutlineNodeIndex } from "react-icons/ai";
import { GoTrash } from "react-icons/go";
import { LuEarth } from "react-icons/lu";

const Settings = () => {
  return (
    <div className="m-2 ">
      <div className="font-bold text-2xl p-2 m-2">Manage extensions</div>
      <div className="flex justify-between items-center w-full p-2 m-2">
        {/* Bên trái */}
        <div className="flex gap-2 items-center text-sm">
          <Button>Install an extension</Button>
          <Button variant="text" className="text-blue-500">
            <Link href="https://www.nuget.org/packages?q=Tags%3A%22devtoys-app%22">
              Find more extensions online
            </Link>
          </Button>
        </div>

        {/* Bên phải */}
        <Button variant="text" className="text-blue-500">
          <Link href="https://www.nuget.org/packages?q=Tags%3A%22devtoys-app%22">
            Find more extensions online
          </Link>
        </Button>
      </div>
      <div className="w-full bg-white border-1 border-gray-300 rounded-md flex justify-between gap-2 ">
        <div className="flex gap-2">
          <div className="flex gap-2 items-center justify-center p-5 text-2xl">
            {footerMenus[0].icon}
          </div>
          <div className="flex flex-col text-xs justify-center">
            <p>DevToys.Tools - 2.0.8-preview</p>
            <span className="text-gray-400">
              A set of offline tools installed by default with Devtoys
            </span>
          </div>
        </div>
        <div className="flex gap-2 items-center justify-center me-2">
          <p>7.7MB</p>
          <Button icon={<LuEarth />} />
          <Button icon={<AiOutlineNodeIndex />} />
          <Button icon={<GoTrash />} />
        </div>
      </div>
    </div>
  );
};

export default Settings;
