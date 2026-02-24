import type { Metadata } from "next";
import { Inter } from "next/font/google";
import FloatingActions from "@/components/FloatingActions";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin", "vietnamese"],
});

export const metadata: Metadata = {
  title: "AI Enterprise Workshop | ERX Vietnam",
  description: "Khám phá sức mạnh của Antigravity IDE và Claude Enterprise để tự động hóa quy trình làm việc và tăng cường năng suất.",
  icons: {
    icon: "/favicon.png"
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="vi" className="scroll-smooth">
      <body className={`${inter.variable} font-sans antialiased selection:bg-brand-accent selection:text-white`}>
        {children}
        <FloatingActions />
      </body>
    </html>
  );
}
