import React from "react";

const LinkedinJobItem = ({ item }: any) => {

  const postedDate = (givenDateString: string): any => {
    const givenDate = new Date(givenDateString);
    const currentDate = new Date();
    const timeDifference = currentDate.getTime() - givenDate.getTime();
    const daysPassed = Math.floor(timeDifference / (1000 * 60 * 60 * 24));
    return daysPassed
  }

  return (
    <div className="p-2">
      <div className="relative flex justify-start items-center mb-2">
        <div className="p-2">
          <a href={item.companyLinkedinUrl} target="_blank">
            <img src={item.companyLogo} alt="avatar" className="rounded-full border border-blue-300 border-dashed" width={60} height={60} />
          </a>
        </div>
        <div className="pl-4 pr-4">
          <p className="text-[16x] font-bold text-gray-500">{item.title}</p>
          <p className="text-[10px] font-bold text-gray-400">{item.companyName} - <span className="font-normal">{item && item.insightsV2 && item.insightsV2[0]}</span></p>
          <div className="flex justify-start items-center flex-wrap">
            <p className="text-[12px] text-gray-500 mr-2">{item.location}</p>
            <p className="text-[12px] text-gray-500 mr-2">{item.employmentType}</p>
            <p className="text-[12px] text-gray-500 mr-2">{item.tertiaryDescription}</p>
          </div>
        </div>

        <div className="absolute top-[2px] right-[2px]">
          <div className="flex justify-end">
            <svg viewBox="64 64 896 896" className="hover:text-blue-400" focusable="false" data-icon="book" width="1em" height="1em" fill="currentColor" aria-hidden="true"><path d="M832 64H192c-17.7 0-32 14.3-32 32v832c0 17.7 14.3 32 32 32h640c17.7 0 32-14.3 32-32V96c0-17.7-14.3-32-32-32zm-260 72h96v209.9L621.5 312 572 347.4V136zm220 752H232V136h280v296.9c0 3.3 1 6.6 3 9.3a15.9 15.9 0 0022.3 3.7l83.8-59.9 81.4 59.4c2.7 2 6 3.1 9.4 3.1 8.8 0 16-7.2 16-16V136h64v752z"></path></svg>
          </div>
          <p className="text-[10px] text-gray-400 pt-2">{postedDate(item.postedAt)} days ago</p>
          <p className="text-[10px] text-gray-400 pt-2">applied: {item.applicantsCount}</p>
        </div>

      </div>
      <p className="text-[10px] text-gray-400 mb-2">{item.descriptionText.length > 300 ? item.descriptionText.slice(0, 300) + " ..." : item.descriptionText}</p>
      <div className="flex justify-start items-center flex-wrap">
        {item.skills.map((item: any, index: any) =>
          <p key={index} className="px-1 py-[1px] mr-2 border border-gray-300 text-gray-500 hover:bg-blue-400 hover:text-gray-50 transition-all rounded-[4px] text-[10px] mr-1 mb-[2px]">
            {item}
          </p>
        )}
      </div>
    </div>
  );
};

export default LinkedinJobItem;