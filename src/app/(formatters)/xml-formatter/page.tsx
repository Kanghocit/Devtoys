"use client";
import Header from "@/common/Header";
import Button from "@/components/button";
import CustomCard from "@/components/card/CustomCard";
import Input from "@/components/input";
import Switch from "@/components/switch";
import Textarea from "@/components/textarea";
import clsx from "clsx";
import { useState, useCallback, useEffect } from "react";
import { FaPaste } from "react-icons/fa";
import { LuCopy, LuCopySlash, LuLanguages } from "react-icons/lu";
import {
  MdClear,
  MdFilePresent,
  MdOpenInFull,
  MdOutlineSpaceBar,
} from "react-icons/md";
import vkbeautify from "vkbeautify";

const XMLFormatter = () => {
  const [indentation, setIndentation] = useState<
    "2 spaces" | "4 spaces" | "1 tab" | "Minified"
  >("2 spaces");
  const [newLine, setNewLine] = useState(false);
  const [widthFull, setWidthFull] = useState(false);
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");

  const formatWithNewlineAttributes = (
    xml: string,
    indent: number | string
  ) => {
    // Đầu tiên format XML bình thường
    let formatted = vkbeautify.xml(xml, indent);

    if (newLine) {
      // Regex để tìm các attributes
      const attrRegex = /(<\w+)([^>]*?)(\/?>)/g;

      formatted = formatted.replace(attrRegex, (match, start, attrs, end) => {
        // Nếu không có attributes, trả về nguyên bản
        if (!attrs.trim()) return match;

        // Tách các attributes
        const attributes = attrs.trim().split(/\s+/);

        // Tạo indent dựa vào loại indent đã chọn
        const indentStr =
          typeof indent === "number" ? " ".repeat(indent) : indent;

        // Join các attributes với newline và indent
        const formattedAttrs = attributes
          .join("\n" + indentStr)
          .replace(/^\s+/, ""); // Xóa khoảng trắng đầu tiên

        return `${start}\n${indentStr}${formattedAttrs}${end}`;
      });
    }

    return formatted;
  };

  const handleFormat = useCallback(() => {
    try {
      switch (indentation) {
        case "2 spaces":
          setOutput(formatWithNewlineAttributes(input, 2));
          break;
        case "4 spaces":
          setOutput(formatWithNewlineAttributes(input, 4));
          break;
        case "1 tab":
          setOutput(formatWithNewlineAttributes(input, "\t"));
          break;
        case "Minified":
          setOutput(input.replace(/\s+/g, ""));
          break;
      }
    } catch (error) {
      console.error("Error formatting XML:", error);
      setOutput("Error: Invalid XML format");
    }
  }, [input, indentation, newLine, formatWithNewlineAttributes]);

  useEffect(() => {
    handleFormat();
  }, [handleFormat]);

  const handlePaste = async () => {
    try {
      const text = await navigator.clipboard.readText();
      setInput(text);
    } catch (err) {
      console.error("Error pasting from clipboard:", err);
    }
  };

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(output);
    } catch (err) {
      console.error("Error copying to clipboard:", err);
    }
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (e) => {
      setInput(e.target?.result as string);
    };
    reader.readAsText(file);
  };

  return (
    <div className="flex flex-col rounded-2xl h-full p-2">
      <Header title="XML Formatter" />
      <p className="text-sm font-semibold ms-2 mt-2">Configuration</p>

      <CustomCard title="Indentation" icon={<MdOutlineSpaceBar />}>
        <select
          className="border border-gray-300 rounded-md p-1 text-sm focus:outline-none py-2"
          value={indentation}
          onChange={(e) => setIndentation(e.target.value as typeof indentation)}
        >
          <option value="2 spaces">2 spaces</option>
          <option value="4 spaces">4 spaces</option>
          <option value="1 tab">1 tab</option>
          <option value="Minified">Minified</option>
        </select>
      </CustomCard>

      <CustomCard
        title="Put attributes on new line"
        subTitle="Where to put attribute on a new line"
        icon={<LuLanguages />}
      >
        <Switch
          valueTrue="On"
          valueFalse="Off"
          onToggle={() => setNewLine(!newLine)}
        />
      </CustomCard>

      {/* Input */}
      <div className={clsx("mx-1", widthFull && "hidden")}>
        <div
          className={clsx(
            "flex justify-between my-2",
            widthFull ? "hidden" : ""
          )}
        >
          <div className="flex justify-center items-end">
            <p className="text-sm font-semibold">Input</p>
          </div>
          <div className="flex gap-2">
            <Button icon={<LuCopy />} onClick={handlePaste}>
              Paste
            </Button>
            <Button
              icon={<MdFilePresent />}
              onClick={() => document.getElementById("xml-input")?.click()}
            />

            <Input type="file" accept=".xml,.txt" onChange={handleFileUpload} />

            <Button icon={<MdClear />} onClick={() => setInput("")} />
          </div>
        </div>

        <Textarea
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Enter your XML here..."
        />
      </div>

      {/* Output */}
      <div className={clsx("mx-1 h-full", widthFull && "w-full col-span-2")}>
        <div className="flex justify-between my-2">
          <div className="flex justify-center items-end gap-2">
            <p className="text-sm font-semibold">Output</p>
          </div>
          <div className="flex gap-2">
            <Button icon={<LuCopySlash />} onClick={handleCopy}>
              Copy
            </Button>
            <Button icon={<FaPaste />} onClick={handlePaste}>
              Paste as
            </Button>
            <Button
              icon={<MdOpenInFull />}
              onClick={() => setWidthFull(!widthFull)}
            />
          </div>
        </div>
        <Textarea value={output} readOnly className="cursor-not-allowed" />
      </div>
    </div>
  );
};

export default XMLFormatter;
