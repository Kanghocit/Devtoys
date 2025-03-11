"use client";
import Header from "@/common/Header";
import Button from "@/components/button";
import CustomCard from "@/components/Card/CusCard";
import Switch from "@/components/switch";
import Textarea from "@/components/textarea";
import { handleCopy, handlePaste } from "@/utils/numberUtils";
import { useCallback, useEffect, useState } from "react";
import { FaRegPaste } from "react-icons/fa6";
import { LiaExchangeAltSolid } from "react-icons/lia";
import { LuCopy } from "react-icons/lu";
import { MdClear } from "react-icons/md";
const Base64Text = () => {
  const [inputText, setInputText] = useState("");
  const [outputText, setOutputText] = useState("");
  const [isEncode, setIsEncode] = useState(true);

  const handleConversion = useCallback(() => {
    if (isEncode) {
      setOutputText(btoa(encodeURIComponent(inputText)));
    } else {
      try {
        setOutputText(decodeURIComponent(atob(inputText)));
      } catch (error) {
        console.error("Failed to decode:", error);
      }
    }
  }, [inputText, isEncode]);

  useEffect(() => {
    handleConversion();
  }, [handleConversion]);

  return (
    <div className="flex flex-col rounded-2xl h-full p-2">
      {/* Header  */}
      <Header title="Base64 Text Encoder / Decoder" />

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

      <div className="flex flex-col mt-4 overflow-hidden">
        <div className="flex flex-col rounded-lg p-4 ">
          {/* Input */}
          <div className="flex flex-col">
            <div className="flex justify-between items-center">
              <p className="text-xs ms-2">Input</p>
              <div className="flex gap-2 my-1">
                <Button
                  icon={<FaRegPaste />}
                  onClick={() => handlePaste((val) => setInputText(val))}
                >
                  Paste
                </Button>
                <Button icon={<LuCopy />} onClick={() => handleCopy(inputText)}>
                  Copy
                </Button>
                <Button icon={<MdClear />} onClick={() => setInputText("")} />
              </div>
            </div>
            <div className="min-h-[calc(50vh-140px)] border-1 ms-2 border-gray-300 rounded-md mt-1">
              <Textarea
                className="w-full"
                autoFocus
                kind="hide"
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
              />
            </div>
          </div>

          {/* Output */}
          <div className="flex flex-col mt-4">
            <div className="flex justify-between items-center">
              <p className="text-xs ms-2">Output</p>
              <div className="flex gap-2 my-1">
                <Button
                  icon={<LuCopy />}
                  onClick={() => handleCopy(outputText)}
                >
                  Copy
                </Button>
                <Button icon={<MdClear />} onClick={() => setOutputText("")} />
              </div>
            </div>
            <div className="min-h-[calc(50vh-140px)] border-1 ms-2 border-gray-300 rounded-md mt-1 cursor-not-allowed">
              <Textarea
                className="w-full cursor-not-allowed "
                value={outputText}
                readOnly
                kind="hide"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Base64Text;
