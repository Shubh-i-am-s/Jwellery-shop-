import { Inter, Playfair_Display } from "next/font/google";
import Navbar from "@/components/Navbar";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
});

export const metadata = {
  title: "Rajmahal Jewellery | Elite Golden Collection",
  description: "Discover the elite and exquisite collection of yellow, brown, and golden jewellery at Rajmahal Jewellery.",
};

import Footer from "@/components/Footer";

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${inter.variable} ${playfair.variable}`} style={{ backgroundColor: '#000', margin: 0 }}>
        <Navbar />
        <main style={{ backgroundColor: '#000' }}>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
