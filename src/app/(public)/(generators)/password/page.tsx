"use client";

import Header from "@/common/Header";
import Button from "@/components/button";
import CustomCard from "@/components/card/CustomCard";
import Textarea from "@/components/textarea";
import { useState } from "react";
import { LuCopy, LuLock } from "react-icons/lu";
import { MdFilePresent, MdClear } from "react-icons/md";
import { IoIosArrowDown } from "react-icons/io";
import clsx from "clsx";
import { HandlerType } from "./types";
import { generatePassword } from "./utils";
import { PasswordOptions } from "./components/PasswordOptions";
import Input from "@/components/input";

const PasswordGenerator = () => {
  const [input, setInput] = useState("");
  const [length, setLength] = useState(5);
  const [rows, setRows] = useState(1);
  const [isOpen, setIsOpen] = useState(false);

  const [lowercase, setLowercase] = useState<boolean>(false);
  const [uppercase, setUppercase] = useState<boolean>(false);
  const [digits, setDigits] = useState<boolean>(false);
  const [special, setSpecial] = useState<boolean>(false);
  const [excluded, setExcluded] = useState<string>("");

  const handlers: HandlerType = {
    setLowercase,
    setUppercase,
    setDigits,
    setSpecial,
    setExcluded,
  };

  const handleGeneratePassword = () => {
    try {
      const passwords = generatePassword({
        lowercase,
        uppercase,
        digits,
        special,
        excluded,
        length,
        rows,
      });
      setInput(passwords.join("\n"));
    } catch (error) {
      if (error instanceof Error) {
        setInput(error.message);
      }
    }
  };

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(input);
    } catch (err) {
      console.error("Error copying to clipboard:", err);
    }
  };

  return (
    <div
      className="flex flex-col rounded-2xl h-full p-2"
      suppressHydrationWarning
    >
      <Header title="Password Generator" />

      <div className="flex justify-between ms-2">
        <p className="text-sm font-semibold">Configuration</p>
      </div>

      <CustomCard
        title="Length"
        subTitle="Lowercase, Uppercase, Numbers, Symbols"
        icon={<LuLock />}
      >
        <div className="flex items-center">
          <Input
            type="number"
            value={length}
            onChange={(e) => setLength(Number(e.target.value))}
          />
          <Button
            variant="text"
            icon={<IoIosArrowDown />}
            onClick={() => setIsOpen(!isOpen)}
            className={clsx(
              "transition-transform duration-300 ease-in-out",
              isOpen ? "rotate-180" : "rotate-0"
            )}
          />
        </div>
      </CustomCard>

      <PasswordOptions
        isOpen={isOpen}
        handlers={handlers}
        excluded={excluded}
      />

      <div className="flex justify-between ms-2">
        <p className="text-sm font-semibold">Generate</p>
      </div>

      <div className="flex items-center mt-2 mx-2">
        <Button
          variant="primary"
          className="px-5 py-2 hover:bg-blue-600"
          onClick={handleGeneratePassword}
        >
          Generate Password(s)
        </Button>
        <span className="mx-2">x</span>

        <Input
          type="number"
          value={rows}
          min={1}
          max={100}
          onChange={(e) =>
            setRows(Math.min(100, Math.max(1, Number(e.target.value))))
          }
        />
      </div>

      <div className="mt-2 flex justify-between mb-1 ms-2">
        <div className="flex justify-center items-end ">
          <p className="text-sm font-semibold">Passwords</p>
        </div>
        <div className="flex gap-2 me-2 mb-1">
          <Button icon={<LuCopy />} onClick={handleCopy}>
            Copy
          </Button>
          <Button
            icon={<MdFilePresent />}
            onClick={() => document.getElementById("password-input")?.click()}
          />

          <Button
            icon={<MdClear />}
            onClick={() => {
              setInput("");
            }}
          />
        </div>
      </div>

      <div className="min-h-[calc(20vh-140px)] border-1 ms-2 border-gray-300 rounded-md mx-2">
        <Textarea
          className="w-full"
          autoFocus
          hasBorder={false}
          placeholder="Generated passwords will appear here..."
          value={input}
          readOnly
        />
      </div>
    </div>
  );
};

export default PasswordGenerator;
