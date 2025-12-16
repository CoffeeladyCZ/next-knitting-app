import type { Locale } from "next-intl";
import { setRequestLocale } from "next-intl/server";
import { Patterns } from "@/components/patterns/Dashboard";
import { SignIn } from "@/components/SignIn";
import { getSession } from "@/lib/auth/session";

type Props = {
  params: Promise<{ locale: Locale }>;
};

export default async function Page({ params }: Props) {
  const { locale } = await params;
  const { session } = await getSession();

  setRequestLocale(locale);

  return <>{session ? <Patterns /> : <SignIn />}</>;
}
