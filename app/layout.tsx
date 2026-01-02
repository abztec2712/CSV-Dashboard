import type { Metadata } from "next";
import { Cinzel, Crimson_Text } from "next/font/google";
import "./globals.css";

const cinzel = Cinzel({
  subsets: ["latin"],
  variable: '--font-medieval',
  weight: ['400', '600', '700'],
});

const crimsonText = Crimson_Text({
  subsets: ["latin"],
  variable: '--font-serif',
  weight: ['400', '600'],
  style: ['normal', 'italic'],
});

export const metadata: Metadata = {
  title: "CSV Runner Dashboard - Medieval Chronicle",
  description: "A dark medieval themed dashboard for tracking running data",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body className={`${cinzel.variable} ${crimsonText.variable} antialiased`}>
        {children}
      </body>
    </html>
  );
}
