"use client";
import { LuCopySlash } from "react-icons/lu";
import { MdOpenInFull } from "react-icons/md";
import Button from "@/components/button";
import Textarea from "@/components/textarea";
import clsx from "clsx";
import { useEffect, useRef, useState } from "react";
import { LuCopy, LuStar } from "react-icons/lu";
import { MdClear, MdFilePresent } from "react-icons/md";
import { FaPaste, FaRegClock } from "react-icons/fa";
import CustomCard from "@/components/Card/CusCard";
import { FaExchangeAlt } from "react-icons/fa";
import { MdOutlineSpaceBar } from "react-icons/md";

const JsonToYaml = () => {
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const [widthFull, setWidthFull] = useState(false);
  const [input, setInput] = useState("");
  //   const [lines, setLines] = useState<number[]>([1]);
  const [output, setOutput] = useState("");
  //   const updateLines = () => {
  //     const lineCount = textareaRef.current?.value.split("\n").length || 1;
  //     setLines(Array.from({ length: lineCount }, (_, i) => i + 1));
  //   };

  //   useEffect(() => {
  //     updateLines();
  //   }, []);

  //   xử lý chuyển đổi từ json sang yaml
  const convertJsonToYaml = (jsonArray: any[]): string =>
    jsonArray
      .map((obj) =>
        Object.entries(obj)
          .map(
            ([key, value]) =>
              `${key} : ${typeof value === "string" ? value : String(value)}`
          )
          .join("\n")
      )
      .join("\n");

  const parsedInput = (() => {
    try {
      return JSON.parse(input);
    } catch {
      return [];
    }
  })();
  const yamlOutput = input ? convertJsonToYaml(parsedInput) : "";
  useEffect(() => {
    setOutput(yamlOutput);
  }, [input]);

  return (
    <div className="flex flex-col rounded-2xl h-full p-2">
      {/* Header  */}
      <div className="flex justify-between">
        <p className="font-bold text-2xl m-2">JSON Array to YAML</p>
        <div>
          <Button icon={<LuStar />} className="flex items-center text-xs">
            Add to favorites
          </Button>
        </div>
      </div>

      <CustomCard title="Conversion" icon={<FaExchangeAlt />}>
        <select className="border border-gray-300 rounded-md p-1 text-sm focus:outline-none">
          <option value="JSON to YAML">JSON to YAML</option>
          <option value="YAML to JSON">YAML to JSON</option>
        </select>
      </CustomCard>
      <CustomCard title="Indentation" icon={<MdOutlineSpaceBar />}>
        <select className="border border-gray-300 rounded-md p-1 text-sm focus:outline-none">
          <option value="2 spaces">2 spaces</option>
          <option value="4 spaces">4 spaces</option>
        </select>
      </CustomCard>

      {/* Input */}
      <div className="grid grid-cols-2">
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
            // onInput={updateLines}
            value={input}
            onChange={(e) => setInput(e.target.value)}
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
          <Textarea
            // onInput={updateLines}
            value={output}
            onChange={(e) => setInput(e.target.value)}
            readOnly
            className="cursor-not-allowed"
          />
        </div>
      </div>
    </div>
  );
};

export default JsonToYaml;
