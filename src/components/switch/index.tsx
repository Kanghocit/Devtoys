"use client";

import clsx from "clsx";
import { useState } from "react";

type SwitchProps = {
  checked?: boolean;
  defaultChecked?: boolean;
  disabled?: boolean;
  onChange?: (checked: boolean) => void;
  label?: string;
  valueTrue?: string;
  valueFalse?: string;
  className?: string;
  onToggle?: () => void;
};

const Switch: React.FC<SwitchProps> = ({
  defaultChecked,
  disabled,
  onChange,
  label,
  className,
  valueTrue,
  valueFalse,
  onToggle,
}) => {
  const [isChecked, setIsChecked] = useState(defaultChecked || false);

  const handleChange = () => {
    if (disabled) return;
    setIsChecked(!isChecked);
    onChange?.(!isChecked);
  };

  return (
    <label
      className={clsx("flex items-center gap-2 cursor-pointer", className)}
      onClick={onToggle}
    >
      <p>{isChecked ? valueTrue : valueFalse}</p>
      <div
        className={clsx(
          "relative w-10 h-5 rounded-full transition-all flex justify-between",
          isChecked ? "bg-blue-500" : "bg-gray-300",
          disabled && "opacity-50 cursor-not-allowed"
        )}
        onClick={handleChange}
      >
        <div
          className={clsx(
            "absolute top-1/2 left-1 transform -translate-y-1/2 w-3 h-3 bg-white rounded-full shadow transition-all",
            isChecked ? "translate-x-5" : "translate-x-0"
          )}
        />
      </div>
      {label && <span>{label}</span>}
    </label>
  );
};

export default Switch;
