"use client";
import Header from "@/common/Header";
import Button from "@/components/button";
import CustomCard from "@/components/card/CustomCard";
import Switch from "@/components/switch";
import Textarea from "@/components/textarea";
import { useCallback, useEffect, useState } from "react";
import { FaRegPaste } from "react-icons/fa6";
import { FiSave } from "react-icons/fi";
import { LiaExchangeAltSolid } from "react-icons/lia";
import { MdClear } from "react-icons/md";

const HtmlText = () => {
  const [inputText, setInputText] = useState("");
  const [outputText, setOutputText] = useState("");
  const [isEncode, setIsEncode] = useState(true);

  const htmlEncode = (text: string) => {
    return text
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&#039;");
  };
  const htmlDecode = (text: string) => {
    return text
      .replace(/&amp;/g, "&")
      .replace(/&lt;/g, "<")
      .replace(/&gt;/g, ">");
  };
  const handleConversion = useCallback(() => {
    if (isEncode) {
      setOutputText(htmlEncode(inputText));
    } else {
      setOutputText(htmlDecode(inputText));
    }
  }, [inputText, isEncode]);

  useEffect(() => {
    handleConversion();
  }, [handleConversion]);

  return (
    <div className="flex flex-col rounded-2xl h-full p-2">
      {/* Header  */}
      <Header title="HTML Text Encoder / Decoder" />

      <p className="text-sm font-semibold ms-2">Configuration</p>

      <CustomCard
        title="Conversion"
        icon={<LiaExchangeAltSolid />}
        subTitle="Select which conversion mode you want to use"
      >
        <Switch
          valueTrue="Encode"
          valueFalse="Decode"
          onToggle={() => setIsEncode(!isEncode)}
        />
      </CustomCard>

      <div className="flex flex-col mt-4 overflow-hidden">
        <div className="flex flex-col rounded-lg pe-2 ">
          {/* Input */}
          <div className="flex flex-col my0-1">
            <div className="flex justify-between items-center">
              <p className="text-sm font-semibold ms-2">Input</p>
              <div className="flex gap-2">
                <Button icon={<FaRegPaste />}>Paste</Button>
                <Button icon={<FiSave />} />
                <Button icon={<MdClear />} onClick={() => setInputText("")} />
              </div>
            </div>
            <div className="min-h-[calc(50vh-140px)] border-1 border-gray-300 rounded-md ms-2 mt-2">
              <Textarea
                hasBorder={false}
                className="w-full mt-1"
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
              />
            </div>
          </div>

          {/* Output */}
          <div className="flex flex-col mt-4">
            <div className="flex justify-between items-center">
              <p className="text-sm font-semibold ms-2">Output</p>
              <div className="flex gap-2">
                <Button icon={<FiSave />} />
                <Button icon={<MdClear />} onClick={() => setOutputText("")} />
              </div>
            </div>
            <div className="min-h-[calc(50vh-140px)] border-1 border-gray-300 rounded-md ms-2 mt-2">
              <Textarea
                hasBorder={false}
                className="w-full mt-1"
                value={outputText}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HtmlText;
