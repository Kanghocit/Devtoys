"use client";
import dynamic from "next/dynamic";
import Textarea from "@/components/textarea";
import Header from "@/common/Header";
import Button from "@/components/button";
import { MdClear } from "react-icons/md";
import { MdFilePresent } from "react-icons/md";
import { BiPaste } from "react-icons/bi";
import { useState, useEffect, useRef, useCallback } from "react";
import Input from "@/components/input";

// Tách CheatSheet thành dynamic import
const CheatSheet = dynamic(() => import("./CheatSheet"), { ssr: false });

const JsonPathTester = () => {
  const [input, setInput] = useState<string>("");
  const [jsonPath, setJsonPath] = useState<string>("");
  const [output, setOutput] = useState<string>("");
  const [isClient, setIsClient] = useState(false);

  const fileInputRef = useRef<HTMLInputElement>(null);

  // Kiểm tra môi trường client
  useEffect(() => {
    setIsClient(true);
  }, []);

  const handlePasteJson = async () => {
    if (!isClient) return;
    try {
      const text = await navigator.clipboard.readText();
      setInput(text);
    } catch (error) {
      console.error("Error pasting JSON:", error);
    }
  };

  const handlePasteJsonPath = async () => {
    if (!isClient) return;
    try {
      const text = await navigator.clipboard.readText();
      setJsonPath(text);
    } catch (error) {
      console.error("Error pasting JSONPath:", error);
    }
  };

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setInput(e.target?.result as string);
      };
      reader.readAsText(file);
    }
  };

  const inputRef = useRef<HTMLTextAreaElement>(null);
  useEffect(() => {
    if (isClient) {
      inputRef.current?.focus();
    }
  }, [isClient]);

  const handleJsonPathTest = useCallback(() => {
    if (!isClient) return;

    try {
      if (!input.trim()) {
        setOutput("");
        return;
      }

      if (!jsonPath.trim()) {
        setOutput("");
        return;
      }

      // Dynamic import của jsonpath
      import("jsonpath")
        .then((jp) => {
          const json = JSON.parse(input);
          const result = jp.query(json, jsonPath);
          setOutput(JSON.stringify(result, null, 2));
        })
        .catch((error) => {
          setOutput(`Error loading jsonpath: ${error.message}`);
        });
    } catch (error) {
      if (error instanceof Error) {
        setOutput(`Error: ${error.message}`);
      } else {
        setOutput("An unknown error occurred");
      }
    }
  }, [input, jsonPath, isClient]);

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      handleJsonPathTest();
    }, 500);

    return () => clearTimeout(timeoutId);
  }, [handleJsonPathTest]);

  if (!isClient) {
    return <div>Loading...</div>;
  }

  return (
    <div
      className="flex flex-col rounded-2xl h-full p-2"
      suppressHydrationWarning
    >
      <Header title="JSONPath Tester" />
      <div className="grid grid-cols-2">
        {/* Left */}
        <div className="flex flex-col">
          <div className="flex m-2 justify-between">
            <div className="flex justify-center items-end">
              <p className="text-sm font-semibold">JSON</p>
            </div>
            <div className="flex gap-2">
              <Button icon={<BiPaste />} onClick={handlePasteJson}>
                Paste
              </Button>
              <Input
                type="file"
                inputRef={fileInputRef}
                accept="application/json"
                multiple
                onChange={handleFileUpload}
              />
              <Button
                icon={<MdFilePresent />}
                onClick={() => fileInputRef.current?.click()}
              />
              <Button icon={<MdClear />} onClick={() => setInput("{}")} />
            </div>
          </div>
          <div className="min-h-[calc(100vh-140px)] border-1 border-gray-300 rounded-md">
            <Textarea
              hasBorder={false}
              //   ref
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="{}"
              autoFocus
            />
          </div>
        </div>
        {/* Right */}
        <div className="flex flex-col gap-2">
          <div className="flex ms-2 justify-between ">
            <div className="flex justify-center items-end">
              <p className="text-sm font-semibold">JSONPath</p>
            </div>
            <div className="flex gap-2">
              <Button icon={<BiPaste />} onClick={handlePasteJsonPath}>
                Paste
              </Button>
              <Input
                type="file"
                inputRef={fileInputRef}
                accept="application/json"
                multiple
                onChange={handleFileUpload}
              />
              <Button
                icon={<MdFilePresent />}
                onClick={() => fileInputRef.current?.click()}
              />
              <Button icon={<MdClear />} onClick={() => setInput("{}")} />
            </div>
          </div>

          <div className="me-2">
            <Input
              placeholder="Enter JSONPath"
              className="w-full"
              value={jsonPath}
              onChange={(e) => setJsonPath(e.target.value)}
            />
          </div>
          <div className="flex justify-between gap-2 ms-2">
            <div className="flex justify-center items-end">
              <p className="text-sm font-semibold">Test results</p>
            </div>
            <div className="flex gap-2 ">
              <Button icon={<MdClear />} onClick={() => setOutput("")} />
              <Button
                icon={<MdClear />}
                onClick={() => {
                  try {
                    navigator.clipboard.writeText(output);
                  } catch (err) {
                    console.error("Error copying to clipboard:", err);
                  }
                }}
              >
                <p>Copy</p>
              </Button>
              <Button
                icon={<MdClear />}
                onClick={() => {
                  setInput("{}");
                  setJsonPath("");
                  setOutput("");
                }}
              />
            </div>
          </div>

          <div className="h-[calc(50vh-140px)] border-1 ms-2 border-gray-300 rounded-md">
            <Textarea hasBorder={false} value={output} readOnly />
          </div>
          <div className="flex flex-col gap-2">
            <div className="flex justify-between gap-2">
              <div className="flex justify-center items-end ms-2">
                <p className="text-sm font-semibold">Cheat sheet</p>
              </div>

              <Button icon={<MdClear />} />
            </div>
            <CheatSheet />
          </div>
        </div>
      </div>
    </div>
  );
};

export default JsonPathTester;
