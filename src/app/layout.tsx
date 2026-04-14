import type { Metadata, Viewport } from "next";
import { ClerkProvider } from "@clerk/nextjs";
import { Analytics } from "@vercel/analytics/next";
import { jaJP } from "@clerk/localizations";
import { Zen_Old_Mincho, Zen_Kaku_Gothic_New, Fraunces } from "next/font/google";
import "./globals.css";

// Japanese display — elegant serif, used for key headlines
const zenOldMincho = Zen_Old_Mincho({
  variable: "--font-display",
  weight: ["500", "700", "900"],
  subsets: ["latin"],
  preload: false,
  display: "swap",
});

// Japanese body — modern, refined sans for reading
const zenKakuGothic = Zen_Kaku_Gothic_New({
  variable: "--font-body",
  weight: ["300", "400", "500", "700"],
  subsets: ["latin"],
  preload: true,
  display: "swap",
});

// Latin accent — variable serif for eyebrows, numerals, captions
const fraunces = Fraunces({
  variable: "--font-latin",
  subsets: ["latin"],
  display: "swap",
});

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
};

export const metadata: Metadata = {
  verification: {
    google: "BcXjRAGx3Zk0xdHGzJjLD1WfvatW-mjOr9pOxBswKT8",
  },
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
      <html
        lang="ja"
        className={`${zenOldMincho.variable} ${zenKakuGothic.variable} ${fraunces.variable} h-full antialiased`}
      >
        <head>
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{
              __html: JSON.stringify({
                "@context": "https://schema.org",
                "@type": "WebApplication",
                name: "つつみ",
                url: "https://tsutsumi.app",
                description:
                  "現金もギフトも、記録するだけでお返し時期と金額を教えてくれる贈答管理アプリ",
                applicationCategory: "LifestyleApplication",
                operatingSystem: "Web",
                offers: { "@type": "Offer", price: "0", priceCurrency: "JPY" },
                inLanguage: "ja",
              }),
            }}
          />
        </head>
        <body className="min-h-full flex flex-col bg-[#faf6f1]">
          {children}
          <Analytics />
        </body>
      </html>
    </ClerkProvider>
  );
}
