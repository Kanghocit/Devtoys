"use client";
import Button from "@/components/button";
import Header from "@/common/Header";
import CustomCard from "@/components/Card/CusCard";
import React, { useRef, useState, DragEvent } from "react";
import { BiPaste } from "react-icons/bi";
import { LiaExchangeAltSolid } from "react-icons/lia";
import { MdDelete, MdFilePresent, MdSave } from "react-icons/md";
import { CiImageOn } from "react-icons/ci";

interface ImageFile {
  id: string;
  file: File;
  preview: string;
  converting: boolean;
  converted?: Blob;
}

const ImageConverter = () => {
  const [targetFormat, setTargetFormat] = useState("PNG");
  const [isDragging, setIsDragging] = useState(false);
  const [files, setFiles] = useState<ImageFile[]>([]);
  const [error, setError] = useState<string | null>(null);

  const dropZoneRef = useRef<HTMLDivElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFile = async (file: File) => {
    try {
      if (!file.type.startsWith("image/")) {
        throw new Error("Please upload an image file");
      }

      const id = Math.random().toString(36).substring(7);
      const preview = URL.createObjectURL(file);

      setFiles((prev) => [
        ...prev,
        {
          id,
          file,
          preview,
          converting: false,
        },
      ]);

      setError(null);
    } catch {
      setError("Failed to load image");
    }
  };

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newFiles = Array.from(event.target.files || []);
    newFiles.forEach(handleFile);
  };

  const handleDrop = (e: DragEvent) => {
    e.preventDefault();
    setIsDragging(false);

    const droppedFiles = Array.from(e.dataTransfer.files);
    droppedFiles.forEach(handleFile);
  };

  const handleDragOver = (e: DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e: DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handlePaste = async () => {
    try {
      const items = await navigator.clipboard.read();
      for (const item of items) {
        const imageType = item.types.find((type) => type.startsWith("image/"));
        if (imageType) {
          const blob = await item.getType(imageType);
          const file = new File([blob], "pasted-image", { type: imageType });
          await handleFile(file);
          return;
        }
      }
      setError("No image found in clipboard");
    } catch {
      setError("Failed to paste image");
    }
  };

  const convertImage = async (imageFile: ImageFile) => {
    try {
      setFiles((prev) =>
        prev.map((f) =>
          f.id === imageFile.id ? { ...f, converting: true } : f
        )
      );

      const canvas = document.createElement("canvas");
      const ctx = canvas.getContext("2d");
      const img = new Image();

      await new Promise((resolve, reject) => {
        img.onload = resolve;
        img.onerror = reject;
        img.src = imageFile.preview;
      });

      canvas.width = img.width;
      canvas.height = img.height;
      ctx?.drawImage(img, 0, 0);

      const blob = await new Promise<Blob>((resolve) => {
        canvas.toBlob((blob) => {
          if (blob) resolve(blob);
        }, `image/${targetFormat.toLowerCase()}`);
      });

      setFiles((prev) =>
        prev.map((f) =>
          f.id === imageFile.id
            ? { ...f, converting: false, converted: blob }
            : f
        )
      );
    } catch {
      setError(`Failed to convert image`);
      setFiles((prev) =>
        prev.map((f) =>
          f.id === imageFile.id ? { ...f, converting: false } : f
        )
      );
    }
  };

  const handleSaveAll = () => {
    files.forEach((file) => {
      if (file.converted) {
        const link = document.createElement("a");
        link.href = URL.createObjectURL(file.converted);
        link.download = `${
          file.file.name.split(".")[0]
        }.${targetFormat.toLowerCase()}`;
        link.click();
      }
    });
  };

  const handleSaveOne = (file: ImageFile) => {
    if (file.converted) {
      const link = document.createElement("a");
      link.href = URL.createObjectURL(file.converted);
      link.download = `${
        file.file.name.split(".")[0]
      }.${targetFormat.toLowerCase()}`;
      link.click();
    }
  };

  const handleDeleteAll = () => {
    files.forEach((file) => {
      URL.revokeObjectURL(file.preview);
      if (file.converted) {
        URL.revokeObjectURL(URL.createObjectURL(file.converted));
      }
    });
    setFiles([]);
  };

  const handleDeleteOne = (id: string) => {
    setFiles((prev) => {
      const file = prev.find((f) => f.id === id);
      if (file) {
        URL.revokeObjectURL(file.preview);
        if (file.converted) {
          URL.revokeObjectURL(URL.createObjectURL(file.converted));
        }
      }
      return prev.filter((f) => f.id !== id);
    });
  };

  return (
    <div className="flex flex-col rounded-2xl h-full p-2">
      <Header title="Image Converter" />
      <p className="text-xs">Configuration </p>
      <CustomCard
        title="Conversion"
        icon={<LiaExchangeAltSolid />}
        subTitle="Select which conversion mode you want to use"
      >
        <select
          className="border border-gray-300 rounded-md p-1 text-sm focus:outline-none"
          value={targetFormat}
          onChange={(e) => setTargetFormat(e.target.value)}
        >
          <option value="PNG">PNG</option>
          <option value="JPEG">JPEG</option>
          <option value="WEBP">WEBP</option>
        </select>
      </CustomCard>

      <div
        ref={dropZoneRef}
        onDrop={handleDrop}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        className={`text-xs px-3 py-5 flex flex-col gap-3 justify-between items-center 
          border-dashed border-2 rounded-md transition-colors duration-200
          ${isDragging ? "border-blue-500 bg-blue-50" : "border-gray-300"}`}
      >
        <p>Drag & drop a BMP, GIF, JPG, PNG, SVG WEBP file here</p>
        <span>or</span>
        <div className="flex gap-2 text-blue-500 items-center">
          <input
            type="file"
            className="hidden"
            ref={fileInputRef}
            accept="image/*"
            multiple
            onChange={handleFileUpload}
          />
          <Button
            variant="text"
            onClick={() => fileInputRef.current?.click()}
            className="hover:text-blue-800"
            icon={<MdFilePresent />}
          >
            Browse files
          </Button>
          <p>/</p>
          <Button
            variant="text"
            className="hover:text-blue-800"
            onClick={handlePaste}
            icon={<BiPaste />}
          >
            Paste
          </Button>
        </div>
      </div>

      {error && <p className="text-red-500 text-sm mt-2">{error}</p>}

      {files.length > 0 && (
        <div className="flex justify-end gap-2 mt-1">
          <Button
            variant="primary"
            className="flex items-center px-4"
            icon={<MdSave />}
            onClick={handleSaveAll}
          >
            Save all
          </Button>
          <Button
            variant="default"
            className="flex items-center px-4"
            icon={<MdDelete />}
            onClick={handleDeleteAll}
          >
            Delete all
          </Button>
        </div>
      )}

      <div className="space-y-4 mt-4">
        {files.map((file) => (
          <CustomCard key={file.id} title={file.file.name} icon={<CiImageOn />}>
            <div className="flex flex-col gap-4">
              <div className="aspect-video relative rounded-lg overflow-hidden">
                <img
                  src={file.preview}
                  alt={file.file.name}
                  className="w-50 h-50 object-contain"
                />
              </div>
              <div className="flex justify-between items-center">
                <div className="flex items-center gap-2">
                  <span className="text-sm">
                    {file.converting
                      ? "Converting..."
                      : file.converted
                      ? "Converted"
                      : "Ready to convert"}
                  </span>
                  {!file.converted && !file.converting && (
                    <Button
                      variant="primary"
                      className="p-1 hover:bg-blue-500"
                      onClick={() => convertImage(file)}
                    >
                      Convert to {targetFormat}
                    </Button>
                  )}
                </div>
                <div className="flex gap-2">
                  {file.converted && (
                    <Button
                      variant="default"
                      icon={<MdSave />}
                      onClick={() => handleSaveOne(file)}
                    >
                      Save
                    </Button>
                  )}
                  <Button
                    variant="default"
                    className="mx-2"
                    icon={<MdDelete />}
                    onClick={() => handleDeleteOne(file.id)}
                  >
                    Delete
                  </Button>
                </div>
              </div>
            </div>
          </CustomCard>
        ))}
      </div>
    </div>
  );
};

export default ImageConverter;
