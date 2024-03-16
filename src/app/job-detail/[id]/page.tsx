import ScrollUp from "@/components/Common/ScrollUp";
import JobDetail from "@/components/JobDetail";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Free Next.js Template for Startup and SaaS",
  description: "This is Home for Startup Nextjs Template",
};


export default function JobDetailMain({ params }: { params: { id: string } }) {

  return (
    <div className="relative">
      <ScrollUp />
      <JobDetail id={params.id} />
    </div>
  );
}