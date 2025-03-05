"use client";
import Button from "@/components/button";
import CustomCard from "@/components/Card/CusCard";
import Switch from "@/components/switch";
import clsx from "clsx";
import { useEffect, useState } from "react";
import { LiaExchangeAltSolid } from "react-icons/lia";
import { LuStar } from "react-icons/lu";
import { BsPatchCheck } from "react-icons/bs";
import { TbSettingsCog } from "react-icons/tb";
import { IoIosCheckmarkCircle, IoIosCloseCircle } from "react-icons/io";
import Textarea from "@/components/textarea";
import Input from "@/components/input";
import { MdClear } from "react-icons/md";
import { FaRegPaste } from "react-icons/fa6";
import { FaRegCheckCircle } from "react-icons/fa";
import jwt from "jsonwebtoken";

const validateValues = [
  { name: "Validate issuer signing key", hasInput: true },
  { name: "Validate issuer", hasInput: true },
  { name: "Validate audience", hasInput: true },
  { name: "Validate timelife", hasInput: false },
  { name: "Validate actors", hasInput: false },
];

const JWT = () => {
  const [isEncode, setIsEncode] = useState(true);
  const [isSetting, setIsSetting] = useState(false);
  const [token, setToken] = useState("");
  const [header, setHeader] = useState("");
  const [payload, setPayload] = useState("");
  const [signature, setSignature] = useState("");

  // quản lí nhiều sự kiện trong 1 map
  // open và input
  //open
  const [validationSettings, setValidationSettings] = useState(
    Object.fromEntries(validateValues.map((item) => [item.name, false]))
  );
  //input
  const [inputValues, setInputValues] = useState(
    Object.fromEntries(validateValues.map((item) => [item.name, ""]))
  );
  console.log("inputValues", inputValues);
  const base64UrlToBase64 = (base64Url: string) => {
    return (
      base64Url.replace(/-/g, "+").replace(/_/g, "/") +
      "==".slice(0, (4 - (base64Url.length % 4)) % 4)
    );
  };
  const handleToggle = (name: string) => {
    setValidationSettings((prev) => ({
      ...prev,
      [name]: !prev[name],
    }));
  };
  const handleInput = (name: string, value: string) => {
    setInputValues((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleGenToken = () => {
    if (!token) {
      setHeader("");
      setPayload("");
      setSignature("");
      return;
    }

    try {
      const parts = token.split(".");
      if (parts.length !== 3) throw new Error("Invalid JWT format");

      const [header, payload, signature] = parts;
      const decodedHeader = JSON.parse(atob(base64UrlToBase64(header)));
      const decodedPayload = JSON.parse(atob(base64UrlToBase64(payload)));

      setHeader(JSON.stringify(decodedHeader, null, 2));
      setPayload(JSON.stringify(decodedPayload, null, 2));
      setSignature(signature);
    } catch (error) {
      console.error("Error decoding token:", error);
      setHeader("");
      setPayload("");
      setSignature("");
    }
  };
  const [isVerified, setIsVerified] = useState(true);
  const verifyToken = () => {
    const tokenInput = token;
    console.log("tokenInput", tokenInput);
    const secretKey = inputValues["Validate issuer signing key"];
    try {
      if (!tokenInput) throw new Error("Invalid JWT format");
      const decoded = jwt.verify(tokenInput, secretKey);
      console.log("decoded", decoded);
      setIsVerified(true);
    } catch (error) {
      console.error("Error verifying token:", error);
      setIsVerified(false);
    }
  };

  useEffect(() => {
    handleGenToken();
  }, [token]);

  return (
    <div
      className="flex flex-col rounded-2xl h-full p-4 bg-white shadow-md"
      suppressHydrationWarning
    >
      {/* Header */}
      <div className="flex justify-between items-center mb-4">
        <p className="font-bold text-2xl">JWT Encoder / Decoder</p>
        <Button icon={<LuStar />} className="text-xs">
          Add to favorites
        </Button>
      </div>

      <p className="text-xs text-gray-500">Configuration</p>

      {/* Tool Mode */}
      <CustomCard
        title="Tool Mode"
        icon={<LiaExchangeAltSolid />}
        subTitle="Select which mode you want to use"
      >
        <Switch
          valueTrue="Encode"
          valueFalse="Decode"
          onToggle={() => setIsEncode(!isEncode)}
        />
      </CustomCard>

      {/* Token Validation Settings */}
      <CustomCard
        title="Token Validation Settings"
        icon={<TbSettingsCog />}
        subTitle="Select which token parameters to validate"
      >
        <Switch
          valueTrue="On"
          valueFalse="Off"
          onToggle={() => setIsSetting(!isSetting)}
        />
      </CustomCard>

      {/* Các tùy chọn validation */}
      {isSetting && (
        <div className="space-y-2">
          {validateValues.map((item, index) => (
            <div key={index}>
              <CustomCard
                title={item.name}
                icon={<BsPatchCheck />}
                className="border border-gray-200 my-0 rounded-none"
              >
                <Switch
                  valueTrue="On"
                  valueFalse="Off"
                  onToggle={() => handleToggle(item.name)}
                />
              </CustomCard>

              {/* Hiển thị input nếu cần */}
              {item.hasInput && validationSettings[item.name] && (
                <div className=" flex flex-col mx-2 mt-2">
                  <div className="flex justify-between items-center">
                    <p className="text-xs">
                      {item.name === "Validate issuer signing key"
                        ? "Key"
                        : "Token " + item.name.split(" ")[1]}
                    </p>
                    <div className="flex gap-2">
                      <Button
                        icon={<FaRegCheckCircle />}
                        onClick={() => verifyToken()}
                      >
                        Check
                      </Button>
                      <Button icon={<FaRegPaste />}>Paste</Button>
                      <Button
                        icon={<MdClear />}
                        onClick={() =>
                          Object.keys(inputValues).forEach((key) => {
                            handleInput(key, "");
                          })
                        }
                      />
                    </div>
                  </div>
                  <Input
                    className="w-full ms-0"
                    value={inputValues[item.name]}
                    onChange={(e) => handleInput(item.name, e.target.value)}
                  />
                </div>
              )}
            </div>
          ))}
        </div>
      )}

      {/* Kết quả kiểm tra token */}
      <div
        className={clsx(
          "flex items-center gap-2 my-3 mx-2 p-2 rounded-md ",
          isVerified ? "bg-green-100" : "bg-red-100"
        )}
      >
        {isVerified ? (
          <>
            <IoIosCheckmarkCircle className="text-green-800" />
            <p className="text-sm text-green-800">Token validated</p>
          </>
        ) : (
          <>
            <IoIosCloseCircle className="text-red-800" />
            <p className="text-sm text-red-800">Key is invalid</p>
          </>
        )}
      </div>

      {/* Input / Output Section */}
      <div className="flex flex-col flex-grow space-y-4 mx-2">
        {/* Token Input */}
        <div>
          <p className="text-xs text-gray-500">Token</p>
          <Textarea
            className="w-full min-h-[100px] mt-1"
            value={token}
            onChange={(e) => setToken(e.target.value)}
          />
        </div>

        {/* Input / Output */}
        <div className="grid grid-cols-2 gap-4">
          {/* Header */}
          <div>
            <p className="text-xs text-gray-500">Header</p>
            <Textarea
              className="w-full min-h-[100px] mt-1"
              value={header}
              readOnly
            />
          </div>

          {/* Payload */}
          <div>
            <p className="text-xs text-gray-500">Payload</p>
            <Textarea
              className="w-full min-h-[100px] mt-1"
              value={payload}
              readOnly
            />
          </div>
        </div>

        {/* Signature */}
        <div
          className={clsx("flex flex-col flex-grow", !isSetting && "hidden")}
        >
          <p className="text-xs text-gray-500">Signature</p>
          <Textarea
            className="w-full min-h-[100px] mt-1"
            value={signature}
            readOnly
          />
        </div>
      </div>
    </div>
  );
};

export default JWT;
