import type { Metadata } from "next";
import { Gaegu } from "next/font/google";
import "./globals.css";

const gaegu = Gaegu({
  weight: ["300", "400", "700"],
  subsets: ["latin"],
  display: "swap",
  variable: "--font-gaegu",
});

export const metadata: Metadata = {
  title: "오잉 도서관",
  description: "어린이와 청소년을 위한 한국어 책 도서관",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <body className={gaegu.variable}>{children}</body>
    </html>
  );
}