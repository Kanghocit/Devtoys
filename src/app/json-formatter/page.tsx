"use client";
import Button from "@/components/button";
import CustomCard from "@/components/Card/CusCard";
import Switch from "@/components/switch";
import Textarea from "@/components/textarea";
import clsx from "clsx";
import { useEffect, useRef, useState } from "react";
import { BsSortAlphaDown } from "react-icons/bs";
import { FaPaste } from "react-icons/fa";
import { LuCopy, LuCopySlash, LuStar } from "react-icons/lu";
import {
  MdClear,
  MdFilePresent,
  MdOpenInFull,
  MdOutlineSpaceBar,
} from "react-icons/md";

const JsonFormatter = () => {
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const [widthFull, setWidthFull] = useState(false);
  const [formatOptions, setFormatOptions] = useState("2 spaces");
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [sortOptions, setSortOptions] = useState(false);

  // Dán từ clipboard
  const handlePaste = async () => {
    const text = await navigator.clipboard.readText();
    try {
      const parsed = JSON.parse(text);
      setInput(JSON.stringify(parsed));
    } catch {
      setInput(text);
    }
  };

  // Mở file JSON đầu vào
  const handleOpenFile = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        if (e.target?.result) {
          const text = e.target.result.toString();
          try {
            const parsed = JSON.parse(text);
            setInput(JSON.stringify(parsed));
          } catch {
            setInput(text);
          }
        }
      };
      reader.readAsText(file);
    }
  };
  const sortJsonKeys = (obj: any): any => {
    if (Array.isArray(obj)) {
      return obj.map(sortJsonKeys); // Nếu là mảng, sắp xếp từng object bên trong
    } else if (typeof obj === "object" && obj !== null) {
      return Object.keys(obj)
        .sort()
        .reduce((acc, key) => {
          acc[key] = sortJsonKeys(obj[key]); // Đệ quy vào object con
          return acc;
        }, {} as any);
    }
    return obj; // Nếu không phải object hoặc array thì giữ nguyên
  };

  const formatJson = (
    input: string,
    type: "2 spaces" | "4 spaces" | "1 tab" | "Minified"
  ) => {
    try {
      let parsed = JSON.parse(input);

      if (sortOptions) {
        parsed = sortJsonKeys(parsed);
      }

      
      switch (type) {
        case "2 spaces":
          setOutput(JSON.stringify(parsed, null, 2));
          break;
        case "4 spaces":
          setOutput(JSON.stringify(parsed, null, 4));
          break;
        case "1 tab":
          setOutput(JSON.stringify(parsed, null, "\t"));
          break;
        case "Minified":
          setOutput(JSON.stringify(parsed));
          break;
        default:
          setOutput(JSON.stringify(parsed, null, 2));
      }
    } catch {
      setOutput(input);
    }
  };

  // Cập nhật useEffect để theo dõi thay đổi của sortOptions
  useEffect(() => {
    formatJson(
      input,
      formatOptions as "2 spaces" | "4 spaces" | "1 tab" | "Minified"
    );
  }, [input, formatOptions, sortOptions]); 


  return (
    <div
      className="flex flex-col rounded-2xl h-full p-2"
      suppressHydrationWarning
    >
      {/* Header  */}
      <div className="flex justify-between">
        <p className="font-bold text-2xl m-2">JSON Formatter</p>
        <div className="flex items-center gap-2">
          <Button icon={<LuStar />} className="flex items-center text-xs">
            Add to favorites
          </Button>
        </div>
      </div>
      <p className="text-xs ms-2">Configuration</p>

      <CustomCard title="Indentation" icon={<MdOutlineSpaceBar />}>
        <select
          className="border border-gray-300 rounded-md p-1 text-sm focus:outline-none"
          onChange={(e) => setFormatOptions(e.target.value)}
        >
          <option value="2 spaces">2 spaces</option>
          <option value="4 spaces">4 spaces</option>
          <option value="1 tab">1 tab</option>
          <option value="Minified">Minified</option>
        </select>
      </CustomCard>
      <CustomCard
        title="Sort JSON Properties alplabetically"
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
        <div className={clsx("mx-1", widthFull && "hidden")}>
          <div
            className={clsx(
              "flex m-2 justify-between",
              widthFull ? "hidden" : ""
            )}
          >
            <p className="text-xs flex justify-center items-center">Input</p>
            <div className="flex gap-2">
              <Button icon={<LuCopy />} onClick={handlePaste}>
                Paste
              </Button>
              <input
                type="file"
                ref={fileInputRef}
                className="hidden"
                onChange={handleOpenFile}
                accept="application"
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

        <div className={clsx("mx-1 h-full", widthFull && "w-full col-span-2")}>
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
