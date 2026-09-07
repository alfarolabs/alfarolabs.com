import type { Metadata, Viewport } from "next";
import { Footer } from "@/components/footer";
import { Nav } from "@/components/nav";
import { person } from "@/lib/site";
import "./globals.css";

export const metadata: Metadata = {
  title: `${person.name} · ${person.studio}`,
  description: person.sentence,
};

export const viewport: Viewport = {
  themeColor: "#f4f1ea",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body className="bg-paper text-ink antialiased">
        <div className="mx-auto w-full max-w-5xl px-6 py-8 sm:px-8 sm:py-10">
          <Nav />
          {children}
          <Footer />
        </div>
      </body>
    </html>
  );
}
