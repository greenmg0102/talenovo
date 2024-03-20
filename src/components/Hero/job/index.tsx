import React from "react";
import JobCard from "@/components/Hero/job/jobCard";

const JobList = ({ list }: any) => {

  return (
    <div className="">
      {list.map((item: any, index: any) => (
        <JobCard
          key={index}
          item={item}
        />
      ))}
    </div>
  );
};

export default JobList;
