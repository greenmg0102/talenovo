import { useEffect } from 'react'
import clsx from 'clsx'
import { Divider } from 'antd'

export default function GoogleDetail({ isDetail, setIsDetail }: any) {

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

    useEffect(() => {
        const script = document.createElement('script');
        script.async = true;
        script.src = 'https://static.addtoany.com/menu/page.js';
        document.body.appendChild(script);

        return () => {
            document.body.removeChild(script);
        };
    }, []);

    const uniqueJobHighlights = isDetail.jobHighlights.reduce((acc, item) => {
        const existingItem = acc.find((highlight: any) => highlight.title === item.title);
        if (!existingItem) {
            acc.push(item);
        }
        return acc;
    }, []);

    const postedDate = (givenDateString: string): any => {
        const givenDate = new Date(givenDateString);
        const currentDate = new Date();
        const timeDifference = currentDate.getTime() - givenDate.getTime();
        const daysPassed = Math.floor(timeDifference / (1000 * 60 * 60 * 24));
        return daysPassed
    }

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
                className='w-[10%] h-screen z-[10000] sm:w-[30%] 3xl:w-1/2 bg-gray-900 opacity-[60%]'
                onClick={() => setIsDetail(undefined)}
            >
            </div>
            <div className={clsx('w-[90%] h-screen z-[10000] sm:w-[70%] 3xl:w-1/2 bg-white overflow-y-scroll overflow-x-hidde p-8')}>
                {isDetail !== undefined ?
                    <div className="flex justify-between items-start flex-wrap">
                        <div className="w-full mb-2 lg:w-3/4 lg:mb-0 px-4">
                            <div className="border border-gray-200 rounded-[8px] shadow-md p-12 py-2">
                                <p className="text-center text-[24px] font-bold pb-12">{isDetail.title}</p>
                                <p className="text-left text-[18px] font-bold pb-0">{isDetail.companyName}</p>
                                <div className="flex justify-start items-center flex-wrap mb-4">
                                    {isDetail.location !== "" ? <p className="mr-2 text-[12px] pr-2 rounded-[4px] text-green-900">{isDetail.location}</p> : null}
                                    {isDetail && isDetail.extras && isDetail.extras.length > 0 && isDetail.extras.filter((item: any) => !item.includes("ago")).map((item: any, index: any) =>
                                        <p
                                            key={index}
                                            className={clsx("text-[10px] mr-2 px-2 py-[2px] rounded-[2px]", extraColor[index].bg, extraColor[index].text)}
                                        >
                                            {item}
                                        </p>
                                    )}
                                </div>
                                {/* <p className="pb-4">Skill</p>
                                <div className="flex justify-start flex-wrap items-center pb-4">
                                    {isDetail.skills.map((item: any, index: any) =>
                                        <p key={index} className="mr-2 mb-1 text-[12px] font-bold !text-gray-900 border border-dashed border-gray-300 px-2">{item}</p>
                                    )}
                                </div> */}
                                <Divider />
                                <div className="flex justify-between items-center pb-4">
                                    <p className="font-semibold text-[16px]">Job Description</p>
                                    <p className="font-semibold text-[14px] flex items-center">
                                        Posted on: <span className="font-normal ml-2">
                                            {/* {isDetail && isDetail.extras && isDetail.extras.length > 0 && isDetail.extras.filter((item: any) => item.includes("ago")).map((item: any, index: any) => <p key={index} className="text-blue-500 ml-1">{item}</p>)} */}
                                            {
                                                isDetail && isDetail.extras && isDetail.extras.length > 0 &&
                                                    isDetail.extras.filter((item: any) => item.includes("days ago")).length > 0 ?
                                                    isDetail && isDetail.extras && isDetail.extras.length > 0 &&
                                                    isDetail.extras.filter((item: any) => item.includes("days ago")).map((each: any, order: any) => <p key={order} className="text-[10px] text-blue-500 text-right">{Number(postedDate(isDetail.scrapedDate)) + Number(each[0])} days ago </p>)
                                                    :
                                                    <p className="text-[10px] text-blue-500 text-right">
                                                        {postedDate(isDetail.scrapedDate) === 0 ?
                                                            "Few hours ago"
                                                            :
                                                            postedDate(isDetail.scrapedDate) + " days ago"
                                                        }
                                                    </p>
                                            }
                                        </span>
                                    </p>

                                </div>
                                {/* {isDetail.jobHighlights.length > 0 ?
                                    <div>
                                        {isDetail.jobHighlights.map((item: any, index: any) =>
                                            <div key={index} className=''>
                                                <p className='font-bold text-[14px] mt-4'>{item.title}</p>
                                                <ul className='list-disc marker:text-blue-500'>
                                                    {item.items.map((each: any, order: any) =>
                                                        <li key={order} className='text-[14px] ml-6'>{each}</li>
                                                    )}
                                                </ul>
                                            </div>
                                        )}
                                    </div>
                                    :
                                    <p className="text-gray-500 pt-2 text-[12px]">{isDetail.description}</p>
                                    // <div className="text-gray-500 pt-2 text-[12px]" dangerouslySetInnerHTML={{ __html: isDetail.description }} />
                                } */}
                                {isDetail.jobHighlights.length > 0 ?
                                    <div>
                                        {
                                            uniqueJobHighlights.map((item: any, index: any) => (
                                                <div key={index} className=''>
                                                    <p className='font-bold text-[14px] mt-4'>{item.title}</p>
                                                    <ul className='list-disc marker:text-blue-500'>
                                                        {item.items.map((each: any, order: any) => (
                                                            <li key={order} className='text-[14px] ml-6'>{each}</li>
                                                        ))}
                                                    </ul>
                                                </div>
                                            ))
                                        }
                                    </div>
                                    :
                                    <p className="text-gray-500 pt-2 text-[12px]">{isDetail.description}</p>
                                }
                            </div>
                        </div>
                        <div className="w-full lg:w-1/4 pl-4">
                            <div className=" border border-gray-200 rounded-[8px] shadow-md p-4 mb-12">
                                <div className="flex justify-start items-start items-center flex-wrap mb-4">
                                    <svg viewBox="64 64 896 896" focusable="false" data-icon="check-square" width="3em" height="3em" fill="#2b6cb0" aria-hidden="true"><path d="M433.1 657.7a31.8 31.8 0 0051.7 0l210.6-292c3.8-5.3 0-12.7-6.5-12.7H642c-10.2 0-19.9 4.9-25.9 13.3L459 584.3l-71.2-98.8c-6-8.3-15.6-13.3-25.9-13.3H315c-6.5 0-10.3 7.4-6.5 12.7l124.6 172.8z"></path><path d="M880 112H144c-17.7 0-32 14.3-32 32v736c0 17.7 14.3 32 32 32h736c17.7 0 32-14.3 32-32V144c0-17.7-14.3-32-32-32zm-40 728H184V184h656v656z"></path></svg>
                                    <p className="text-gray-700 font-bold ml-2">Apply now</p>
                                </div>
                                <p className="text-gray-700 text-[14px]">Please let <span className="font-bold">{isDetail.companyName}</span> know that you found this position on our job board, as that is a great way to support us, so we can keep posting cool jobs every day </p>

                                <div className="flex justify-center items-center flex-col mt-4 mb-2">
                                    <a href={isDetail && isDetail.applyLink[0] && isDetail.applyLink[0].link} target="_blank">
                                        <p className="px-8 py-2 bg-blue-600 rounded-full text-center text-white text-[14px]">Apply Now</p>
                                    </a>

                                    {/* <div className="a2a_kit a2a_kit_size_32 a2a_default_style mt-6">
                                        <a className="a2a_dd" href="https://www.addtoany.com/share"></a>
                                        <a className="a2a_button_youtube" href='https://youtube.com/@TalenovoSocial?si=2ndW42UbtM5x_UvV'></a>
                                        <a className="a2a_button_facebook" href='https://www.facebook.com/profile.php?id=61558137845692'></a>
                                        <a className="a2a_button_instagram" href='https://www.instagram.com/talenovosocial'></a>
                                        <a className="a2a_button_x" href='https://twitter.com/TalenovoSocial'></a>
                                        <a className="a2a_button_tiktok" href="https://www.tiktok.com/@talenovosocial"></a>
                                    </div> */}

                                    <div className="a2a_kit a2a_kit_size_32 a2a_default_style mt-6">
                                        <a className="a2a_d mb-[4px]" href="https://www.addtoany.com/share"></a>
                                        <a className="a2a_button_email mb-[4px]"></a>
                                        <a className="a2a_button_facebook mb-[4px]"></a>
                                        <a className="a2a_button_whatsapp mb-[4px]"></a>
                                        <a className="a2a_button_x mb-[4px]"></a>
                                        <a className="a2a_button_telegram mb-[4px]"></a>
                                        <a className="a2a_button_linkedin mb-[4px]"></a>
                                        <a className="a2a_button_outlook_com mb-[4px]"></a>
                                    </div>

                                </div>
                            </div>

                            <div className=" border border-gray-200 rounded-[8px] shadow-md p-4 mb-4">
                                <div className='flex justify-center items-center'>
                                    <img
                                        src={isDetail.companyLogo ? isDetail.companyLogo : "/images/hero/default.jpeg"}
                                        alt="avatar"
                                        className="rounded-[4px] w-[100px] h-[100px]"
                                        width={100}
                                        height={100}
                                    />
                                </div>
                                <p className="text-gray-700 font-bold text-center"><span className="font-medium text-[14px]">{isDetail.companyName}</span></p>

                                <div className="py-4">
                                    <p className="flex justify-center items-center text-gray-600 text-[10px] text-center">
                                        <svg viewBox="64 64 896 896" focusable="false" data-icon="home" width="1em" height="1em" fill="currentColor" aria-hidden="true" className="mr-2"><path d="M946.5 505L560.1 118.8l-25.9-25.9a31.5 31.5 0 00-44.4 0L77.5 505a63.9 63.9 0 00-18.8 46c.4 35.2 29.7 63.3 64.9 63.3h42.5V940h691.8V614.3h43.4c17.1 0 33.2-6.7 45.3-18.8a63.6 63.6 0 0018.7-45.3c0-17-6.7-33.1-18.8-45.2zM568 868H456V664h112v204zm217.9-325.7V868H632V640c0-22.1-17.9-40-40-40H432c-22.1 0-40 17.9-40 40v228H238.1V542.3h-96l370-369.7 23.1 23.1L882 542.3h-96.1z"></path></svg>
                                        {isDetail.location}
                                    </p>
                                    {/* <p className="text-gray-500 text-[12px] pt-4 text-center">{isDetail.insightsV2[0]}</p> */}
                                </div>
                                <div className="flex justify-center items-center">
                                    <a href={isDetail.companyLinkedinUrl} target="_blank">
                                        <p className="px-8 py-2 border border-blue-600 rounded-full text-center text-blue-700 text-[14px]">View company</p>
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>
                    :
                    null
                }
            </div>
        </div >
    )
}