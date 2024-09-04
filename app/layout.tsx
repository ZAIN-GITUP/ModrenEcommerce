// app/layout.tsx

import { Metadata } from "next";
import { Inter } from "next/font/google";
import Navbar from '@/app/src/sections/Navbar';
import Footer from '@/app/src/sections/footer';
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Rivo - Fashion Landing Page",
  description: "Discover and find your own fashion!",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Navbar />
        {children}
        <Footer/>
      </body>
    </html>
  );
}
