"use client";

import Header from "@/common/Header";
import Button from "@/components/button";
import Input from "@/components/input";

import { DragEvent, useRef, useState } from "react";

import { BiPaste } from "react-icons/bi";
import { FaEye } from "react-icons/fa";
import { MdClose, MdFilePresent } from "react-icons/md";

type ColorBlindnessType =
  | "protanopia" // Red-blind
  | "deuteranopia" // Green-blind
  | "tritanopia" // Blue-blind
  | "original";

const ColorBlindness = () => {
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [selectedType, setSelectedType] = useState<ColorBlindnessType | null>(
    null
  );
  const [isModalOpen, setIsModalOpen] = useState(false);

  const fileInputRef = useRef<HTMLInputElement>(null);
  const dropZoneRef = useRef<HTMLDivElement>(null);

  const handleFile = async (file: File) => {
    try {
      setLoading(true);
      setError(null);

      // Validate file type
      if (!file.type.startsWith("image/")) {
        throw new Error("Please upload an image file");
      }

      const url = URL.createObjectURL(file);
      setImageUrl(url);
    } catch {
      setError("Failed to load image");
    } finally {
      setLoading(false);
    }
  };

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      handleFile(file);
    }
  };

  const handleDrop = (e: DragEvent) => {
    e.preventDefault();
    setIsDragging(false);

    const file = e.dataTransfer.files[0];
    if (file) {
      handleFile(file);
    }
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
          handleFile(file);
          return;
        }
      }
      setError("No image found in clipboard");
    } catch {
      setError("Failed to paste image");
    }
  };

  const getFilterStyle = (type: ColorBlindnessType): React.CSSProperties => {
    switch (type) {
      case "protanopia":
        return {
          filter: "url('#protanopia')",
          WebkitFilter: "url('#protanopia')",
        };
      case "deuteranopia":
        return {
          filter: "url('#deuteranopia')",
          WebkitFilter: "url('#deuteranopia')",
        };
      case "tritanopia":
        return {
          filter: "url('#tritanopia')",
          WebkitFilter: "url('#tritanopia')",
        };
      default:
        return {};
    }
  };

  const handleViewImage = (type: ColorBlindnessType) => {
    setSelectedType(type);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedType(null);
  };

  return (
    <div className="flex flex-col rounded-2xl h-full p-2">

      <Header title="Color Blindness Simulator" />

      {/* SVG Filters */}
      <svg className="hidden">
        <defs>
          {/* Mù đỏ  */}
          <filter id="protanopia">
            <feColorMatrix
              type="matrix"
              values="0.367, 0.861, -0.228, 0, 0
                      0.280, 0.673, 0.047, 0, 0
                      -0.011, 0.043, 0.968, 0, 0
                      0, 0, 0, 1, 0"
            />
          </filter>
          {/* Mù xanh lá cây */}
          <filter id="deuteranopia">
            <feColorMatrix
              type="matrix"
              values="0.625, 0.375, 0, 0, 0
                      0.700, 0.300, 0, 0, 0
                      0, 0.300, 0.700, 0, 0
                      0, 0, 0, 1, 0"
            />
          </filter>
          {/* Mù xanh dương */}
          <filter id="tritanopia">
            <feColorMatrix
              type="matrix"
              values="1.000, 0.152, -0.152, 0, 0
                      0.000, 0.875, 0.125, 0, 0
                      0.000, 0.820, 0.180, 0, 0
                      0, 0, 0, 1, 0"
            />
          </filter>
        </defs>
      </svg>

      <div
        ref={dropZoneRef}
        onDrop={handleDrop}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        className={`text-xs px-3 py-5 flex flex-col gap-3 justify-between items-center mx-2 
          border-dashed border-2 rounded-md transition-colors duration-200
          ${isDragging ? "border-blue-500 bg-blue-50" : "border-gray-300"}

          `}
      >
        <p>Drag & drop a BMP, GIF, JPG, PNG, SVG WEBP file here</p>
        <span>or</span>
        <div className="flex gap-2 text-blue-500 items-center">
          <Input
            type="file"
            inputRef={fileInputRef}
            accept="image/*"
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
      {imageUrl && (
        <>
          <div className="grid grid-cols-2 gap-4 w-full">
            {(
              [
                "original",
                "protanopia",
                "deuteranopia",
                "tritanopia",
              ] as ColorBlindnessType[]
            ).map((type) => (
              <div key={type} className="flex flex-col gap-2 mt-1">
                <div className="flex justify-between items-center">
                  <p className="capitalize">{type}</p>
                  <Button
                    variant="default"
                    icon={<FaEye />}
                    onClick={() => handleViewImage(type)}
                  >
                    View
                  </Button>
                </div>
                <div
                  className="relative aspect-video border border-gray-200 rounded-lg overflow-hidden cursor-pointer hover:border-blue-500 transition-colors duration-200"
                  onClick={() => handleViewImage(type)}
                >
                  {imageUrl && (
                    <img
                      src={imageUrl}
                      alt={`${type} view`}
                      className="w-full h-full object-contain p-1"
                      style={getFilterStyle(type)}
                    />
                  )}
                </div>
              </div>
            ))}
          </div>
        </>
      )}

      {/* Modal */}
      {isModalOpen && imageUrl && selectedType && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="relative bg-white rounded-lg w-[90vw] h-[90vh] p-4">
            <div className="absolute top-4 right-4 z-10">
              <Button
                variant="text"
                onClick={closeModal}
                icon={<MdClose />}
                className="text-gray-500 hover:text-gray-700"
              >
                Close
              </Button>
            </div>
            <div className="h-full flex flex-col">
              <h3 className="text-lg font-medium mb-4 capitalize">
                {selectedType} View
              </h3>
              <div className="flex-1 overflow-auto">
                <img
                  src={imageUrl}
                  alt={`${selectedType} view large`}
                  className="w-full h-full object-contain"
                  style={getFilterStyle(selectedType)}
                />
              </div>
            </div>
          </div>
        </div>
      )}

      {error && <p className="text-red-500 text-sm mt-2">{error}</p>}

      {loading && (
        <div className="flex justify-center mt-2">
          <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-blue-500"></div>
        </div>
      )}
    </div>
  );
};

export default ColorBlindness;
