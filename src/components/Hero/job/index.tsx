import React from "react";
import JobCard from "./jobCard";
import ToggleSort from "./toggleSort";

const JobList = ({ list }: any) => {

  console.log("list", list);
  

  return (
    <div className="">
      {/* <ToggleSort /> */}
      <div className="flex items-center justify-between">
        {/* <h1 className="text-2xl font-bold text-gray-900">Jobs</h1>
        <a href="/jobs" className="text-sm text-gray-500 hover:text-gray-900">
          View all
        </a> */}
      </div>
      <div className="px-2">
        {list.map((item: any, index: any) => (
          <JobCard
            key={index}
            item={item}
          />
        ))}
      </div>
    </div>
  );
};

export default JobList;
