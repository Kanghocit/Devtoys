import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const dataId = searchParams.get("id");

  if (!dataId) {
    return NextResponse.json({ error: "No data id provided" }, { status: 400 });
  }
  const apiKey = process.env.VIRUS_SCAN_API_KEY;
  const url = `https://api.metadefender.com/v4/file/${dataId}`;

  if (!apiKey) {
    return NextResponse.json({ error: "No API key found" }, { status: 500 });
  }
  const response = await fetch(url, {
    method: "GET",
    headers: {
      apikey: apiKey,
    },
  });
  const data = await response.json();
  return NextResponse.json(data);
}
