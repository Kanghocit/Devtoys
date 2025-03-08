"use client";
import clsx from "clsx";
import { useEffect, useRef, useState } from "react";

type TextareaProps = React.ComponentPropsWithoutRef<"textarea"> & {
  kind?: "default" | "hide";
  useLine?: boolean;
  minLines?: number;
  maxLines?: number;
};

const Textarea: React.FC<TextareaProps> = ({
  className,
  kind = "default",
  useLine = true,
  minLines = 1,
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
      textareaRef.current.style.height = "0"; // Reset height first
      const scrollHeight = textareaRef.current.scrollHeight;
      const newHeight = Math.min(
        Math.max(scrollHeight, minLines * lineHeight),
        maxLines * lineHeight
      );
      textareaRef.current.style.height = `${newHeight}px`;
    }
  };

  // Xử lý sự kiện paste
  const handlePaste = () => {
    // Đợi một tick để nội dung được paste vào textarea
    setTimeout(updateLines, 0);
  };

  useEffect(() => {
    if (textareaRef.current) {
      const computedStyle = window.getComputedStyle(textareaRef.current);
      const computed = parseInt(computedStyle.lineHeight);
      if (!isNaN(computed)) {
        setLineHeight(computed);
      }
    }
    updateLines();
  }, []);

  useEffect(() => {
    updateLines();
  }, [value, minLines]);

  const textareaClass = clsx(
    "relative flex border border-gray-300 w-full rounded-md overflow-hidden bg-white",
    kind === "hide" && "border-none bg-gray-300"
  );
  return (
    <div className={textareaClass}>
      {useLine && (
        <div className=" text-gray-400 px-2 py-2 text-xs text-right select-none ">
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
          onChange?.(e);
          updateLines();
        }}
        onPaste={handlePaste}
        className={clsx(
          "w-full resize-none font-mono text-sm outline-none p-2",
          "leading-[20px]",
          "scrollbar-custom",
          "placeholder:text-gray-400",
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
