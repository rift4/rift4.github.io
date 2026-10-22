import type { Metadata, Viewport } from "next";
import localFont from "next/font/local";

import "./globals.css";

/**
 * Geist is loaded as a variable font so every weight comes from a single 68 KB
 * file. The italic cut is intentionally left out: nothing on the site uses it,
 * and `next/font/local` preloads every source, so shipping it would double the
 * font payload for a style that never renders. Browsers synthesize italics from
 * the variable axis if that ever changes.
 */
const geist = localFont({
  src: [
    {
      path: "./fonts/Geist-VariableFont_wght.woff2",
      weight: "100 900",
      style: "normal",
    },
  ],
  variable: "--font-geist",
  display: "swap",
  preload: true,
  fallback: ["sans-serif", "system-ui"],
});

export const metadata: Metadata = {
  title: {
    default: "rift4",
    template: "%s | rift4",
  },
  icons: {
    icon: [{ url: "/favicon.svg", type: "image/svg+xml" }],
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={geist.variable}>
      {/* The theme controller cycles this attribute: system -> light -> dark. */}
      <body data-theme="system">{children}</body>
    </html>
  );
}
