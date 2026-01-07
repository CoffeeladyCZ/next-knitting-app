import type { Locale } from "@/i18n/config";
import { setRequestLocale } from "next-intl/server";
import { Projects } from "@/components/my-space/Projects";

type Props = {
  params: Promise<{ locale: Locale }>;
};

export default async function ProjectsPage({ params }: Props) {
  const { locale } = await params;

  setRequestLocale(locale);

  return <Projects />;
}

