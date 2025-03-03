import { useRef } from "react";
import { CiFileOn } from "react-icons/ci";
import clsx from "clsx";

type InputProps = React.ComponentPropsWithoutRef<"input"> & {
  strfix?: React.ReactNode;
  suffix?: React.ReactNode;
};

const Input: React.FC<InputProps> = ({
  className,
  strfix,
  suffix,
  type = "text",
  ...rest
}) => {
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const handleIconClick = () => {
    fileInputRef.current?.click(); // Mở hộp thoại chọn file khi nhấn icon
  };

  const containerClass = clsx(
    "flex items-center w-80 gap-2 rounded-md px-2 py-1 mx-2 my-1 drop-shadow-md border border-gray-300 border-b-gray-500 focus:outline-b-blue-700 ",
    type === "file"
      ? "bg-gray-100 cursor-pointer hover:bg-gray-200"
      : "hover:bg-gray-200",
    className
  );

  const inputClass = clsx(
    "bg-transparent outline-none flex-1",
    type === "file" && "hidden"
  );

  return (
    <div className={containerClass}>
      {strfix && <span className="text-gray-500">{strfix}</span>}

      {type === "file" ? (
        <>
          <input
            type="file"
            {...rest}
            ref={fileInputRef}
            className={inputClass}
          />
          <button
            type="button"
            onClick={handleIconClick}
            className="text-gray-500 hover:text-blue-500"
          >
            <CiFileOn size={24} /> {/* Icon mở file */}
          </button>
        </>
      ) : (
        <input type={type} {...rest} className={inputClass} />
      )}

      {suffix && <span className="text-gray-500">{suffix}</span>}
    </div>
  );
};

export default Input;
