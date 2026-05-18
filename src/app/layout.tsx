import type { Metadata } from "next";
import type { ReactNode } from "react";
import "./globals.css";

export const metadata: Metadata = {
  title: "Badowy Portal",
  description: "Premium marketing and software solutions client portal."
};

export default function RootLayout({
  children
}: Readonly<{
  children: ReactNode;
}>) {
  return (
    <html lang="ar" dir="rtl" className="dark" data-scroll-behavior="smooth">
      <body>{children}</body>
    </html>
  );
}
