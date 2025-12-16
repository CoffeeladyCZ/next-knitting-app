"use client";

import { useTranslations } from "next-intl";
import { useState } from "react";
import { Button } from "@/components/component-library/Button";
import { useAuth } from "@/hooks/useAuth";

export const SignIn = () => {
  const [error, setError] = useState<string | null>(null);

  const t = useTranslations("Login");
  const { signInRavelry } = useAuth();

  const onSubmit = async () => {
    setError(null);
    await signInRavelry();
  };

  return (
    <div className="flex items-start justify-end h-screen">
      <Button type="submit" size="sm" onClick={onSubmit}>
        {t("buttons.signIn")}
      </Button>
      {error && <div className="text-red-500">{error}</div>}
    </div>
  );
};
