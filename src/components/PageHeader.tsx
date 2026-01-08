"use client";

import { Button } from "@/components/component-library/Button";
import { Link } from "@/i18n/navigation";
import { SignOut } from "@/components/SignOut";
import { useTranslations } from "next-intl";

type PageHeaderProps = {
  title?: string;
  description?: string;
  children?: React.ReactNode;
};

export const PageHeader = ({
  title,
  description,
  children,
}: PageHeaderProps) => {
  const t = useTranslations();

  const defaultTitle = t("header.title");
  const defaultDescription = t("header.description");

  const displayTitle = title ?? defaultTitle;
  const displayDescription = description ?? defaultDescription;

  return (
    <div className="flex items-center justify-start gap-2 mb-10 px-4">
      <div className="flex gap-2 items-end">
        <Link href="/">
          <h1 className="text-3xl text-start cursor-pointer hover:opacity-80 transition-opacity">
            {displayTitle}
          </h1>
        </Link>
        {displayDescription && (
          <p className="text-sm text-gray-500 font-borel">
            {displayDescription}
          </p>
        )}
      </div>
      {children}
      <div className="ml-auto flex items-center gap-4">
        <Button variant="ghost" size="md" asChild>
          <Link href="/my-space">{t("navigation.mySpace")}</Link>
        </Button>
        <SignOut />
      </div>
    </div>
  );
};
