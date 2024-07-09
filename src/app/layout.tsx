"use client";
import { GoogleTagManager } from '@next/third-parties/google'
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import ScrollToTop from "@/components/ScrollToTop";
import { Inter } from "next/font/google";
import Head from "next/head";
import "react-modal-video/css/modal-video.css";
import "../styles/index.css";
import { Providers } from "./providers";
import { ClerkProvider } from "@clerk/nextjs";
import useConsoleOverride from '@/util/frontend/useConsoleOverride'

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({ children }: { children: React.ReactNode }) {
  
  // useConsoleOverride();

  return (
    <ClerkProvider>
      <html suppressHydrationWarning lang="en">
        <Head>
          <script async src="https://static.addtoany.com/menu/page.js"></script>
        </Head>
        <GoogleTagManager gtmId="G-RB86FVG2KZ" />
        <body className={`bg-[#FFFFFF] dark:bg-black ${inter.className}`}>
          <Providers>
            <Header />
            {children}
            <Footer />
            <ScrollToTop />
          </Providers>
        </body>
      </html>
    </ClerkProvider>
  );
}
