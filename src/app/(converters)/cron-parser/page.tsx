"use client";

import Header from "@/common/Header";
import Button from "@/components/button";
import ConfigCard from "@/components/card/ConfigCard";
import Input from "@/components/input";
import Switch from "@/components/switch";
import Textarea from "@/components/textarea";

import { useEffect, useRef, useState } from "react";

import { FaRegPaste } from "react-icons/fa6";
import { FiSave } from "react-icons/fi";
import { LiaExchangeAltSolid } from "react-icons/lia";
import { LuCopy, LuTrash } from "react-icons/lu";
import { MdFilePresent, MdOutlineSpaceBar } from "react-icons/md";

import parser from "cron-parser";
import cronstrue from "cronstrue";
import ButtonCopy from "@/components/button/copy";

const CronParser = () => {
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const [valueCron, setValueCron] = useState("* * * * * *");
  const [outputFormat, setOutputFormat] = useState("yyyy-MM-dd ddd HH:mm:ss");
  const [desCron, setDesCron] = useState("");
  const [scheduledDates, setScheduledDates] = useState("");
  const [scheduleCount, setScheduleCount] = useState<number>(5); // Lưu số lượng lịch trình cần tạo

  // Hàm để tính toán các thời điểm tiếp theo dựa trên cron expression
  const generateScheduledDates = () => {
    const interval = parser.parse(valueCron);
    const nextDate = interval.next().toDate(); // Lấy thời gian chạy tiếp theo

    console.log("nextDate", nextDate);

    const date: string[] = [];
    for (let i = 0; i < scheduleCount; i++) {
      const formattedDate = nextDate.toLocaleDateString("en-CA");
      const formattedTime = nextDate.toLocaleTimeString("en-GB", {
        hour12: false,
      });
      const formattedSecond = Number(formattedTime.split(":")[2]) + i;
      const formattedTime2 =
        formattedTime.split(":")[0] +
        ":" +
        formattedTime.split(":")[1] +
        ":" +
        formattedSecond;
      const formattedDay = nextDate.toLocaleDateString("en-US", {
        weekday: "short",
      });
      date.push(`${formattedDate} ${formattedDay} ${formattedTime2}`);
    }
    setScheduledDates(date.join("\n"));
  };

  useEffect(() => {
    try {
      setDesCron(cronstrue.toString(valueCron, { use24HourTimeFormat: true }));
      generateScheduledDates();
    } catch {
      setDesCron("Invalid cron expression");
      setScheduledDates("");
    }
  }, [valueCron, scheduleCount]);

  const handleClear = () => {
    setValueCron("");
    setDesCron("");
    setScheduledDates("");
  };

  return (
    <div className="flex flex-col rounded-2xl h-full p-2">
      {/* Header  */}
      <Header title="Cron expression parser" />

      <p className="text-xs ms-2">Configuration</p>

      <ConfigCard title="Include seconds" icon={<LiaExchangeAltSolid />}>
        <Switch />
      </ConfigCard>

      <ConfigCard
        title="Next scheduled dates"
        icon={<MdOutlineSpaceBar />}
        type="select"
        value={scheduleCount}
        onSelectChange={(e) => setScheduleCount(Number(e.target.value))}
        options={["5", "10", "25", "50", "100"]}
      />

      <ConfigCard
        title="Output format"
        icon={<MdOutlineSpaceBar />}
        value={outputFormat}
        type="select"
        options={["yyyy-MM-dd ddd HH:mm:ss", "yyyy-MM-dd ddd HH:mm"]}
        onSelectChange={(e) => setOutputFormat(e.target.value)}
      />

      {/* Cron expression to parse */}
      <div className="flex justify-between my-1">
        <div className="flex flex-col justify-end ms-2">
          <p className="text-xs">Cron expression to parse</p>
        </div>

        <div className="flex gap-2 pe-2">
          <Button icon={<FaRegPaste />}>Paste</Button>

          <Input type="file" inputRef={fileInputRef} />

          <Button
            icon={<MdFilePresent />}
            onClick={() => fileInputRef.current?.click()}
          />
          <Button icon={<LuTrash />} onClick={handleClear} />
          <Button icon={<FiSave />} />
          <ButtonCopy input={valueCron} />
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
      <div className="flex justify-between my-1 ">
        <div className="flex flex-col justify-end ms-2">
          <p className="text-xs">Cron description </p>
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
        <div className="flex flex-col justify-end my-1">
          <p className="text-xs">Next scheduled dates</p>
        </div>
        <Textarea
          className="w-full min-h-200 "
          value={scheduledDates}
          onChange={(e) => setScheduledDates(e.target.value)}
        />
      </div>
    </div>
  );
};

export default CronParser;
