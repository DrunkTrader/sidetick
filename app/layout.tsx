import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Sidetick",
  description: "Premium algorithmic trading education platform for Indian retail traders.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full antialiased">
      <body className="min-h-full">{children}</body>
    </html>
  );
}
