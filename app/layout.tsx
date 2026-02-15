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
  metadataBase: new URL("https://blood-donation-jnmf.devforsure.online"),
  title: "Blood Donation - Jagadguru Narendracharyaji Foundation",
  description: "A blood donation platform by Jagadguru Narendracharyaji Foundation (JNMF) to help save lives. Developed by DevForsure.",
  keywords: ["Blood Donation", "JNMF", "Jagadguru Narendracharyaji Foundation", "Ratnagiri", "Maharashtra", "Save Lives", "Donation Registration"],
  authors: [{ name: "DevForsure" }],
  openGraph: {
    title: "Blood Donation - Jagadguru Narendracharyaji Foundation",
    description: "Join our mission to save lives through blood donation. Managed by JNMF.",
    url: "https://blood-donation-jnmf.devforsure.online",
    siteName: "JNMF Blood Donation",
    images: [
      {
        url: "/mphoto.jpg",
        width: 800,
        height: 600,
        alt: "JNMF Blood Donation Logo",
      },
    ],
    locale: "en_IN",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Blood Donation - Jagadguru Narendracharyaji Foundation",
    description: "A blood donation platform by JNMF to help save lives.",
    images: ["/mphoto.jpg"],
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
        suppressHydrationWarning
      >
        {children}
      </body>
    </html>
  );
}
