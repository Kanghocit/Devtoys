"use client";
import { useState, useRef, useEffect } from "react";

const TextAreaWithLineNumbers = ({ readOnly }: { readOnly: boolean }) => {
  const [lines, setLines] = useState<number[]>([1]);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  // Cập nhật số dòng khi nhập
  const updateLines = () => {
    const lineCount = textareaRef.current?.value.split("\n").length || 1;
    setLines(Array.from({ length: lineCount }, (_, i) => i + 1));
  };

  useEffect(() => {
    updateLines(); // Gọi ngay khi render
  }, []);

  return (
    <div className="relative flex border-1 border-gray-300 w-full rounded-md">
      {/* Số dòng */}
      <div className="bg-gray-100 text-gray-500 text-xs text-right p-1  ">
        {lines.map((line) => (
          <div key={line} className="h-5 leading-5">
            {line}
          </div>
        ))}
      </div>

      {/* Textarea */}
      <textarea
        ref={textareaRef}
        className="w-full min-h-150 resize-none p-2 font-mono text-sm outline-none"
        onInput={updateLines}
        readOnly={readOnly}
      />
    </div>
  );
};

export default TextAreaWithLineNumbers;
