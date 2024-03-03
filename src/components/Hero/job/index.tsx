import React from "react";
import { jobs } from "@/data/jobs";
import JobCard from "./jobCard";
import ToggleSort from "./toggleSort";
const JobList = () => {
  return (
    <div className="w-full bg-white border-spacing-3 rounded-xl">
      <ToggleSort />
      <div className="flex items-center justify-between">
        {/* <h1 className="text-2xl font-bold text-gray-900">Jobs</h1>
        <a href="/jobs" className="text-sm text-gray-500 hover:text-gray-900">
          View all
        </a> */}
      </div>
      <div className="mt-4">
        <table className="w-full">
          <tbody>
            {jobs.map((item, index) => (
              <JobCard
                key={index}
                logoUrl={item.logo}
                companyUrl={item.company}
                companyName={item.company}
                companyDescription={item.description}
                jobTitleUrl={item.title}
                jobTitle={item.title}
                remote={item.location}
                postedTime={item.postedTime}
                skills={item.skills}
              />
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default JobList;
