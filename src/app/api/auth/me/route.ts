import { NextRequest, NextResponse } from "next/server";
import { getUserInfo } from "../utils";

export async function GET(request: NextRequest) {
  try {
    const accessToken = request.cookies.get("access_token")?.value;

    if (!accessToken) {
      return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
    }

    const userData = await getUserInfo(accessToken);
    return NextResponse.json(userData);
  } catch {
    console.error("User info error:");
    return NextResponse.json(
      { error: "Failed to get user info" },
      { status: 401 }
    );
  }
}
