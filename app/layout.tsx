import type { Metadata, Viewport } from "next";
import { STUDIO } from "@/lib/brand";
import "./globals.css";

export const metadata: Metadata = {
  title: STUDIO,
  description: "Carlos Alfaro. Tools and products.",
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
