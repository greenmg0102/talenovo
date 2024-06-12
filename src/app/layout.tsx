"use client";

import Footer from "@/components/Footer";
import Header from "@/components/Header";
import ScrollToTop from "@/components/ScrollToTop";
import { Inter } from "next/font/google";
import Head from "next/head";
import "react-modal-video/css/modal-video.css";
import "../styles/index.css";
import { Providers } from "./providers";
import { ClerkProvider } from "@clerk/nextjs";

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <ClerkProvider>
      <html suppressHydrationWarning lang="en">
        <Head>
          {/* Google Analytics */}
          {/* <script async src="https://www.googletagmanager.com/gtag/js?id=G-RB86FVG2KZ"></script>
          <script
            dangerouslySetInnerHTML={{
              __html: `
                window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments);}
                gtag('js', new Date());
                gtag('config', 'G-RB86FVG2KZ');
              `,
            }}
          /> */}
        </Head>
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
