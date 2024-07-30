import ScrollUp from "@/components/Common/ScrollUp";
import JobDetail from "@/components/JobDetail";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Streamline your job search with intelligent technology that brings you the best-matched jobs, saving you time and effort",
  description: "This is Home for Talenovo",
};


export default function JobDetailMain({ params }: { params: { id: string } }) {

  return (
    <div className="relative">
      <ScrollUp />
      <JobDetail id={params.id} />
    </div>
  );
}