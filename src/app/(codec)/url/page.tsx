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

const URL = () => {
  const [inputText, setInputText] = useState("");
  const [outputText, setOutputText] = useState("");
  const [isEncode, setIsEncode] = useState(true);

  const urlEncode = (text: string) => {
    return text
      .replace(/ /g, "%20")
      .replace(/:/g, "%3A")
      .replace(/\//g, "%2F")
      .replace(/\\/g, "%5C")
      .replace(/=/g, "%3D")
      .replace(/&/g, "%26")
      .replace(/%/g, "%25") // Move % replacement first to avoid double encoding
      .replace(/@/g, "%40")
      .replace(/#/g, "%23")
      .replace(/\?/g, "%3F") // Escape ? character
      .replace(/'/g, "%27")
      .replace(/`/g, "%60")
      .replace(/,/g, "%2C")
      .replace(/;/g, "%3B")
      .replace(/=/g, "%3D");
  };
  const urlDecode = (text: string) => {
    return text
      .replace(/%20/g, " ")
      .replace(/%3A/g, ":")
      .replace(/%2F/g, "/")
      .replace(/%5C/g, "\\")
      .replace(/%3D/g, "=")
      .replace(/&amp;/g, "&")
      .replace(/&lt;/g, "<")
      .replace(/&gt;/g, ">");
  };
  const handleConversion = useCallback(() => {
    if (isEncode) {
      setOutputText(urlEncode(inputText));
    } else {
      setOutputText(urlDecode(inputText));
    }
  }, [inputText, isEncode]);

  useEffect(() => {
    handleConversion();
  }, [handleConversion]);

  return (
    <div className="flex flex-col rounded-2xl h-full p-2">
      {/* Header  */}
      <Header title="URL Encoder / Decoder" />

      <p className="text-sm font-semibold ms-2 mt-2">Configuration</p>

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

      <div className="flex flex-col mt-3 overflow-hidden">
        <div className="flex flex-col rounded-lg mx-2 ">
          {/* Input */}
          <div className="flex flex-col my0-1">
            <div className="flex justify-between mb-1">
              <div className="flex justify-center items-end gap-2">
                <p className="text-sm font-semibold">Input</p>
              </div>
              <div className="flex gap-2">
                <Button icon={<FaRegPaste />}>Paste</Button>
                <Button icon={<FiSave />} />
                <Button icon={<MdClear />} onClick={() => setInputText("")} />
              </div>
            </div>
            <div className="min-h-[calc(48vh-140px)] border-1 border-gray-300 rounded-md mt-1">
              <Textarea
                hasBorder={false}
                className="w-full mt-1"
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
              />
            </div>
          </div>

          {/* Output */}
          <div className="flex flex-col mt-3">
            <div className="flex justify-between mb-1">
              <div className="flex justify-center items-end gap-2">
                <p className="text-sm font-semibold">Output</p>
              </div>
              <div className="flex gap-2">
                <Button icon={<FiSave />} />
                <Button icon={<MdClear />} onClick={() => setOutputText("")} />
              </div>
            </div>
            <div className="min-h-[calc(50vh-140px)] border-1 border-gray-300 rounded-md mt-1">
              <Textarea
                hasBorder={false}
                className="w-full mt-1"
                value={outputText}
                readOnly
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default URL;
