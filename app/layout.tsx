import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono, Abhaya_Libre, Noto_Sans_Sinhala } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const abhayaLibre = Abhaya_Libre({
  weight: ["400", "500", "600", "700", "800"],
  subsets: ["sinhala", "latin"],
  variable: "--font-abhaya",
  display: "swap",
});

const notoSansSinhala = Noto_Sans_Sinhala({
  weight: ["400", "500", "600", "700"],
  subsets: ["sinhala", "latin"],
  variable: "--font-noto-sinhala",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Alpha Mind Main",
  description: "Web UI Portal",
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${geistSans.variable} ${geistMono.variable} ${abhayaLibre.variable} ${notoSansSinhala.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-slate-950 text-slate-100">
        {children}
      </body>
    </html>
  );
}
