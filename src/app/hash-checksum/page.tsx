"use client";

import { useRef, useState, useCallback, useEffect } from "react";
import Header from "@/common/Header";
import ConfigCard from "@/components/Card/configCard";
import { BsTextParagraph } from "react-icons/bs";
import Button from "@/components/button";
import { FaPaste, FaTrash, FaCheckCircle, FaTimesCircle } from "react-icons/fa";
import { MdContentCopy } from "react-icons/md";
import Textarea from "@/components/textarea";
import Input from "@/components/input";
import crypto from "crypto";
import { toast } from "react-hot-toast";

const HashChecksum = () => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [algorithm, setAlgorithm] = useState<string>("MD5");
  const [inputText, setInputText] = useState<string>("");
  const [outputText, setOutputText] = useState<string>("");
  const [checksum, setChecksum] = useState<string>("");
  const [result, setResult] = useState<boolean>(false);
  const [isDragging, setIsDragging] = useState<boolean>(false);

  // Handle hash generation
  const handleHash = useCallback(() => {
    try {
      if (!inputText) {
        setOutputText("");
        return;
      }
      const hash = crypto
        .createHash(algorithm.toLowerCase())
        .update(inputText)
        .digest("hex");
      setOutputText(hash);
    } catch {
      toast.error("Failed to generate hash");
    }
  }, [algorithm, inputText]);

  useEffect(() => {
    handleHash();
  }, [handleHash]);

  // Upload file
  const handleFileUpload = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0];
      if (file) {
        const reader = new FileReader();
        reader.onload = async (e) => {
          try {
            const content = e.target?.result;
            if (content) {
              setInputText(content as string);
              toast.success("File loaded successfully");
            }
          } catch {
            toast.error("Failed to read file");
          }
        };
        reader.onerror = () => {
          toast.error("Failed to read file");
        };
        reader.readAsText(file);
      }
    },
    []
  );

  // Drag and drop
  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  }, []);

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  }, []);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);

    const file = e.dataTransfer.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        try {
          const content = e.target?.result;
          if (content) {
            setInputText(content as string);
            toast.success("File dropped successfully");
          }
        } catch {
          toast.error("Failed to read dropped file");
        }
      };
      reader.onerror = () => toast.error("Failed to read dropped file");
      reader.readAsText(file);
    }
  }, []);

  // Handle clipboard operations
  const handleCopyOutput = async () => {
    if (!outputText) {
      toast.error("No hash to copy");
      return;
    }
    try {
      await navigator.clipboard.writeText(outputText);
      toast.success("Hash copied to clipboard");
    } catch {
      toast.error("Failed to copy hash");
    }
  };

  const handleCopyInput = async () => {
    if (!inputText) {
      toast.error("No input text to copy");
      return;
    }
    try {
      await navigator.clipboard.writeText(inputText);
      toast.success("Input text copied to clipboard");
    } catch {
      toast.error("Failed to copy input text");
    }
  };

  const handlePasteInput = async () => {
    try {
      const text = await navigator.clipboard.readText();
      setInputText(text);
      toast.success("Text pasted successfully");
    } catch {
      toast.error("Failed to paste text");
    }
  };

  const handlePasteChecksum = async () => {
    try {
      const text = await navigator.clipboard.readText();
      setChecksum(text);
      toast.success("Checksum pasted successfully");
    } catch {
      toast.error("Failed to paste checksum");
    }
  };

  // Handle clear operations
  const handleClearInput = () => {
    setInputText("");
    toast.success("Input cleared");
  };

  const handleClearChecksum = () => {
    setChecksum("");
    toast.success("Checksum cleared");
  };

  // Xử lí checksum
  const handleChecksum = useCallback(() => {
    if (!checksum || !outputText) {
      setResult(false);
      return;
    }
    setResult(checksum.toLowerCase() === outputText.toLowerCase());
  }, [checksum, outputText]);

  useEffect(() => {
    handleChecksum();
  }, [handleChecksum]);

  return (
    <div className="flex flex-col rounded-2xl p-2" suppressHydrationWarning>
      <Header title="Hash / Checksum Generator" />
      <p className="text-xs ms-2">Configuration</p>
      <ConfigCard
        title="Hashing Algorithm"
        icon={<BsTextParagraph />}
        subTitle="Select the hashing algorithm you want to use"
        type="select"
        options={["MD5", "SHA1", "SHA256", "SHA512"]}
        value={algorithm}
        onSelectChange={(e) => setAlgorithm(e.target.value)}
      />
      <div className="grid grid-cols-2 gap-2">
        <div className="flex flex-col">
          <div className="flex justify-between items-center ms-2 ">
            <p>Input text</p>
            <div className="flex gap-2">
              <Button icon={<FaPaste />} onClick={handlePasteInput}>
                Paste
              </Button>
              <Button icon={<MdContentCopy />} onClick={handleCopyInput} />
              <Button icon={<FaTrash />} onClick={handleClearInput} />
            </div>
          </div>
          <div className="min-h-[calc(30vh-140px)] border-1 ms-2 border-gray-300 rounded-md mt-1">
            <Textarea
              className="w-full"
              autoFocus
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              kind="hide"
            />
          </div>
        </div>

        <div
          className={`text-xs px-3 py-5 flex flex-col gap-3 justify-center items-center border-dashed border-2 ${
            isDragging ? "border-blue-500 bg-blue-50" : "border-gray-300"
          } rounded-md transition-colors duration-200`}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
        >
          <p>{isDragging ? "Drop file here" : "Drag & drop a file here"}</p>
          <span>or</span>
          <div className="flex gap-2">
            <input
              type="file"
              className="hidden"
              ref={fileInputRef}
              onChange={handleFileUpload}
            />
            <Button
              variant="text"
              onClick={() => fileInputRef.current?.click()}
              className="text-blue-500 hover:text-blue-800"
            >
              Browse files
            </Button>
            <Button
              variant="text"
              onClick={handlePasteInput}
              className="text-blue-500 hover:text-blue-800"
            >
              Paste
            </Button>
          </div>
        </div>
      </div>

      <div className="flex flex-col gap-2 mt-1">
        <div className="flex justify-between items-center ms-2 ">
          <p>Output</p>
          <div className="flex gap-2">
            <Button
              icon={<FaPaste />}
              onClick={() => setChecksum(outputText)}
            />
            <Button icon={<MdContentCopy />} onClick={handleCopyOutput}>
              Copy
            </Button>
          </div>
        </div>
        <div className="me-2">
          <Input className="w-full pe-2" readOnly value={outputText} />
        </div>
      </div>

      <div className="flex flex-col gap-2 mt-1">
        <div className="flex justify-between items-center ms-2 ">
          <p>Checksum to verify data integrity</p>
          <div className="flex gap-2">
            <Button icon={<FaPaste />} onClick={handlePasteChecksum}>
              Paste
            </Button>
            <Button
              icon={<MdContentCopy />}
              onClick={() => navigator.clipboard.writeText(checksum)}
            />
            <Button icon={<FaTrash />} onClick={handleClearChecksum} />
          </div>
        </div>
        <div className="me-2">
          <Input
            className="w-full pe-2"
            value={checksum}
            onChange={(e) => setChecksum(e.target.value)}
          />
        </div>
        <div className="flex items-center ms-2 ">
          {result ? (
            <div className="flex items-center gap-2 bg-green-100 rounded-md px-1 py-3 w-full font-bold text-xs">
              <FaCheckCircle className="text-green-500 ms-2" />
              <p>The hashes are the same</p>
            </div>
          ) : (
            <div className="flex items-center gap-2 bg-red-100 rounded-md px-1 py-3 w-full font-bold text-xs">
              <FaTimesCircle className="text-red-500 ms-2" />
              <p>The hashes are different</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default HashChecksum;
