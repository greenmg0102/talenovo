import React from "react";
import Link from 'next/link';
import clsx from 'clsx'

const SuggestedJobCard = ({ item, setIsDetail }: any) => {

  const extraColor = [
    { bg: 'border border-green-200', text: 'text-green-600' },
    { bg: 'border border-red-200', text: 'text-red-600' },
    { bg: 'border border-blue-200', text: 'text-blue-600' },
    { bg: 'border border-green-200', text: 'text-green-600' },
    { bg: 'border border-blue-200', text: 'text-blue-600' },
    { bg: 'border border-red-200', text: 'text-red-600' },
    { bg: 'border border-green-200', text: 'text-green-600' },
    { bg: 'border border-red-200', text: 'text-red-600' },
    { bg: 'border border-blue-200', text: 'text-blue-600' },
    { bg: 'border border-green-200', text: 'text-green-600' },
    { bg: 'border border-blue-200', text: 'text-blue-600' },
    { bg: 'border border-red-200', text: 'text-red-600' },
    { bg: 'border border-green-200', text: 'text-green-600' },
    { bg: 'border border-red-200', text: 'text-red-600' },
    { bg: 'border border-blue-200', text: 'text-blue-600' },
    { bg: 'border border-green-200', text: 'text-green-600' },
    { bg: 'border border-blue-200', text: 'text-blue-600' },
    { bg: 'border border-red-200', text: 'text-red-600' },
  ]

  const postedDate = (givenDateString: string): any => {
    const givenDate = new Date(givenDateString);
    const currentDate = new Date();
    const timeDifference = currentDate.getTime() - givenDate.getTime();
    const daysPassed = Math.floor(timeDifference / (1000 * 60 * 60 * 24));
    return daysPassed
  }

  return (
    <div
      className="p-4 border border-gray-300 hover:border-blue-500 cursor-pointer rounded-md mb-4 shadow-lg bg-white"
    >
      <div className="flex justify-between items-center">
        <div
          className="w-[calc(100%-1em)] flex justify-start items-center"
          onClick={() => setIsDetail(item)}
        >
          <img src={item.companyLogo ? item.companyLogo : "/images/hero/default.jpeg"} alt="avatar" className="rounded-full border border-blue-300 border-dashed" width={40} height={40} />
          <p className="text-[14px] font-semibold text-gray-500 ml-2">{item.companyName}</p>
        </div>
        <svg viewBox="0 0 1024 1024" focusable="false" data-icon="bars" width="1em" height="1em" fill="currentColor" aria-hidden="true"
          onClick={() => setIsDetail(item)}
        >
          <path d="M912 192H328c-4.4 0-8 3.6-8 8v56c0 4.4 3.6 8 8 8h584c4.4 0 8-3.6 8-8v-56c0-4.4-3.6-8-8-8zm0 284H328c-4.4 0-8 3.6-8 8v56c0 4.4 3.6 8 8 8h584c4.4 0 8-3.6 8-8v-56c0-4.4-3.6-8-8-8zm0 284H328c-4.4 0-8 3.6-8 8v56c0 4.4 3.6 8 8 8h584c4.4 0 8-3.6 8-8v-56c0-4.4-3.6-8-8-8zM104 228a56 56 0 10112 0 56 56 0 10-112 0zm0 284a56 56 0 10112 0 56 56 0 10-112 0zm0 284a56 56 0 10112 0 56 56 0 10-112 0z"></path>
        </svg>
      </div>
      <p
        className="text-[14px] font-bold text-gray-500 mt-2"
      >
        {item.title}
      </p>

      <p className="text-[10px] text-gray-400 mb-2 xl:hidden">{item.description.length > 300 ? item.description.slice(0, 300) + " ..." : item.description}</p>

      <div className="flex justify-start items-center flex-wrap mt-2">
        <p className="text-[10px] text-gray-500 mr-2">{item.location}</p>
        {item && item.extras && item.extras.length > 0 && item.extras.filter((item: any) => !item.includes("ago")).map((item: any, index: any) =>
          <p
            key={index}
            className={clsx("text-[10px] mr-2 px-2 py-[2px] rounded-[4px]", extraColor[index].bg, extraColor[index].text)}
          >
            {item}
          </p>
        )}
      </div>

      <div className="flex justify-between flex-wrap">
        <p className="text-[12px] text-gray-500 pb-2">{item.tertiaryDescription}</p>
        <div className="flex justify-between items-center">
          <div className="text-[12px] text-gray-400">
            {
              item && item.extras && item.extras.length > 0 &&
                item.extras.filter((item: any) => item.includes("days ago")).length > 0 ?
                item && item.extras && item.extras.length > 0 &&
                item.extras.filter((item: any) => item.includes("days ago")).map((each: any, order: any) => <p key={order} className="text-[10px] text-blue-500 text-right">{Number(postedDate(item.scrapedDate)) + Number(each[0])} days ago </p>)
                :
                <p className="text-[10px] text-blue-500 text-right">
                  {postedDate(item.scrapedDate) === 0 ?
                    "Few hours ago"
                    :
                    postedDate(item.scrapedDate) + " days ago"
                  }
                </p>
            }
          </div>
        </div>
      </div>
    </div>
  );
};

export default SuggestedJobCard;
