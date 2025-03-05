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
      <div className="flex justify-between">
        <p className="font-bold text-2xl m-2">URL Encoder / Decoder</p>
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
          valueTrue="Encode"
          valueFalse="Decode"
          onToggle={() => setIsEncode(!isEncode)}
        />
      </CustomCard>

      <div className="flex flex-col flex-grow mt-4 overflow-hidden">
        <div className="flex flex-col flex-grow rounded-lg p-4 ">
          {/* Input */}
          <div className="flex flex-col flex-grow my0-1">
            <div className="flex justify-between items-center">
              <p className="text-xs">Input</p>
              <div className="flex gap-2">
                <Button icon={<FaRegPaste />}>Paste</Button>
                <Button icon={<FiSave />} />
                <Button icon={<MdClear />} onClick={() => setInputText("")} />
              </div>
            </div>
            <Textarea
              className="w-full h-0 flex-grow mt-1"
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
            />
          </div>

          {/* Output */}
          <div className="flex flex-col flex-grow mt-4">
            <div className="flex justify-between items-center">
              <p className="text-xs">Output</p>
              <div className="flex gap-2">
                <Button icon={<FiSave />} />
                <Button icon={<MdClear />} onClick={() => setOutputText("")} />
              </div>
            </div>
            <Textarea
              className="w-full h-0 flex-grow mt-1"
              value={outputText}
              readOnly
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default URL;
