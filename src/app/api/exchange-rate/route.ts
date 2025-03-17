import { NextResponse } from "next/server";
import axios from "axios";

export async function GET() {
  const API_KEY = process.env.CURRENCY_API_KEY;

  if (!API_KEY) {
    return NextResponse.json(
      { error: "API key không được cấu hình" },
      { status: 500 }
    );
  }

  const url = `https://api.currencyapi.com/v3/latest?apikey=${API_KEY}`;

  try {
    const response = await axios.get(url);
    return NextResponse.json(response.data);
  } catch (error) {
    console.error("Error fetching currency data:", error);
    return NextResponse.json(
      { error: "Lỗi khi lấy dữ liệu tiền tệ" },
      { status: 500 }
    );
  }
}
