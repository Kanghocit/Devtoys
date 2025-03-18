import { NextRequest } from "next/server";

export async function GET(req: NextRequest) {
  let ip =
    req.headers.get("x-forwarded-for")?.split(",")[0] || 
    req.headers.get("x-real-ip") || 
    req.headers.get("x-client-ip") ||
    "Không xác định";

  // Nếu IP là localhost (::1 hoặc 127.0.0.1), gọi API để lấy IP thật
  if (ip === "::1" || ip === "127.0.0.1") {
    const response = await fetch("https://api64.ipify.org?format=json");
    const data = await response.json();
    ip = data.ip;
  }

  return new Response(JSON.stringify({ ip }), { status: 200 });
}
