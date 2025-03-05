"use client";
import Button from "@/components/button";
import CustomCard from "@/components/Card/CusCard";
import Textarea from "@/components/textarea";
import clsx from "clsx";
import { useRef, useState } from "react";
import { FaBusinessTime } from "react-icons/fa";
import { LiaExchangeAltSolid } from "react-icons/lia";
import { LuCopy, LuStar } from "react-icons/lu";
import { MdClear, MdFilePresent } from "react-icons/md";

const MarkdownPreview = () => {
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [theme, setTheme] = useState("Light");

  // Chuyển Markdown thành HTML
  const markdownToStyledHtml = (markdown: string): string => {
    return markdown
      .replace(/^# (.+)/gm, (_, title) => `<h1>${title.toUpperCase()}</h1>`)
      .replace(/^## (.+)/gm, (_, title) => `<h2>${title.toUpperCase()}</h2>`)
      .replace(/```(\w+)?/g, "<pre>")
      .trim();
  };

  // Xử lý khi nhập Markdown
  const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const rawMarkdown = e.target.value;
    setInput(rawMarkdown);
    setOutput(markdownToStyledHtml(rawMarkdown)); // Cập nhật output
  };

  return (
    <div className="flex flex-col rounded-2xl h-full p-2">
      {/* Header */}
      <div className="flex justify-between">
        <p className="font-bold text-2xl m-2">Markdown Preview</p>
        <div className="flex items-center gap-2">
          <Button icon={<LuStar />} className="flex items-center text-xs">
            Add to favorites
          </Button>
        </div>
      </div>

      <CustomCard title="Conversion" icon={<LiaExchangeAltSolid />}>
        <select
          className="border border-gray-300 rounded-md p-1 text-sm focus:outline-none"
          value={theme}
          onChange={(e) => setTheme(e.target.value)}
        >
          <option value="Light">Light</option>
          <option value="Dark">Dark</option>
        </select>
      </CustomCard>

      <div className="grid grid-cols-2">
        {/* Input */}
        <div className="mx-1">
          <div className="flex m-2 justify-between">
            <p className="text-xs flex justify-center items-center">Markdown</p>
            <div className="flex gap-2">
              <Button icon={<FaBusinessTime />} />
              <Button icon={<LuCopy />}>Paste</Button>
              <input type="file" ref={fileInputRef} className="hidden" />
              <Button icon={<MdFilePresent />} />
              <Button icon={<MdClear />} onClick={() => setInput("")} />
            </div>
          </div>
          <Textarea
            value={input}
            onChange={handleInputChange}
            className="min-h-280"
          />
        </div>

        {/* Output (Preview) */}
        <div className="mx-1">
          <div className="flex m-2 justify-between">
            <p className="text-xs flex justify-center items-center py-1">
              Preview
            </p>
          </div>
          <div
            className={clsx(
              "min-h-280 p-3 border rounded-md",
              theme === "Dark"
                ? "bg-gray-800 text-white"
                : "bg-white text-black"
            )}
            dangerouslySetInnerHTML={{ __html: output }}
          />
        </div>
      </div>
    </div>
  );
};

export default MarkdownPreview;
