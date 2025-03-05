"use client";
import Button from "@/components/button";
import CustomCard from "@/components/Card/CusCard";
import Switch from "@/components/switch";
import Textarea from "@/components/textarea";
import pako from "pako";
import { useCallback, useEffect, useRef, useState } from "react";
import { FaRegFile } from "react-icons/fa";
import { FaRegPaste } from "react-icons/fa6";
import { FiSave } from "react-icons/fi";
import { LiaExchangeAltSolid } from "react-icons/lia";
import { LuStar } from "react-icons/lu";
import { MdClear } from "react-icons/md";

const Gzip = () => {
  // Handle opening and reading files
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const [fileName, setFileName] = useState<string | null>(null);
  const [fileContent, setFileContent] = useState<string | null>(null);
  const [inputText, setInputText] = useState("");
  const [outputText, setOutputText] = useState("");
  const [isCompress, setIsCompress] = useState(true);

  const handleFileChange = () => {
    const file = fileInputRef.current?.files?.[0];
    if (file) {
      setFileName(file.name);
      const reader = new FileReader();
      reader.onload = (e) => {
        setFileContent(e.target?.result as string);
      };
      reader.readAsText(file);
    }
  };
  const compress = (text: string) => {
    const compressed = pako.gzip(text);
    return Buffer.from(compressed).toString("base64");
  };

  const decompress = (text: string) => {
    const decompressed = pako.inflate(Buffer.from(text, "base64"), {
      to: "string",
    });
    return decompressed;
  };

  const handleConversion = useCallback(() => {
    if (isCompress) {
      setOutputText(compress(inputText));
    } else {
      setOutputText(decompress(inputText));
    }
  }, [inputText, isCompress]);

  useEffect(() => {
    handleConversion();
  }, [handleConversion]);

  return (
    <div
      className="flex flex-col rounded-2xl h-full p-2"
      suppressHydrationWarning
    >
      {/* Header  */}
      <div className="flex justify-between">
        <p className="font-bold text-2xl m-2">Gzip Encoder / Decoder</p>
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
        subTitle="Select whether the input should be compressed or decompressed"
      >
        <Switch
          valueTrue="Compress"
          valueFalse="Decompress"
          onToggle={() => setIsCompress(!isCompress)}
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
                <input
                  type="file"
                  ref={fileInputRef}
                  hidden
                  onChange={handleFileChange}
                />
                <Button
                  icon={<FaRegFile />}
                  onClick={() => fileInputRef.current?.click()}
                />
                <Button
                  icon={<MdClear />}
                  onClick={() => {
                    setInputText("");
                    setFileName(null);
                    setFileContent(null);
                  }}
                />
              </div>
            </div>
            <Textarea
              className="w-full h-0 flex-grow mt-1"
              value={fileName ? fileContent || "" : inputText}
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

export default Gzip;
