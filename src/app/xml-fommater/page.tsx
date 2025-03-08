"use client";
import Header from "@/common/Header";
import CustomCard from "@/components/Card/CusCard";
import Switch from "@/components/switch";
import { useState } from "react";
import { LuLanguages } from "react-icons/lu";
import { MdOutlineSpaceBar } from "react-icons/md";

const XMLFormatter = () => {
  const [indentation, setIndentation] = useState<
    "2 spaces" | "4 spaces" | "1 tab" | "Minified"
  >("2 spaces");
  const [newLine, setNewLine] = useState<"Before" | "After">("Before");
  console.log("Khang", indentation);
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
        <Switch valueTrue="On" valueFalse="Off" />
      </CustomCard>
    </div>
  );
};

export default XMLFormatter;
