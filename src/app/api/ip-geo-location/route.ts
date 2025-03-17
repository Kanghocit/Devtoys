import { NextResponse } from "next/server";
import axios from "axios";

export async function GET(request: Request) {
  const API_KEY = process.env.IP_GEO_LOCATION_API_KEY;
  if (!API_KEY) {
    return NextResponse.json(
      { error: "API key không được cấu hình" },
      { status: 500 }
    );
  }

  // Lấy IP từ query parameter
  const { searchParams } = new URL(request.url);
  const ip = searchParams.get("ip");

  // Nếu không có IP, lấy IP của người dùng
  if (!ip) {
    try {
      const response = await axios.get(
        `https://api.ipgeolocation.io/ipgeo?apiKey=${API_KEY}`
      );
      return NextResponse.json(response.data);
    } catch {
      console.error("Error fetching IP data:");
      return NextResponse.json(
        { error: "Lỗi khi lấy dữ liệu IP" },
        { status: 500 } 
      );
    }
  }

  // Validate IP format
  const ipRegex = /^(\d{1,3}\.){3}\d{1,3}$/;
  if (!ipRegex.test(ip)) {
    return NextResponse.json({ error: "IP không hợp lệ" }, { status: 400 });
  }

  const url = `https://api.ipgeolocation.io/ipgeo?apiKey=${API_KEY}&ip=${ip}`;
  try {
    const response = await axios.get(url);
    return NextResponse.json(response.data);
  } catch (error: unknown) {
    console.error("Error fetching IP data:", error);
    return NextResponse.json(
      { error: "Lỗi khi lấy dữ liệu IP" },
      { status: 500 }
    );
  }
}
