import { NextRequest, NextResponse } from "next/server";
import { getTokensFromAuth0, getUserInfo, setAuthCookies } from "../utils";

export async function GET(request: NextRequest) {
  try {
    const code = request.nextUrl.searchParams.get("code");
    const state = request.nextUrl.searchParams.get("state") || "/";

    if (!code) {
      throw new Error("No code provided");
    }

    // Get tokens from Auth0
    const tokens = await getTokensFromAuth0(code);

    // Get user info
    const userData = await getUserInfo(tokens.access_token);

    // Create response with redirect
    const response = NextResponse.redirect(
      new URL(state, process.env.AUTH0_BASE_URL)
    );

    // Set cookies
    return setAuthCookies(response, tokens, userData);
  } catch {
    console.error("Callback error:");
  }
}
