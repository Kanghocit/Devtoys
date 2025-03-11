"use client";

import { useState, type ChangeEvent } from "react";
import Header from "@/common/Header";
import ConfigCard from "@/components/Card/configCard";
import Button from "@/components/button";
import Textarea from "@/components/textarea";
import { toast } from "react-hot-toast";

import { BsTextParagraph } from "react-icons/bs";
import { FaSave } from "react-icons/fa";
import { FaArrowRotateRight } from "react-icons/fa6";
import { GoHash } from "react-icons/go";
import { MdContentCopy } from "react-icons/md";
import { PiBookOpenTextLight } from "react-icons/pi";

// Corpus data
const corpusData: { [key: string]: string } = {
  "Childe Harold's Pilgrimage (Lord Byron)": `Roll on, thou deep and dark blue Ocean, roll! Ten thousand fleets sweep over thee in vain; Man marks the earth with ruin, his control Stops with the shore; upon the watery plain The wrecks are all thy deed, nor doth remain A shadow of man's ravage, save his own, When, for a moment, like a drop of rain, He sinks into thy depths with bubbling groan, Without a grave, unknell'd, uncoffin'd, and unknown.`,
  "Lorem Ipsum (Marcus Tullius Cicero), Latin": `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.`,
  // Add more corpus data here...
};

const LoremIpsum = () => {
  const [corpus, setCorpus] = useState<string>(
    "Lorem Ipsum (Marcus Tullius Cicero), Latin"
  );
  const [type, setType] = useState<string>("words");
  const [length, setLength] = useState<number>(5);
  const [generatedText, setGeneratedText] = useState<string>("");

  const handleCorpusChange = (e: ChangeEvent<HTMLSelectElement>) => {
    setCorpus(e.target.value);
  };

  const handleTypeChange = (e: ChangeEvent<HTMLSelectElement>) => {
    setType(e.target.value);
  };

  const handleLengthChange = (e: ChangeEvent<HTMLInputElement>) => {
    setLength(Number(e.target.value));
  };

  const generateText = () => {
    const selectedCorpus = corpusData[corpus] || "";
    const words = selectedCorpus.split(/\s+/);
    const sentences = selectedCorpus.split(/[.!?]+/).filter(Boolean);

    let result = "";

    switch (type) {
      case "words":
        // Gen random words
        const randomWords = Array.from(
          { length },
          () => words[Math.floor(Math.random() * words.length)]
        );
        result = randomWords.join(" ");
        break;

      case "sentences":
        // Gen random sentences
        const randomSentences = Array.from(
          { length },
          () => sentences[Math.floor(Math.random() * sentences.length)]
        );
        result = randomSentences.join(". ") + ".";
        break;

      case "paragraphs":
        // Gen random paragraphs
        const paragraphs = Array.from({ length }, () => {
          const sentenceCount = Math.floor(Math.random() * 5) + 3;
          const paragraph = Array.from(
            { length: sentenceCount },
            () => sentences[Math.floor(Math.random() * sentences.length)]
          );
          return paragraph.join(". ") + ".";
        });
        result = paragraphs.join("\n\n");
        break;
    }

    setGeneratedText(result);
  };

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(generatedText);
      toast.success("Copied to clipboard!");
    } catch (err) {
      toast.error("Failed to copy text");
    }
  };

  const handleSave = () => {
    const blob = new Blob([generatedText], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "lorem-ipsum.txt";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    toast.success("File saved!");
  };

  return (
    <div className="flex flex-col rounded-2xl p-2" suppressHydrationWarning>
      <Header title="Lorem Ipsum" />
      <p className="text-xs ms-2">Configuration</p>
      <ConfigCard
        title="Text corpus"
        icon={<PiBookOpenTextLight />}
        subTitle="Select the source text for generation"
        type="select"
        options={Object.keys(corpusData)}
        value={corpus}
        onSelectChange={handleCorpusChange}
      />
      <ConfigCard
        title="Type"
        icon={<BsTextParagraph />}
        subTitle="Generate words, sentences or paragraphs"
        type="select"
        options={["words", "sentences", "paragraphs"]}
        value={type}
        onSelectChange={handleTypeChange}
      />
      <ConfigCard
        title="Length"
        icon={<GoHash />}
        subTitle="Number of words, sentences or paragraphs"
        type="input"
        value={length}
        onInputChange={handleLengthChange}
      />
      <div className="flex flex-col gap-2">
        <div className="flex items-end justify-between mx-2">
          <p className="text-xs ms-2">Result</p>
          <div className="flex gap-2">
            <Button icon={<FaArrowRotateRight />} onClick={generateText}>
              Generate
            </Button>
            <Button icon={<FaSave />} onClick={handleSave} />
            <Button icon={<MdContentCopy />} onClick={handleCopy}>
              Copy
            </Button>
          </div>
        </div>
        <div className="min-h-[calc(85vh-140px)] border-1 ms-2 border-gray-300 rounded-md">
          <Textarea
            className="w-full"
            autoFocus
            kind="hide"
            value={generatedText}
            readOnly
          />
        </div>
      </div>
    </div>
  );
};

export default LoremIpsum;
