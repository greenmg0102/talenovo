import React from "react";
import Image from 'next/image';

const LinkedinJobItem = ({ item }: any) => {
  return (
    <div className="flex justify-between items-center p-2">
      <div className="w-[80px] flex-grow-0 rounded-full">
        <a href={item.companyLinkedinUrl} target="_blank">
          <img src={item.companyLogo} alt="avatar" className="rounded-full" width={80} height={80} />
        </a>
        {/* <p className="text-[12px] text-gray-500 text-center my-2">{item.companyName}</p> */}
      </div>
      <div
        className="pl-4 relative"
        style={{
          width: "calc(80% - 80px)"
        }}
      >
        <div className="flex justify-between items-end">
          <div className="flex flex-col items-start">
            <a href={item.link} target="_blank">
              <p className="text-[14px] font-bold pb-2 text-gray-500 text-left hover:underline">{item.title}</p>
            </a>
            <p className="inline text-[12px] text-gray-500 text-left">{item.location}</p>
          </div>
          <div className="flex flex-col items-end">
            <p className="inline border px-[8px] border-gray-200 rounded-[3px] py-[2px] text-[10px] text-gray-500 text-left mt-2 mb-1">{item.seniorityLevel}</p>
            <p className="inline border px-[8px] border-gray-200 rounded-[3px] py-[2px] text-[10px] text-gray-500 text-left">{item.employmentType}</p>
          </div>
        </div>
        <p className="text-[12px] text-gray-500 text-left">{item.industries}</p>
        <p className="absolute top-0 right-2 text-[12px] text-gray-500 text-left">applicantsCount: {item.applicantsCount}</p>
      </div>
    </div>
  );
};

export default LinkedinJobItem;
