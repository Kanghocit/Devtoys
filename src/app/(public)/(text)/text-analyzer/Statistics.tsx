"use client";

import Button from "@/components/button";

import { IoIosResize } from "react-icons/io";

interface StatisticsProps {
  text: string;
}

const Statistics = ({ text }: StatisticsProps) => {
  // Calculate statistics
  const characters = text.length;
  const start = text.match(/^(\s*)/)?.[0]?.length || 0;
  const end = start + characters;
  const words = text.trim() ? text.trim().split(/\s+/).length : 0;
  const lines = text.trim() ? text.trim().split("\n").length : 0;
  const paragraphs = text.trim() ? text.trim().split(/\n\s*\n/).length : 0;

  // Count bytes
  const bytes = new Blob([text]).size;

  // Count specific characters
  const numbers = (text.match(/[0-9]/g) || []).length;
  const sentences = (text.match(/\./g) || []).length;

  // Count character frequency
  const handleCharacterFrequency = () => {
    const arr = text.split("");
    const letterMap = new Map<string, number>();
    arr.forEach((str) =>
      str.split("").forEach((char) => {
        if (/[a-zA-Z]/.test(char)) {
          letterMap.set(char, (letterMap.get(char) || 0) + 1);
        }
      })
    );
    return Array.from(letterMap.entries()).sort();
  };

  return (
    <div className="flex flex-col gap-2 px-4 overflow-y-auto">
      <div className="flex items-center justify-between">
        <p className="text-xs">Statistics</p>
        <Button icon={<IoIosResize />} />
      </div>

      <div className="border-1 border-gray-300 rounded-md p-4">
        <div className="flex flex-col gap-3">
          <h1 className="text-md font-bold">Selection</h1>

          <div className="flex justify-between">
            <p className="text-xs text-gray-500">Length</p>
            <p className="text-sm font-medium">0</p>
          </div>
          <div className="flex justify-between">
            <p className="text-xs text-gray-500">Start position</p>
            <p className="text-sm font-medium">{start}</p>
          </div>
          <div className="flex justify-between">
            <p className="text-xs text-gray-500">End position</p>
            <p className="text-sm font-medium">{end}</p>
          </div>
          <div className="flex justify-between">
            <p className="text-xs text-gray-500">Line</p>
            <p className="text-sm font-medium">{lines}</p>
          </div>
          <div className="flex justify-between">
            <p className="text-xs text-gray-500">Columns</p>
            <p className="text-sm font-medium">{end}</p>
          </div>

          <h1 className="text-md font-bold">Text</h1>

          <div className="flex justify-between">
            <p className="text-xs text-gray-500">Bytes</p>
            <p className="text-sm font-medium">{bytes}</p>
          </div>
          <div className="flex justify-between">
            <p className="text-xs text-gray-500">Characters</p>
            <p className="text-sm font-medium">{characters}</p>
          </div>
          <div className="flex justify-between">
            <p className="text-xs text-gray-500">Words</p>
            <p className="text-sm font-medium">{words}</p>
          </div>
          <div className="flex justify-between">
            <p className="text-xs text-gray-500">Sentences</p>
            <p className="text-sm font-medium">{sentences}</p>
          </div>
          <div className="flex justify-between">
            <p className="text-xs text-gray-500">Paragraphs</p>
            <p className="text-sm font-medium">{paragraphs}</p>
          </div>
          <div className="flex justify-between">
            <p className="text-xs text-gray-500">Lines</p>
            <p className="text-sm font-medium">{lines}</p>
          </div>
          <div className="flex justify-between">
            <p className="text-xs text-gray-500">Numbers</p>
            <p className="text-sm font-medium">{numbers}</p>
          </div>
        </div>

        {text && (
          <>
            <h1 className="text-md font-bold">Character frequency</h1>
            <div className="mt-2">
              {handleCharacterFrequency().map(([char, count]) => (
                <div className="flex justify-between" key={char}>
                  <p className="text-xs text-gray-500">{char}</p>
                  <p className="text-sm font-medium">{count}</p>
                </div>
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Statistics;
