"use client";

import clsx from "clsx";
import { useRouter } from "next/navigation";
import { MdOutlineZoomOutMap } from "react-icons/md";

type CardProps = React.ComponentPropsWithoutRef<"div"> & {
  name: string;
  icon: React.ReactNode;
  detail: string;
  href?: string;
};

const Card: React.FC<CardProps> = ({
  className,
  name,
  icon,
  detail,
  href,
  ...rest
}) => {
  const cardClass = clsx(
    "grid grid-cols-3  gap-4 mx-2 my-4 p-4 drop-shadow-md rounded-lg shadow-md w-80 h-30 my-2 hover:bg-gray-100/50 cursor-pointer",
    className
  );
  const router = useRouter();

  return (
    <div className={cardClass} {...rest} onClick={() => router.push(`${href}`)}>
      <div className="flex justify-center  items-center bg-gray-100 rounded-xl text-4xl">
        {icon}
      </div>
      <div className="col-span-2 flex flex-col justify-between">
        <div className="flex justify-between">
          <p className="font-semibold text-md">{name || "Menu"}</p>
          <button
            className="bg-gray-100 rounded-md p-1 drop-shadow-md max-h-[30px] text-sm cursor-pointer hover:p-2"
            onClick={(e) => {
              e.stopPropagation();
              if (href) window.open(href, "_blank"); // Mở tab mới
            }}
          >
            <MdOutlineZoomOutMap />
          </button>
        </div>
        <p className="text-sm text-gray-500">{detail || "Detail"}</p>
      </div>
    </div>
  );
};

export default Card;
