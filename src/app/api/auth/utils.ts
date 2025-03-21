import { NextResponse } from "next/server";

interface Auth0Tokens {
  access_token: string;
  id_token: string;
  refresh_token?: string;
  expires_in: number;
  token_type: string;
  scope: string;
}

interface Auth0UserData {
  sub: string;
  name: string;
  email: string;
  picture?: string;
  email_verified: boolean;
  updated_at: string;
  nickname: string;
}

export function getAuthorizationUrl(returnTo?: string) {
  if (
    !process.env.AUTH0_CLIENT_ID ||
    !process.env.AUTH0_CALLBACK_URL ||
    !process.env.AUTH0_ISSUER_BASE_URL
  ) {
    throw new Error("Missing required Auth0 environment variables");
  }

  const params = new URLSearchParams({
    response_type: "code",
    client_id: process.env.AUTH0_CLIENT_ID,
    redirect_uri: process.env.AUTH0_CALLBACK_URL,
    scope: "openid profile email offline_access",
    ...(returnTo && { state: returnTo }),
  });

  return `${process.env.AUTH0_ISSUER_BASE_URL}/authorize?${params}`;
}

export async function getTokensFromAuth0(code: string) {
  const tokenResponse = await fetch(
    `${process.env.AUTH0_ISSUER_BASE_URL}/oauth/token`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: new URLSearchParams({
        grant_type: "authorization_code",
        client_id: process.env.AUTH0_CLIENT_ID || "",
        client_secret: process.env.AUTH0_CLIENT_SECRET || "",
        code,
        redirect_uri: process.env.AUTH0_CALLBACK_URL || "",
      }).toString(),
    }
  );

  const tokens = await tokenResponse.json();

  if (!tokenResponse.ok) {
    throw new Error(tokens.error_description || "Failed to get tokens");
  }

  return tokens;
}

export async function getUserInfo(accessToken: string) {
  const userInfoResponse = await fetch(
    `${process.env.AUTH0_ISSUER_BASE_URL}/userinfo`,
    {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    }
  );

  const userData = await userInfoResponse.json();

  if (!userInfoResponse.ok) {
    throw new Error("Failed to get user info");
  }

  return userData;
}

export function setAuthCookies(
  response: NextResponse,
  tokens: Auth0Tokens,
  userData: Auth0UserData
) {
  // Set access token cookie
  response.cookies.set("access_token", tokens.access_token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: tokens.expires_in,
  });

  // Set refresh token cookie if provided
  if (tokens.refresh_token) {
    response.cookies.set("refresh_token", tokens.refresh_token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
      maxAge: 30 * 24 * 60 * 60, // 30 days
    });
  }

  // Set user data cookie
  response.cookies.set(
    "user",
    JSON.stringify({
      sub: userData.sub,
      nickname: userData.nickname,
      name: userData.name,
      picture: userData.picture,
      email: userData.email,
      email_verified: userData.email_verified,
    }),
    {
      httpOnly: false,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
      maxAge: tokens.expires_in,
    }
  );

  return response;
}

export function clearAuthCookies(response: NextResponse) {
  response.cookies.delete("access_token");
  response.cookies.delete("refresh_token");
  response.cookies.delete("user");
  return response;
}
