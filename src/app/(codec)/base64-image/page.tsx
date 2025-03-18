"use client";

import Header from "@/common/Header";
import Button from "@/components/button";
import ButtonCopy from "@/components/button/copy";
import ButtonDelete from "@/components/button/delete";
import ButtonPaste from "@/components/button/paste";
import Input from "@/components/input";
import Textarea from "@/components/textarea";

import { useRef, useState } from "react";

import { MdFilePresent } from "react-icons/md";

const Base64Image = () => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [imgsrc, setImgsrc] = useState<string | null>(null);

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setImgsrc(e.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="flex flex-col rounded-2xl h-full p-2 me-2 ">
      <Header title="Base64 Image Encoder / Decoder" />

      <div className="grid grid-cols-[70%_30%] gap-2 me-3">
        <div>
          <div className="flex justify-between items-center p-2">
            <p className="text-sm font-semibold">Text</p>

            <div className="flex gap-2">
              <ButtonPaste setInputText={setImgsrc} />
              <Button icon={<MdFilePresent />} />
              <ButtonDelete setClearText={setImgsrc} />
              <ButtonCopy input={imgsrc || ""} />
            </div>
          </div>

          <div className="min-h-[calc(100vh-140px)] border-1 ms-2 border-gray-300 rounded-md">
            <Textarea
              hasBorder={false}
              value={imgsrc || ""}
              onChange={(e) => setImgsrc(e.target.value)}
              autoFocus
              placeholder="Enter your base64 text here"
            />
          </div>
        </div>

        <div className=" flex flex-col gap-2">
          <div className="text-xs px-3 py-5 flex flex-col gap-3 justify-between items-center  border-dashed border-2 border-gray-300 rounded-md">
            <p>Drag & drop a BMP, GIF, JPG, PNG, SVG WEBP file here</p>
            <span>or</span>
            <div className="flex gap-2 text-blue-500 hover:text-blue-800">
              <Input
                type="file"
                inputRef={fileInputRef}
                accept="image/*"
                onChange={handleFileUpload}
              />
              <Button
                variant="text"
                onClick={() => fileInputRef.current?.click()}
              >
                Browse files
              </Button>
              <Button variant="text">Paste</Button>
            </div>
          </div>
          <div className="min-h-[calc(94vh-140px)] p-3 rounded-md text-sm me-1 shadow-md border border-gray-300 flex justify-center items-center">
            {imgsrc ? (
              <img
                src={imgsrc}
                alt="Uploaded preview"
                className="max-h-full max-w-full rounded-md"
              />
            ) : (
              <p>No image selected</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Base64Image;
