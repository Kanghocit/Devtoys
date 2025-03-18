"use client";

import axios from "axios";
import { useEffect, useState, useRef } from "react";

import Header from "@/common/Header";
import Button from "@/components/button";
import Input from "@/components/input";
import { FaArrowsAltV } from "react-icons/fa";
import ConfigCard from "@/components/card/ConfigCard";

const CurrencyChange = () => {
  const [rates, setRates] = useState<string | null>(null);
  const [fromCurrency, setFromCurrency] = useState("USD");
  const [toCurrency, setToCurrency] = useState("EUR");
  const [amount, setAmount] = useState("");
  const [result, setResult] = useState("");
  const [showFromDropdown, setShowFromDropdown] = useState(false);
  const [showToDropdown, setShowToDropdown] = useState(false);
  const [error, setError] = useState("");
  const fromDropdownRef = useRef<HTMLDivElement | null>(null);
  const toDropdownRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    axios
      .get("/api/exchange-rate")
      .then((res) => setRates(res.data.data))
      .catch((err) => console.error("Lỗi lấy dữ liệu:", err));
  }, []);

  const validateAmount = (value: string) => {
    if (!value) {
      setError("Please enter an amount");
      return false;
    }
    const numValue = parseFloat(value);
    if (isNaN(numValue)) {
      setError("Please enter a valid number");
      return false;
    }
    if (numValue <= 0) {
      setError("Amount must be greater than 0");
      return false;
    }
    setError("");
    return true;
  };

  const handleConvert = () => {
    if (!rates) return;
    if (!validateAmount(amount)) return;

    const fromRate = rates[fromCurrency]?.value;
    const toRate = rates[toCurrency]?.value;

    if (fromRate && toRate) {
      const convertedAmount = (parseFloat(amount) * toRate) / fromRate;
      setResult(convertedAmount.toFixed(2));
    }
  };

  const handleSwap = () => {
    setFromCurrency(toCurrency);
    setToCurrency(fromCurrency);
    setAmount("");
    setResult("");
    setError("");
  };

  const handleAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setAmount(value);
    setResult("");
    validateAmount(value);
  };

  const CurrencyDropdown = ({
    value,
    onChange,
    show,
    setShow,
    dropdownRef,
  }: {
    value: string;
    onChange: (value: string) => void;
    show: boolean;
    setShow: (show: boolean) => void;
    dropdownRef: React.RefObject<HTMLDivElement | null>;
  }) => (
    <div className="relative" ref={dropdownRef}>
      <div
        className="w-fit py-2 px-1 ms-2 rounded-md border border-gray-300 cursor-pointer flex items-center gap-2"
        onClick={() => setShow(!show)}
      >
        {value}
      </div>
      {show && (
        <div className="absolute z-10 mt-1 w-48 bg-white border border-gray-300 rounded-md shadow-lg max-h-[200px] overflow-y-auto">
          {rates &&
            Object.keys(rates).map((currency) => (
              <div
                key={currency}
                className="flex items-center gap-2 p-2 hover:bg-gray-100 cursor-pointer"
                onClick={() => {
                  onChange(currency);
                  setShow(false);
                }}
              >
                {currency}
              </div>
            ))}
        </div>
      )}
    </div>
  );

  return (
    <div className="flex flex-col m-2 p-2">
      <Header title="Currency Change" />

      <ConfigCard
        title="Currency Converter"
        icon={<FaArrowsAltV />}
        subTitle="Convert between different currencies"
        type="switch"
        trueValue="On"
        falseValue="Off"
        onToggleChange={handleSwap}
      />
      <div className="grid grid-cols-2 gap-2">
        <div className="flex flex-col">
          <div className="flex items-center gap-2 ms-2">
            <p>From:</p>
            <CurrencyDropdown
              value={fromCurrency}
              onChange={setFromCurrency}
              show={showFromDropdown}
              setShow={setShowFromDropdown}
              dropdownRef={fromDropdownRef}
            />
          </div>
          <Input
            placeholder="Amount"
            value={amount}
            onChange={handleAmountChange}
            error={error}
            type="text"
            min="0"
            step="0.01"
          />
        </div>
        <div className="flex flex-col">
          <div className="flex items-center gap-2 ms-2">
            <p>To:</p>
            <CurrencyDropdown
              value={toCurrency}
              onChange={setToCurrency}
              show={showToDropdown}
              setShow={setShowToDropdown}
              dropdownRef={toDropdownRef}
            />
          </div>
          <Input
            type="number"
            placeholder="Result"
            value={result}
            className="cursor-not-allowed"
            readOnly
          />
        </div>
      </div>

      <div className="flex justify-center gap-4 mt-4">
        <Button
          className="bg-supergreen text-white px-6 py-2 rounded-md hover:bg-opacity-90 transition-all disabled:opacity-50"
          onClick={handleConvert}
          disabled={!amount || !!error}
        >
          Convert
        </Button>
      </div>

      {rates && (
        <div className="mt-4 text-sm text-gray-500 text-center">
          Last Updated: {new Date().toLocaleDateString()}
        </div>
      )}
    </div>
  );
};

export default CurrencyChange;
