import { createAuthClient } from "better-auth/react";
import { genericOAuthClient, usernameClient } from "better-auth/client/plugins";

export const authClient = createAuthClient({
  baseURL: process.env.APP_BASE_URL,
  plugins: [usernameClient(), genericOAuthClient()],
});
