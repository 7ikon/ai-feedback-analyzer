import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "003 Feedback Analyzer",
  description: "A simple MVP for categorizing product feedback."
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
