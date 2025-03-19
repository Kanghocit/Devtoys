"use client";

import Header from "@/common/Header";
import Button from "@/components/button";
import Input from "@/components/input";

import axios from "axios";
import { useEffect, useState, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";

interface IpGeoData {
  ip: string;
  country_capital: string;
  country_name: string;
  longitude: string;
  latitude: string;
  isp: string;
  organization: string;
  asn: string;
  proxy: boolean;
  zipcode: string;
  time_zone: {
    name: string;
  };
}

const IpGeoLocation = () => {
  const [ipData, setIpData] = useState<IpGeoData | null>(null);
  const [ip, setIp] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const searchParams = useSearchParams(); // 🚀 Đã bọc Suspense

  useEffect(() => {
    const ipParam = searchParams.get("ip");

    if (ipParam) {
      setIp(ipParam);
      fetchIpData(ipParam);
    } else {
      axios.get("/api/current-ip").then((res) => {
        setIp(res.data.ip);
        fetchIpData(res.data.ip);
      });
    }
  }, []);

  const fetchIpData = async (ipAddress: string) => {
    try {
      setLoading(true);
      setError("");
      const response = await axios.get<IpGeoData>(
        `/api/ip-geo-location?ip=${ipAddress}`
      );
      setIpData(response.data);
    } catch {
      setError("Lỗi khi lấy dữ liệu IP");
      setIpData(null);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!ip.trim()) return;
    router.push(`/ip-geo-location?ip=${encodeURIComponent(ip)}`);
    fetchIpData(ip);
  };

  return (
    <div
      className="flex flex-col rounded-2xl h-full p-2"
      suppressHydrationWarning
    >
      <Header title="IP Geo Location" />
      <p className="ms-2">
        IP Location <span className="text-orange-200">Finder</span>
      </p>

      <form className="flex items-center gap-2" onSubmit={handleSearch}>
        <div className="w-full">
          <Input
            placeholder="Enter IP address"
            type="text"
            className="w-full"
            value={ip}
            onChange={(e) => setIp(e.target.value)}
            error={error}
          />
        </div>

        <div className="flex items-center justify-center ms-1 p-2">
          <Button
            variant="primary"
            className="text-white px-4 py-2 rounded-md disabled:opacity-50"
            type="submit"
            disabled={loading}
          >
            {loading ? "Searching..." : "Find"}
          </Button>
        </div>
      </form>

      {ipData && (
        <div className="mt-4 ms-2">
          <p className="font-semibold mb-2">IP Address Details</p>
          <table className="w-full border-collapse border border-gray-300">
            <tbody>
              <tr className="bg-gray-100">
                <td className="p-2 border border-gray-300 font-medium">
                  <b>IP Address:</b> {ipData.ip}
                </td>
                <td className="p-2 border border-gray-300">
                  <b>IPv6 Address:</b> Not Detected
                </td>
              </tr>
              <tr>
                <td className="p-2 border border-gray-300 font-medium">
                  <b>City/Region:</b> {ipData.country_capital}
                </td>
                <td className="p-2 border border-gray-300">
                  <b>Country:</b> {ipData.country_name}
                </td>
              </tr>
              <tr className="bg-gray-100">
                <td className="p-2 border border-gray-300 font-medium">
                  <b>Longitude:</b> {ipData.longitude}
                </td>
                <td className="p-2 border border-gray-300">
                  <b>Latitude:</b> {ipData.latitude}
                </td>
              </tr>
              <tr>
                <td className="p-2 border border-gray-300 font-medium">
                  <b>ISP:</b> {ipData.isp}
                </td>
                <td className="p-2 border border-gray-300">
                  <b>Organization:</b> {ipData.organization}
                </td>
              </tr>
              <tr className="bg-gray-100">
                <td className="p-2 border border-gray-300 font-medium">
                  <b>ASN Number:</b> {ipData.asn}
                </td>
                <td className="p-2 border border-gray-300">
                  <b>Proxy:</b> {ipData.proxy ? "Yes" : "No Proxy present"}
                </td>
              </tr>
              <tr>
                <td className="p-2 border border-gray-300">
                  <b>Postal Code:</b> {ipData.zipcode}
                </td>
                <td className="p-2 border border-gray-300 font-medium">
                  <b>Timezone:</b> {ipData.time_zone?.name}
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

// Bọc component trong Suspense để tránh lỗi
const WrappedIpGeoLocation = () => (
  <Suspense fallback={<p>Loading...</p>}>
    <IpGeoLocation />
  </Suspense>
);

export default WrappedIpGeoLocation;
