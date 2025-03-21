"use client";

import axios from "axios";
import { useEffect, useState } from "react";
import Header from "@/common/Header";
import Button from "@/components/button";
import ConfigCard from "@/components/card/ConfigCard";
import CustomCard from "@/components/card/CustomCard";
import Input from "@/components/input";
import { FaArrowsAltV } from "react-icons/fa";
import { GiTargeted } from "react-icons/gi";

interface Rate {
  value: number;
}

interface Rates {
  [currency: string]: Rate;
}

const CryptoExchange = () => {
  const [rates, setRates] = useState<Rates | null>(null);
  const [fromCurrency, setFromCurrency] = useState("BTC");
  const [toCurrency, setToCurrency] = useState("ABC");
  const [amount, setAmount] = useState("");
  const [result, setResult] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    axios
      .get("/api/crypto-echange")
      .then((res) => setRates(res.data.rates))
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

    const fromRate = rates[fromCurrency];
    const toRate = rates[toCurrency];

    if (fromRate && toRate) {
      const convertedAmount =
        (parseFloat(amount) * toRate.value) / fromRate.value;
      setResult(convertedAmount.toFixed(8)); // Use 8 decimal places for crypto
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

  const CurrencySelect = ({
    value,
    onChange,
    label,
  }: {
    value: string;
    onChange: (value: string) => void;
    label: string;
  }) => (
    <div className="flex items-center ms-2 gap-2">
      <label className="text-sm text-gray-600">{label}</label>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
      >
        {rates &&
          Object.keys(rates).map((currency) => (
            <option key={currency} value={currency}>
              {currency}
            </option>
          ))}
      </select>
    </div>
  );

  return (
    <div className="flex flex-col m-2 p-2">
      <Header title="Crypto Exchange" />

      <ConfigCard
        title="Crypto Converter"
        icon={<FaArrowsAltV />}
        subTitle="Convert between different cryptocurrencies"
        type="switch"
        trueValue="On"
        falseValue="Off"
        onToggleChange={handleSwap}
      />

      <CustomCard title="Target Currency" icon={<GiTargeted />}>
        USD
      </CustomCard>

      <div className="grid grid-cols-2 gap-4 mt-4">
        <div className="flex flex-col gap-4">
          <CurrencySelect
            value={fromCurrency}
            onChange={setFromCurrency}
            label="From"
          />
          <Input
            placeholder="Amount"
            value={amount}
            onChange={handleAmountChange}
            error={error}
            type="text"
            min="0"
            step="0.00000001"
          />
        </div>

        <div className="flex flex-col gap-4">
          <CurrencySelect
            value={toCurrency}
            onChange={setToCurrency}
            label="To"
          />
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
          className="bg-green-500 text-white px-6 py-2 rounded-md transition-all hover:bg-green-600 disabled:opacity-50 disabled:cursor-not-allowed"
          onClick={handleConvert}
          variant="custom"
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

export default CryptoExchange;
