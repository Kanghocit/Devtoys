"use client";

import clsx from "clsx";
import { useRef, useState, useEffect } from "react";

type OtpInputProps = Omit<
  React.ComponentPropsWithoutRef<"input">,
  "onChange"
> & {
  value: string;
  onChange: (value: string) => void;
  length?: number | "default";
  separator?: string;
  variant?: "outline" | "filled";
  disabled?: boolean;
  mark?: string;
  formatter?: (value: string) => string;
};

const OtpInput: React.FC<OtpInputProps> = ({
  value,
  onChange,
  length = "default",
  separator = " ",
  variant = "outline",
  disabled = false,
  mark,
  formatter,
  ...rest
}) => {
  const numInputs = length === "default" ? 6 : length;
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);
  const [focusedIndex, setFocusedIndex] = useState<number | null>(null);

  useEffect(() => {
    if (focusedIndex !== null && inputRefs.current[focusedIndex]) {
      const input = inputRefs.current[focusedIndex];
      input?.select();
    }
  }, [focusedIndex]);

  const handleFocus = (index: number) => {
    setFocusedIndex(index);
  };

  const handleBlur = () => {
    setFocusedIndex(null);
  };

  const handleChange = (
    index: number,
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const inputValue = e.target.value;

    if (inputValue.length > 1) {
      const chars = inputValue.split("");
      const newValue = value.split("");

      for (let i = 0; i < chars.length && index + i < numInputs; i++) {
        newValue[index + i] = formatter ? formatter(chars[i]) : chars[i];
      }

      onChange(newValue.join(""));

      const nextIndex = Math.min(index + chars.length, numInputs - 1);
      inputRefs.current[nextIndex]?.focus();
      return;
    }

    const newChar = inputValue.slice(-1);
    const newValue = value.split("");
    newValue[index] = formatter ? formatter(newChar) : newChar;
    onChange(newValue.join(""));

    if (newChar && index < numInputs - 1) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (
    index: number,
    e: React.KeyboardEvent<HTMLInputElement>
  ) => {
    if (e.key === "Backspace") {
      const newValues = value.split("");
      if (value[index]) {
        newValues[index] = "";
        onChange(newValues.join(""));
      } else if (index > 0) {
        inputRefs.current[index - 1]?.focus();
        newValues[index - 1] = "";
        onChange(newValues.join(""));
      }
    } else if (e.key === "ArrowLeft" && index > 0) {
      inputRefs.current[index - 1]?.focus();
    } else if (e.key === "ArrowRight" && index < numInputs - 1) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handlePaste = (
    index: number,
    e: React.ClipboardEvent<HTMLInputElement>
  ) => {
    e.preventDefault();
    const pastedData = e.clipboardData.getData("text");
    const chars = pastedData.split("");
    let newValue = value.split("");

    for (let i = 0; i < chars.length && index + i < numInputs; i++) {
      newValue[index + i] = formatter ? formatter(chars[i]) : chars[i];
    }

    onChange(newValue.join(""));

    const nextIndex = Math.min(index + chars.length, numInputs - 1);
    inputRefs.current[nextIndex]?.focus();
  };

  const containerClass = clsx(
    "flex ",
    variant === "filled" && "p-2 rounded-md"
  );

  const inputClass = clsx(
    "border border-gray-300 rounded-md w-13 h-8 text-center text-md focus:outline-blue-500",
    disabled && "bg-gray-200 cursor-not-allowed",
    variant === "filled" && "bg-gray-100 focus:bg-white"
  );

  return (
    <div className={containerClass}>
      {Array.from({ length: numInputs }).map((_, index) => (
        <div
          key={index}
          className="flex items-center justify-center gap-2 mx-1"
        >
          <input
            type="text"
            maxLength={1}
            className={inputClass}
            ref={(el) => {
              inputRefs.current[index] = el;
            }}
            value={value[index] ? mark || value[index] : ""}
            onChange={(e) => handleChange(index, e)}
            onKeyDown={(e) => handleKeyDown(index, e)}
            onPaste={(e) => handlePaste(index, e)}
            onFocus={() => handleFocus(index)}
            onBlur={handleBlur}
            disabled={disabled}
            {...rest}
          />
          {separator && index < numInputs - 1 && (
            <p className="">{separator}</p>
          )}
        </div>
      ))}
    </div>
  );
};

export default OtpInput;
