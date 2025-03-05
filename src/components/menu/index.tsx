"use client";

import clsx from "clsx";
import { useRouter } from "next/navigation";
import { useState } from "react";

type MenuItem = {
  icon?: React.ReactNode;
  name: string;
  children?: MenuItem[];
};

type MenuProps = {
  items: MenuItem[];
  className?: string;
  collapsed?: boolean;
};

const Menu: React.FC<MenuProps> = ({ items, className, collapsed }) => {
  const [openMenu, setOpenMenu] = useState<{ [key: string]: boolean }>({});
  const toggleOpen = (name: string) => {
    setOpenMenu((prev) => ({
      ...prev,
      [name]: !prev[name],
    }));
  };

  const router = useRouter();
  const renderMenuItems = (menuItems: MenuItem[]) => {
    return (
      <>
        {menuItems.map((item) => (
          <div key={item.name}>
            <div
              className={clsx(
                "flex items-center gap-2 p-2 w-full rounded-md text-left hover:bg-gray-300 hover:text-white cursor-pointer ",
                className
              )}
              onClick={
                item.name === "All Tools"
                  ? () => router.push("/")
                  : () => toggleOpen(item.name)
              }
            >
              {item.icon && <span className="text-lg">{item.icon}</span>}
              {collapsed ? <span>{item.name}</span> : null}
            </div>
            {item.children && openMenu[item.name] && collapsed && (
              <div className="ml-4">{renderMenuItems(item.children)}</div>
            )}
          </div>
        ))}
      </>
    );
  };

  return (
    <div
      className={clsx(
        "bg-transparent rounded-sm gap-2",
        collapsed ? "w-[250px]" : "w-fit flex flex-col text-center px-2"
      )}
    >
      {renderMenuItems(items)}
    </div>
  );
};

export default Menu;
