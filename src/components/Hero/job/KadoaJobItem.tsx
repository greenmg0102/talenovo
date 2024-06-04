import React from "react";

const KadoaJobItem = ({ item, isDetail, clerkId, setIsDetail }: any) => {
  return (
    <div className="flex justify-between items-center p-2">
      <div className="w-[70px] h-[70px] flex-grow-0 rounded-full flex justify-center items-center">
        {/* <a href={item.directoryPageEntryData.link} target="_blank"> */}
          <img src={item.detailPageData.logo} alt="avatar" className="rounded-full" width={70} height={70} />
        {/* </a> */}
      </div>
      <div
        className="pl-2 relative"
        style={{
          width: "calc(100% - 70px)"
        }}
      >
        <p className="text-[10px] text-gray-400 text-left">portal</p>
        <div className="flex justify-between items-start">
          <div className="flex flex-col items-start">
            <a href={item.directoryPageEntryData.link} target="_blank">
              <p className="text-[14px] font-bold pb-2 text-gray-400 text-left hover:underline">{item.detailPageData.jobTitle}</p>
            </a>
            <div className="flex justify-start items-center">
              <p className="inline text-[12px] text-gray-400 text-left mr-2 border rounded-[4px] px-2 border-gray-300">{item.detailPageData.jobLocation.attr_type}</p>
              {Object.keys(item.detailPageData.jobLocation.address).map((key: any, index: any) =>
                <p key={index} className="inline text-[12px] text-gray-400 text-left mr-2">{item.detailPageData.jobLocation.address[key]}</p>
              )}
            </div>
            <div className="flex justify-start items-center">
              <p className="inline text-[12px] text-gray-400 text-left mr-4">
                minValue:
                {item.detailPageData.baseSalary.value.maxValue === null ? "N/A" : item.detailPageData.baseSalary.value.minValue}
              </p>
              <p className="inline text-[12px] text-gray-400 text-left">
                maxValue:
                {item.detailPageData.baseSalary.value.maxValue === null ? "N/A" : item.detailPageData.baseSalary.value.maxValue}
              </p>
            </div>
          </div>
          <div className="flex flex-col items-end">
            <p className="text-[12px] text-gray-400 text-left">{item.detailPageData.occupationalCategory}</p>
            <p className="inline border px-[8px] border-gray-200 rounded-[3px] py-[2px] text-[10px] text-gray-400 text-left mt-1 mb-1">{item.detailPageData.employmentType}</p>
            <p className="inline py-[2px] text-[10px] text-gray-400 text-left">{item.directoryPageEntryData["posted date"].slice(0, 10)}</p>
          </div>
        </div>
        <p className="absolute top-0 right-2 text-[12px] text-gray-400 text-left">
          {item.detailPageData.applicationDeadline !== "" ? "applicantsCount: " + item.detailPageData.applicationDeadline : null}
        </p>
      </div>
    </div>

  );
};

export default KadoaJobItem;
