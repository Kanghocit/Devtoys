"use client";

import Button from "@/components/button";
import CustomCard from "@/components/Card/CusCard";
import Switch from "@/components/switch";
import Textarea from "@/components/textarea";
import clsx from "clsx";
import React, { useState } from "react";
import { FaRegPaste } from "react-icons/fa6";
import { FiSave } from "react-icons/fi";
import { LiaExchangeAltSolid } from "react-icons/lia";
import { LuStar } from "react-icons/lu";
import { MdClear, MdOpenInFull } from "react-icons/md";
import { PiArrowsInLineHorizontal } from "react-icons/pi";

const Compare = () => {
  const [theme, setTheme] = useState("Dark");
  const [output, setOutput] = useState("");
  return (
    <div className="flex flex-col rounded-2xl h-full p-2">
      {/* Header */}
      <div className="flex justify-between">
        <p className="font-bold text-2xl m-2">Text Comparer</p>
        <div className="flex items-center gap-2">
          <Button icon={<LuStar />} className="flex items-center text-xs">
            Add to favorites
          </Button>
        </div>
      </div>
      <CustomCard title="Inline Mode" icon={<PiArrowsInLineHorizontal />}>
        <Switch
          valueTrue="On"
          valueFalse="Off"
          //   onToggle={() => setIsEncode(!isEncode)}
        />
      </CustomCard>

      <div className="flex flex-col rounded-lg p-4 ">
        {/* Input */}
        <div className="grid grid-cols-2 gap-2">
          <div className="flex flex-col  my-1">
            <div className="flex justify-between items-center">
              <p className="text-xs">A</p>
              <div className="flex gap-2">
                <Button icon={<FaRegPaste />}>Paste</Button>
                <Button icon={<FiSave />} />
                <Button
                  icon={<MdClear />}
                  // onClick={() => setInputTextB("")}
                />
              </div>
            </div>
            <Textarea
              className="w-full h-130 mt-1"
              // value={inputTextA}
              // onChange={(e) => setInputTextA(e.target.value)}
            />
          </div>
          <div className="flex flex-col  my-1">
            <div className="flex justify-between items-center">
              <p className="text-xs">Input</p>
              <div className="flex gap-2">
                <Button icon={<FaRegPaste />}>Paste</Button>
                <Button icon={<FiSave />} />
                <Button
                  icon={<MdClear />}
                  // onClick={() => setInputTextB("")}
                />
              </div>
            </div>
            <Textarea
              className="w-full h-130 mt-1"
              // value={inputTextB}
              // onChange={(e) => setInputTextB(e.target.value)}
            />
          </div>
        </div>
      </div>
      <div className="mx-2">
        <div className="flex mx-2 justify-between">
          <p className="text-xs flex justify-center items-center ">Preview</p>
        </div>
        <div
          className={clsx(
            "min-h-130 p-3 border-1 border-gray-300 rounded-md",
            theme === "Dark" ? "bg-gray-600 text-white" : "bg-white text-black"
          )}
          dangerouslySetInnerHTML={{ __html: output }}
        />
      </div>
    </div>
  );
};

export default Compare;
