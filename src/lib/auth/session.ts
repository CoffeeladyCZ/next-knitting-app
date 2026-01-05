import type { Session, User } from "better-auth";

import { headers } from "next/headers";
import { auth } from "./auth";

type SessionType = {
  user: User | null;
  session: Session | null;
};

export const getSession = async (): Promise<SessionType> => {
  try {
    const session = await auth.api.getSession({
      headers: await headers(),
    });
    return {
      user: session?.user ?? null,
      session: session?.session ?? null,
    };
  } catch (error) {
    console.error("Failed to get session:", error);
    return { user: null, session: null };
  }
};
