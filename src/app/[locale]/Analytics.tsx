"use client";

import { useEffect } from "react";
import ReactGA from "react-ga4";
import { env } from "../../configs/env";

export function Analytics() {
  useEffect(() => {
    if (env.NEXT_PUBLIC_GA4_MEASUREMENT_ID) {
      ReactGA.initialize(env.NEXT_PUBLIC_GA4_MEASUREMENT_ID);
    }
  }, []);

  return null;
}

