"use client";

import { BiPaste } from "react-icons/bi";
import { MdFilePresent } from "react-icons/md";
import Button from "../button";
import clsx from "clsx";
import { useState, useRef } from "react";
import Input from "../input";

interface UploadProps {
  title?: string;
  className?: string;
  onFileSelect?: (file: File) => void;
  accept?: string;
  maxSize?: number; // in MB
  error?: string;
}

const Upload: React.FC<UploadProps> = ({
  className,
  title = "Drag & drop files here",
  onFileSelect,
  accept = "image/*",
  maxSize = 5,
  error: externalError,
}) => {
  const dropZoneRef = useRef<HTMLDivElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const validateFile = (file: File): boolean => {
    // Check file type
    if (accept !== "*" && !file.type.match(accept.replace("/*", "/"))) {
      setError(`Please upload a valid ${accept.split("/")[0]} file`);
      return false;
    }

    // Check file size
    if (file.size > maxSize * 1024 * 1024) {
      setError(`File size should not exceed ${maxSize}MB`);
      return false;
    }

    return true;
  };

  const handleFile = async (file: File) => {
    try {
      setLoading(true);
      setError(null);

      if (!validateFile(file)) {
        return;
      }

      onFileSelect?.(file);
    } catch (err) {
      setError("Failed to process file");
      console.error("File processing error:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);

    const file = e.dataTransfer.files[0];
    if (file) {
      handleFile(file);
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      handleFile(file);
    }
  };

  const handlePaste = async () => {
    try {
      const items = await navigator.clipboard.read();
      for (const item of items) {
        for (const type of item.types) {
          if (type.startsWith("image/")) {
            const blob = await item.getType(type);
            const file = new File([blob], "pasted-image.png", { type });
            handleFile(file);
            return;
          }
        }
      }
      setError("No image found in clipboard");
    } catch (err) {
      console.error("Paste error:", err);
      setError("Failed to paste image");
    }
  };

  return (
    <div className={clsx("w-full", className)}>
      <div
        ref={dropZoneRef}
        onDrop={handleDrop}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        className={clsx(
          "text-xs px-3 py-5 flex flex-col gap-3 justify-between items-center mx-2",
          "border-dashed border-2 rounded-md transition-colors duration-200",
          {
            "border-blue-500 bg-blue-50": isDragging,
            "border-red-500 bg-red-50": error || externalError,
            "border-gray-300": !isDragging && !error && !externalError,
          }
        )}
      >
        <p className="text-center">{title}</p>
        {loading ? (
          <div className="flex items-center gap-2">
            <div className="animate-spin h-4 w-4 border-2 border-blue-500 border-t-transparent rounded-full" />
            <span>Processing...</span>
          </div>
        ) : (
          <>
            <span>or</span>
            <div className="flex gap-2 text-blue-500 items-center">
              <Input
                type="file"
                inputRef={fileInputRef}
                accept={accept}
                onChange={handleFileUpload}
                className="hidden"
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
          </>
        )}
        {(error || externalError) && (
          <p className="text-red-500 text-xs mt-1">{error || externalError}</p>
        )}
      </div>
    </div>
  );
};

export default Upload;
