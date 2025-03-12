"use client";

import Header from "@/common/Header";
import ConfigCard from "@/components/card/configCard";
import Button from "@/components/button";
import Textarea from "@/components/textarea";
import { useCallback, useRef, useState } from "react";
import { toast } from "react-hot-toast";

import { BsTextParagraph } from "react-icons/bs";
import { FaPaste, FaSave, FaTrash } from "react-icons/fa";
import { FaArrowRotateRight } from "react-icons/fa6";
import { GoHash } from "react-icons/go";
import { MdContentCopy } from "react-icons/md";
import { PiBookOpenTextLight } from "react-icons/pi";
import Input from "@/components/input";

const corpusData: { [key: string]: string } = {
  "Childe Harold's Pilgrimage (Lord Byron)": `Roll on, thou deep and dark blue Ocean, roll! Ten thousand fleets sweep over thee in vain; Man marks the earth with ruin, his control Stops with the shore; upon the watery plain The wrecks are all thy deed, nor doth remain A shadow of man's ravage, save his own, When, for a moment, like a drop of rain, He sinks into thy depths with bubbling groan, Without a grave, unknell'd, uncoffin'd, and unknown.`,
  "Lorem Ipsum (Marcus Tullius Cicero), Latin": `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.`,
  "The Raven (Edgar Allan Poe)": `Once upon a midnight dreary, while I pondered, weak and weary, Over many a quaint and curious volume of forgotten lore— While I nodded, nearly napping, suddenly there came a tapping, As of some one gently rapping, rapping at my chamber door. "'Tis some visitor," I muttered, "tapping at my chamber door— Only this and nothing more."`,
  "Hamlet (William Shakespeare)": `To be, or not to be, that is the question: Whether 'tis nobler in the mind to suffer The slings and arrows of outrageous fortune, Or to take Arms against a Sea of troubles, And by opposing end them: to die, to sleep No more; and by a sleep, to say we end the heart-ache, and the thousand natural shocks that Flesh is heir to?`,
  "Don Quixote (Miguel de Cervantes)": `In a village of La Mancha, the name of which I have no desire to call to mind, there lived not long since one of those gentlemen that keep a lance in the lance-rack, an old buckler, a lean hack, and a greyhound for coursing.`,
};

const LoremIpsum = () => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [corpus, setCorpus] = useState<string>(
    "Lorem Ipsum (Marcus Tullius Cicero), Latin"
  );
  const [type, setType] = useState<string>("words");
  const [length, setLength] = useState<number>(5);
  const [generatedText, setGeneratedText] = useState<string>("");

  const generateText = () => {
    if (!corpus) {
      toast.error("Please select a text corpus");
      return;
    }

    const selectedCorpus = corpusData[corpus] || "";
    const words = selectedCorpus.split(/\s+/);
    const sentences = selectedCorpus.split(/[.!?]+/).filter(Boolean);

    let result = "";

    switch (type) {
      case "words":
        const randomWords = Array.from(
          { length },
          () => words[Math.floor(Math.random() * words.length)]
        );
        result = randomWords.join(" ");
        break;

      case "sentences":
        const randomSentences = Array.from(
          { length },
          () => sentences[Math.floor(Math.random() * sentences.length)]
        );
        result = randomSentences.join(". ") + ".";
        break;

      case "paragraphs":
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
    toast.success("Text generated successfully!");
  };

  const handleCopy = async () => {
    if (!generatedText) {
      toast.error("No text to copy");
      return;
    }
    try {
      await navigator.clipboard.writeText(generatedText);
      toast.success("Copied to clipboard!");
    } catch {
      toast.error("Failed to copy text");
    }
  };

  const handlePaste = async () => {
    try {
      const text = await navigator.clipboard.readText();
      setGeneratedText(text);
      toast.success("Text pasted successfully!");
    } catch {
      toast.error("Failed to paste text");
    }
  };

  const handleSave = () => {
    if (!generatedText) {
      toast.error("No text to save");
      return;
    }
    const blob = new Blob([generatedText], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `lorem-ipsum-${type}-${length}.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    toast.success("File saved!");
  };

  const handleClear = () => {
    setGeneratedText("");
    toast.success("Text cleared!");
  };

  const handleFileUpload = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0];
      if (file) {
        const reader = new FileReader();
        reader.onload = (e) => {
          const content = e.target?.result as string;
          setGeneratedText(content);
          toast.success("File loaded successfully!");
        };
        reader.onerror = () => {
          toast.error("Failed to read file");
        };
        reader.readAsText(file);
      }
    },
    []
  );

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
        onSelectChange={(e) => setCorpus(e.target.value)}
      />
      <ConfigCard
        title="Type"
        icon={<BsTextParagraph />}
        subTitle="Generate words, sentences or paragraphs"
        type="select"
        options={["words", "sentences", "paragraphs"]}
        value={type}
        onSelectChange={(e) => setType(e.target.value)}
      />
      <ConfigCard
        title="Length"
        icon={<GoHash />}
        subTitle="Number of words, sentences or paragraphs"
        type="input"
        value={length}
        onInputChange={(e) => setLength(Number(e.target.value))}
      />
      <div className="flex flex-col gap-2">
        <div className="flex items-end justify-between mx-2">
          <p className="text-xs ms-2">Result</p>
          <div className="flex gap-2">
            <Input
              type="file"
              inputRef={fileInputRef}
              accept=".txt"
              multiple
              onChange={handleFileUpload}
            />

            <Button
              variant="text"
              onClick={() => fileInputRef.current?.click()}
            >
              Upload
            </Button>

            <Button icon={<FaArrowRotateRight />} onClick={generateText}>
              Generate
            </Button>
            <Button icon={<FaPaste />} onClick={handlePaste}>
              Paste
            </Button>
            <Button icon={<FaSave />} onClick={handleSave} />
            <Button icon={<MdContentCopy />} onClick={handleCopy}>
              Copy
            </Button>
            <Button icon={<FaTrash />} onClick={handleClear} />
          </div>
        </div>
        <div className="min-h-[calc(80vh-140px)] border-1 ms-2 border-gray-300 rounded-md">
          <Textarea
            className="w-full"
            autoFocus
            hasBorder={false}
            value={generatedText}
            readOnly
          />
        </div>
      </div>
    </div>
  );
};

export default LoremIpsum;
