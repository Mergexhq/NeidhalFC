import type { Metadata, Viewport } from "next";
import localFont from "next/font/local";
import "./globals.css";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import "@fortawesome/fontawesome-svg-core/styles.css";
import { config } from "@fortawesome/fontawesome-svg-core";
config.autoAddCss = false;

const friendsFont = localFont({
  src: [
    {
      path: "../../public/1689860129wpdm_Friends-Font-Family/Friends Font Family/TTF/Friends-Thin.ttf",
      weight: "100",
      style: "normal",
    },
    {
      path: "../../public/1689860129wpdm_Friends-Font-Family/Friends Font Family/TTF/Friends-ThinItalic.ttf",
      weight: "100",
      style: "italic",
    },
    {
      path: "../../public/1689860129wpdm_Friends-Font-Family/Friends Font Family/TTF/Friends-UltraLight.ttf",
      weight: "200",
      style: "normal",
    },
    {
      path: "../../public/1689860129wpdm_Friends-Font-Family/Friends Font Family/TTF/Friends-UltraLightItalic.ttf",
      weight: "200",
      style: "italic",
    },
    {
      path: "../../public/1689860129wpdm_Friends-Font-Family/Friends Font Family/TTF/Friends-Regular.ttf",
      weight: "300",
      style: "normal",
    },
    {
      path: "../../public/1689860129wpdm_Friends-Font-Family/Friends Font Family/TTF/Friends-Italic.ttf",
      weight: "300",
      style: "italic",
    },
    {
      path: "../../public/1689860129wpdm_Friends-Font-Family/Friends Font Family/TTF/Friends-Regular.ttf",
      weight: "400",
      style: "normal",
    },
    {
      path: "../../public/1689860129wpdm_Friends-Font-Family/Friends Font Family/TTF/Friends-Italic.ttf",
      weight: "400",
      style: "italic",
    },
    {
      path: "../../public/1689860129wpdm_Friends-Font-Family/Friends Font Family/TTF/Friends-Regular.ttf",
      weight: "500",
      style: "normal",
    },
    {
      path: "../../public/1689860129wpdm_Friends-Font-Family/Friends Font Family/TTF/Friends-Italic.ttf",
      weight: "500",
      style: "italic",
    },
    {
      path: "../../public/1689860129wpdm_Friends-Font-Family/Friends Font Family/TTF/Friends-SemiBold.ttf",
      weight: "600",
      style: "normal",
    },
    {
      path: "../../public/1689860129wpdm_Friends-Font-Family/Friends Font Family/TTF/Friends-SemiBoldItalic.ttf",
      weight: "600",
      style: "italic",
    },
    {
      path: "../../public/1689860129wpdm_Friends-Font-Family/Friends Font Family/TTF/Friends-UltraBold.ttf",
      weight: "700",
      style: "normal",
    },
    {
      path: "../../public/1689860129wpdm_Friends-Font-Family/Friends Font Family/TTF/Friends-UltraBoldItalic.ttf",
      weight: "700",
      style: "italic",
    },
    {
      path: "../../public/1689860129wpdm_Friends-Font-Family/Friends Font Family/TTF/Friends-Black.ttf",
      weight: "800",
      style: "normal",
    },
    {
      path: "../../public/1689860129wpdm_Friends-Font-Family/Friends Font Family/TTF/Friends-BlackItalic.ttf",
      weight: "800",
      style: "italic",
    },
    {
      path: "../../public/1689860129wpdm_Friends-Font-Family/Friends Font Family/TTF/Friends-Black.ttf",
      weight: "900",
      style: "normal",
    },
    {
      path: "../../public/1689860129wpdm_Friends-Font-Family/Friends Font Family/TTF/Friends-BlackItalic.ttf",
      weight: "900",
      style: "italic",
    },
  ],
});

export const viewport: Viewport = {
  themeColor: "#0a1c3d",
  width: "device-width",
  initialScale: 1,
};

export const metadata: Metadata = {
  title: {
    default: "Neidhal FC | Chennai's Premium Coastal Football Club",
    template: "%s | Neidhal FC"
  },
  description: "Nurturing creative decision-making, street-style flair, and structured football training on Chennai's coastlines since 2016. Book a free trial session today.",
  metadataBase: new URL("https://neidhalfc.com"),
  alternates: {
    canonical: "/",
  },
  icons: {
    icon: [
      { url: "/favicon/favicon.ico" },
      { url: "/favicon/icon0.svg", type: "image/svg+xml" }
    ],
    apple: "/favicon/apple-icon.png",
  },
  manifest: "/favicon/manifest.json",
  openGraph: {
    title: "Neidhal FC | Chennai's Premium Coastal Football Club",
    description: "Developing fearless, creative players with street-style flair and structured training in Kottivakkam, Injambakkam, and Nandanam.",
    url: "https://neidhalfc.com",
    siteName: "Neidhal Football Club",
    locale: "en_IN",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${(friendsFont as any).variable}`} data-scroll-behavior="smooth" suppressHydrationWarning>
      <body className="font-sans antialiased bg-[#FAF7F2] text-black flex flex-col">
        <main className="grow">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
