import { getCookie } from "@/utils/cookies";

export const getAuthCookies = async () => {
  const sessionToken =
    (await getCookie("better-auth.session_token"))?.value ?? "";

  const cookieHeader = [`better-auth.session_token=${sessionToken}`].join(";");

  return cookieHeader;
};
