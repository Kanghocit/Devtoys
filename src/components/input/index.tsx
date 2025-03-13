"use client";
import clsx from "clsx";

type InputProps = React.ComponentPropsWithoutRef<"input"> & {
  strfix?: React.ReactNode;
  suffix?: React.ReactNode;
  inputRef?: React.Ref<HTMLInputElement>;
};

const Input: React.FC<InputProps> = ({
  className,
  strfix,
  suffix,
  inputRef,
  type = "text",
  ...rest
}) => {
  const containerClass = clsx(
    "flex gap-2 rounded-md px-2 py-2 mx-2 my-1 drop-shadow-md focus:outline-none focus:ring-2 focus:ring-blue-700 ",
    type === "text" && " border-1 border-gray-300",
    type === "file" && "hidden",
    type === "number" && " border-1 border-gray-300",
    className
  );

  const inputClass = clsx(
    "bg-transparent outline-none text-sm w-full",
    type === "number" && "w-15"
  );

  return (
    <div className={containerClass}>
      {strfix && <span className="text-gray-500">{strfix}</span>}

      <input type={type} {...rest} ref={inputRef} className={inputClass} />

      {suffix && <span className="text-gray-500 cursor-pointer">{suffix}</span>}
    </div>
  );
};

export default Input;
