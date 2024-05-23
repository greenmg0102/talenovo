import { useEffect } from 'react'
import clsx from 'clsx'
import { Divider } from 'antd'

export default function TalenovoDetail({ isDetail, setIsDetail }: any) {

    useEffect(() => {
        const script = document.createElement('script');
        script.async = true;
        script.src = 'https://static.addtoany.com/menu/page.js';
        document.body.appendChild(script);

        return () => {
            document.body.removeChild(script);
        };
    }, []);

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
                            <div className="border border-gray-200 rounded-[8px] shadow-2xl p-12 py-2">
                                <p className="text-center text-[24px] font-bold pb-12">{isDetail.jobTitle}</p>
                                <div className="flex justify-start items-center flex-wrap mb-4">
                                    {isDetail.location !== "" ? <p className="mr-2 mb-1 text-[12px] px-2 bg-green-200 rounded-[4px] text-green-900">{isDetail.location}</p> : null}
                                    {isDetail.tertiaryDescription !== "" ? <p className="mr-2 mb-1 text-[12px] px-2 bg-blue-200 rounded-[4px] text-blue-900">{isDetail.tertiaryDescription}</p> : null}
                                </div>
                                <p className="pb-4">Skill</p>
                                <div className="flex justify-start flex-wrap items-center pb-4">
                                    {isDetail.tag.map((item: any, index: any) =>
                                        <p key={index} className="mr-2 mb-1 text-[12px] font-bold !text-gray-900 border border-dashed border-gray-300 px-2">{item}</p>
                                    )}
                                </div>
                                <Divider className='my-4' />
                                <div className="flex justify-between items-center pb-4">
                                    <p className="font-semibold text-[14px]">Job Description</p>
                                </div>
                                {isDetail.descriptionText.split(".").map((item: any, index: any) =>
                                    <p key={index} className="text-gray-500 pt-2 text-[12px]">{item}.</p>
                                )}
                            </div>
                        </div>
                        <div className="w-full lg:w-1/4 pl-4">
                            <div className=" border border-gray-200 rounded-[8px] shadow-2xl p-4 mb-12">
                                <div className="flex justify-start items-start items-center flex-wrap mb-4">
                                    <svg viewBox="64 64 896 896" focusable="false" data-icon="check-square" width="3em" height="3em" fill="#2b6cb0" aria-hidden="true"><path d="M433.1 657.7a31.8 31.8 0 0051.7 0l210.6-292c3.8-5.3 0-12.7-6.5-12.7H642c-10.2 0-19.9 4.9-25.9 13.3L459 584.3l-71.2-98.8c-6-8.3-15.6-13.3-25.9-13.3H315c-6.5 0-10.3 7.4-6.5 12.7l124.6 172.8z"></path><path d="M880 112H144c-17.7 0-32 14.3-32 32v736c0 17.7 14.3 32 32 32h736c17.7 0 32-14.3 32-32V144c0-17.7-14.3-32-32-32zm-40 728H184V184h656v656z"></path></svg>
                                    <p className="text-gray-700 font-bold ml-2">Apply now</p>
                                </div>
                                <p className="text-gray-700 text-[14px]">Please let <span className="font-bold">{isDetail.companyName}</span> know that you found this position on our job board, as that is a great way to support us, so we can keep posting cool jobs every day </p>

                                <div className="flex justify-center items-center flex-col mt-4 mb-2">
                                    <a href={isDetail.jobApplyLink} target="_blank">
                                        <p className="px-8 py-2 bg-blue-600 rounded-full text-center text-white text-[14px]">Apply Now</p>
                                    </a>
                                    <div className="flex items-center flex-wrap mt-6">
                                        <a
                                            href="https://www.facebook.com/profile.php?id=61558137845692"
                                            aria-label="facebook"
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="mr-6 text-body-color duration-300 hover:text-primary dark:text-body-color-dark dark:hover:text-primary"
                                        >
                                            <svg
                                                width="18"
                                                height="18"
                                                viewBox="0 0 22 22"
                                                fill="none"
                                                xmlns="http://www.w3.org/2000/svg"
                                            >
                                                <path
                                                    d="M12.1 10.4939V7.42705C12.1 6.23984 13.085 5.27741 14.3 5.27741H16.5V2.05296L13.5135 1.84452C10.9664 1.66676 8.8 3.63781 8.8 6.13287V10.4939H5.5V13.7183H8.8V20.1667H12.1V13.7183H15.4L16.5 10.4939H12.1Z"
                                                    fill="currentColor"
                                                />
                                            </svg>
                                        </a>
                                        <a
                                            href="https://twitter.com/TalenovoSocial"
                                            aria-label="social-link"
                                            target="twitter"
                                            rel="noopener noreferrer"
                                            className="mr-6 text-body-color duration-300 hover:text-primary dark:text-body-color-dark dark:hover:text-primary"
                                        >
                                            <svg
                                                width="18"
                                                height="18"
                                                viewBox="0 0 22 22"
                                                fill="none"
                                                xmlns="http://www.w3.org/2000/svg"
                                            >
                                                <path
                                                    fillRule="evenodd"
                                                    clipRule="evenodd"
                                                    d="M13.9831 19.25L9.82094 13.3176L4.61058 19.25H2.40625L8.843 11.9233L2.40625 2.75H8.06572L11.9884 8.34127L16.9034 2.75H19.1077L12.9697 9.73737L19.6425 19.25H13.9831ZM16.4378 17.5775H14.9538L5.56249 4.42252H7.04674L10.808 9.6899L11.4584 10.6039L16.4378 17.5775Z"
                                                    fill="currentColor"
                                                />
                                            </svg>
                                        </a>
                                        <a
                                            href="https://youtube.com/@TalenovoSocial?si=2ndW42UbtM5x_UvV"
                                            aria-label="youtube"
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="mr-6 text-body-color duration-300 hover:text-primary dark:text-body-color-dark dark:hover:text-primary"
                                        >
                                            <svg
                                                width="18"
                                                height="14"
                                                viewBox="0 0 18 14"
                                                className="fill-current"
                                            >
                                                <path d="M17.5058 2.07119C17.3068 1.2488 16.7099 0.609173 15.9423 0.395963C14.5778 7.26191e-08 9.0627 0 9.0627 0C9.0627 0 3.54766 7.26191e-08 2.18311 0.395963C1.41555 0.609173 0.818561 1.2488 0.619565 2.07119C0.25 3.56366 0.25 6.60953 0.25 6.60953C0.25 6.60953 0.25 9.68585 0.619565 11.1479C0.818561 11.9703 1.41555 12.6099 2.18311 12.8231C3.54766 13.2191 9.0627 13.2191 9.0627 13.2191C9.0627 13.2191 14.5778 13.2191 15.9423 12.8231C16.7099 12.6099 17.3068 11.9703 17.5058 11.1479C17.8754 9.68585 17.8754 6.60953 17.8754 6.60953C17.8754 6.60953 17.8754 3.56366 17.5058 2.07119ZM7.30016 9.44218V3.77687L11.8771 6.60953L7.30016 9.44218Z" />
                                            </svg>
                                        </a>
                                        <a
                                            href="https://www.instagram.com/talenovosocial"
                                            aria-label="instagram"
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="mr-6 text-body-color duration-300 hover:text-primary dark:text-body-color-dark dark:hover:text-primary"
                                        >
                                            <svg viewBox="64 64 896 896" focusable="false" data-icon="instagram" width="1em" height="1em" fill="currentColor" aria-hidden="true"><path d="M512 306.9c-113.5 0-205.1 91.6-205.1 205.1S398.5 717.1 512 717.1 717.1 625.5 717.1 512 625.5 306.9 512 306.9zm0 338.4c-73.4 0-133.3-59.9-133.3-133.3S438.6 378.7 512 378.7 645.3 438.6 645.3 512 585.4 645.3 512 645.3zm213.5-394.6c-26.5 0-47.9 21.4-47.9 47.9s21.4 47.9 47.9 47.9 47.9-21.3 47.9-47.9a47.84 47.84 0 00-47.9-47.9zM911.8 512c0-55.2.5-109.9-2.6-165-3.1-64-17.7-120.8-64.5-167.6-46.9-46.9-103.6-61.4-167.6-64.5-55.2-3.1-109.9-2.6-165-2.6-55.2 0-109.9-.5-165 2.6-64 3.1-120.8 17.7-167.6 64.5C132.6 226.3 118.1 283 115 347c-3.1 55.2-2.6 109.9-2.6 165s-.5 109.9 2.6 165c3.1 64 17.7 120.8 64.5 167.6 46.9 46.9 103.6 61.4 167.6 64.5 55.2 3.1 109.9 2.6 165 2.6 55.2 0 109.9.5 165-2.6 64-3.1 120.8-17.7 167.6-64.5 46.9-46.9 61.4-103.6 64.5-167.6 3.2-55.1 2.6-109.8 2.6-165zm-88 235.8c-7.3 18.2-16.1 31.8-30.2 45.8-14.1 14.1-27.6 22.9-45.8 30.2C695.2 844.7 570.3 840 512 840c-58.3 0-183.3 4.7-235.9-16.1-18.2-7.3-31.8-16.1-45.8-30.2-14.1-14.1-22.9-27.6-30.2-45.8C179.3 695.2 184 570.3 184 512c0-58.3-4.7-183.3 16.1-235.9 7.3-18.2 16.1-31.8 30.2-45.8s27.6-22.9 45.8-30.2C328.7 179.3 453.7 184 512 184s183.3-4.7 235.9 16.1c18.2 7.3 31.8 16.1 45.8 30.2 14.1 14.1 22.9 27.6 30.2 45.8C844.7 328.7 840 453.7 840 512c0 58.3 4.7 183.2-16.2 235.8z"></path></svg>
                                        </a>
                                        <a
                                            href="https://www.tiktok.com/@talenovosocial"
                                            aria-label="Tiktok"
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="mr-6 text-body-color duration-300 hover:text-primary dark:text-body-color-dark dark:hover:text-primary"
                                        >
                                            <svg fill-rule="evenodd" viewBox="64 64 896 896" focusable="false" data-icon="tik-tok" width="1em" height="1em" fill="currentColor" aria-hidden="true"><path d="M530.01 112.67c43.67-.67 87-.34 130.33-.67 2.67 51 21 103 58.33 139 37.33 37 90 54 141.33 59.66V445c-48-1.67-96.33-11.67-140-32.34-19-8.66-36.66-19.66-54-31-.33 97.33.34 194.67-.66 291.67-2.67 46.66-18 93-45 131.33-43.66 64-119.32 105.66-196.99 107-47.66 2.66-95.33-10.34-136-34.34C220.04 837.66 172.7 765 165.7 687c-.67-16.66-1-33.33-.34-49.66 6-63.34 37.33-124 86-165.34 55.33-48 132.66-71 204.99-57.33.67 49.34-1.33 98.67-1.33 148-33-10.67-71.67-7.67-100.67 12.33-21 13.67-37 34.67-45.33 58.34-7 17-5 35.66-4.66 53.66 8 54.67 60.66 100.67 116.66 95.67 37.33-.34 73-22 92.33-53.67 6.33-11 13.33-22.33 13.66-35.33 3.34-59.67 2-119 2.34-178.66.33-134.34-.34-268.33.66-402.33"></path></svg>
                                        </a>
                                    </div>
                                    {/* <div className="a2a_kit a2a_kit_size_32 a2a_default_style mt-6">
                                        <a className="a2a_dd" href="https://www.addtoany.com/share"></a>
                                        <a className="a2a_button_youtube" href='https://youtube.com/@TalenovoSocial?si=2ndW42UbtM5x_UvV'></a>
                                        <a className="a2a_button_facebook" href='https://www.facebook.com/profile.php?id=61558137845692'></a>
                                        <a className="a2a_button_instagram" href='https://www.instagram.com/talenovosocial'></a>
                                        <a className="a2a_button_x" href='https://twitter.com/TalenovoSocial'></a>
                                        <a className="a2a_button_tiktok" href="https://www.tiktok.com/@talenovosocial"></a>
                                    </div> */}
                                </div>
                            </div>

                            <div className=" border border-gray-200 rounded-[8px] shadow-2xl p-4 mb-4">
                                <div className='flex justify-center items-center'>
                                    <img src={isDetail.logo} alt="avatar" className="rounded-[4px]" width={100} height={100} />
                                </div>
                                <p className="text-gray-700 font-bold text-center"><span className="font-medium text-[14px]">{isDetail.companyName}</span></p>

                                <div className="py-4">
                                    <p className="flex justify-center items-center text-gray-600 text-[10px] text-center">
                                        <svg viewBox="64 64 896 896" focusable="false" data-icon="home" width="1em" height="1em" fill="currentColor" aria-hidden="true" className="mr-2"><path d="M946.5 505L560.1 118.8l-25.9-25.9a31.5 31.5 0 00-44.4 0L77.5 505a63.9 63.9 0 00-18.8 46c.4 35.2 29.7 63.3 64.9 63.3h42.5V940h691.8V614.3h43.4c17.1 0 33.2-6.7 45.3-18.8a63.6 63.6 0 0018.7-45.3c0-17-6.7-33.1-18.8-45.2zM568 868H456V664h112v204zm217.9-325.7V868H632V640c0-22.1-17.9-40-40-40H432c-22.1 0-40 17.9-40 40v228H238.1V542.3h-96l370-369.7 23.1 23.1L882 542.3h-96.1z"></path></svg>
                                        {isDetail.location}
                                    </p>
                                </div>
                                <div className="flex justify-center items-center">
                                    <a href={isDetail.companyLink} target="_blank">
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