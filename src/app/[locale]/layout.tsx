import { NextIntlClientProvider } from "next-intl";
import { getMessages, getLocale } from "next-intl/server";
import { JetBrains_Mono } from "next/font/google";
import type { Metadata } from "next";
import { StyledComponentsRegistry } from "@/lib/registry";
import { Providers } from "../providers";

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  style: ["normal", "italic"],
  variable: "--font-mono",
});

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "ZenyFin",
  description: "Gerenciamento financeiro pessoal",
  icons: {
    icon: { url: "/icon.svg", type: "image/svg+xml" },
  },
};

export default async function LocaleLayout({
  children,
  params: { locale },
}: {
  children: React.ReactNode;
  params: { locale: string };
}) {
  const messages = await getMessages();

  return (
    <html lang={locale} className={jetbrainsMono.variable}>
      <body>
        <NextIntlClientProvider locale={locale} messages={messages}>
          <StyledComponentsRegistry>
            <Providers>{children}</Providers>
          </StyledComponentsRegistry>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
