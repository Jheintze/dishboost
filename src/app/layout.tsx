import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Savor — Restaurant marketing made simple",
  description: "Turn great food photos into ready-to-share restaurant marketing.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full antialiased">
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
