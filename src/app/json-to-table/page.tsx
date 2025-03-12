"use client";

import Header from "@/common/Header";
import Button from "@/components/button";
import Input from "@/components/input";
import Textarea from "@/components/textarea";
import clsx from "clsx";
import { useRef, useState } from "react";
import { FaPaste } from "react-icons/fa";
import { LuCopy, LuCopySlash } from "react-icons/lu";
import { MdClear, MdFilePresent, MdOpenInFull } from "react-icons/md";

const JsonToTable = () => {
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const [widthFull, setWidthFull] = useState(false);
  const [input, setInput] = useState("");

  // ✅ Tự động format JSON khi nhập liệu
  const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const rawInput = e.target.value;
    try {
      const parsed = JSON.parse(rawInput);
      setInput(JSON.stringify(parsed, null, 2)); // Format đẹp
    } catch {
      setInput(rawInput); // Giữ nguyên nếu JSON lỗi
    }
  };

  // ✅ Dán từ clipboard
  const handlePaste = async () => {
    const text = await navigator.clipboard.readText();
    try {
      const parsed = JSON.parse(text);
      setInput(JSON.stringify(parsed, null, 2));
    } catch {
      setInput(text);
    }
  };

  // ✅ Mở file JSON
  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        if (e.target?.result) {
          const text = e.target.result.toString();
          try {
            const parsed = JSON.parse(text);
            setInput(JSON.stringify(parsed, null, 2));
          } catch {
            setInput(text);
          }
        }
      };
      reader.readAsText(file);
    }
  };

  // ✅ Xử lý JSON đầu vào
  const parsedInput = (() => {
    try {
      const data = JSON.parse(input);
      return Array.isArray(data) ? data : [];
    } catch {
      return [];
    }
  })();

  // ✅ Lấy tất cả key trong JSON array
  const allKeys = Array.from(
    new Set(parsedInput.flatMap((item) => Object.keys(item)))
  );

  return (
    <div
      className="flex flex-col rounded-2xl h-full p-2"
      suppressHydrationWarning
    >
      {/* Header */}
      <Header title="JSON Array to Table" />
      <div className="grid grid-cols-2">
        {/* Input */}
        <div className={clsx("mx-1", widthFull && "hidden")}>
          <div className="flex m-2 justify-between">
            <p className="text-xs flex justify-center items-center">Input</p>
            <div className="flex gap-2">
              <Button icon={<LuCopy />} onClick={handlePaste}>
                Paste
              </Button>

              <Input
                type="file"
                inputRef={fileInputRef}
                accept="application/json"
                multiple
                onChange={handleFileUpload}
              />

              <Button
                icon={<MdFilePresent />}
                onClick={() => fileInputRef.current?.click()}
              />
              <Button icon={<MdClear />} onClick={() => setInput("{}")} />
            </div>
          </div>
          <div className="min-h-[calc(95vh-140px)] border-1 ms-2 border-gray-300 rounded-md">
            <Textarea
              hasBorder={false}
              value={input}
              onChange={handleInputChange}
              autoFocus
              placeholder="[]"
            />
          </div>
        </div>

        {/* Output */}
        <div className={clsx("mx-1", widthFull && "w-full col-span-2")}>
          <div className="flex m-2 justify-between">
            <p className="text-xs flex justify-center items-center">Output</p>
            <div className="flex gap-2">
              <Button icon={<LuCopySlash />}>Copy as</Button>
              <Button icon={<FaPaste />}>Paste as</Button>
              <Button
                icon={<MdOpenInFull />}
                onClick={() => setWidthFull(!widthFull)}
              />
            </div>
          </div>

          <div className="relative flex border border-gray-300 w-full rounded-md overflow-auto">
            {parsedInput.length > 0 ? (
              <table className="w-full border-collapse border border-gray-400 text-xs">
                <thead className="bg-gray-200">
                  <tr>
                    {allKeys.map((key) => (
                      <th key={key} className="border border-gray-400 p-2">
                        {key.toUpperCase()}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {parsedInput.map((item, index) => (
                    <tr key={index} className="border-b">
                      {allKeys.map((key) => (
                        <td key={key} className="border border-gray-400 p-2">
                          {typeof item[key] === "boolean"
                            ? item[key]
                              ? "✔️"
                              : "❌"
                            : String(item[key] ?? "")}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            ) : (
              <p className="text-gray-400 text-xs p-2">
                Please provide a valid JSON array of objects
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default JsonToTable;
