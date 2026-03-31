"use client";

import { useState, useEffect, useMemo } from "react";
import { logger } from "@/lib/logger";

const USERNAME_STORAGE_KEY = "ravelry_username";

const getStoredUsername = (): string => {
  if (typeof window === "undefined") return "";
  return localStorage.getItem(USERNAME_STORAGE_KEY) || "";
};

export const useUsername = () => {
  const initialUsername = useMemo(() => getStoredUsername(), []);
  const [username, setUsername] = useState<string>(initialUsername);
  const [isLoading, setIsLoading] = useState(!initialUsername);

  useEffect(() => {
    if (initialUsername) {
      return;
    }

    const getBaseUrl = () => {
      if (typeof window !== "undefined") {
        return window.location.origin;
      }
      return "";
    };

    fetch(`${getBaseUrl()}/api/user`)
      .then((res) => res.json())
      .then((data) => {
        if (data.username) {
          setUsername(data.username);
          localStorage.setItem(USERNAME_STORAGE_KEY, data.username);
        }
        setIsLoading(false);
      })
      .catch((error) => {
        logger.error("Error fetching username", error, {
          hook: "useUsername",
        });
        setIsLoading(false);
      });
  }, [initialUsername]);

  return { username, isLoading };
};

export const setUsernameInStorage = (username: string) => {
  if (typeof window !== "undefined") {
    localStorage.setItem(USERNAME_STORAGE_KEY, username);
  }
};

export const clearUsernameFromStorage = () => {
  if (typeof window !== "undefined") {
    localStorage.removeItem(USERNAME_STORAGE_KEY);
  }
};
