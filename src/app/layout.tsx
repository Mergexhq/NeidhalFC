import type { Metadata, Viewport } from "next";
import { Plus_Jakarta_Sans, Inter, Bebas_Neue } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

const plusJakartaSans = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-plus-jakarta-sans",
  weight: ["300", "400", "500", "600", "700", "800"],
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  weight: ["300", "400", "500", "600", "700", "800", "900"],
  display: "swap",
});

const bebasNeue = Bebas_Neue({
  subsets: ["latin"],
  variable: "--font-bebas-neue",
  weight: "400",
  display: "swap",
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
    <html lang="en" className={`${inter.variable} ${plusJakartaSans.variable} ${bebasNeue.variable}`} suppressHydrationWarning>
      <body className="font-sans antialiased bg-[#FAF7F2] text-black flex flex-col min-h-screen">
        <main className="grow">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
