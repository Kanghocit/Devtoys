"use client";
import Button from "@/components/button";
import Header from "@/common/Header";
import CustomCard from "@/components/card/CusCard";
import Switch from "@/components/switch";
import Textarea from "@/components/textarea";
import { useCallback, useEffect, useRef, useState } from "react";
import { BsSortAlphaDown } from "react-icons/bs";
import { FaPaste } from "react-icons/fa";
import { LuCopy, LuCopySlash } from "react-icons/lu";
import {
  MdClear,
  MdFilePresent,
  MdOpenInFull,
  MdOutlineSpaceBar,
} from "react-icons/md";
import { formatJson } from "@/utils/jsonUtils";

const JsonFormatter = () => {
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const [widthFull, setWidthFull] = useState(false);
  const [formatOptions, setFormatOptions] = useState<
    "2 spaces" | "4 spaces" | "1 tab" | "Minified"
  >("2 spaces");
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [sortOptions, setSortOptions] = useState(false);

  // Hàm dán từ clipboard
  const handlePaste = useCallback(async () => {
    try {
      const text = await navigator.clipboard.readText();
      setInput(text);
    } catch (err) {
      console.error("Lỗi khi dán từ clipboard:", err);
    }
  }, []);

  // Hàm mở file JSON
  const handleOpenFile = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      const file = event.target.files?.[0];
      if (!file) return;

      const reader = new FileReader();
      reader.onload = (e) => {
        if (!e.target?.result) return;
        setInput(e.target.result.toString());
      };
      reader.readAsText(file);
    },
    []
  );

  // Cập nhật JSON mỗi khi input, formatOptions hoặc sortOptions thay đổi
  useEffect(() => {
    setOutput(formatJson(input, formatOptions, sortOptions));
  }, [input, formatOptions, sortOptions]);

  return (
    <div className="flex flex-col rounded-2xl h-full p-2">
      <Header title="JSON Formatter" />
      <p className="text-xs ms-2">Configuration</p>

      {/* Cấu hình format */}
      <CustomCard title="Indentation" icon={<MdOutlineSpaceBar />}>
        <select
          className="border border-gray-300 rounded-md p-1 text-sm focus:outline-none"
          onChange={(e) =>
            setFormatOptions(
              e.target.value as "2 spaces" | "4 spaces" | "1 tab" | "Minified"
            )
          }
        >
          <option value="2 spaces">2 spaces</option>
          <option value="4 spaces">4 spaces</option>
          <option value="1 tab">1 tab</option>
          <option value="Minified">Minified</option>
        </select>
      </CustomCard>

      {/* Sắp xếp JSON theo bảng chữ cái */}
      <CustomCard
        title="Sort JSON Properties Alphabetically"
        icon={<BsSortAlphaDown />}
      >
        <Switch
          valueTrue="On"
          valueFalse="Off"
          onToggle={() => setSortOptions(!sortOptions)}
        />
      </CustomCard>

      <div className="grid grid-cols-2">
        {/* Input */}
        <div className={`${widthFull ? "hidden" : "mx-1"}`}>
          <div className="flex m-2 justify-between">
            <p className="text-xs">Input</p>
            <div className="flex gap-2">
              <Button icon={<LuCopy />} onClick={handlePaste}>
                Paste
              </Button>
              <input
                type="file"
                ref={fileInputRef}
                className="hidden"
                onChange={handleOpenFile}
                accept="application/json"
              />
              <Button
                icon={<MdFilePresent />}
                onClick={() => fileInputRef.current?.click()}
              />
              <Button icon={<MdClear />} onClick={() => setInput("")} />
            </div>
          </div>
          <Textarea
            value={input}
            className="min-h-265"
            onChange={(e) => setInput(e.target.value)}
            placeholder="Type your JSON data..."
          />
        </div>

        {/* Output */}
        <div className={`${widthFull ? "w-full col-span-2" : "mx-1 h-full"}`}>
          <div className="flex m-2 justify-between">
            <p className="text-xs">Output</p>
            <div className="flex gap-2">
              <Button icon={<LuCopySlash />}>Copy as</Button>
              <Button icon={<FaPaste />}>Paste as</Button>
              <Button
                icon={<MdOpenInFull />}
                onClick={() => setWidthFull(!widthFull)}
              />
            </div>
          </div>
          <Textarea
            value={output}
            readOnly
            className="min-h-265 cursor-not-allowed"
          />
        </div>
      </div>
    </div>
  );
};

export default JsonFormatter;
