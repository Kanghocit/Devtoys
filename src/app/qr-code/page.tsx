"use client";
import Header from "@/common/Header";
import Button from "@/components/button";
import { LuCopy } from "react-icons/lu";
import { MdClear, MdFilePresent } from "react-icons/md";
import { useCallback, useEffect, useRef, useState } from "react";
import QRCode from "qrcode";
import jsQR from "jsqr";
import Textarea from "@/components/textarea";
import Input from "@/components/input";

const QRCodeGenerator = () => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [text, setText] = useState("");
  const [qrcode, setQrcode] = useState("");
  const [isDecode, setIsDecode] = useState(false);
  const [decodedText, setDecodedText] = useState("");

  const handleGenerate = async () => {
    if (!text) {
      setQrcode("");
      return;
    }
    try {
      const url = await QRCode.toDataURL(text);
      setQrcode(url);
    } catch (err) {
      console.error("Lỗi khi tạo QR code:", err);
    }
  };

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Hiển thị ảnh trước
    const reader = new FileReader();
    reader.onload = (e) => {
      setQrcode(e.target?.result as string);
    };
    reader.readAsDataURL(file);

    if (isDecode) {
      // Xử lý decode QR code
      try {
        const imageUrl = URL.createObjectURL(file);
        const img = new Image();
        img.src = imageUrl;

        img.onload = () => {
          const canvas = document.createElement("canvas");
          const context = canvas.getContext("2d");
          canvas.width = img.width;
          canvas.height = img.height;
          context?.drawImage(img, 0, 0);

          const imageData = context?.getImageData(
            0,
            0,
            canvas.width,
            canvas.height
          );
          if (imageData) {
            const code = jsQR(
              imageData.data,
              imageData.width,
              imageData.height
            );
            if (code) {
              setDecodedText(code.data);
              setText(code.data);
            } else {
              setDecodedText("Không tìm thấy QR code trong ảnh!");
            }
          }
        };
      } catch (err) {
        console.error("Lỗi khi decode QR code:", err);
        setDecodedText("Lỗi khi xử lý ảnh!");
      }
    }
  };

  const handlePaste = useCallback(async () => {
    try {
      if (isDecode) {
        const items = await navigator.clipboard.read();
        for (const item of items) {
          if (
            item.types.includes("image/png") ||
            item.types.includes("image/jpeg")
          ) {
            const blob = await item.getType(item.types[0]);
            const file = new File([blob], "pasted-image.png", {
              type: item.types[0],
            });
            const event = {
              target: { files: [file] },
            } as unknown as React.ChangeEvent<HTMLInputElement>;
            handleFileUpload(event);
            break;
          }
        }
      } else {
        const text = await navigator.clipboard.readText();
        setText(text);
      }
    } catch (err) {
      console.error("Lỗi khi dán từ clipboard:", err);
    }
  }, [isDecode]);

  const handleCopy = async () => {
    try {
      if (isDecode) {
        await navigator.clipboard.writeText(decodedText);
      } else {
        await navigator.clipboard.writeText(text);
      }
    } catch (err) {
      console.error("Lỗi khi copy:", err);
    }
  };

  useEffect(() => {
    if (!isDecode) {
      handleGenerate();
    }
  }, [text, isDecode]);

  return (
    <div className="flex flex-col rounded-2xl h-full p-2">
      <Header title="QR Code Encoder / Decoder" />

      <div className="flex justify-end mb-2">
        <Button
          variant="text"
          onClick={() => setIsDecode(!isDecode)}
          className="text-sm"
        >
          {isDecode ? "Chuyển sang tạo QR" : "Chuyển sang đọc QR"}
        </Button>
      </div>

      <div className="grid grid-cols-[70%_30%] gap-2">
        <div>
          <div className="flex justify-between items-center p-2">
            <p className="text-xs">{isDecode ? "Decoded Text" : "Text"}</p>
            <div className="flex gap-2">
              <Button icon={<LuCopy />} onClick={handlePaste}>
                Paste
              </Button>
              <Button
                icon={<MdFilePresent />}
                onClick={() => fileInputRef.current?.click()}
              />
              <Button
                icon={<MdClear />}
                onClick={() => {
                  setText("");
                  setDecodedText("");
                }}
              />
              <Button icon={<LuCopy />} onClick={handleCopy}>
                Copy
              </Button>
            </div>
          </div>

          <div className="min-h-[calc(100vh-140px)] border-1 border-gray-300 rounded-md mt-1">
            <Textarea
              hasBorder={false}
              placeholder={
                isDecode
                  ? "Decoded text will appear here..."
                  : "Enter text to generate QR code..."
              }
              className="w-full mt-1"
              value={isDecode ? decodedText : text}
              onChange={(e) => !isDecode && setText(e.target.value)}
              readOnly={isDecode}
            />
          </div>
        </div>

        <div className="flex flex-col gap-2">
          <div className="text-xs px-3 py-5 flex flex-col gap-3 justify-between items-center border-dashed border-2 border-gray-300 rounded-md">
            <p>
              {isDecode
                ? "Upload QR code image to decode"
                : "Upload image to display"}
            </p>
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

              <Button variant="text" onClick={handlePaste}>
                Paste
              </Button>
            </div>
          </div>
          <div className="h-[76vh] p-3 rounded-md text-sm shadow-md border border-gray-300 flex justify-center items-center">
            {qrcode ? (
              <img
                src={qrcode}
                alt="QR Code preview"
                className="w-100 h-100 rounded-md"
              />
            ) : (
              <p>
                {isDecode
                  ? "Upload QR code image to decode"
                  : "No image selected"}
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default QRCodeGenerator;
