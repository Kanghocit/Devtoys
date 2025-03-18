"use client";

import Header from "@/common/Header";
import Button from "@/components/button";
import CustomCard from "@/components/card/CustomCard";
import Input from "@/components/input";
import Switch from "@/components/switch";
import { handleCopy, handleFileUpload, handlePaste } from "@/utils/numberUtils";
import { useRef, useState } from "react";
import { FaRegPaste } from "react-icons/fa6";
import { LuBrain, LuCopy, LuTrash } from "react-icons/lu";
import { MdFilePresent } from "react-icons/md";
import { RiCharacterRecognitionLine } from "react-icons/ri";

const NumberBase = () => {
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const [isFormat, setIsFormat] = useState(false);

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

  const checkInputForbase64 = (inputValue: string) => {
    const inputCheck = inputValue.split("");
    if (inputCheck.length > 16) {
      return true;
    }
    return false;
  };
  const isValidInput = (value: string, base: number): boolean => {
    const regexMap: Record<number, RegExp> = {
      2: /^[01]+$/, // Chỉ chấp nhận 0 hoặc 1 cho hệ nhị phân
      8: /^[0-7]+$/, // Chỉ chấp nhận 0-7 cho hệ bát phân
      10: /^[0-9]+$/, // Chỉ chấp nhận 0-9 cho hệ thập phân
      16: /^[0-9A-Fa-f]+$/, // Chỉ chấp nhận 0-9, A-F cho hệ thập lục phân
    };

    return regexMap[base].test(value);
  };

  const handleChange = (inputValue: string, base: number) => {
    if (!inputValue || !isValidInput(inputValue, base)) return;

    const decimalValue = parseInt(inputValue.replace(/\s/g, ""), base); // Xóa khoảng trắng trước khi chuyển đổi
    if (isNaN(decimalValue)) return;

    setValues({
      hex: decimalValue.toString(16).toUpperCase(),
      decimal: decimalValue.toString(10),
      octal: decimalValue.toString(8),
      binary: decimalValue.toString(2).padStart(4 * inputValue.length, "0"), // Giữ đúng số bit
    });
  };

  const handleFormat = (inputValue: string, isFormat: boolean) => {
    if (isFormat) {
      return inputValue.match(/.{1,4}/g)?.join(" ") || "";
    }
    return inputValue;
  };

  return (
    <div className="m-2 flex flex-col rounded-tl-2xl h-full p-2">
      <Header title="Number Base Converter" />

      <p className="m-2">Configuration</p>
      <CustomCard title="Format Number" icon={<RiCharacterRecognitionLine />}>
        <Switch checked={isFormat} onChange={() => setIsFormat(!isFormat)} />
      </CustomCard>
      <CustomCard title="Advanced mode" icon={<LuBrain />}>
        <Switch />
      </CustomCard>

      {numberBases.map(({ title, value, base }) => (
        <div key={value}>
          <div className="flex justify-between">
            <div className="flex items-end gap-2 ms-3">
              <p className="text-sm font-semibold items-end">{title}</p>
            </div>

            <div className="flex gap-2 pe-2">
              <Button
                icon={<FaRegPaste />}
                onClick={() => handlePaste((val) => handleChange(val, base))}
              >
                Paste
              </Button>

              <Input
                type="file"
                inputRef={fileInputRef}
                onChange={(e) =>
                  handleFileUpload(e, (val) => handleChange(val, base))
                }
              />

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

              <Button
                icon={<LuCopy />}
                onClick={() => handleCopy(values[value as keyof typeof values])}
              >
                Copy
              </Button>
            </div>
          </div>
          {/* Alert */}
          {checkInputForbase64(values.hex) && (
            <p className="text-red-500 text-sm ms-2">
              Input must be less than 16 characters for hexadecimal
            </p>
          )}

          {/* values['hex'] : ) */}
          <div className="me-3 pe-1 py-1">
            <Input
              type="text"
              className="w-full"
              value={handleFormat(
                values[value as keyof typeof values],
                isFormat
              )}
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
