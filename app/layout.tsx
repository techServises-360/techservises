import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "TechServices - Web Development Showcase",
  description: "Showcasing our premium web development projects and services. We create beautiful, modern, and responsive websites tailored to your business needs.",
  keywords: ["web development", "web design", "TechServices", "portfolio", "projects", "Next.js", "React"],
  authors: [{ name: "TechServices" }],
  creator: "TechServices",
  publisher: "TechServices",
  icons: {
    icon: [
      { url: "/favicon.ico" },
      { url: "/logo.png", sizes: "192x192", type: "image/png" },
    ],
    apple: [
      { url: "/logo.png", sizes: "180x180" },
    ],
    shortcut: ["/favicon.ico"],
  },
  manifest: "/manifest.json",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://techservices.com",
    title: "TechServices - Web Development Showcase",
    description: "Showcasing our premium web development projects and services",
    siteName: "TechServices",
    images: [
      {
        url: "/logo.png",
        width: 1200,
        height: 630,
        alt: "TechServices Logo",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "TechServices - Web Development Showcase",
    description: "Showcasing our premium web development projects and services",
    images: ["/logo.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
