"use client";
import clsx from "clsx";
import { useEffect, useRef, useState } from "react";

type TextareaProps = React.ComponentPropsWithoutRef<"textarea"> & {
  useLine?: boolean;
  minLines?: number;
  maxLines?: number;
};

const Textarea: React.FC<TextareaProps> = ({
  className,
  useLine = true,
  minLines = 3,
  maxLines = 999,
  value,
  onChange,
  ...rest
}) => {
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const [lines, setLines] = useState<number[]>([]);
  const [lineHeight, setLineHeight] = useState<number>(20);

  const updateLines = () => {
    if (textareaRef.current) {
      const content = textareaRef.current.value;
      const lineCount = content.split("\n").length;
      const newLines = Array.from(
        { length: Math.max(lineCount, minLines) },
        (_, i) => i + 1
      );
      setLines(newLines);

      // Auto resize
      textareaRef.current.style.height = "auto";
      const newHeight = Math.min(
        Math.max(lineCount, minLines) * lineHeight,
        maxLines * lineHeight
      );
      textareaRef.current.style.height = `${newHeight}px`;
    }
  };

  useEffect(() => {
    if (textareaRef.current) {
      const computedStyle = window.getComputedStyle(textareaRef.current);
      const computed = parseInt(computedStyle.lineHeight);
      if (!isNaN(computed)) {
        setLineHeight(computed);
      }
    }
    // Initial update
    updateLines();
  }, []);

  useEffect(() => {
    updateLines();
  }, [value, minLines]);

  return (
    <div
      className={clsx(
        "relative flex border border-gray-300 w-full rounded-md overflow-hidden bg-white"
      )}
    >
      {useLine && (
        <div className="bg-gray-50 text-gray-400 px-2 py-2 text-xs text-right select-none border-r border-gray-200">
          {lines.map((line) => (
            <div key={line} className="leading-[20px]">
              {line}
            </div>
          ))}
        </div>
      )}

      <textarea
        {...rest}
        ref={textareaRef}
        value={value}
        onChange={(e) => {
          updateLines();
          onChange?.(e);
        }}
        className={clsx(
          "w-full resize-none font-mono text-sm outline-none p-2",
          "leading-[20px]",
          "scrollbar-custom",
          "placeholder:text-gray-400 ",
          className
        )}
        style={{
          minHeight: `${minLines * lineHeight}px`,
          maxHeight: `${maxLines * lineHeight}px`,
          overflow: "auto",
        }}
      />
    </div>
  );
};

export default Textarea;
