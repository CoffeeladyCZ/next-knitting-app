import { betterAuth, type OAuth2Tokens } from "better-auth";
import type { OAuth2UserInfo } from "@better-auth/core/oauth2";
import { genericOAuth, username } from "better-auth/plugins";
import { cookies } from "next/headers";
import { getRavelryAccessToken, getRavelryUserInfo } from "../helpers";

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
            const data = await getRavelryAccessToken(code, redirectURI);

            (await cookies()).set("rvr_token", data.refresh_token, {
              httpOnly: true,
              secure: true,
              sameSite: "lax",
              maxAge: 60 * 60 * 24 * 30,
            });

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
            const accessToken = tokens.accessToken;
            if (!accessToken) {
              return null;
            }

            const profile = await getRavelryUserInfo(accessToken);

            if (!profile) {
              return null;
            }

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
