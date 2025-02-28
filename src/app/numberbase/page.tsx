"use client";
import Button from "@/components/button";
import CustomCard from "@/components/Card/CusCard";
import Switch from "@/components/switch";
import { useRef, useState } from "react";
import { LuBrain, LuStar } from "react-icons/lu";
import { RiCharacterRecognitionLine } from "react-icons/ri";
import { MdFilePresent } from "react-icons/md";
import { FaRegPaste } from "react-icons/fa6";
import { FiSave } from "react-icons/fi";
import { LuCopy, LuTrash } from "react-icons/lu";
import Input from "@/components/input";

const NumberBase = () => {
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const handleIconClick = () => {
    fileInputRef.current?.click();
    console.log(fileInputRef.current?.files);
  };

  // State để lưu giá trị của từng ô input
  const [values, setValues] = useState({
    hex: "",
    decimal: "",
    octal: "",
    binary: "",
  });

  // Danh sách các hệ số
  const number = [
    { title: "Hexadecimal", value: "hex", base: 16 },
    { title: "Decimal", value: "decimal", base: 10 },
    { title: "Octal", value: "octal", base: 8 },
    { title: "Binary", value: "binary", base: 2 },
  ];

  const handleChange = (value: string, base: number, key: string) => {
    if (value === "") {
      setValues({ hex: "", decimal: "", octal: "", binary: "" });
      return;
    }
    try {
      const decimalValue = parseInt(value, base); // Chuyển về hệ 10

      if (isNaN(decimalValue)) return; // Nếu không hợp lệ thì không làm gì

      setValues({
        hex: decimalValue.toString(16).toUpperCase(), // Hệ 16
        decimal: decimalValue.toString(10), // Hệ 10
        octal: decimalValue.toString(8), // Hệ 8
        binary: decimalValue.toString(2), // Hệ 2
      });
    } catch (error) {
      console.error("Conversion error:", error);
    }
  };
  return (
    <div className="m-2 flex flex-col rounded-tl-2xl h-full p-2">
      <div className="flex justify-between">
        <p className="font-bold text-2xl m-2">Number Base Converter</p>
        <Button icon={<LuStar />} className="flex items-center text-xs">
          Add to favorites
        </Button>
      </div>

      <p className="m-2">Configuration</p>
      <CustomCard title="Format Number" icon={<RiCharacterRecognitionLine />}>
        <Switch />
      </CustomCard>
      <CustomCard title="Advanced mode" icon={<LuBrain />}>
        <Switch />
      </CustomCard>

      {/* Render từng ô input */}
      {number.map((item, index) => (
        <div key={index}>
          <div className="flex justify-between">
            <div className="flex items-end justify-center text-sm ms-2 text-gray-500">
              <p>{item.title}</p>
            </div>

            <div className="flex gap-2 pe-2">
              <Button icon={<FaRegPaste />}>Paste</Button>
              <input type="file" ref={fileInputRef} className="hidden" />
              <Button icon={<MdFilePresent />} onClick={handleIconClick} />
              <Button icon={<LuTrash />} />
              <Button icon={<FiSave />} />
              <Button icon={<LuCopy />}>Copy</Button>
            </div>
          </div>

          {/* Input field */}
          <div className="me-3 pe-1">
            <Input
              type="text"
              className="w-full"
              value={values[item.value as keyof typeof values]} // Gán giá trị từ state
              onChange={(e) =>
                setValues((prev) => ({
                  ...prev,
                  [item.value as keyof typeof values]: e.target.value, // Cập nhật đúng trường input
                }))
              }
            />
          </div>
        </div>
      ))}

      {/* Hiển thị giá trị để kiểm tra */}
      <div className="mt-4 p-2 bg-gray-100 rounded-md">
        <p>Hexadecimal: {values.hex}</p>
        <p>Decimal: {values.decimal}</p>
        <p>Octal: {values.octal}</p>
        <p>Binary: {values.binary}</p>
      </div>
    </div>
  );
};

export default NumberBase;
