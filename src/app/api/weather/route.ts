import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const city = searchParams.get("q");
  const apiKey = process.env.WEATHER_API_KEY;
  if (!apiKey) {
    return NextResponse.json(
      { error: "API key không được cấu hình" },
      { status: 500 }
    );
  }

  const response = await fetch(
    `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`
  );
  const data = await response.json();

  return NextResponse.json(data);
}
