"use client";

import Link from "next/link";
import { useState } from "react";

interface DropdownItem {
  icon?: React.ReactNode;
  name: string;
  href?: string;
}

interface DropdownProps {
  image: string;
  items: DropdownItem[];
}

const Dropdown: React.FC<DropdownProps> = ({ image, items }) => {
  const [open, setOpen] = useState(false);

  return (
    <div className="relative">
      <div onClick={() => setOpen(!open)}>
        <img src={image} className="w-15 h-15 rounded-full" />
      </div>

      {open && (
        <ul className="absolute top-full right-0 w-[150px] bg-white shadow-lg rounded-md">
          {items.map((item) => (
            <li key={item.name} className="rounded-md">
              <Link href={item.href || "#"}>
                <div className="flex items-center gap-2 m-1 hover:bg-gray-100 rounded-md p-1">
                  <div>{item.icon}</div>

                  <p>{item.name}</p>
                </div>
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Dropdown;
