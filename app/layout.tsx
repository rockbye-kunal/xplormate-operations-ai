import type { Metadata } from "next";
import "./globals.css";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL
  ? process.env.NEXT_PUBLIC_SITE_URL
  : process.env.VERCEL_URL
    ? `https://${process.env.VERCEL_URL}`
    : "http://localhost:3000";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: "Xplormate | AI transformation for manufacturing operations",
  description:
    "Transform the follow-ups, handovers, decisions, and exception handling around your manufacturing operation.",
  alternates: { canonical: "/" },
  openGraph: {
    title: "Your systems record the work. AI can help move it forward.",
    description:
      "Explore practical AI transformation opportunities across production, quality, maintenance, materials, handovers, and reporting.",
    url: "/",
    siteName: "Xplormate",
    type: "website",
  },
  twitter: {
    card: "summary",
    title: "Xplormate | AI transformation for manufacturing operations",
    description:
      "Explore practical AI transformation opportunities across manufacturing operations.",
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
      <body>{children}</body>
    </html>
  );
}
