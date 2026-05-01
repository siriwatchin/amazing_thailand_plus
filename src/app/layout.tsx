import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Amazing Thailand Plus — Story-led Journeys You Can Trust",
  description:
    "An AI-powered Digital Travel Passport that transforms Thailand into personalized, verified, and multilingual story routes.",
  openGraph: {
    title: "Amazing Thailand Plus",
    description: "Story-led journeys you can trust.",
    siteName: "Amazing Thailand Plus",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} ${playfair.variable}`}>
      <body className="bg-page font-sans text-ink antialiased overflow-x-hidden">
        {children}
      </body>
    </html>
  );
}
