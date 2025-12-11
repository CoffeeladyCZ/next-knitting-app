import React from "react";
import { PatternDetail } from "../../../../components/patterns/PatternDetail";
import type { Locale } from "../../../../i18n/config";
import { setRequestLocale } from "next-intl/server";

export default async function PatternDetailPage({
  params,
}: {
  params: Promise<{ locale: Locale; id: string }>;
}) {
  const { locale, id } = await params;

  // Enable static rendering
  setRequestLocale(locale);

  return <PatternDetail id={id} />;
}
