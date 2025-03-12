"use client";
import Header from "@/common/Header";
import Button from "@/components/button";
import CustomCard from "@/components/card/CusCard";
import Input from "@/components/input";
import Switch from "@/components/switch";
import { useEffect, useRef, useState } from "react";
import { BsCalendarDate } from "react-icons/bs";
import { FaBusinessTime } from "react-icons/fa";
import { FaRegClock } from "react-icons/fa6";
import { LuCopy } from "react-icons/lu";
import { MdClear, MdFilePresent } from "react-icons/md";

const DateConvert = () => {
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const items = [{ name: "date" }, { name: "iso8601" }];

  const [values, setValues] = useState({
    date: "",
    iso8601: "",
  });

  const [time, setTime] = useState({
    year: "2025",
    month: "3",
    day: "3",
    hour: "9",
    minute: "53",
    second: "59",
    milliseconds: "0",
  });

  const handleGetTime = () => {
    const date = new Date();
    setTime({
      year: date.getFullYear().toString(),
      month: (date.getMonth() + 1).toString().padStart(2, "0"),
      day: date.getDate().toString().padStart(2, "0"),
      hour: date.getHours().toString().padStart(2, "0"),
      minute: date.getMinutes().toString().padStart(2, "0"),
      second: date.getSeconds().toString().padStart(2, "0"),
      milliseconds: date.getMilliseconds().toString(),
    });

    setValues({
      date: date.toISOString().split("T")[0], // YYYY-MM-DD
      iso8601: date.toISOString(), // Full ISO 8601 format
    });
  };

  const handleIconClick = () => {
    fileInputRef.current?.click();
  };
  const [timeData, setTimeData] = useState({
    offset: "07:00:00",
    localDateTime: "",
    utcDateTime: "",
    utcTicks: "",
  });
  const handleUpdateTimeData = () => {
    const date = new Date();
    const offset = date.getTimezoneOffset(); // Lấy offset tính bằng phút
    const offsetHours = Math.abs(Math.floor(offset / 60))
      .toString()
      .padStart(2, "0");
    const offsetMinutes = Math.abs(offset % 60)
      .toString()
      .padStart(2, "0");
    const sign = offset > 0 ? "-" : "+";

    const localDateTime = date.toLocaleString(); // Lấy giờ địa phương
    const utcDateTime = date.toISOString(); // Lấy giờ UTC
    const utcTicks = (date.getTime() * 10000 + 621355968000000000).toString(); // Chuyển sang UTC ticks

    setTimeData({
      offset: `${sign}${offsetHours}:${offsetMinutes}`,
      localDateTime,
      utcDateTime,
      utcTicks,
    });
  };
  useEffect(() => {
    handleUpdateTimeData(); // Cập nhật ngay khi component render

    const interval = setInterval(() => {
      handleUpdateTimeData();
    }, 1000); // Cập nhật mỗi giây

    return () => clearInterval(interval); // Cleanup khi component unmount
  }, []);

  const handleClear = () => {
    setValues({
      date: "",
      iso8601: "",
    });
    setTime({
      year: "",
      month: "",
      day: "",
      hour: "",
      minute: "",
      second: "",
      milliseconds: "",
    });
  };
  return (
    <div className="flex flex-col rounded-tl-2xl h-full p-2">
      {/* Header */}
      <Header title="Date Converter" />

      {/* Timezone & Format */}
      <CustomCard title="Default Epoch" icon={<BsCalendarDate />}>
        <Switch />
      </CustomCard>
      <CustomCard title="Timezone" icon={<FaRegClock />}>
        <select className="border border-gray-300 rounded-md p-1 text-sm focus:outline-none">
          <option value="UTC+00:00">(UTC+00:00) Greenwich Mean Time</option>
          <option value="UTC+01:00">(UTC+01:00) Western European Time</option>
          <option value="UTC+02:00">(UTC+02:00) Eastern European Time</option>
        </select>
      </CustomCard>
      <CustomCard title="Format" icon={<BsCalendarDate />}>
        <select className="border border-gray-300 rounded-md p-1 text-sm focus:outline-none">
          <option value="ticks">Ticks</option>
          <option value="seconds">Seconds</option>
          <option value="milliseconds">Milliseconds</option>
        </select>
      </CustomCard>

      {/* Thông tin thời gian */}
      <div className="grid grid-cols-4 gap-2 border border-gray-300 rounded-md mx-2 p-2 text-xs">
        <div className="gap-2">
          <p>Offset</p>
          <p>Local Date and Time</p>
        </div>
        <div className="gap-2">
          <p>{timeData.offset}</p>
          <p className="">{timeData.localDateTime}</p>
        </div>
        <div className="gap-2">
          <p>UTC Date and Time</p>
          <p>UtcTicks</p>
        </div>
        <div className="gap-2">
          <p className="">{timeData.utcDateTime}</p>
          <p className="">{timeData.utcTicks}</p>
        </div>
      </div>

      {/* Input cho Date & ISO */}
      {items.map((item, index) => (
        <div key={index} className="text-xs px-2 mt-2">
          <div className="flex justify-between">
            <p className="font-semibold">{item.name.toUpperCase()}</p>
            <div className="flex gap-2">
              <Button icon={<FaBusinessTime />} onClick={handleGetTime} />
              <Button icon={<LuCopy />}>Paste</Button>
              <input type="file" ref={fileInputRef} className="hidden" />
              <Button icon={<MdFilePresent />} onClick={handleIconClick} />
              <Button icon={<MdClear />} onClick={handleClear} />
            </div>
          </div>
          <Input
            type="text"
            className="w-full"
            value={values[item.name as keyof typeof values]}
            onChange={(e) =>
              setValues((prev) => ({
                ...prev,
                [item.name]: e.target.value,
              }))
            }
          />
        </div>
      ))}

      {/* Grid nhập thông tin thời gian */}
      <div className="grid grid-cols-3 gap-2 mx-2 text-xs">
        {["year", "month", "day"].map((field) => (
          <div key={field} className="gap-2">
            <p>{field.charAt(0).toUpperCase() + field.slice(1)}</p>
            <Input
              type="text"
              className="w-full"
              value={time[field as keyof typeof time]}
              readOnly
            />
          </div>
        ))}
      </div>
      <div className="grid grid-cols-4 gap-2 mx-2 text-xs">
        {["hour", "minute", "second", "milliseconds"].map((field) => (
          <div key={field} className="gap-2">
            <p>{field.charAt(0).toUpperCase() + field.slice(1)}</p>
            <Input
              type="text"
              className="w-full"
              value={time[field as keyof typeof time]}
              readOnly
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default DateConvert;
