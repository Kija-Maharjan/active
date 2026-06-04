import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Active Fitness – Chandragiri 12, Balambu",
  description:
    "Premium gym in Chandragiri 12, Balambu. Join Active Fitness today — iron, intensity, results.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Bebas+Neue&family=Barlow+Condensed:wght@400;600;700&family=Barlow:wght@300;400;500&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>{children}</body>
    </html>
  );
}
