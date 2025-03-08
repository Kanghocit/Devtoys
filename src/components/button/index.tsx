import React from "react";
import clsx from "clsx";

type ButtonProps = React.ComponentPropsWithoutRef<"button"> & {
  variant?: "default" | "text" | "primary";
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
    "flex gap-2 rounded-md w-fit text-xs cursor-pointer",
    variant === "default" &&
      "bg-white border-1 border-gray-300 border-solid hover:bg-gray-200/50 px-2 py-1",
    variant === "text" && "bg-transparent px-2 py-1",
    variant === "primary" && "bg-blue-700 text-white",
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
