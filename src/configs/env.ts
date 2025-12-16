import { createEnv } from "@t3-oss/env-nextjs";
import { z } from "zod";

export const env = createEnv({
  server: {
    ENV_NAME: z
      .enum(["local", "staging", "production"])
      .optional()
      .default("local"),

    APP_BASE_URL: z.string(),

    RAVELRY_URL: z.string(),
    RAVELRY_CLIENT_ID: z.string(),
    RAVELRY_CLIENT_SECRET: z.string(),
    RAVELRY_AUTHORIZATION_URL: z.string(),
    RAVELRY_TOKEN_URL: z.string(),

    BETTER_AUTH_SECRET: z.string(),
  },
  client: {
    NEXT_PUBLIC_GA4_MEASUREMENT_ID: z.string().optional(),
    NEXT_PUBLIC_SENTRY_DSN: z.string().url().optional(),
  },
  runtimeEnv: {
    ENV_NAME: process.env.ENV_NAME,
    APP_BASE_URL: process.env.APP_BASE_URL,

    RAVELRY_URL: process.env.RAVELRY_URL,
    RAVELRY_CLIENT_ID: process.env.RAVELRY_CLIENT_ID,
    RAVELRY_CLIENT_SECRET: process.env.RAVELRY_CLIENT_SECRET,
    RAVELRY_AUTHORIZATION_URL: process.env.RAVELRY_AUTHORIZATION_URL,
    RAVELRY_TOKEN_URL: process.env.RAVELRY_TOKEN_URL,

    BETTER_AUTH_SECRET: process.env.BETTER_AUTH_SECRET,

    NEXT_PUBLIC_GA4_MEASUREMENT_ID: process.env.NEXT_PUBLIC_GA4_MEASUREMENT_ID,
    NEXT_PUBLIC_SENTRY_DSN: process.env.NEXT_PUBLIC_SENTRY_DSN,
  },
  skipValidation: !!process.env.SKIP_ENV_VALIDATION,
});
