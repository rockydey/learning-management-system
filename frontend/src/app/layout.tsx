import type { Metadata } from "next";
import { Nunito, Josefin_Sans } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Shared/Navbar";

// Load fonts with desired weights & styles
const nunito = Nunito({
  subsets: ["latin"],
  variable: "--font-nunito",
  weight: ["300", "400", "500", "600", "700"],
});
const josefin_sans = Josefin_Sans({
  subsets: ["latin"],
  variable: "--font-josefin-sans",
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "Academix",
  description: "Perfect solution to grow your skills",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        cz-shortcut-listen="true"
        className={`${nunito.variable} ${josefin_sans.variable} antialiased`}
      >
        <div className="mb-20">
          <Navbar />
        </div>
        {children}
      </body>
    </html>
  );
}
