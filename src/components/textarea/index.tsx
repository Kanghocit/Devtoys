"use client";
import clsx from "clsx";
import { useEffect, useRef, useState } from "react";

type TextareaProps = React.ComponentPropsWithoutRef<"textarea">;

const Textarea: React.FC<TextareaProps> = ({ className, ...rest }) => {
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const [lines, setLines] = useState<number[]>([1]);

  const updateLines = () => {
    if (textareaRef.current) {
      const lineCount = textareaRef.current.value.split("\n").length;
      setLines(Array.from({ length: lineCount }, (_, i) => i + 1));
    }
  };

  // Gọi updateLines khi component render
  useEffect(() => {
    updateLines();
  }, []);

  return (
    <div
      className={clsx(
        "relative flex border border-gray-300 w-full rounded-md",
        className
      )}
    >
      {/* Số dòng bên trái */}
      <div className="bg-gray-100 text-gray-500 text-xs text-right p-1">
        {lines.map((line) => (
          <div key={line} className="h-5 leading-5">
            {line}
          </div>
        ))}
      </div>

      {/* Textarea */}
      <textarea
        {...rest}
        ref={textareaRef}
        className={clsx(
          "w-full min-h-135 resize-none px-1 font-mono text-sm outline-none",
          className
        )}
        onInput={updateLines} // Cập nhật số dòng mỗi khi nhập
      />
    </div>
  );
};

export default Textarea;
