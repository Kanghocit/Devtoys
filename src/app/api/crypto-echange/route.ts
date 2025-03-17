import { NextResponse } from "next/server";
import axios from "axios";

export async function GET() {
  const API_KEY = process.env.CRYPTO_CURRENCY_API_KEY;

  if (!API_KEY) {
    return NextResponse.json(
      { error: "API key không được cấu hình" },
      { status: 500 }
    );
  }

  const url = `http://api.coinlayer.com/live?access_key=${API_KEY}`;

  try {
    const res = await axios.get(url);
    return NextResponse.json(res.data);
  } catch (error) {
    console.error("Error fetching crypto data:", error);
    return NextResponse.json(
      { error: "Lỗi khi lấy dữ liệu crypto" },
      { status: 500 }
    );
  }
}
