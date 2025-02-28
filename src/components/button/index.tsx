import React from "react";
import clsx from "clsx";

type ButtonProps = React.ComponentPropsWithoutRef<"button"> & {
  variant?: "default" | "text";
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
    "flex gap-2 rounded-md w-fit px-2 py-1  text-sm bg-white hover:bg-gray-100 cursor-pointer",
    variant === "default" &&
      "bg-gray-100 border-1 border-gray-300 border-solid",
    variant === "text" && "bg-transparent",
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
