import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  const formData = await request.formData();
  const file = formData.get("file") as File;

  if (!file) {
    return NextResponse.json({ error: "No file uploaded" }, { status: 400 });
  }

  const apiKey = process.env.VIRUS_SCAN_API_KEY;
  const url = "https://api.metadefender.com/v4/file";
  if (!apiKey) {
    return NextResponse.json({ error: "No API key found" }, { status: 500 });
  }

  const response = await fetch(url, {
    method: "POST",
    headers: {
      apikey: apiKey,
    },
    body: formData,
  });
  const data = await response.json();
  return NextResponse.json(data);
}
