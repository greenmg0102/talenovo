import React from "react";
import Link from 'next/link';
import { registBookmark } from '@/store/action/user/jobget/landingJob'
import { message } from 'antd';
import clsx from "clsx";

const GoogleJobItem = ({ item, clerkId, hiddenBookMark, setIsDetail }: any) => {

  const [messageApi, contextHolder] = message.useMessage();

  const postedDate = (givenDateString: string): any => {
    const givenDate = new Date(givenDateString);
    const currentDate = new Date();
    const timeDifference = currentDate.getTime() - givenDate.getTime();
    const daysPassed = Math.floor(timeDifference / (1000 * 60 * 60 * 24));
    return daysPassed
  }

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

  const bookmark = async (jobId: any) => {

    if (clerkId) {
      const data = { jobId: jobId }
      let result = await registBookmark(data)

      if (result.isOkay) messageApi.info(result.message);
      else messageApi.error(result.message);
    } else messageApi.error("Please sign in.");

  }

  return (
    <div className="p-2">
      {contextHolder}

      <div className="relative flex justify-start items-center mb-2">
        <div className="p-2">
          {/* <a href={item && item.applyLink[0] && item.applyLink[0].link} target="_blank"> */}
          <img
            src={item.companyLogo ? item.companyLogo : "/images/hero/default.jpeg"}
            alt="avatar"
            className="w-[50px] h-[50px] rounded-full bg-cover bg-cover border-blue-300 border-dashed"
            width={60} height={60}
            onClick={() => setIsDetail(item)}
          />
          {/* </a> */}
        </div>
        <div className="pl-4 pr-4 w-[calc(100%-150px)]">
          {/* <Link href={`/job-detail/${item.jobId}`}> */}
          <p
            className="text-[16x] font-bold text-gray-500 hover:underline"
            onClick={() => setIsDetail(item)}
          >
            {item.title}
          </p>
          {/* </Link> */}
          <p className="text-[10px] font-bold text-gray-400">
            {item.companyName}
            {/* <span className="font-normal">{item && item.insightsV2 && item.insightsV2[0]}</span> */}
          </p>
          <div className="flex justify-start items-center flex-wrap">
            <p className="text-[10px] text-gray-500 mr-2">{item.location}</p>
            {/* <p className="text-[12px] text-gray-500 mr-2 border">{item.employmentType}</p> */}
            {item && item.extras && item.extras.length > 0 && item.extras.filter((item: any) => !item.includes("ago")).map((item: any, index: any) =>
              <p
                key={index}
                className={clsx("text-[10px] mr-2 px-2 py-[2px] rounded-[4px]", extraColor[index].bg, extraColor[index].text)}
              >
                {item}
              </p>
            )}
          </div>
        </div>

        <div className="w-[70px] absolute top-[2px] right-[2px]">
          {!hiddenBookMark &&
            <div className="flex justify-end" onClick={() => bookmark(item.jobId)}>
              {/* <svg viewBox="64 64 896 896" className="hover:text-blue-400" focusable="false" data-icon="book" width="1em" height="1em" fill="currentColor" aria-hidden="true">
              <path d="M5 6.2C5 5.07989 5 4.51984 5.21799 4.09202C5.40973 3.71569 5.71569 3.40973 6.09202 3.21799C6.51984 3 7.07989 3 8.2 3H15.8C16.9201 3 17.4802 3 17.908 3.21799C18.2843 3.40973 18.5903 3.71569 18.782 4.09202C19 4.51984 19 5.07989 19 6.2V21L12 16L5 21V6.2Z" stroke="#000000" strokeWidth="2" stroke-linejoin="round" />
            </svg> */}
              {/* <svg width="1em" height="1em" viewBox="0 0 24 24" fill="currentColor" className="hover:text-blue-800 text-blue-400">
              <path d="M5 6.2C5 5.07989 5 4.51984 5.21799 4.09202C5.40973 3.71569 5.71569 3.40973 6.09202 3.21799C6.51984 3 7.07989 3 8.2 3H15.8C16.9201 3 17.4802 3 17.908 3.21799C18.2843 3.40973 18.5903 3.71569 18.782 4.09202C19 4.51984 19 5.07989 19 6.2V21L12 16L5 21V6.2Z" stroke="#000000" strokeWidth="2" stroke-linejoin="round" />
            </svg> */}
              <svg width="1em" height="1em" viewBox="-5 0 20 20" version="1.1" >
                <g id="Page-1" stroke="none" strokeWidth="1" fill="#4299e1" fillRule="evenodd">
                  <g id="Dribbble-Light-Preview" transform="translate(-265.000000, -2679.000000)" fill="#4299e1">
                    <g id="icons" transform="translate(56.000000, 160.000000)">
                      <path d="M219,2521 L219,2537.998 C219,2538.889 217.923,2539.335 217.293,2538.705 L214.707,2536.119 C214.317,2535.729 213.683,2535.729 213.293,2536.119 L210.707,2538.705 C210.077,2539.335 209,2538.889 209,2537.998 L209,2521 C209,2519.895 209.895,2519 211,2519 L217,2519 C218.105,2519 219,2519.895 219,2521" id="bookmark_fill-[#1227]">
                      </path>
                    </g>
                  </g>
                </g>
              </svg>
            </div>
          }

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
      <p className="text-[12px] text-gray-600 mb-2 whitespace-wrap break-words">{item.description.length > 300 ? item.description.slice(0, 300) + " ..." : item.description}</p>
      <div className="flex justify-start items-center flex-wrap">
        {item.skills && item.skills.map((item: any, index: any) =>
          <p key={index} className="px-1 py-[1px] mr-2 border border-gray-300 text-gray-500 hover:bg-blue-400 hover:text-gray-50 transition-all rounded-[4px] text-[10px] mr-1 mb-[2px]">
            {item}
          </p>
        )}
      </div>
    </div>
  );
};

export default GoogleJobItem;