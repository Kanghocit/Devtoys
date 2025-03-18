import React from "react";
import clsx from "clsx";

type ButtonProps = React.ComponentPropsWithoutRef<"button"> & {
  variant?: "default" | "text" | "primary" | "secondary";
  icon?: React.ReactNode;
  block?: boolean;
};

// const;

const Button: React.FC<ButtonProps> = ({
  className,
  children,
  variant = "default",
  icon,
  block,
  ...rest
}) => {
  const buttonClass = clsx(
    "flex rounded-lg w-fit text-xs cursor-pointer",
    variant === "default" &&
      "bg-white text-black p-2 shadow-md  hover:bg-white bg-gradient-to-r from-gray-300 via-gray-200 to-gray-100 animate-moving-gradient shadow-gray-300 hover:shadow-none hover:text-gray-500",
    variant === "text" && "items-center  px-2 py-1",
    variant === "primary" && "bg-blue-700 text-white",
    variant === "secondary" && "border-none color-white ",
    block && "w-full",
    className
  );

  return (
    <button {...rest} className={buttonClass}>
      {icon && (
        <span className="flex items-center justify-center text-sm">{icon}</span>
      )}
      {children}
    </button>
  );
};

export default Button;
