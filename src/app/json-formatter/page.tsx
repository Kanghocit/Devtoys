"use client";
import Button from "@/components/button";
import CustomCard from "@/components/Card/CusCard";
import Switch from "@/components/switch";
import Textarea from "@/components/textarea";
import clsx from "clsx";
import { useCallback, useEffect, useState } from "react";
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
  const [widthFull, setWidthFull] = useState(false);
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");

  

  return (
    <div className="flex flex-col rounded-2xl h-full p-2">
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
        <select className="border border-gray-300 rounded-md p-1 text-sm focus:outline-none">
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
          //   onToggle={() => setIsEncode(!isEncode)}
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
              <Button icon={<LuCopy />}>Paste</Button>
              <Button icon={<MdFilePresent />} />
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
