
import clsx from 'clsx'
import { Divider } from 'antd'
import Link from 'next/link';

export default function LandingDetail({ isDetail, setIsDetail }: any) {

    return (
        <div
            className={
                clsx(
                    "transition-all",
                    isDetail !== undefined ?
                        "fixed top-0 right-0 w-full h-screen z-[10000] flex justify-between items-start"
                        :
                        "fixed w-0 h-screen z-[10000]"
                )
            }
        >
            <div
                className='w-[10%] h-screen z-[10000] sm:w-[30%] xl:w-1/2 2xl:w-2/3 bg-gray-900 opacity-[60%]'
                onClick={() => setIsDetail(undefined)}
            >
            </div>
            <div className={clsx('w-[90%] h-screen z-[10000] sm:w-[70%] xl:w-1/2 2xl:w-1/3 bg-white overflow-y-scroll overflow-x-hidde p-8')}>
                {isDetail !== undefined ?
                    <div>

                        <div className="flex justify-between items-start">
                            <div className="w-[calc(100% - 200px)]">
                                <p
                                    className="text-[16x] font-bold text-gray-500 hover:underline mb-4"
                                    onClick={() => setIsDetail(isDetail)}
                                >
                                    {isDetail.title}
                                </p>
                                <p className="text-[12px] font-bold text-gray-400 pb-2">{isDetail.companyName} - <span className="font-normal">{isDetail && isDetail.insightsV2 && isDetail.insightsV2[0]}</span></p>
                                <div className="flex justify-start isDetails-center flex-wrap">
                                    <p className="text-[14px] text-gray-500 mr-2">{isDetail.location}</p>
                                    {isDetail.tertiaryDescription !== undefined ?
                                        <p className="text-[13px] py-[1px] px-[4px] rounded-[4px] text-red-500 mr-2 border border-red-200">{isDetail.tertiaryDescription}</p>
                                        :
                                        null
                                    }
                                    <p className="text-[14px] text-gray-500 mr-2">{isDetail.employmentType}</p>
                                </div>
                                <div className="flex justify-center items-start items-center flex-wrap mt-12">
                                    <Link href={`/job-detail/${isDetail.jobId}`}>
                                        <p className="px-8 py-2 bg-blue-600 rounded-full text-center text-white text-[14px]">Go to Job Page</p>
                                    </Link>
                                </div>
                            </div>
                            <div className="w-full max-w-[200px]">
                                <div className=" border border-gray-200 rounded-[8px] shadow-2xl p-4 mb-4">

                                    <div className='flex justify-center items-center flex-wrap'>
                                        <img src={isDetail.companyLogo} alt="avatar" className="rounded-[4px]" width={40} height={40} />
                                    </div>
                                    <p className="text-gray-700 text-center font-bold text-[14px] mb-0 ml-2">{isDetail.companyName}</p>

                                    <div className="py-4">
                                        <p className="flex justify-center items-center text-gray-600">
                                            <svg viewBox="64 64 896 896" focusable="false" data-icon="home" width="1em" height="1em" fill="currentColor" aria-hidden="true" className="mr-2"><path d="M946.5 505L560.1 118.8l-25.9-25.9a31.5 31.5 0 00-44.4 0L77.5 505a63.9 63.9 0 00-18.8 46c.4 35.2 29.7 63.3 64.9 63.3h42.5V940h691.8V614.3h43.4c17.1 0 33.2-6.7 45.3-18.8a63.6 63.6 0 0018.7-45.3c0-17-6.7-33.1-18.8-45.2zM568 868H456V664h112v204zm217.9-325.7V868H632V640c0-22.1-17.9-40-40-40H432c-22.1 0-40 17.9-40 40v228H238.1V542.3h-96l370-369.7 23.1 23.1L882 542.3h-96.1z"></path></svg>
                                            <span className="text-[12px]">{isDetail.location}</span>
                                        </p>
                                        <p className="text-gray-500 text-center text-[12px] pt-4">{isDetail.insightsV2[0]}</p>
                                    </div>
                                    <div className="flex justify-center items-center">
                                        <a href={isDetail.companyLinkedinUrl} target="_blank">
                                            <p className="px-2 py-1 text-center border border-blue-600 rounded-full text-center text-blue-700 text-[12px]">View company</p>
                                        </a>
                                    </div>
                                </div>
                            </div>
                        </div>


                        <Divider />
                        <div className="flex justify-start items-center flex-wrap pb-12">
                            {isDetail.skills.map((item: any, index: any) =>
                                <p key={index} className="px-1 py-[1px] mr-2 border border-gray-300 text-gray-500 hover:bg-blue-400 hover:text-gray-50 transition-all rounded-[4px] text-[10px] mr-1 mb-[2px]">
                                    {item}
                                </p>
                            )}
                        </div>
                        <div className="flex justify-between items-center pb-4">
                            <p className="font-semibold text-[14px]">Job Description</p>
                            <p className="font-semibold text-[14px]">Posted on: <span className="font-normal">{isDetail.postedAt.slice(0, 10)}</span></p>
                        </div>
                        {isDetail.descriptionText.split(".").map((item: any, index: any) =>
                            <p key={index} className="text-gray-500 pt-2 text-[14px]">{item}.</p>
                        )}

                        <div className="flex justify-center items-start items-center flex-wrap my-12">
                            <Link href={`/job-detail/${isDetail.jobId}`}>
                                <p className="px-8 py-2 bg-blue-600 rounded-full text-center text-white text-[14px]">Go to Job Page</p>
                            </Link>
                        </div>
                    </div>
                    :
                    null
                }
            </div>
        </div>
    )
}