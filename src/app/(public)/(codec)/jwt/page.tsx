"use client";
import Header from "@/common/Header";
import Button from "@/components/button";
import CustomCard from "@/components/card/CustomCard";
import Input from "@/components/input";
import Switch from "@/components/switch";
import { jwtVerify, decodeJwt } from "jose";
import { useState, useCallback } from "react";
import { FaCheckCircle } from "react-icons/fa";
import { FaRegPaste } from "react-icons/fa6";
import { FiSave } from "react-icons/fi";
import { IoSettingsOutline } from "react-icons/io5";
import { LiaExchangeAltSolid } from "react-icons/lia";
import { MdClear } from "react-icons/md";
import TextareaAutoSize from "react-textarea-autosize";
import clsx from "clsx";

interface SettingValue {
  name: string;
  hasInput: boolean;
  handler: string;
  placeholder?: string;
}

const settingValuesList: SettingValue[] = [
  {
    name: "Validate issuer signing key",
    hasInput: true,
    handler: "CheckKey",
    placeholder: "Nhập secret key để verify token...",
  },
  {
    name: "Validation issuer",
    hasInput: true,
    handler: "CheckIssuer",
    placeholder: "Nhập issuer để kiểm tra (https://...)...",
  },
  {
    name: "Validate audience",
    hasInput: true,
    handler: "CheckAudience",
    placeholder: "Nhập audience để kiểm tra...",
  },
  {
    name: "Validate lifetime",
    hasInput: false,
    handler: "CheckLifetime",
  },
  {
    name: "Validate actors",
    hasInput: false,
    handler: "CheckActors",
  },
];

