"use client";
import Header from "@/common/Header";
import Button from "@/components/button";
import CustomCard from "@/components/card/CusCard";
import Switch from "@/components/switch";
import Textarea from "@/components/textarea";
import React, { useCallback, useEffect, useState } from "react";
import { LuCopy } from "react-icons/lu";
import { MdFilePresent } from "react-icons/md";
import { PiTextAa } from "react-icons/pi";
import { TbCircuitSwitchClosed } from "react-icons/tb";
import { TfiLayoutLineSolid } from "react-icons/tfi";
import { v1, v4, v7 } from "uuid";

const Uuid = () => {
  const [uuids, setUuids] = useState<string[]>([]);
  const [hyphens, setHyphens] = useState(true);
  const [uppercase, setUppercase] = useState(false);
  const [version, setVersion] = useState<1 | 4 | 7>(4);
  const [rows, setRows] = useState(1);
  const [error, setError] = useState<string | null>(null);

  const generateUUID = useCallback(() => {
    try {
      let generator: () => string;
      switch (version) {
        case 1:
          generator = v1;
          break;
        case 4:
          generator = v4;
          break;
        case 7:
          generator = v7;
          break;
        default:
          generator = v4;
      }

      const newUuids = Array(rows)
        .fill(null)
        .map(() => {
          let uuid = generator();
          if (!hyphens) {
            uuid = uuid.replace(/-/g, "");
          }
          if (uppercase) {
            uuid = uuid.toUpperCase();
          }
          return uuid;
        });

      setUuids(newUuids);
      setError(null);
    } catch {
      setError("Failed to generate UUID");
    }
  }, [version, rows, hyphens, uppercase]);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(uuids.join("\n"));
    } catch {
      setError("Failed to copy to clipboard");
    }
  };

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const content = e.target?.result as string;
        const lines = content.trim().split("\n");
        setUuids(lines);
      };
      reader.onerror = () => {
        setError("Failed to read file");
      };
      reader.readAsText(file);
    }
  };

  const handleSaveToFile = () => {
    try {
      const content = uuids.join("\n");
      const blob = new Blob([content], { type: "text/plain" });
      const url = URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = "uuids.txt";
      link.click();
      URL.revokeObjectURL(url);
    } catch {
      setError("Failed to save file");
    }
  };
  useEffect(() => {
    generateUUID();
  }, [generateUUID]);

  return (
    <div className="flex flex-col gap-4 mx-2">
      <Header title="UUID Generator" />
      <CustomCard title="Hyphens" icon={<TfiLayoutLineSolid />}>
        <Switch
          valueFalse="Off"
          valueTrue="On"
          checked={hyphens}
          onChange={() => setHyphens(!hyphens)}
        />
      </CustomCard>

      <CustomCard title="Uppercase" icon={<PiTextAa />}>
        <Switch
          valueFalse="Off"
          valueTrue="On"
          checked={uppercase}
          onChange={() => setUppercase(!uppercase)}
        />
      </CustomCard>

      <CustomCard
        title="UUID version"
        subTitle="Select the version of UUID you want to generate"
        icon={<TbCircuitSwitchClosed />}
      >
        <select
          className="border border-gray-300 rounded-md p-1 text-sm focus:outline-none"
          value={version}
          onChange={(e) => setVersion(Number(e.target.value) as 1 | 4 | 7)}
        >
          <option value="1">1 (Timestamp)</option>
          <option value="4">4 (Random)</option>
          <option value="7">7 (Timestamp + Random)</option>
        </select>
      </CustomCard>

      <div className="flex flex-col mx-2">
        <p className="text-xs">Generate</p>
        <div className="flex items-center mt-2">
          <Button
            variant="primary"
            className="px-5 py-2 hover:bg-blue-600"
            onClick={generateUUID}
          >
            Generate UUID(s)
          </Button>
          <span className="mx-2">x</span>
          <input
            type="number"
            value={rows}
            min={1}
            max={100}
            onChange={(e) => {
              const value = Number(e.target.value);
              if (value >= 1 && value <= 100) {
                setRows(value);
              }
            }}
            className="border-1 border-gray-300 rounded-md px-2 py-1 focus:outline-none w-20"
          />
        </div>
      </div>

      <div className="flex justify-between gap-2">
        <p className="text-xs">UUID(s)</p>
        <div className="flex gap-2">
          <Button icon={<LuCopy />} onClick={handleCopy}>
            Copy
          </Button>
          <Button icon={<MdFilePresent />} onClick={handleSaveToFile}>
            Save
          </Button>
          <input
            id="uuid-input"
            type="file"
            className="hidden"
            accept=".txt"
            onChange={handleFileUpload}
          />
        </div>
      </div>

      {error && <p className="text-red-500 text-sm">{error}</p>}

      <div className="min-h-[calc(70vh-140px)] border-1 border-gray-300 rounded-md">
        <Textarea
          hasBorder={false}
          value={uuids.join("\n")}
          readOnly
          placeholder="Generated UUIDs will appear here"
        />
      </div>
    </div>
  );
};

export default Uuid;
