"use client";

import Header from "@/common/Header";
import Button from "@/components/button";
import CustomCard from "@/components/card/CustomCard";
import Textarea from "@/components/textarea";
import Input from "@/components/input";

import clsx from "clsx";

import { useRef, useState, useCallback } from "react";

import { FaBusinessTime } from "react-icons/fa";
import { LiaExchangeAltSolid } from "react-icons/lia";
import { LuCopy } from "react-icons/lu";
import { MdClear, MdFilePresent } from "react-icons/md";

import { toast } from "react-hot-toast";

const MarkdownPreview = () => {
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [theme, setTheme] = useState("Light");
  const [isDragging, setIsDragging] = useState(false);

  // Chuyển Markdown thành HTML với nhiều cú pháp hơn
  const markdownToStyledHtml = useCallback((markdown: string): string => {
    let html = markdown
      // Headers
      .replace(
        /^# (.+)/gm,
        (_, title) =>
          `<h1 class="text-4xl font-bold my-4 pb-2 border-b-2 border-gray-300">${title}</h1>`
      )
      .replace(
        /^## (.+)/gm,
        (_, title) =>
          `<h2 class="text-3xl font-bold my-3 pb-1 border-b border-gray-300">${title}</h2>`
      )
      .replace(
        /^### (.+)/gm,
        (_, title) => `<h3 class="text-2xl font-bold my-2">${title}</h3>`
      )
      .replace(
        /^#### (.+)/gm,
        (_, title) => `<h4 class="text-xl font-bold my-2">${title}</h4>`
      )
      .replace(
        /^##### (.+)/gm,
        (_, title) => `<h5 class="text-lg font-bold my-1">${title}</h5>`
      )
      .replace(
        /^###### (.+)/gm,
        (_, title) => `<h6 class="text-base font-bold my-1">${title}</h6>`
      )

      // Emphasis
      .replace(/\*\*(.+?)\*\*/g, "<strong>$1</strong>")
      .replace(/\*(.+?)\*/g, "<em>$1</em>")
      .replace(/~~(.+?)~~/g, "<del>$1</del>")

      // Lists
      .replace(/^\s*[-+*]\s+(.+)/gm, '<li class="ml-4">$1</li>')
      .replace(/^\s*(\d+)\.\s+(.+)/gm, '<li class="ml-4">$2</li>')

      // Links and Images
      .replace(
        /\[(.+?)\]\((.+?)\)/g,
        '<a href="$2" class="text-blue-500 hover:underline" target="_blank">$1</a>'
      )
      .replace(
        /!\[(.+?)\]\((.+?)\)/g,
        '<img src="$2" alt="$1" class="max-w-full my-2 rounded-md">'
      )

      // Code blocks
      .replace(
        /```(\w+)?\n([\s\S]+?)```/g,
        (_, lang, code) => `
        <pre class="bg-gray-100 dark:bg-gray-800 rounded-md p-4 my-4 overflow-x-auto">
          <code class="language-${lang || "plaintext"}">${code.trim()}</code>
        </pre>
      `
      )
      .replace(
        /`(.+?)`/g,
        '<code class="bg-gray-100 dark:bg-gray-800 px-1 rounded">$1</code>'
      )

      // Blockquotes
      .replace(
        /^>\s+(.+)/gm,
        '<blockquote class="border-l-4 border-gray-300 pl-4 my-2 italic">$1</blockquote>'
      )

      // Tables
      .replace(/\|(.+)\|/g, (match) => {
        const cells = match.split("|").slice(1, -1);
        return `<tr>${cells
          .map((cell) => `<td class="border px-4 py-2">${cell.trim()}</td>`)
          .join("")}</tr>`;
      })

      // Horizontal rules
      .replace(/^---+$/gm, '<hr class="my-4 border-t border-gray-300">')

      // Paragraphs
      .replace(/\n\n([^#\n].+)/g, '\n\n<p class="my-2">$1</p>');

    // Wrap lists in ul/ol tags
    html = html
      .replace(
        /<li class="ml-4">(.+?)<\/li>/g,
        '<ul class="list-disc my-2">$&</ul>'
      )
      .replace(/<\/ul>\s*<ul>/g, "");

    // Wrap tables in table tags
    html = html
      .replace(
        /<tr>(.+?)<\/tr>/g,
        '<table class="border-collapse my-4 w-full">$&</table>'
      )
      .replace(/<\/table>\s*<table>/g, "");

    return html.trim();
  }, []);

  // Xử lý khi nhập Markdown
  const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const rawMarkdown = e.target.value;
    setInput(rawMarkdown);
    setOutput(markdownToStyledHtml(rawMarkdown));
  };

  // File handling
  const handleFileUpload = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0];
      if (file) {
        if (!file.name.toLowerCase().endsWith(".md")) {
          toast.error("Please select a Markdown file (.md)");
          return;
        }

        const reader = new FileReader();
        reader.onload = (e) => {
          try {
            const content = e.target?.result as string;
            setInput(content);
            setOutput(markdownToStyledHtml(content));
            toast.success("File loaded successfully");
          } catch {
            toast.error("Failed to read file");
          }
        };
        reader.onerror = () => toast.error("Failed to read file");
        reader.readAsText(file);
      }
    },
    [markdownToStyledHtml]
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

  const handleDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault();
      setIsDragging(false);

      const file = e.dataTransfer.files[0];
      if (file) {
        if (!file.name.toLowerCase().endsWith(".md")) {
          toast.error("Please select a Markdown file (.md)");
          return;
        }

        const reader = new FileReader();
        reader.onload = (e) => {
          try {
            const content = e.target?.result as string;
            setInput(content);
            setOutput(markdownToStyledHtml(content));
            toast.success("File dropped successfully");
          } catch {
            toast.error("Failed to read dropped file");
          }
        };
        reader.onerror = () => toast.error("Failed to read dropped file");
        reader.readAsText(file);
      }
    },
    [markdownToStyledHtml]
  );

  // Clipboard operations
  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(input);
      toast.success("Markdown copied to clipboard");
    } catch {
      toast.error("Failed to copy to clipboard");
    }
  };

  const handlePaste = async () => {
    try {
      const text = await navigator.clipboard.readText();
      setInput(text);
      setOutput(markdownToStyledHtml(text));
      toast.success("Text pasted successfully");
    } catch {
      toast.error("Failed to paste from clipboard");
    }
  };

  const handleClear = () => {
    setInput("");
    setOutput("");
    toast.success("Content cleared");
  };

  // Save as MD file
  const handleSave = () => {
    if (!input) {
      toast.error("No content to save");
      return;
    }

    const blob = new Blob([input], { type: "text/markdown" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "document.md";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    toast.success("File saved successfully");
  };

  return (
    <div className="flex flex-col rounded-2xl h-full p-2">
      <Header title="Markdown Preview" />

      <CustomCard title="Conversion" icon={<LiaExchangeAltSolid />}>
        <select
          className="border border-gray-300 rounded-md p-1 text-sm focus:outline-none py-1"
          value={theme}
          onChange={(e) => setTheme(e.target.value)}
        >
          <option value="Light">Light</option>
          <option value="Dark">Dark</option>
        </select>
      </CustomCard>

      <div className="grid grid-cols-2 gap-4">
        <div className="mx-1">
          <div className="flex m-2 justify-between">
            <div className="flex justify-center items-end gap-2">
              <p className="text-sm font-semibold">Markdown</p>
            </div>

            <div className="flex gap-2">
              <Button icon={<FaBusinessTime />} onClick={handleSave} />
              <Button icon={<LuCopy />} onClick={handlePaste}>
                Paste
              </Button>

              <Input
                type="file"
                inputRef={fileInputRef}
                accept=".md"
                onChange={handleFileUpload}
              />

              <Button
                icon={<MdFilePresent />}
                onClick={() => fileInputRef.current?.click()}
              />
              <Button icon={<MdClear />} onClick={handleClear} />
            </div>
          </div>
          <div
            className={clsx(
              "min-h-[calc(95vh-140px)] border-2 ms-2",
              isDragging ? "border-blue-500 bg-blue-50" : "border-gray-300",
              "rounded-md mt-1 transition-colors duration-200"
            )}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
          >
            <Textarea
              hasBorder={false}
              value={input}
              onChange={handleInputChange}
              className="min-h-280"
              placeholder="Type your Markdown here..."
            />
          </div>
        </div>

        <div className="mx-2">
          <div className="flex my-2 justify-between">
            <div className="flex justify-center items-end gap-2">
              <p className="text-sm font-semibold">Preview</p>
            </div>
            <Button icon={<LuCopy />} onClick={handleCopy}>
              Copy Markdown
            </Button>
          </div>
          <div
            className={clsx(
              "min-h-[calc(95vh-140px)] p-3 border-1 border-gray-300 rounded-md overflow-auto",
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
