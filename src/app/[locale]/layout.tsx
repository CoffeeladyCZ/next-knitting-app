import type { Metadata } from "next";
import { hasLocale, NextIntlClientProvider } from "next-intl";
import { notFound } from "next/navigation";
import { routing } from "../../i18n/routing";
import { Providers } from "../../components/Providers";
import { Analytics } from "./Analytics";
import "../styles/global.css";

type Props = {
  children: React.ReactNode
  params: Promise<{ locale: string }>
}

export const metadata: Metadata = {
  title: "Knitting Patterns",
  description: "Browse and discover knitting patterns",
};

export async function LocaleLayout({
  children, params
}: Props) {
  const { locale } = await params

  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }

  return (
    <html lang={locale} suppressHydrationWarning>
      <body>
        <Analytics />
          <NextIntlClientProvider locale={locale}>
            <Providers>
              {children}
            </Providers>
          </NextIntlClientProvider>
      </body>
    </html>
  );
}

