import type { Metadata } from "next";
import { Geist } from "next/font/google";
import "./globals.css";
import Appsheel from "./components/layout/AppShell";
import Preloader from "./components/intialload/Preloader";
import { Share_Tech_Mono, Rajdhani } from "next/font/google";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const shareTechMono = Share_Tech_Mono({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-share-tech-mono",
});


const rajdhani = Rajdhani({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-rajdhani",
});


export const metadata: Metadata = {
  title: "Your Name — Full-stack Developer",
  description: "Full-stack developer building clean, thoughtful digital products.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${shareTechMono.variable} ${rajdhani.variable} h-full scroll-auto antialiased`}
    >
      <body className="min-h-full flex flex-col bg-background text-foreground [font-family:Arial,Helvetica,sans-serif] selection:bg-[#f2f0ed] selection:text-[#0b0b0b]">
        <Appsheel>
          <Preloader />
          {children}
        </Appsheel>
      </body>
    </html>
  );
}