const JsonWebToken = () => {
  const [isEncode, setIsEncode] = useState(false);
  const [inputToken, setInputToken] = useState("");
  const [inputHeader, setInputHeader] = useState("");
  const [inputPayload, setInputPayload] = useState("");
  const [settings, setSettings] = useState(false);
  const [settingValues, setSettingValues] = useState<Record<string, string>>(
    {}
  );
  const [enableValidation, setEnableValidation] = useState<
    Record<string, boolean>
  >({});
  const [alertMessage, setAlertMessage] = useState<string>("");
  const [alertType, setAlertType] = useState<"success" | "error">("success");

  const updateAlert = useCallback(
    (message: string, type: "success" | "error") => {
      setAlertMessage(message);
      setAlertType(type);
    },
    []
  );

  const clearToken = useCallback(() => {
    setInputToken("");
    setInputHeader("");
    setInputPayload("");
    setAlertMessage("");
  }, []);

  const parseJwt = useCallback(
    async (token: string) => {
      if (!token) {
        clearToken();
        return;
      }

      try {
        const [headerB64, payloadB64] = token.split(".").slice(0, 2);
        if (!headerB64 || !payloadB64) {
          throw new Error("Token không hợp lệ");
        }

        const decodedToken = decodeJwt(token);
        const header = JSON.parse(atob(headerB64));

        setInputHeader(JSON.stringify(header, null, 2));
        setInputPayload(JSON.stringify(decodedToken, null, 2));
        updateAlert("Token hợp lệ!", "success");
      } catch {
        clearToken();
        updateAlert("Token không hợp lệ!", "error");
      }
    },
    [clearToken, updateAlert]
  );

  const checkKey = useCallback(
    async (key: string) => {
      if (!inputToken) {
        updateAlert("Vui lòng nhập token trước!", "error");
        return;
      }

      try {
        const secret = new TextEncoder().encode(key);
        const { payload } = await jwtVerify(inputToken, secret);
        updateAlert("Chữ ký token hợp lệ!", "success");
        console.log("Decoded Payload:", payload);
      } catch {
        updateAlert("Chữ ký token không hợp lệ!", "error");
      }
    },
    [inputToken, updateAlert]
  );

  const checkIssuer = useCallback(
    (issuer: string) => {
      try {
        const payload = JSON.parse(inputPayload);
        if (!payload.iss) {
          updateAlert("Token không có trường issuer!", "error");
          return;
        }
        const isValid = payload.iss === issuer;
        updateAlert(
          isValid ? "Issuer hợp lệ!" : `Issuer không khớp! (${payload.iss})`,
          isValid ? "success" : "error"
        );
      } catch {
        updateAlert("Không thể kiểm tra issuer!", "error");
      }
    },
    [inputPayload, updateAlert]
  );

  const checkAudience = useCallback(
    (audience: string) => {
      try {
        const payload = JSON.parse(inputPayload);
        if (!payload.aud) {
          updateAlert("Token không có trường audience!", "error");
          return;
        }
        const isValid = Array.isArray(payload.aud)
          ? payload.aud.includes(audience)
          : payload.aud === audience;
        updateAlert(
          isValid
            ? "Audience hợp lệ!"
            : `Audience không khớp! (${payload.aud})`,
          isValid ? "success" : "error"
        );
      } catch {
        updateAlert("Không thể kiểm tra audience!", "error");
      }
    },
    [inputPayload, updateAlert]
  );

  const checkLifetime = useCallback(() => {
    try {
      const payload = JSON.parse(inputPayload);
      const now = Math.floor(Date.now() / 1000);

      // Kiểm tra exp
      if (payload.exp) {
        if (now >= payload.exp) {
          updateAlert(
            `Token đã hết hạn vào ${new Date(
              payload.exp * 1000
            ).toLocaleString()}!`,
            "error"
          );
          return;
        }
      }

      // Kiểm tra nbf (not before)
      if (payload.nbf && now < payload.nbf) {
        updateAlert(
          `Token chưa có hiệu lực! Có hiệu lực từ ${new Date(
            payload.nbf * 1000
          ).toLocaleString()}`,
          "error"
        );
        return;
      }

      // Kiểm tra iat (issued at)
      const timeLeft = payload.exp
        ? Math.floor((payload.exp - now) / 60)
        : null;
      const message = timeLeft
        ? `Token còn hiệu lực! Hết hạn sau ${timeLeft} phút`
        : "Token không có thời hạn!";

      updateAlert(message, "success");
    } catch {
      updateAlert("Không thể kiểm tra thời hạn!", "error");
    }
  }, [inputPayload, updateAlert]);

  const checkActors = useCallback(() => {
    try {
      const payload = JSON.parse(inputPayload);
      if (!payload.act) {
        updateAlert("Token không có thông tin actor!", "error");
        return;
      }
      updateAlert(`Actor: ${JSON.stringify(payload.act)}`, "success");
    } catch {
      updateAlert("Không thể kiểm tra actor!", "error");
    }
  }, [inputPayload, updateAlert]);

  const handlers: Record<string, (value: string) => void> = {
    CheckKey: checkKey,
    CheckIssuer: checkIssuer,
    CheckAudience: checkAudience,
    CheckLifetime: checkLifetime,
    CheckActors: checkActors,
  };

  const handlePaste = async () => {
    try {
      const text = await navigator.clipboard.readText();
      setInputToken(text);
      parseJwt(text);
    } catch {
      updateAlert("Không thể paste từ clipboard!", "error");
    }
  };

  const handleClear = (field: "token" | "header" | "payload") => {
    switch (field) {
      case "token":
        clearToken();
        break;
      case "header":
        setInputHeader("");
        break;
      case "payload":
        setInputPayload("");
        break;
    }
  };

  const handleSave = async (content: string, filename: string) => {
    try {
      const blob = new Blob([content], { type: "application/json" });
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = filename;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
      updateAlert("Đã lưu file thành công!", "success");
    } catch {
      updateAlert("Không thể lưu file!", "error");
    }
  };

  return (
    <div
      className="flex flex-col rounded-2xl h-full p-2"
      suppressHydrationWarning
    >
      <Header title="Json Web Token" />
      <p className="text-xs ms-2">Configuration</p>
      <CustomCard title="Tool Mode" icon={<LiaExchangeAltSolid />}>
        <Switch
          valueTrue="Decode"
          valueFalse="Encode"
          onToggle={() => setIsEncode(!isEncode)}
        />
      </CustomCard>
      <CustomCard
        title="Token validation settings"
        icon={<IoSettingsOutline />}
      >
        <Switch
          valueTrue="On"
          valueFalse="Off"
          onToggle={() => setSettings(!settings)}
        />
      </CustomCard>

      {settings && (
        <div className="flex flex-col">
          {settingValuesList.map((item: SettingValue, index: number) => (
            <div key={index}>
              <CustomCard title={item.name} icon={<IoSettingsOutline />}>
                <Switch
                  valueTrue="On"
                  valueFalse="Off"
                  onToggle={() => {
                    setEnableValidation((prev) => ({
                      ...prev,
                      [item.handler]: !prev[item.handler],
                    }));

                    if (
                      !item.hasInput &&
                      handlers[item.handler] &&
                      !enableValidation[item.handler]
                    ) {
                      handlers[item.handler]("");
                    }
                  }}
                />
              </CustomCard>
              {item.hasInput && enableValidation[item.handler] && (
                <Input
                  className="w-[99%]"
                  value={settingValues[item.handler] || ""}
                  placeholder={item.placeholder}
                  onChange={(e) => {
                    const newValue = e.target.value;
                    setSettingValues((prev) => ({
                      ...prev,
                      [item.handler]: newValue,
                    }));
                    if (handlers[item.handler]) {
                      handlers[item.handler](newValue);
                    }
                  }}
                />
              )}
            </div>
          ))}
        </div>
      )}

      {alertMessage && (
        <div
          className={clsx(
            "flex items-center gap-2 mt-2 mx-2 rounded-md p-2 cursor-default",
            alertType === "success"
              ? "bg-green-100 text-green-800"
              : "bg-red-100 text-red-800"
          )}
        >
          <FaCheckCircle
            className={
              alertType === "success" ? "text-green-800" : "text-red-800"
            }
          />
          <p className="text-xs">{alertMessage}</p>
        </div>
      )}

      <div className="flex flex-col overflow-hidden">
        <div className="flex flex-col rounded-lg p-4">
          <div className="flex justify-between mb-2">
            <div className="flex justify-center items-end gap-2">
              <p className="text-sm font-semibold">Token</p>
            </div>
            <div className="flex gap-2">
              <Button icon={<FaRegPaste />} onClick={handlePaste}>
                Paste
              </Button>
              <Button
                icon={<FiSave />}
                onClick={() => handleSave(inputToken, "token.txt")}
              />
              <Button icon={<MdClear />} onClick={() => handleClear("token")} />
            </div>
          </div>
          <TextareaAutoSize
            value={inputToken}
            placeholder="Nhập JWT token của bạn..."
            className="rounded-lg p-2 focus:outline-none border-1 border-gray-300"
            onChange={(e) => {
              setInputToken(e.target.value);
              parseJwt(e.target.value);
            }}
          />
        </div>

        <div className="grid grid-cols-2 gap-2">
          <div className="flex flex-col rounded-lg p-4">
            <div className="flex justify-between mb-2">
              <div className="flex justify-center items-end gap-2">
                <p className="text-sm font-semibold">Header</p>
              </div>
              <div className="flex gap-2 ">
                <Button
                  icon={<FaRegPaste />}
                  onClick={async () => {
                    const text = await navigator.clipboard.readText();
                    setInputHeader(text);
                  }}
                >
                  Paste
                </Button>
                <Button
                  icon={<FiSave />}
                  onClick={() => handleSave(inputHeader, "header.json")}
                />
                <Button
                  icon={<MdClear />}
                  onClick={() => handleClear("header")}
                />
              </div>
            </div>
            <TextareaAutoSize
              value={inputHeader}
              placeholder="JWT Header sẽ hiển thị ở đây..."
              className="rounded-lg p-2 focus:outline-none border-1 border-gray-300"
              readOnly
            />
          </div>
          <div className="flex flex-col rounded-lg p-4">
            <div className="flex justify-between mb-2">
              <div className="flex justify-center items-end gap-2">
                <p className="text-sm font-semibold">Payload</p>
              </div>
              <div className="flex gap-2">
                <Button
                  icon={<FaRegPaste />}
                  onClick={async () => {
                    const text = await navigator.clipboard.readText();
                    setInputPayload(text);
                  }}
                >
                  Paste
                </Button>
                <Button
                  icon={<FiSave />}
                  onClick={() => handleSave(inputPayload, "payload.json")}
                />
                <Button
                  icon={<MdClear />}
                  onClick={() => handleClear("payload")}
                />
              </div>
            </div>
            <TextareaAutoSize
              value={inputPayload}
              placeholder="JWT Payload sẽ hiển thị ở đây..."
              className="rounded-lg p-2 focus:outline-none border-1 border-gray-300"
              readOnly
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default JsonWebToken;
