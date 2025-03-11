"use client";
import Textarea from "@/components/textarea";
import { useState } from "react";
import Header from "@/common/Header";
import Button from "@/components/button";
import Statistics from "./Statistics";
import {
  caseConvertButton,
  lineConvertButton,
  lineSortButton,
} from "./constants";
import { LuCopy } from "react-icons/lu";
import { MdFilePresent } from "react-icons/md";
import { MdClear } from "react-icons/md";
import { FaRegPaste } from "react-icons/fa6";
import { LiaSaveSolid } from "react-icons/lia";
import { toast } from "react-hot-toast";

const TextAnalyzer = () => {
  const [input, setInput] = useState<string>("");
  const [originalText, setOriginalText] = useState<string>("");

  const handleButtonClick = (handlerName: string) => {
    const handler = handlers[handlerName];
    if (handler) handler();
  };

  // convert line break
  const onLF = () => {
    setInput(input.replace(/\r\n/g, "\n"));
  };

  const onCRLF = () => {
    setInput(input.replace(/\n/g, "\r\n"));
  };

  // convert case
  const onLowercase = () => {
    setInput(input.toLowerCase());
  };

  const onUppercase = () => {
    setInput(input.toUpperCase());
  };

  const onSentenceCase = () => {
    setInput(input.charAt(0).toUpperCase() + input.slice(1).toLowerCase());
  };

  const onTitleCase = () => {
    setInput(
      input.toLowerCase().replace(/\b\w/g, (char) => char.toUpperCase())
    );
  };

  const onCamelCase = () => {
    const titleCase = input
      .toLowerCase()
      .replace(/\b\w/g, (char) => char.toUpperCase());
    const words = titleCase.split(" ");
    const camelCase =
      words[0].charAt(0).toLowerCase() +
      words[0].slice(1) +
      words
        .slice(1)
        .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
        .join("");
    setInput(camelCase);
  };
  const onPascalCase = () => {
    const titleCase = input
      .toLowerCase()
      .replace(/\b\w/g, (char) => char.toUpperCase());

    setInput(titleCase);
  };
  const onSnakeCase = () => {
    setInput(input.split(" ").join("_").toLowerCase());
  };
  const onConstantCase = () => {
    setInput(input.split(" ").join("_").toUpperCase());
  };
  const onKebabCase = () => {
    setInput(input.split(" ").join("-").toLowerCase());
  };

  const onTrainCase = () => {
    const titleCase = input
      .toLowerCase()
      .replace(/\b\w/g, (char) => char.toUpperCase());
    const words = titleCase.split(" ");
    setInput(words.join("-"));
  };
  const onAlternatingCase = () => {
    setInput(
      input
        .split("")
        .map((char, index) =>
          index % 2 === 0 ? char.toLowerCase() : char.toUpperCase()
        )
        .join("")
    );
  };
  const onInverseCase = () => {
    setInput(
      input
        .split("")
        .map((char, index) =>
          index % 2 === 0 ? char.toUpperCase() : char.toLowerCase()
        )
        .join("")
    );
  };
  const onRandomCase = () => {
    setInput(
      input
        .split("")
        .map((char) =>
          Math.random() < 0.5
            ? Math.random() < 0.5
              ? char.toUpperCase()
              : char.toLowerCase()
            : char
        )
        .join("")
    );
  };

  // sort line
  const onAlphabetize = () => {
    setInput(
      input
        .split("\n")
        .sort((a, b) => {
          const aWords = a.trim().split(" ");
          const bWords = b.trim().split(" ");
          const aFirstWord = aWords[0] || "";
          const bFirstWord = bWords[0] || "";
          return aFirstWord.localeCompare(bFirstWord);
        })
        .join("\n")
    );
  };

  const onReverseAlphabetize = () => {
    setInput(
      input
        .split("\n")
        .sort((a, b) => {
          const aWords = a.trim().split(" ");
          const bWords = b.trim().split(" ");
          const aFirstWord = aWords[0] || "";
          const bFirstWord = bWords[0] || "";
          return bFirstWord.localeCompare(aFirstWord);
        })
        .join("\n")
    );
  };

  const onAlphabetizeByLastWord = () => {
    setInput(
      input
        .split("\n")
        .filter((line) => line.trim() !== "") // Remove empty lines
        .sort((a, b) => {
          // Get the last word of each line, or the only word if there's just one
          const aLastWord = a.trim().split(/\s+/).pop() || "";
          const bLastWord = b.trim().split(/\s+/).pop() || "";
          return aLastWord.localeCompare(bLastWord);
        })
        .join("\n")
    );
  };

  const onReverseAlphabetizeByLastWord = () => {
    setInput(
      input
        .split("\n")
        .filter((line) => line.trim() !== "") // Remove empty lines
        .sort((a, b) => {
          // Get the last word of each line, or the only word if there's just one
          const aLastWord = a.trim().split(/\s+/).pop() || "";
          const bLastWord = b.trim().split(/\s+/).pop() || "";
          return bLastWord.localeCompare(aLastWord);
        })
        .join("\n")
    );
  };

  const onReverse = () => {
    setInput(input.split("\n").reverse().join("\n"));
  };

  const onRandomize = () => {
    const lines = input.split("\n");
    for (let i = lines.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [lines[i], lines[j]] = [lines[j], lines[i]];
    }
    setInput(lines.join("\n"));
  };

  const handlers: Record<string, () => void> = {
    onLF,
    onCRLF,
    onLowercase,
    onUppercase,
    onSentenceCase,
    onTitleCase,
    onCamelCase,
    onPascalCase,
    onSnakeCase,
    onConstantCase,
    onKebabCase,
    onTrainCase,
    onAlternatingCase,
    onInverseCase,
    onRandomCase,
    // sort line
    onAlphabetize,
    onReverseAlphabetize,
    onAlphabetizeByLastWord,
    onReverseAlphabetizeByLastWord,
    onReverse,
    onRandomize,
  };

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(input);
      toast.success("Text copied to clipboard");
    } catch {
      toast.error("Failed to copy text");
    }
  };

  const handlePaste = async () => {
    try {
      const text = await navigator.clipboard.readText();
      setInput(text);
      setOriginalText(text);
      toast.success("Text pasted successfully");
    } catch {
      toast.error("Failed to paste text");
    }
  };

  const handleSave = () => {
    if (!input) {
      toast.error("No content to save");
      return;
    }

    const blob = new Blob([input], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "text.txt";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    toast.success("File saved successfully");
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (!file.name.toLowerCase().endsWith(".txt")) {
        toast.error("Please select a text file (.txt)");
        return;
      }

      const reader = new FileReader();
      reader.onload = (e) => {
        try {
          const content = e.target?.result as string;
          setInput(content);
          setOriginalText(content);
          toast.success("File loaded successfully");
        } catch {
          toast.error("Failed to read file");
        }
      };

      reader.readAsText(file);
    }
  };

  return (
    <div className="flex flex-col rounded-2xl h-full p-2">
      <Header title="Text Analyzer" />
      <div className="flex flex-col">
        <p className="text-xs">Convert line break</p>
        <div className="flex gap-2 m-2 ms-0">
          {lineConvertButton.map((item, index) => (
            <Button
              variant="default"
              key={index}
              onClick={() => handleButtonClick(item.handler)}
            >
              {item.name}
            </Button>
          ))}
        </div>
        <p className="text-xs">Convert case</p>
        <div className="flex gap-2 m-2 ms-0">
          {caseConvertButton.map((item, index) => (
            <Button
              variant="default"
              key={index}
              onClick={() => handleButtonClick(item.handler)}
            >
              {item.name}
            </Button>
          ))}
        </div>
        <p className="text-xs">Sort lines</p>
        <div className="flex gap-2 m-2 ms-0">
          {lineSortButton.map((item, index) => (
            <Button
              variant="default"
              key={index}
              onClick={() => handleButtonClick(item.handler)}
            >
              {item.name}
            </Button>
          ))}
        </div>
      </div>
      <div className="grid grid-cols-[85%_15%] gap-4 p-4">
        <div className="flex flex-col">
          <div className="flex justify-between">
            <p className="text-xs">Text</p>
            <div className="flex gap-2">
              <Button
                variant="primary"
                className="px-2 flex items-center hover:bg-blue-500"
                onClick={() => setInput(originalText)}
              >
                Show original text
              </Button>
              <Button icon={<FaRegPaste />} onClick={handlePaste}>
                Paste
              </Button>
              <Button
                icon={<MdFilePresent />}
                onClick={() => document.getElementById("file-input")?.click()}
              />
              <input
                id="file-input"
                type="file"
                className="hidden"
                accept=".txt"
                onChange={handleFileUpload}
              />
              <Button icon={<LiaSaveSolid />} onClick={handleSave}>
                Save as
              </Button>
              <Button
                icon={<MdClear />}
                onClick={() => {
                  setInput("");
                  setOriginalText("");
                }}
              />
              <Button icon={<LuCopy />} onClick={handleCopy}>
                Copy
              </Button>
            </div>
          </div>
          <div className="min-h-[calc(85vh-140px)] border-1 border-gray-300 rounded-md mt-1">
            <Textarea
              className="w-full"
              autoFocus
              kind="hide"
              value={input}
              onChange={(e) => {
                setInput(e.target.value);
                setOriginalText(e.target.value);
              }}
            />
          </div>
        </div>
        <Statistics text={input} />
      </div>
    </div>
  );
};

export default TextAnalyzer;
