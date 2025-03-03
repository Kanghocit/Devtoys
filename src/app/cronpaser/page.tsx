"use client";
import Button from "@/components/button";
import CustomCard from "@/components/Card/CusCard";
import Input from "@/components/input";
import Switch from "@/components/switch";
import Textarea from "@/components/textarea";
import { useEffect, useRef, useState } from "react";
import { FaRegPaste } from "react-icons/fa6";
import { FiSave } from "react-icons/fi";
import { LiaExchangeAltSolid } from "react-icons/lia";
import { LuCopy, LuStar, LuTrash } from "react-icons/lu";
import { MdFilePresent, MdOutlineSpaceBar } from "react-icons/md";

const CronParser = () => {
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const [valueCron, setValueCron] = useState("* * * * * *");
  const [desCron, setDesCron] = useState("");
  const [scheduledDates, setScheduledDates] = useState("");

  const data = new Date();
  const checkCron = (cron: string) => {
    if (valueCron === "* * * * * *") {
      setDesCron("Every second");
      setScheduledDates(
        "2025-03-03 Mon 10:00:00\n2025-03-03 Mon 10:00:01\n2025-03-03 Mon 10:00:02\n2025-03-03 Mon 10:00:01\n2025-03-03 Mon 10:00:02"
      );
    }
  };

  const handleClear = () => {
    setValueCron("");
    setDesCron("");
    setScheduledDates("");
  };
  useEffect(() => {
    checkCron(valueCron);
  }, [valueCron]);

  console.log("data", data);
  return (
    <div className="flex flex-col rounded-2xl h-full p-2">
      {/* Header  */}
      <div className="flex justify-between">
        <p className="font-bold text-2xl m-2">Cron expression parser</p>
        <div className="flex items-center gap-2">
          <Button icon={<LuStar />} className="flex items-center text-xs">
            Add to favorites
          </Button>
        </div>
      </div>

      <p className="text-xs ms-2">Configuration</p>

      <CustomCard title="Include seconds" icon={<LiaExchangeAltSolid />}>
        <Switch />
      </CustomCard>
      <CustomCard title="Next scheduled dates" icon={<MdOutlineSpaceBar />}>
        <select className="border border-gray-300 rounded-md p-1 text-sm focus:outline-none">
          <option value="5">5</option>
          <option value="10">10</option>
          <option value="25">25</option>
          <option value="50">50</option>
          <option value="100">100</option>
        </select>
      </CustomCard>
      <CustomCard title="Output format" icon={<MdOutlineSpaceBar />}>
        <select className="border border-gray-300 rounded-md p-1 text-sm focus:outline-none">
          <option value="yyyy-MM-dd ddd HH:mm:ss">
            yyyy-MM-dd ddd HH:mm:ss
          </option>
        </select>
      </CustomCard>

      {/* Cron expression to parse */}
      <div className="flex justify-between my-2">
        <div className="flex flex-col justify-end ms-2">
          <p className="text-xs">Cron expression to parse</p>
        </div>

        <div className="flex gap-2 pe-2">
          <Button icon={<FaRegPaste />}>Paste</Button>
          <input type="file" ref={fileInputRef} className="hidden" />
          <Button
            icon={<MdFilePresent />}
            onClick={() => fileInputRef.current?.click()}
          />
          <Button icon={<LuTrash />} onClick={handleClear} />
          <Button icon={<FiSave />} />
          <Button icon={<LuCopy />}>Copy</Button>
        </div>
      </div>
      <div className="me-3 pe-1">
        <Input
          type="text"
          className="w-full"
          value={valueCron}
          onChange={(e) => setValueCron(e.target.value)}
        />
      </div>

      {/* Description Cron */}
      <div className="flex justify-between my-2">
        <div className="flex flex-col justify-end ms-2">
          <p className="text-xs">Cron description</p>
        </div>

        <div className="flex gap-2 pe-2">
          <Button icon={<FaRegPaste />}>Paste</Button>
          <Button icon={<LuCopy />}>Copy</Button>
        </div>
      </div>
      <div className="me-3 pe-1">
        <Input
          type="text"
          className="w-full"
          value={desCron}
          onChange={(e) => setDesCron(e.target.value)}
        />
      </div>
      {/* Next scheduled dates */}
      <div className="me-3 ms-2">
        <div className="flex flex-col justify-end ">
          <p className="text-xs">Next scheduled dates</p>
        </div>
        <Textarea
          className="w-full"
          value={scheduledDates}
          onChange={(e) => setScheduledDates(e.target.value)}
        />
      </div>
    </div>
  );
};

export default CronParser;
