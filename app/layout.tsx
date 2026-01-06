import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import App from "./App";
import Navbar from "@/components/Navbar";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "TrustNet AI - Decentralized Trust Scoring with AI & Blockchain",
  description:
    "TrustNet AI leverages artificial intelligence and blockchain technology to provide transparent, immutable, and verifiable trust scores based on user behavior patterns. Experience a new era of decentralized trust management.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased `}
      >
        <App>
          <Navbar />
          {children}
        </App>
      </body>
    </html>
  );
}
