import { env } from "@/configs/env";
import { cookies, headers } from "next/headers";
import { auth } from "./auth/auth";
import { ROUTES } from "@/lib/routes";

const refreshAccessToken = async (
  refreshToken: string,
): Promise<string | null> => {
  try {
    const response = await fetch(env.RAVELRY_TOKEN_URL, {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: new URLSearchParams({
        grant_type: "refresh_token",
        refresh_token: refreshToken,
      }),
    });

    if (!response.ok) {
      return null;
    }

    const data = await response.json();
    return data.access_token ?? null;
  } catch {
    return null;
  }
};

export const getValidRavelryToken = async (): Promise<string | null> => {
  try {
    const tokenData = await auth.api.getAccessToken({
      body: { providerId: "ravelry" },
      headers: await headers(),
    });

    if (!tokenData?.accessToken) {
      return null;
    }

    if (tokenData.accessTokenExpiresAt) {
      const expiresAt = new Date(tokenData.accessTokenExpiresAt);
      const now = new Date();

      if (expiresAt > now) {
        return tokenData.accessToken;
      }

      const cookieStore = await cookies();
      const refreshToken = cookieStore.get("rvr_token")?.value;

      if (!refreshToken) {
        return null;
      }

      const newAccessToken = await refreshAccessToken(refreshToken);
      return newAccessToken;
    }

    return tokenData.accessToken;
  } catch (error) {
    console.error("Failed to get access token:", error);
    return null;
  }
};

export const getRavelryAccessToken = async (
  code: string,
  redirectURI: string,
) => {
  const clientId = process.env.RAVELRY_CLIENT_ID as string;
  const clientSecret = process.env.RAVELRY_CLIENT_SECRET as string;

  const clientCredentials = Buffer.from(`${clientId}:${clientSecret}`).toString(
    "base64",
  );

  const response = await fetch(process.env.RAVELRY_TOKEN_URL as string, {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
      Authorization: `Basic ${clientCredentials}`,
    },
    body: new URLSearchParams({
      grant_type: "authorization_code",
      code: code,
      redirect_uri: redirectURI,
    }),
  });

  if (!response.ok) {
    const errorBody = await response.text();
    throw new Error(
      `Failed to get access token: ${response.status}. ${errorBody}`,
    );
  }

  return response.json();
};

export const getRavelryUserInfo = async (
  accessToken: string,
): Promise<{ user: { username?: string; photo_url?: string } } | null> => {
  try {
    const userResponse = await fetch(
      `${env.RAVELRY_URL}${ROUTES.currentUser}`,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      },
    );

    if (!userResponse.ok) {
      const errorBody = await userResponse.text();
      console.error("Failed to fetch Ravelry user info:", errorBody);
      return null;
    }

    return userResponse.json();
  } catch (error) {
    console.error("Error fetching Ravelry user info:", error);
    return null;
  }
};
