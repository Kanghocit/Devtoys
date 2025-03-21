import { NextRequest, NextResponse } from "next/server";
import { getAuthorizationUrl } from "../utils";

export async function GET(request: NextRequest) {
  try {
    const returnTo = request.nextUrl.searchParams.get("returnTo") || "/";
    return NextResponse.redirect(getAuthorizationUrl(returnTo));
  } catch {
    console.error("Login error:");
  }
}
