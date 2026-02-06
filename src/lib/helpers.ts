import { cookies } from "next/headers";
import { ROUTES } from "@/lib/routes";
import { logger } from "@/lib/logger";

const refreshAccessToken = async (
  refreshToken: string,
): Promise<string | null> => {
  const clientId = process.env.RAVELRY_CLIENT_ID;
  const clientSecret = process.env.RAVELRY_CLIENT_SECRET;
  const tokenUrl = process.env.RAVELRY_TOKEN_URL;
  const redirectUri = process.env.RAVELRY_REDIRECT_URI;

  if (!clientId || !clientSecret || !tokenUrl || !redirectUri) {
    logger.error("Missing environment variables for token refresh", undefined, {
      function: "refreshAccessToken",
    });
    return null;
  }

  const authString = `${clientId.trim()}:${clientSecret.trim()}`;
  const clientCredentials = Buffer.from(authString).toString("base64");

  try {
    const body = `grant_type=refresh_token&refresh_token=${refreshToken}&redirect_uri=${encodeURIComponent(redirectUri)}`;
    const response = await fetch(tokenUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        Authorization: `Basic ${clientCredentials}`,
        Accept: "application/json",
      },
      body: body,
    });

    if (!response.ok) {
      logger.error("Error refreshing token", undefined, {
        function: "refreshAccessToken",
        status: response.status,
      });
      return null;
    }

    const data = await response.json();

    if (data.access_token) {
      const cookieStore = await cookies();

      cookieStore.set("rvr_access_token", data.access_token, {
        httpOnly: true,
        secure: true,
        sameSite: "lax",
        maxAge: data.expires_in,
      });

      if (data.refresh_token) {
        cookieStore.set("rvr_token", data.refresh_token, {
          httpOnly: true,
          secure: true,
          sameSite: "lax",
          maxAge: 30 * 24 * 60 * 60,
        });
      }
    }
    return data.access_token ?? null;
  } catch (error) {
    logger.error("Fetch error during token refresh", error, {
      function: "refreshAccessToken",
    });
    return null;
  }
};

export const getValidRavelryToken = async (): Promise<string | null> => {
  const cookieStore = await cookies();

  const accessToken = cookieStore.get("rvr_access_token")?.value;

  if (accessToken) {
    return accessToken;
  }

  const refreshToken = cookieStore.get("rvr_token")?.value;
  if (refreshToken) {
    return await refreshAccessToken(refreshToken);
  }
  return null;
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
      `${process.env.RAVELRY_URL}${ROUTES.currentUser}`,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      },
    );

    if (!userResponse.ok) {
      const errorBody = await userResponse.text();
      logger.error("Failed to fetch Ravelry user info", undefined, {
        function: "getRavelryUserInfo",
        status: userResponse.status,
        errorBody: errorBody.substring(0, 200),
      });
      return null;
    }

    return userResponse.json();
  } catch (error) {
    logger.error("Error fetching Ravelry user info", error, {
      function: "getRavelryUserInfo",
    });
    return null;
  }
};
