import type { Locale } from "@/i18n/config";
import { setRequestLocale } from "next-intl/server";

type Props = {
  params: Promise<{ locale: Locale }>;
};

export default async function MySpacePage({ params }: Props) {
  const { locale } = await params;

  setRequestLocale(locale);

  return null;
}

