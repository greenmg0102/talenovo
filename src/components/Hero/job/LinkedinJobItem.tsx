import React from "react";
import Image from 'next/image';

const LinkedinJobItem = ({ item }: any) => {
  return (
    <div className="flex justify-between items-start p-2">
      <div className="w-[80px] flex-grow-0 rounded-full">
        <a href={item.companyLinkedinUrl} target="_blank">
          <img src={item.companyLogo} alt="avatar" className="rounded-full" width={80} height={80} />
        </a>
        <p className="text-[12px] text-gray-500 text-center my-2">2 days ago</p>
      </div>
      <div
        className="pl-4 relative"
        style={{
          width: "calc(100% - 80px)"
        }}
      >
        <div className="flex justify-between items-start">
          <a href={item.link} target="_blank">
            <p className="text-[16x] font-bold pb-2 text-gray-500 text-left hover:underline">{item.title}</p>
          </a>
          <svg viewBox="64 64 896 896" focusable="false" data-icon="book" width="1em" height="1em" fill="currentColor" aria-hidden="true"><path d="M832 64H192c-17.7 0-32 14.3-32 32v832c0 17.7 14.3 32 32 32h640c17.7 0 32-14.3 32-32V96c0-17.7-14.3-32-32-32zm-260 72h96v209.9L621.5 312 572 347.4V136zm220 752H232V136h280v296.9c0 3.3 1 6.6 3 9.3a15.9 15.9 0 0022.3 3.7l83.8-59.9 81.4 59.4c2.7 2 6 3.1 9.4 3.1 8.8 0 16-7.2 16-16V136h64v752z"></path></svg>
        </div>
        <div className="flex justify-between items-start flex-wrap">
          <div className="border border-gray-300 rounded-[4px] border-dashed p-1 mr-1 mt-1">
            <p className="text-[14px] pb-2 text-gray-500 text-left font-bold">{item.companyName}</p>
            <p className="text-[14px] text-gray-500 text-left">{item.location}</p>
            {/* <p className="text-[14px] text-gray-500 text-left">{item.industries}</p> */}
          </div>
          <div className="border border-gray-300 rounded-[4px] border-dashed p-1 mr-1 mt-1">
            <p className="text-[14px] pb-2 text-gray-500 text-left font-bold">Salary: $18000 - $20000 annually</p>
            <p className="text-[14px] text-gray-500 text-left">Jop Type: {item.employmentType}</p>
            <p className="text-[14px] text-gray-500 text-left">Industry: {item.industries}</p>
          </div>
          {
            item.jobPosterProfileUrl &&
            item.companyLogo &&
            item.jobPosterName &&
            <div className="border border-gray-300 rounded-[4px] border-dashed p-1 mr-1 mt-1">
              <p className="text-[14px] pb-2 text-gray-500 text-left font-bold">Poster Info</p>
              <a href={item.jobPosterProfileUrl} target="_blank">
                <p className="text-[14px] text-gray-500 flex justify-start items-center">
                  <img src={item.companyLogo} alt="avatar" className="rounded-full" width={24} height={24} />
                  {item.jobPosterName}
                </p>
              </a>
              <p className="text-[14px] text-gray-500 text-left">{item.jobPosterTitle}</p>
            </div>
          }
        </div>
      </div>
    </div>
  );
};

export default LinkedinJobItem;
