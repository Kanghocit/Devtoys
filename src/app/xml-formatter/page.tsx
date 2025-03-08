"use client";
import Header from "@/common/Header";
import Button from "@/components/button";
import CustomCard from "@/components/Card/CusCard";
import Switch from "@/components/switch";
import Textarea from "@/components/textarea";
import clsx from "clsx";
import { useState } from "react";
import { FaPaste } from "react-icons/fa";
import { LuCopy, LuCopySlash, LuLanguages } from "react-icons/lu";
import {
  MdClear,
  MdFilePresent,
  MdOpenInFull,
  MdOutlineSpaceBar,
} from "react-icons/md";

const XMLFormatter = () => {
  const [indentation, setIndentation] = useState<
    "2 spaces" | "4 spaces" | "1 tab" | "Minified"
  >("2 spaces");
  const [newLine, setNewLine] = useState(false);
  const [widthFull, setWidthFull] = useState(false);

  console.log("KhangIndentation", indentation);
  console.log("KhangNewLine", newLine);

  return (
    <div className="flex flex-col rounded-2xl h-full p-2">
      <Header title="XML Formatter" />
      <p className="text-xs ms-2">Configuration</p>
      <CustomCard title="Indentation" icon={<MdOutlineSpaceBar />}>
        <select
          className="border border-gray-300 rounded-md p-1 text-sm focus:outline-none"
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
        subTitle="Where to put attribute on a new line "
        icon={<LuLanguages />}
      >
        <Switch
          valueTrue="On"
          valueFalse="Off"
          onToggle={() => setNewLine(!newLine)}
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
              <Button
                icon={<LuCopy />}
                // onClick={handlePaste}
              >
                Paste
              </Button>
              <Button
                icon={<MdFilePresent />}
                onClick={() => document.getElementById("sql-input")?.click()}
              />
              <input
                id="sql-input"
                type="file"
                className="hidden"
                accept=".sql,.txt"
                // onChange={handleFileUpload}
              />
              <Button
                icon={<MdClear />}
                // onClick={() => setInput("")}
              />
            </div>
          </div>

          <Textarea
            // value={input}
            className="min-h-265"
            // onChange={(e) => setInput(e.target.value)}
            placeholder="Enter your SQL query..."
          />
        </div>

        {/* Output */}
        <div className={clsx("mx-1 h-full", widthFull && "w-full col-span-2")}>
          <div className="flex m-2 justify-between">
            <p className="text-xs flex justify-center items-center">Output</p>
            <div className="flex gap-2">
              <Button
                icon={<LuCopySlash />}
                // onClick={handleCopy}
              >
                Copy
              </Button>
              <Button
                icon={<FaPaste />}
                // onClick={handlePaste}
              >
                Paste as
              </Button>
              <Button
                icon={<MdOpenInFull />}
                onClick={() => setWidthFull(!widthFull)}
              />
            </div>
          </div>
          <Textarea
            // value={output}
            readOnly
            className="min-h-265 cursor-not-allowed"
          />
        </div>
      </div>
    </div>
  );
};

export default XMLFormatter;
