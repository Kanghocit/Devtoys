"use client";
import Button from "@/components/button";
import CustomCard from "@/components/Card/CusCard";
import Switch from "@/components/switch";
import Textarea from "@/components/textarea";
import { useCallback, useEffect, useState } from "react";
import { FaRegPaste } from "react-icons/fa6";
import { FiSave } from "react-icons/fi";
import { LiaExchangeAltSolid } from "react-icons/lia";
import { LuStar } from "react-icons/lu";
import { MdClear } from "react-icons/md";

const EscapeUnescape = () => {
  const [inputText, setInputText] = useState("");
  const [outputText, setOutputText] = useState("");
  const [isEscape, setIsEscape] = useState(true);

  const handleConversion = useCallback(() => {
    try {
      if (isEscape) {
        setOutputText(JSON.stringify(inputText));
      } else {
        setOutputText(JSON.parse(inputText));
      }
    } catch (error) {
      setOutputText("Invalid input");
    }
  }, [inputText, isEscape]);

  useEffect(() => {
    handleConversion();
  }, [handleConversion]);

  return (
    <div className="flex flex-col rounded-2xl h-full p-2">
      {/* Header  */}
      <div className="flex justify-between">
        <p className="font-bold text-2xl m-2">Text Escape / Unescape</p>
        <div className="flex items-center gap-2">
          <Button icon={<LuStar />} className="flex items-center text-xs">
            Add to favorites
          </Button>
        </div>
      </div>

      <p className="text-xs ms-2">Configuration</p>

      <CustomCard
        title="Conversion"
        icon={<LiaExchangeAltSolid />}
        subTitle="Select which conversion mode you want to use"
      >
        <Switch
          valueTrue="Escape"
          valueFalse="Unescape"
          onToggle={() => setIsEscape(!isEscape)}
        />
      </CustomCard>

      <div className="flex flex-col mt-4 overflow-hidden">
        <div className="flex flex-col rounded-lg p-4 ">
          {/* Input */}
          <div className="flex flex-col  my-1">
            <div className="flex justify-between items-center">
              <p className="text-xs">Input</p>
              <div className="flex gap-2">
                <Button icon={<FaRegPaste />}>Paste</Button>
                <Button icon={<FiSave />} />
                <Button icon={<MdClear />} onClick={() => setInputText("")} />
              </div>
            </div>
            <Textarea
              className="w-full h-130 mt-1"
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              placeholder={
                !isEscape ? "Enter text to escape" : "Enter text to unescape"
              }
            />
          </div>

          {/* Output */}
          <div className="flex flex-col mt-4">
            <div className="flex justify-between items-center">
              <p className="text-xs">Output</p>
              <div className="flex gap-2">
                <Button icon={<FiSave />} />
                <Button icon={<MdClear />} onClick={() => setOutputText("")} />
              </div>
            </div>
            <Textarea
              className="w-full h-130 mt-1 cursor-not-allowed"
              value={outputText}
              readOnly
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default EscapeUnescape;
