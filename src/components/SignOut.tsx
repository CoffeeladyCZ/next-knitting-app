"use client";

import { useTranslations } from "next-intl";
import { useAuth } from "@/hooks/useAuth";
import { useState } from "react";
import { usePreventLayoutShift } from "@/hooks/usePreventLayoutShift";
import { DropdownMenu } from "@/components/component-library/DropdownMenu";
import { UserIcon } from "lucide-react";

type Props = {
  className?: string;
};

export const SignOut = ({ className }: Props) => {
  const [error, setError] = useState<string | null>(null);
  const [open, setOpen] = useState(false);

  const t = useTranslations("Login");
  const { signOutRavelry } = useAuth();
  usePreventLayoutShift(open);

  const onSubmit = async () => {
    await signOutRavelry();
    setError(null);
    setOpen(false);
  };

  return (
    <div className={className}>
      <div className="flex items-center gap-2">
        <DropdownMenu open={open} onOpenChange={setOpen}>
          <DropdownMenu.Trigger asChild>
            <button
              className="inline-flex size-[35px] items-center justify-center rounded-full bg-white outline-none hover:bg-primary/10 focus:shadow-[0_0_0_2px] focus:shadow-black"
              aria-label={t("menu.ariaLabel")}
            >
              <UserIcon />
            </button>
          </DropdownMenu.Trigger>
          <DropdownMenu.Content>
            <DropdownMenu.Item>{t("menu.profile")}</DropdownMenu.Item>
            <DropdownMenu.Item>{t("menu.settings")}</DropdownMenu.Item>
            <DropdownMenu.Separator />
            <DropdownMenu.Item onClick={onSubmit}>{t("buttons.signOut")}</DropdownMenu.Item>
          </DropdownMenu.Content>
        </DropdownMenu>
      </div>
      {error && <div className="text-red-500">{error}</div>}
    </div>
  );
};
