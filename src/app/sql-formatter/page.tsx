"use client";
import React, { useState, useEffect, useCallback } from "react";
import Header from "@/common/Header";
import CustomCard from "@/components/Card/CusCard";
import { LuCopy, LuCopySlash, LuLanguages } from "react-icons/lu";
import { LiaExchangeAltSolid } from "react-icons/lia";
import {
  MdClear,
  MdFilePresent,
  MdOpenInFull,
  MdOutlineSpaceBar,
} from "react-icons/md";
import Switch from "@/components/switch";
import Textarea from "@/components/textarea";
import Button from "@/components/button";
import { FaPaste } from "react-icons/fa";
import clsx from "clsx";
import { format as sqlFormatter } from "sql-formatter";

const SQLFormatter = () => {
  const [widthFull, setWidthFull] = useState(false);
  const [input, setInput] = useState("");
  const [format, setFormat] = useState<
    | "sql"
    | "mysql"
    | "postgresql"
    | "sqlite"
    | "db2"
    | "mariadb"
    | "bigquery"
    | "db2i"
    | "hive"
    | "n1ql"
    | "plsql"
    | "redshift"
    | "singlestoredb"
    | "snowflake"
    | "spark"
    | "tidb"
    | "transactsql"
    | "trino"
    | "tsql"
  >("sql");
  const [output, setOutput] = useState("");
  const [indentation, setIndentation] = useState<
    "2 spaces" | "4 spaces" | "1 tab"
  >("2 spaces");

  const handleFormat = useCallback(() => {
    try {
      const options = {
        language: format,
        indent:
          indentation === "1 tab"
            ? "\t"
            : indentation === "2 spaces"
            ? "  "
            : "",
        useTabs: indentation === "1 tab",
      };
      const result = sqlFormatter(input, options);
      setOutput(result);
    } catch (error) {
      console.error("Error formatting SQL:", error);
      setOutput("Error formatting SQL. Please check your input.");
    }
  }, [input, format, indentation]);

  const handlePaste = async () => {
    try {
      const text = await navigator.clipboard.readText();
      setInput(text);
    } catch (err) {
      console.error("Error pasting from clipboard:", err);
    }
  };

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(output);
    } catch (err) {
      console.error("Error copying to clipboard:", err);
    }
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (e) => {
      setInput(e.target?.result as string);
    };
    reader.readAsText(file);
  };

  useEffect(() => {
    handleFormat();
  }, [handleFormat]);

  return (
    <div className="flex flex-col rounded-2xl h-full p-2">
      <Header title="SQL Formatter" />
      <p className="text-xs ms-2">Configuration</p>
      <CustomCard title="Conversion" icon={<LuLanguages />}>
        <select
          className="border border-gray-300 rounded-md p-1 text-sm focus:outline-none"
          value={format}
          onChange={(e) => setFormat(e.target.value as typeof format)}
        >
          <option value="sql">SQL</option>
          <option value="mysql">MySQL</option>
          <option value="postgresql">PostgreSQL</option>
          <option value="sqlite">SQLite</option>
          <option value="db2">DB2</option>
          <option value="mariadb">MariaDB</option>
          <option value="bigquery">BigQuery</option>
          <option value="db2i">DB2i</option>
          <option value="hive">Hive</option>
          <option value="n1ql">N1QL</option>
          <option value="plsql">PL/SQL</option>
          <option value="redshift">Redshift</option>
          <option value="singlestoredb">SingleStoreDB</option>
          <option value="snowflake">Snowflake</option>
          <option value="spark">Spark</option>
          <option value="tidb">TiDB</option>
          <option value="transactsql">Transact-SQL</option>
          <option value="trino">Trino</option>
          <option value="tsql">TSQL</option>
        </select>
      </CustomCard>
      <CustomCard title="Indentation" icon={<MdOutlineSpaceBar />}>
        <select
          className="border border-gray-300 rounded-md p-1 text-sm focus:outline-none"
          value={indentation}
          onChange={(e) => setIndentation(e.target.value as typeof indentation)}
        >
          <option value="2 spaces">2 spaces</option>
          <option value="4 spaces">4 spaces</option>
          <option value="1 tab">1 tab</option>
        </select>
      </CustomCard>
      <CustomCard title="Leading comma" icon={<LiaExchangeAltSolid />}>
        <Switch
          valueTrue="On"
          valueFalse="Off"
          //   onToggle={() => setIsCompress(!isCompress)}
        />
      </CustomCard>
      <div className="grid grid-cols-2">
        {/* Input */}
        <div className={clsx("mx-1", widthFull && "hidden")}>
          <div
            className={clsx(
              "flex m-2 justify-between",
              widthFull ? "hidden" : ""
            )}
          >
            <p className="text-xs flex justify-center items-center">Input</p>
            <div className="flex gap-2">
              <Button icon={<LuCopy />} onClick={handlePaste}>
                Paste
              </Button>
              <Button
                icon={<MdFilePresent />}
                onClick={() => document.getElementById("sql-input")?.click()}
              />
              <input
                id="sql-input"
                type="file"
                className="hidden"
                accept=".sql,.txt"
                onChange={handleFileUpload}
              />
              <Button icon={<MdClear />} onClick={() => setInput("")} />
            </div>
          </div>

          <Textarea
            value={input}
            className="min-h-265"
            onChange={(e) => setInput(e.target.value)}
            placeholder="Enter your SQL query..."
          />
        </div>

        {/* Output */}
        <div className={clsx("mx-1 h-full", widthFull && "w-full col-span-2")}>
          <div className="flex m-2 justify-between">
            <p className="text-xs flex justify-center items-center">Output</p>
            <div className="flex gap-2">
              <Button icon={<LuCopySlash />} onClick={handleCopy}>
                Copy
              </Button>
              <Button icon={<FaPaste />} onClick={handlePaste}>
                Paste as
              </Button>
              <Button
                icon={<MdOpenInFull />}
                onClick={() => setWidthFull(!widthFull)}
              />
            </div>
          </div>
          <Textarea
            value={output}
            readOnly
            className="min-h-265 cursor-not-allowed"
          />
        </div>
      </div>
    </div>
  );
};

export default SQLFormatter;
