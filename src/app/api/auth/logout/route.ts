import { NextRequest, NextResponse } from "next/server";
import { clearAuthCookies } from "../utils";

export async function GET(request: NextRequest) {
  try {
    const returnTo = request.nextUrl.searchParams.get("returnTo") || "/";

    // Construct Auth0 logout URL
    const logoutUrl = new URL(`${process.env.AUTH0_ISSUER_BASE_URL}/v2/logout`);
    logoutUrl.searchParams.set("client_id", process.env.AUTH0_CLIENT_ID || "");
    logoutUrl.searchParams.set(
      "returnTo",
      `${process.env.AUTH0_BASE_URL}${returnTo}`
    );

    const response = NextResponse.redirect(logoutUrl.toString());

    // Clear all cookies
    return clearAuthCookies(response);
  } catch {
    console.error("Logout error:");
  }
}
