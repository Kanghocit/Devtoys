"use client";

import Header from "@/common/Header";
import Button from "@/components/button";
import CustomCard from "@/components/card/CustomCard";

import { useState } from "react";

import { CiImageOn } from "react-icons/ci";
import { LiaExchangeAltSolid } from "react-icons/lia";
import { MdDelete, MdSave } from "react-icons/md";

import Upload from "@/components/upload";

interface ImageFile {
  id: string;
  file: File;
  preview: string;
  converting: boolean;
  converted?: Blob;
}

const ImageConverter = () => {
  const [targetFormat, setTargetFormat] = useState("PNG");
  const [files, setFiles] = useState<ImageFile[]>([]);
  const [error, setError] = useState<string | null>(null);

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

      <div className="flex justify-between ms-2">
        <p className="text-sm font-semibold">Configuration </p>
      </div>
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

      <Upload
        title="Drag & drop a BMP, GIF, JPG, PNG, SVG WEBP file here"
        onFileSelect={handleFile}
      />

      {error && <p className="text-red-500 text-sm mt-2">{error}</p>}

      {files.length > 0 && (
        <div className="flex justify-end gap-2 mt-1 me-2">
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
                      className="py-2 flex items-center px-4 hover:bg-blue-500"
                      onClick={() => convertImage(file)}
                    >
                      Convert to {targetFormat}
                    </Button>
                  )}
                </div>
                <div className="flex gap-2 ms-2">
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
