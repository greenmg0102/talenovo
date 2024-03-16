import { Divider } from "antd";

const LinkedinJobDetail = ({ detail }: any) => {

    return (
        <div className="flex justify-between items-start">
            <div className="w-full mb-2 md:w-3/4 md:mb-0 px-4">
                <div className="border border-gray-200 rounded-[8px] shadow-2xl p-12">
                    <p className="text-center text-[24px] font-bold pb-6">{detail.title}</p>
                    <p className="pb-4">Skill</p>
                    <div className="flex justify-start flex-wrap items-center pb-4">
                        {detail.skills.map((item: any, index: any) =>
                            <p key={index} className="mr-2 mb-1 text-[12px] text-gray-600 border border-dashed px-2">{item}</p>
                        )}
                    </div>
                    <div className="flex justify-center items-start flex-wrap">
                        <div className="w-full sm:w-1/3 pb-4 flex justify-center flex-col items-center">
                            <p className="pb-2">Salary</p>
                            <p className="mr-2 text-[12px] text-gray-500">{detail.tertiaryDescription}</p>
                        </div>
                        
                        <div className="w-full sm:w-1/3 pb-4 flex justify-center flex-col items-center">
                            <p className="pb-2">Location</p>
                            <p className="mr-2 text-[12px] text-gray-500">{detail.location}</p>
                        </div>
                        
                        <div className="w-full sm:w-1/3 pb-4 flex justify-center flex-col items-center">
                            <p className="pb-2">Apply Status</p>
                            <p className="mr-2 text-[12px] text-gray-500">{detail.applicantsCount} Applied</p>
                        </div>
                    </div>

                    
                    <Divider />
                    <div className="flex justify-between items-center pb-4">
                        <p className="font-semibold text-[20px]">Job Description</p>
                        <p className="font-semibold">Posted on: <span className="font-normal">{detail.postedAt.slice(0, 10)}</span></p>
                    </div>
                    <p className="text-gray-500">{detail.descriptionText}</p>
                </div>
            </div>
            <div className="w-full md:w-1/4 pl-4">
                <div className=" border border-gray-200 rounded-[8px] shadow-2xl p-4 mb-12">
                    <svg viewBox="64 64 896 896" focusable="false" data-icon="check-square" width="3em" height="3em" fill="#2b6cb0" aria-hidden="true"><path d="M433.1 657.7a31.8 31.8 0 0051.7 0l210.6-292c3.8-5.3 0-12.7-6.5-12.7H642c-10.2 0-19.9 4.9-25.9 13.3L459 584.3l-71.2-98.8c-6-8.3-15.6-13.3-25.9-13.3H315c-6.5 0-10.3 7.4-6.5 12.7l124.6 172.8z"></path><path d="M880 112H144c-17.7 0-32 14.3-32 32v736c0 17.7 14.3 32 32 32h736c17.7 0 32-14.3 32-32V144c0-17.7-14.3-32-32-32zm-40 728H184V184h656v656z"></path></svg>
                    <p className="text-gray-700 font-bold my-4">Apply now</p>
                    <p className="text-gray-700 text-[14px]">Please let <span className="font-bold">{detail.companyName}</span> know that you found this position on our job board, as that is a great way to support us, so we can keep posting cool jobs every day </p>

                    <div className="flex justify-center items-center my-4">
                        <a href={detail.link} target="_blank">
                            <p className="px-8 py-2 bg-blue-600 rounded-full text-center text-white text-[14px]">Apply Now</p>
                        </a>
                    </div>
                </div>

                <div className=" border border-gray-200 rounded-[8px] shadow-2xl p-4 mb-4">

                    <img src={detail.companyLogo} alt="avatar" className="rounded-[4px]" width={100} height={100} />
                    <p className="text-gray-700 font-bold">About <span className="font-medium text-[14px]">{detail.companyName}</span></p>

                    <div className="py-4">
                        <p className="flex justify-start items-center text-gray-600">
                            <svg viewBox="64 64 896 896" focusable="false" data-icon="home" width="1em" height="1em" fill="currentColor" aria-hidden="true" className="mr-2"><path d="M946.5 505L560.1 118.8l-25.9-25.9a31.5 31.5 0 00-44.4 0L77.5 505a63.9 63.9 0 00-18.8 46c.4 35.2 29.7 63.3 64.9 63.3h42.5V940h691.8V614.3h43.4c17.1 0 33.2-6.7 45.3-18.8a63.6 63.6 0 0018.7-45.3c0-17-6.7-33.1-18.8-45.2zM568 868H456V664h112v204zm217.9-325.7V868H632V640c0-22.1-17.9-40-40-40H432c-22.1 0-40 17.9-40 40v228H238.1V542.3h-96l370-369.7 23.1 23.1L882 542.3h-96.1z"></path></svg>
                            {detail.location}
                        </p>
                        <p className="text-gray-500 text-[12px] pt-4">{detail.insightsV2[0]}</p>
                    </div>
                    <div className="flex justify-center items-center">
                        <a href={detail.companyLinkedinUrl} target="_blank">
                            <p className="px-8 py-2 border border-blue-600 rounded-full text-center text-blue-700 text-[14px]">View company</p>
                        </a>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default LinkedinJobDetail;
