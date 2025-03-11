import clsx from "clsx";
import React from "react";
import Switch from "../switch";

type ConfigCardProps = React.ComponentPropsWithoutRef<"div"> & {
  title: string;
  icon?: React.ReactNode;
  subTitle?: string;
  type?: "switch" | "select" | "input";
  options?: string[];
  trueValue?: string;
  falseValue?: string;
};

const ConfigCard: React.FC<ConfigCardProps> = ({
  className,
  title,
  icon,
  subTitle,
  type,
  options,
  trueValue,
  falseValue,
  ...rest
}) => {
  const configCardClass = clsx(
    "flex justify-between bg-white m-2 p-2 rounded-md shadow-md",
    className
  );
  const selectClass = clsx(
    "border border-gray-300 rounded-md p-1 text-sm focus:outline-none",
    className
  );
  const inputClass = clsx(
    "border border-gray-300 rounded-md p-1 text-sm focus:outline-none",
    className
  );
  return (
    <div className={configCardClass} {...rest}>
      <div className="flex">
        <div className="flex items-center justify-center text-2xl">{icon}</div>
        <div className="flex flex-col gap-1 justify-center">
          <p className="text-sm ms-2 justify-center items-center">{title}</p>
          <p className="text-[10px] text-gray-500  ms-2 justify-center items-center">
            {subTitle}
          </p>
        </div>
      </div>
      {type === "switch" && (
        <Switch valueTrue={trueValue} valueFalse={falseValue} />
      )}
      {type === "select" && (
        <select className={selectClass}>
          {options?.map((option) => (
            <option key={option}>{option}</option>
          ))}
        </select>
      )}
      {type === "input" && <input type="number" className={inputClass} />}
    </div>
  );
};

export default ConfigCard;
