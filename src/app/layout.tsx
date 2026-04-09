import type { Metadata, Viewport } from "next";
import { ClerkProvider } from "@clerk/nextjs";
import { jaJP } from "@clerk/localizations";
import { Noto_Sans_JP } from "next/font/google";
import "./globals.css";

const notoSansJP = Noto_Sans_JP({
  variable: "--font-sans",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
};

export const metadata: Metadata = {
  title: "つつみ — 贈り物を、大切に包む。",
  description:
    "「誰にいくらもらった？お返しいつ？」を解決する贈答お付き合い管理アプリ。パートナーと共有して、大切な人との贈り物を忘れない。",
  icons: {
    icon: "/logo.webp",
    apple: "/logo.webp",
  },
  openGraph: {
    title: "つつみ — 贈り物を、大切に包む。",
    description:
      "現金もギフトも、記録するだけでお返し時期と金額を教えてくれる。パーソナルで自分用に、グループでパートナーと共有も。",
    url: "https://tsutsumi.app",
    siteName: "つつみ",
    locale: "ja_JP",
    type: "website",
    images: [{ url: "/hero-furoshiki.webp", width: 1200, height: 630 }],
  },
  twitter: {
    card: "summary_large_image",
    title: "つつみ — 贈り物を、大切に包む。",
    description:
      "現金もギフトも、記録するだけでお返し時期と金額を教えてくれる。",
    images: ["/hero-furoshiki.webp"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider localization={jaJP}>
      <html lang="ja" className={`${notoSansJP.variable} h-full antialiased`}>
        <body className="min-h-full flex flex-col">{children}</body>
      </html>
    </ClerkProvider>
  );
}
