"use client";

import { useTranslations } from "next-intl";
import { Button } from "@/components/component-library/Button";
import { useAuth } from "@/hooks/useAuth";
import { useState } from "react";

type Props = {
  className?: string;
};

export const SignOut = ({ className }: Props) => {
  const [error, setError] = useState<string | null>(null);

  const t = useTranslations("Login");
  const { signOutRavelry } = useAuth();

  const onSubmit = async () => {
    await signOutRavelry();
    setError(null);
  };

  return (
    <div className={className}>
      <Button type="button" size="sm" variant="outline" onClick={onSubmit}>
        {t("buttons.signOut")}
      </Button>
      {error && <div className="text-red-500">{error}</div>}
    </div>
  );
};
