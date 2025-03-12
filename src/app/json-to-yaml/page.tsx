"use client";
import Header from "@/common/Header";
import Button from "@/components/button";
import CustomCard from "@/components/card/CusCard";
import Textarea from "@/components/textarea";
import clsx from "clsx";
import { useCallback, useEffect, useState } from "react";
import { FaPaste } from "react-icons/fa";
import { LiaExchangeAltSolid } from "react-icons/lia";
import { LuCopy, LuCopySlash } from "react-icons/lu";
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

  const convertJsonToYaml = useCallback(
    (jsonArray: Record<string, string>[]): string => {
      return jsonArray
        .map((obj) =>
          Object.entries(obj)
            .map(([key, value]) => `${key}: ${String(value)}`)
            .join("\n")
        )
        .join("\n");
    },
    []
  );

  useEffect(() => {
    try {
      const parsedInput = JSON.parse(input);
      setOutput(convertJsonToYaml(parsedInput));
    } catch {
      setOutput("");
    }
  }, [input, convertJsonToYaml]);

  return (
    <div className="flex flex-col rounded-2xl h-full p-2">
      {/* Header  */}
      <Header title="JSON Array to YAML" />
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
          <div className="min-h-[calc(85vh-140px)] border-1 ms-2 border-gray-300 rounded-md">
            <Textarea
              hasBorder={false}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Type your Input Array..."
            />
          </div>
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
          <div className="cursor-not-allowed min-h-[calc(85vh-140px)] border-1 ms-2 border-gray-300 rounded-md">
            <Textarea hasBorder={false} value={output} readOnly />
          </div>
        </div>
      </div>
    </div>
  );
};

export default JsonToYaml;
