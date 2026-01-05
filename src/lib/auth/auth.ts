import { betterAuth, type OAuth2Tokens } from "better-auth";
import type { OAuth2UserInfo } from "@better-auth/core/oauth2";
import { genericOAuth, username } from "better-auth/plugins";
import { Buffer } from "buffer";
import { ROUTES } from "@/lib/routes";

export const auth = betterAuth({
  baseURL: process.env.APP_BASE_URL as string,
  emailAndPassword: {
    enabled: true,
  },
  session: {
    cookieCache: {
      enabled: true,
      maxAge: 24 * 60 * 60,
    },
  },
  plugins: [
    username(),
    genericOAuth({
      config: [
        {
          providerId: "ravelry",
          clientId: process.env.RAVELRY_CLIENT_ID as string,
          clientSecret: process.env.RAVELRY_CLIENT_SECRET,
          authorizationUrl: process.env.RAVELRY_AUTHORIZATION_URL as string,
          scopes: ["offline"],
          tokenUrl: process.env.RAVELRY_TOKEN_URL as string,
          redirectURI: process.env.RAVELRY_REDIRECT_URI as string,
          getToken: async ({ code, redirectURI }) => {
            const clientId = process.env.RAVELRY_CLIENT_ID as string;
            const clientSecret = process.env.RAVELRY_CLIENT_SECRET as string;

            const clientCredentials = Buffer.from(
              `${clientId}:${clientSecret}`,
            ).toString("base64");

            const response = await fetch(
              process.env.RAVELRY_TOKEN_URL as string,
              {
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
              },
            );

            if (!response.ok) {
              const errorBody = await response.text();
              console.error("Ravelry Token Exchange Error:", errorBody);
              throw new Error(
                `Failed to exchange token with Ravelry: ${response.status} - ${errorBody}`,
              );
            }

            const data = await response.json();

            return {
              accessToken: data.access_token,
              refreshToken: data.refresh_token,
              accessTokenExpiresAt: new Date(
                Date.now() + (data.expires_in || 3600) * 1000,
              ),
              scopes: data.scope?.split(" ") ?? [],
              raw: data,
            };
          },
          getUserInfo: async (
            tokens: OAuth2Tokens,
          ): Promise<OAuth2UserInfo | null> => {
            const userResponse = await fetch(
              `${process.env.RAVELRY_URL}${ROUTES.currentUser}`,
              {
                headers: {
                  Authorization: `Bearer ${tokens.accessToken}`,
                },
              },
            );

            if (!userResponse.ok) {
              const errorBody = await userResponse.text();
              console.error("Failed to fetch Ravelry user info:", errorBody);
              return null;
            }

            const profile = await userResponse.json();
            const user = profile.user;
            const username = user.username || "";

            return {
              id: username,
              name: username,
              email: username ? `${username}@ravelry.local` : "",
              image: user.photo_url,
              emailVerified: false,
            };
          },
        },
      ],
    }),
  ],
});
