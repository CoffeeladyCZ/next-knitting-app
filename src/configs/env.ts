import { createEnv } from "@t3-oss/env-nextjs";
import { z } from "zod";

export const env = createEnv({
  server: {
    // Environment
    ENV_NAME: z
      .enum(["local", "staging", "production"])
      .optional()
      .default("local"),

    // Ravelry API (Server-side only - never exposed to client)
    RAVELRY_URL: z.string().url(),
    RAVELRY_USERNAME: z.string().min(1),
    RAVELRY_KEY: z.string().min(1),

    // OAuth2 Configuration (Server-side only)
    // OAUTH_CLIENT_ID: z.string().min(1).optional(),
    // OAUTH_CLIENT_SECRET: z.string().min(1).optional(),
    // OAUTH_REDIRECT_URI: z.url().optional(),
    // OAUTH_AUTHORIZATION_URL: z.url().optional(),
    // OAUTH_TOKEN_URL: z.url().optional(),
  },
  client: {
    // Analytics
    NEXT_PUBLIC_GA4_MEASUREMENT_ID: z.string().optional(),

    // Sentry
    NEXT_PUBLIC_SENTRY_DSN: z.string().url().optional(),
  },
  runtimeEnv: {
    // Server
    ENV_NAME: process.env.ENV_NAME,
    RAVELRY_URL: process.env.RAVELRY_URL,
    RAVELRY_USERNAME: process.env.RAVELRY_USERNAME,
    RAVELRY_KEY: process.env.RAVELRY_KEY,
    // OAUTH_CLIENT_ID: process.env.OAUTH_CLIENT_ID,
    // OAUTH_CLIENT_SECRET: process.env.OAUTH_CLIENT_SECRET,
    // OAUTH_REDIRECT_URI: process.env.OAUTH_REDIRECT_URI,
    // OAUTH_AUTHORIZATION_URL: process.env.OAUTH_AUTHORIZATION_URL,
    // OAUTH_TOKEN_URL: process.env.OAUTH_TOKEN_URL,

    // Client
    NEXT_PUBLIC_GA4_MEASUREMENT_ID: process.env.NEXT_PUBLIC_GA4_MEASUREMENT_ID,
    NEXT_PUBLIC_SENTRY_DSN: process.env.NEXT_PUBLIC_SENTRY_DSN,
  },
  // Skip validation in test environment
  skipValidation: !!process.env.SKIP_ENV_VALIDATION,
});
