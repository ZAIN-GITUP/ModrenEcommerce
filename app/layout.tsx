import { Metadata } from "next";
import { Inter } from "next/font/google";
import Navbar from '@/app/src/sections/Navbar'; 
import Footer from '@/app/src/sections/footer'; 
import "./globals.css";
import StoreProvider from '@/app/StoreProvider';

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Modern E ecommerce",
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
        <StoreProvider>
        
          {children}
          <Footer />
        </StoreProvider>
      </body>
    </html>
  );
}
