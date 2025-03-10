"use client";
import Header from "@/common/Header";
import Button from "@/components/button";
import CustomCard from "@/components/Card/CusCard";
import Switch from "@/components/switch";
import Textarea from "@/components/textarea";
import { useCallback, useEffect, useState } from "react";
import { FaRegPaste } from "react-icons/fa6";
import { FiSave } from "react-icons/fi";
import { LiaExchangeAltSolid } from "react-icons/lia";
import { MdClear } from "react-icons/md";

const ListComparer = () => {
  const [inputTextA, setInputTextA] = useState("");
  const [inputTextB, setInputTextB] = useState("");
  const [outputText, setOutputText] = useState("");
  const [isEscape, setIsEscape] = useState(false);
  const [selectedOption, setSelectedOption] = useState("");

  const handleConversion = useCallback(() => {
    const listA = inputTextA.split("\n").map((item) => item.trim());
    const listB = inputTextB.split("\n").map((item) => item.trim());

    try {
      let result: string[] = [];

      // Nếu không phân biệt hoa/thường, chuyển tất cả về lowercase
      const normalize = (text: string) =>
        isEscape ? text : text.toLowerCase();

      switch (selectedOption) {
        case "1": // Giao (A ∩ B)
          result = listA.filter((item) =>
            listB.some((b) => normalize(b) === normalize(item))
          );
          break;
        case "2": // A - B (Phần tử có trong A nhưng không có trong B)
          result = listA.filter(
            (item) => !listB.some((b) => normalize(b) === normalize(item))
          );
          break;
        case "3": // Chỉ lấy danh sách A
          result = listA;
          break;
        case "4": // Chỉ lấy danh sách B
          result = listB;
          break;
        default:
          setOutputText("Invalid option");
          return;
      }

      setOutputText(result.join("\n"));
    } catch {
      setOutputText("Invalid input");
    }
  }, [inputTextA, inputTextB, selectedOption, isEscape]);
  useEffect(() => {
    handleConversion();
  }, [handleConversion]);

  return (
    <div className="flex flex-col rounded-2xl h-full p-2">
      {/* Header  */}
      <Header title="List Compare" />

      <p className="text-xs ms-2">Configuration</p>

      <CustomCard
        title="Conversion"
        icon={<LiaExchangeAltSolid />}
        subTitle="Select which conversion mode you want to use"
      >
        <Switch
          valueTrue="On"
          valueFalse="Off"
          onToggle={() => setIsEscape(!isEscape)}
        />
      </CustomCard>
      <CustomCard
        title="Conversion"
        icon={<LiaExchangeAltSolid />}
        subTitle="Select which conversion mode you want to use"
      >
        <select
          className="border border-gray-300 rounded-md p-1 text-sm focus:outline-none"
          value={selectedOption}
          onChange={(e) => setSelectedOption(e.target.value)}
        >
          <option value="1">A &#8745; B</option>
          <option value="2">A &#8746; B </option>
          <option value="3">Only A</option>
          <option value="4">Only B</option>
        </select>
      </CustomCard>

      <div className="flex flex-col mt-4 overflow-hidden">
        <div className="flex flex-col rounded-lg p-4 ">
          {/* Input */}
          <div className="grid grid-cols-2 gap-2">
            <div className="flex flex-col  my-1">
              <div className="flex justify-between items-center">
                <p className="text-xs">A</p>
                <div className="flex gap-2 mb-1">
                  <Button icon={<FaRegPaste />}>Paste</Button>
                  <Button icon={<FiSave />} />
                  <Button
                    icon={<MdClear />}
                    onClick={() => setInputTextA("")}
                  />
                </div>
              </div>
              <Textarea
                className="w-full h-100 mt-1"
                value={inputTextA}
                onChange={(e) => setInputTextA(e.target.value)}
              />
            </div>
            <div className="flex flex-col  my-1">
              <div className="flex justify-between items-center">
                <p className="text-xs">Input</p>
                <div className="flex gap-2 mb-1">
                  <Button icon={<FaRegPaste />}>Paste</Button>
                  <Button icon={<FiSave />} />
                  <Button
                    icon={<MdClear />}
                    onClick={() => setInputTextB("")}
                  />
                </div>
              </div>
              <Textarea
                className="w-full h-100 mt-1"
                value={inputTextB}
                onChange={(e) => setInputTextB(e.target.value)}
              />
            </div>
          </div>

          {/* Output */}
          <div className="flex flex-col mt-4">
            <div className="flex justify-between items-center">
              <p className="text-xs">Output</p>
              <div className="flex gap-2 mb-1">
                <Button icon={<FiSave />} />
                <Button icon={<MdClear />} onClick={() => setOutputText("")} />
              </div>
            </div>
            <Textarea
              className="w-full h-130 mt-1"
              value={outputText}
              readOnly
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ListComparer;
