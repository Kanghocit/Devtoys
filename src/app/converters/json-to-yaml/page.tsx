"use client";
import Button from "@/components/button";
import CustomCard from "@/components/Card/CusCard";
import Textarea from "@/components/textarea";
import clsx from "clsx";
import { useEffect, useState } from "react";
import { FaPaste } from "react-icons/fa";
import { LiaExchangeAltSolid } from "react-icons/lia";
import { LuCopy, LuCopySlash, LuStar } from "react-icons/lu";
import {
  MdClear,
  MdFilePresent,
  MdOpenInFull,
  MdOutlineSpaceBar,
} from "react-icons/md";

const JsonToYaml = () => {
  const [widthFull, setWidthFull] = useState(false);
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");

  const convertJsonToYaml = (jsonArray: Record<string, any>[]): string =>
    jsonArray
      .map((obj) =>
        Object.entries(obj)
          .map(([key, value]) => `${key}: ${String(value)}`)
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
  }, [input, yamlOutput]);

  return (
    <div className="flex flex-col rounded-2xl h-full p-2">
      {/* Header  */}
      <div className="flex justify-between">
        <p className="font-bold text-2xl m-2">JSON Array to YAML</p>
        <div className="flex items-center gap-2">
          <Button icon={<LuStar />} className="flex items-center text-xs">
            Add to favorites
          </Button>
        </div>
      </div>
      <p className="text-xs ms-2">Configuration</p>

      <CustomCard title="Conversion" icon={<LiaExchangeAltSolid />}>
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

          <Textarea value={input} onChange={(e) => setInput(e.target.value)} />
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
