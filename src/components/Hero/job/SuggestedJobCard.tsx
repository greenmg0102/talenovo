import React from "react";
import Link from 'next/link';

const SuggestedJobCard = ({ item }: any) => {

  const postedDate = (givenDateString: string): any => {
    const givenDate = new Date(givenDateString);
    const currentDate = new Date();
    const timeDifference = currentDate.getTime() - givenDate.getTime();
    const daysPassed = Math.floor(timeDifference / (1000 * 60 * 60 * 24));
    return daysPassed
  }

  return (
    <div className="p-2 border border-blue-200 hover:border-blue-500 cursor-pointer rounded-md mb-4 shadow-lg">
      <div className="flex justify-between items-center">
        <div className="flex justify-start items-center">
          <a href={item.companyLinkedinUrl} target="_blank">
            <img src={item.companyLogo} alt="avatar" className="rounded-full border border-blue-300 border-dashed" width={40} height={40} />
          </a>
          <p className="text-[14px] font-semibold text-gray-500 ml-2">{item.companyName}</p>
        </div>
        <Link href={`/job-detail/${item.jobId}`}>
          <svg viewBox="0 0 1024 1024" focusable="false" data-icon="bars" width="1em" height="1em" fill="currentColor" aria-hidden="true"><path d="M912 192H328c-4.4 0-8 3.6-8 8v56c0 4.4 3.6 8 8 8h584c4.4 0 8-3.6 8-8v-56c0-4.4-3.6-8-8-8zm0 284H328c-4.4 0-8 3.6-8 8v56c0 4.4 3.6 8 8 8h584c4.4 0 8-3.6 8-8v-56c0-4.4-3.6-8-8-8zm0 284H328c-4.4 0-8 3.6-8 8v56c0 4.4 3.6 8 8 8h584c4.4 0 8-3.6 8-8v-56c0-4.4-3.6-8-8-8zM104 228a56 56 0 10112 0 56 56 0 10-112 0zm0 284a56 56 0 10112 0 56 56 0 10-112 0zm0 284a56 56 0 10112 0 56 56 0 10-112 0z"></path></svg>
        </Link>
      </div>
      <Link href={`/job-detail/${item.jobId}`}>
        <p className="text-[14px] font-bold text-gray-500 mt-2 hover:underline">{item.title}</p>
      </Link>
      <p className="text-[12px] text-gray-500 pb-2">{item.tertiaryDescription}</p>
      <div className="flex justify-between items-center">
        <p className="text-[12px] text-gray-400">{postedDate(item.postedAt)} days ago</p>
      </div>
      <p className="text-[10px] text-gray-400 mb-2 xl:hidden">{item.descriptionText.length > 300 ? item.descriptionText.slice(0, 300) + " ..." : item.descriptionText}</p>
      <div className="flex justify-start items-center flex-wrap xl:hidden">
        {item.skills.map((item: any, index: any) =>
          <p key={index} className="px-1 py-[1px] mr-2 border border-gray-300 text-gray-500 hover:bg-blue-400 hover:text-gray-50 transition-all rounded-[4px] text-[10px] mr-1 mb-[2px]">
            {item}
          </p>
        )}
      </div>
    </div>
  );
};

export default SuggestedJobCard;
