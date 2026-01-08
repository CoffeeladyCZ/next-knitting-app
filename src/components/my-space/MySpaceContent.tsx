"use client";

import { SubNavigation } from "@/components/SubNavigation";
import { useTranslations } from "next-intl";

export const MySpaceContent = () => {
  const t = useTranslations();

  const navigationItems = [
    {
      href: "/my-space/projects",
      label: t("navigation.projects"),
    },
  ];

  return (
    <>
      <SubNavigation items={navigationItems} activeHref="/my-space/projects" />
    </>
  );
};
