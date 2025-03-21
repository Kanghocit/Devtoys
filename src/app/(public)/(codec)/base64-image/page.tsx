"use client";

import Header from "@/common/Header";
import Button from "@/components/button";
import ButtonCopy from "@/components/button/copy";
import ButtonDelete from "@/components/button/delete";
import ButtonPaste from "@/components/button/paste";
import Textarea from "@/components/textarea";

import { useState } from "react";

import Upload from "@/components/upload";
import { MdFilePresent } from "react-icons/md";

const Base64Image = () => {
  const [imgsrc, setImgsrc] = useState<string | null>(null);


  const handleFileUpload = (file: File) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      setImgsrc(e.target?.result as string);
    };
    reader.readAsDataURL(file);
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
          <Upload
            title="Drag & drop a BMP, GIF, JPG, PNG, SVG WEBP file here"
            onFileSelect={handleFileUpload}
          />
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
