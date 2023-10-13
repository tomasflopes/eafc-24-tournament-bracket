import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "NEI-ISEP: EAFC 24 Drawer",
  description: "A tournament drawer for EAFC 24",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt" className="bg-slate-800 text-white">
      <body className={inter.className}>{children}</body>
    </html>
  );
}
