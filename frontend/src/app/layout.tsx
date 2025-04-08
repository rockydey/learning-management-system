import type { Metadata } from "next";
import { Nunito, Josefin_Sans } from "next/font/google";
import "./globals.css";
import ClientProviders from "@/components/ClientProviders/ClientProviders";
import { Toaster } from "react-hot-toast";

// ✅ Load fonts
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

// ✅ Server-side metadata
export const metadata: Metadata = {
  title: "Academix",
  description: "Perfect solution to grow your skills",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body
        cz-shortcut-listen="true"
        className={`${nunito.variable} ${josefin_sans.variable} antialiased`}
      >
        <ClientProviders>{children}</ClientProviders>
        <Toaster />
      </body>
    </html>
  );
}
