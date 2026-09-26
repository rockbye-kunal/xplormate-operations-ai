import type { Metadata } from "next";
import { Analytics } from "@vercel/analytics/next";
import Trackers from "./trackers";
import "./globals.css";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL
  ? process.env.NEXT_PUBLIC_SITE_URL
  : process.env.VERCEL_URL
    ? `https://${process.env.VERCEL_URL}`
    : "http://localhost:3000";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: "Xplormate | Less chasing on the shop floor",
  description:
    "Xplormate helps plant heads and MDs take the follow-ups off one workflow at a time: order status, material shortages, quality issues and shift handovers.",
  alternates: { canonical: "/" },
  openGraph: {
    title: "Your team shouldn’t spend the day chasing updates.",
    description:
      "One workflow at a time: order status, material shortages, quality issues, shift handovers.",
    url: "/",
    siteName: "Xplormate",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Your team shouldn’t spend the day chasing updates.",
    description:
      "Xplormate uses AI to take the follow-ups off one manufacturing workflow at a time.",
  },
  icons: {
    icon: "/xplormate-logo.jpg",
    shortcut: "/xplormate-logo.jpg",
    apple: "/xplormate-logo.jpg",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        {children}
        <Analytics />
        <Trackers />
      </body>
    </html>
  );
}
