"use client";
import Button from "@/components/button";
import Textarea from "@/components/textarea";
import clsx from "clsx";
import { useRef, useState } from "react";
import { FaBusinessTime, FaPaste } from "react-icons/fa";
import { LuCopy, LuCopySlash, LuStar } from "react-icons/lu";
import { MdClear, MdFilePresent, MdOpenInFull } from "react-icons/md";

const JsonToTable = () => {
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const [widthFull, setWidthFull] = useState(false);
  const [input, setInput] = useState("");
  console.log(input);

  // ✅ Parse JSON input
  const parsedInput = (() => {
    try {
      const data = JSON.parse(input);
      return Array.isArray(data) ? data : []; // Chỉ chấp nhận JSON array
    } catch {
      return [];
    }
  })();

  return (
    <div className="flex flex-col rounded-2xl h-full p-2">
      {/* Header */}
      <div className="flex justify-between">
        <p className="font-bold text-2xl m-2">JSON Array to Table</p>
        <div className="flex items-center gap-2">
          <Button icon={<LuStar />} className="flex items-center text-xs">
            Add to favorites
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-2">
        {/* Input */}
        <div className={clsx("mx-1", widthFull && "hidden")}>
          <div className="flex m-2 justify-between">
            <p className="text-xs flex justify-center items-center">Input</p>
            <div className="flex gap-2">
              <Button icon={<FaBusinessTime />} />
              <Button icon={<LuCopy />}>Paste</Button>
              <input type="file" ref={fileInputRef} className="hidden" />
              <Button icon={<MdFilePresent />} />
              <Button icon={<MdClear />} onClick={() => setInput("")} />
            </div>
          </div>
          <Textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            className="min-h-320"
          />
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
                    {Object.keys(parsedInput[0]).map((key) => (
                      <th key={key} className="border border-gray-400 p-2">
                        {key.toUpperCase()}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {parsedInput.map((item, index) => (
                    <tr key={index} className="border-b">
                      {Object.keys(parsedInput[0]).map((key) => (
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
                Enter a valid JSON array...
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default JsonToTable;
