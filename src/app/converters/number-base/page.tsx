"use client";
import Button from "@/components/button";
import CustomCard from "@/components/Card/CusCard";
import Input from "@/components/input";
import Switch from "@/components/switch";
import { useRef, useState } from "react";
import { FaRegPaste } from "react-icons/fa6";
import { FiSave } from "react-icons/fi";
import { LuBrain, LuCopy, LuStar, LuTrash } from "react-icons/lu";
import { MdFilePresent } from "react-icons/md";
import { RiCharacterRecognitionLine } from "react-icons/ri";

const NumberBase = () => {
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const numberBases = [
    { title: "Hexadecimal", value: "hex", base: 16 },
    { title: "Decimal", value: "decimal", base: 10 },
    { title: "Octal", value: "octal", base: 8 },
    { title: "Binary", value: "binary", base: 2 },
  ];

  const [values, setValues] = useState({
    hex: "",
    decimal: "",
    octal: "",
    binary: "",
  });

  const handleChange = (inputValue: string, base: number) => {
    if (!inputValue) {
      setValues({ hex: "", decimal: "", octal: "", binary: "" });
      return;
    }

    // Kiểm tra hợp lệ
    const decimalValue = parseInt(inputValue, base);
    if (isNaN(decimalValue)) return;

    setValues({
      hex: decimalValue.toString(16).toUpperCase(),
      decimal: decimalValue.toString(10),
      octal: decimalValue.toString(8),
      binary: decimalValue.toString(2),
    });
  };

  return (
    <div className="m-2 flex flex-col rounded-tl-2xl h-full p-2">
      <div className="flex justify-between">
        <p className="font-bold text-2xl m-2">Number Base Converter</p>
        <div className="flex justify-center items-center gap-2">
          <Button icon={<LuStar />} className="flex items-center text-xs">
            Add to favorites
          </Button>
        </div>
      </div>

      <p className="m-2">Configuration</p>
      <CustomCard title="Format Number" icon={<RiCharacterRecognitionLine />}>
        <Switch />
      </CustomCard>
      <CustomCard title="Advanced mode" icon={<LuBrain />}>
        <Switch />
      </CustomCard>

      {numberBases.map(({ title, value, base }) => (
        <div key={value}>
          <div className="flex justify-between">
            <p className="text-sm ms-2 text-gray-500">{title}</p>

            <div className="flex gap-2 pe-2">
              <Button icon={<FaRegPaste />}>Paste</Button>
              <input type="file" ref={fileInputRef} className="hidden" />
              <Button
                icon={<MdFilePresent />}
                onClick={() => fileInputRef.current?.click()}
              />
              <Button
                icon={<LuTrash />}
                onClick={() =>
                  setValues({ hex: "", decimal: "", octal: "", binary: "" })
                }
              />
              <Button icon={<FiSave />} />
              <Button icon={<LuCopy />}>Copy</Button>
            </div>
          </div>

          {/* values['hex'] : ) */}
          <div className="me-3 pe-1">
            <Input
              type="text"
              className="w-full"
              value={values[value as keyof typeof values]}
              onChange={(e) => handleChange(e.target.value, base)}
            />
          </div>
        </div>
      ))}

      {/* <div className="mt-4 p-2 bg-gray-100 rounded-md">
        {numberBases.map(({ title, value }) => (
          <p key={value}>
            {title}: {values[value as keyof typeof values]}
          </p>
        ))}
      </div> */}
    </div>
  );
};

export default NumberBase;
