import type { Locale } from "@/i18n/config";
import { setRequestLocale } from "next-intl/server";
import { PageHeader } from "@/components/PageHeader";
import { MySpaceContent } from "@/components/my-space/MySpaceContent";

type Props = {
  children: React.ReactNode;
  params: Promise<{ locale: Locale }>;
};

export default async function MySpaceLayout({ children, params }: Props) {
  const { locale } = await params;

  setRequestLocale(locale);

  return (
    <div className="flex flex-col p-4">
      <PageHeader />
      <MySpaceContent />
      {children}
    </div>
  );
}
