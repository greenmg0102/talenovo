'use client'
import { useState } from "react";
import ScrollUp from "@/components/Common/ScrollUp";
import Hero from "@/components/Hero";
import { Metadata } from "next";
import LandingDetail from "@/components/Hero/landingDetail";


// export const metadata: Metadata = {
//   title: "Free Next.js Template for Startup and SaaS",
//   description: "This is Home for Startup Nextjs Template",
//   // other metadata
// };

export default function Home() {

  const [isDetail, setIsDetail] = useState(undefined)

  return (
    <div className="relative">
      <LandingDetail
        isDetail={isDetail}
        setIsDetail={(data: any) => setIsDetail(data)}
      />

      <ScrollUp />
      <Hero
        setIsDetail={(data: any) => setIsDetail(data)}
      />
    </div>
  );
}
