import { useState, useEffect } from 'react';
import clsx from 'clsx'
import { Divider, Button } from 'antd'
import { message } from 'antd';
import { companyDatilPost, jobDatilPost, jobPostStatus, changejobPostStatus } from "@/store/action/user/jobPost"
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

export default function AdminTalenovoDetail({ isDetail, setIsDetail, setList }: any) {


    const [messageApi, contextHolder] = message.useMessage();

    const [value, setValue] = useState({
        logo: "",
        companyName: "",
        companyLink: "",
        jobTitle: "",
        type: undefined,
        category: undefined,
        location: undefined,
        isRmote: false,
        tag: [],
        description: undefined,
        descriptionText: undefined,
        minimumPay: undefined,
        maximumPay: undefined,
        currency: undefined,
        currencyType: undefined,
        applyBy: undefined,
        contactInfo: undefined,
        premiumType: undefined,
        jobApplyLink: "",

        platform: "talenovo",
        subType: "paid",
        postStatus: 0
    })

    const [params, setParams] = useState<any>(JSON.parse(JSON.stringify({
        description: '',
        descriptionText: ''
    })));

    useEffect(() => {

        if (isDetail && isDetail.description && isDetail.descriptionText) {
            setParams(JSON.parse(JSON.stringify({
                description: isDetail.description,
                descriptionText: isDetail.descriptionText
            })))

            setValue(isDetail)
        }

    }, [isDetail])

    const cancelAgree = () => {
        setIsDetail(undefined)
    }

    const update = async () => {

        let real: any = value
        real.description = params.description
        real.descriptionText = params.descriptionText

        let companyDetailResult = await jobDatilPost(real)

        if (companyDetailResult.isOkay) {
            changeStatus(isDetail, 2)
            setIsDetail(undefined)
        } else {
            messageApi.error("Updating failed");
        }
    }

    const changeStatus = async (item: any, status: any) => {
        let data = {
            ...item,
            postStatus: status
        }
        let result = await changejobPostStatus(data)

        if (status === 2) {
            if (result.isOkay) {
                messageApi.success("Agreed");
                setList(result.myjobposts)
            }
            else messageApi.error("Updating failed");
        }

        if (status === 3) messageApi.info("It was rejected");
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
            {contextHolder}
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
                                <Divider />
                                <div className="flex justify-between items-center pb-4">
                                    <p className="font-semibold text-[14px]">Job Description</p>
                                </div>
                                <ReactQuill
                                    theme="snow"
                                    value={params.description}
                                    defaultValue={params.description}
                                    onChange={(content, delta, source, editor) => {
                                        params.description = content;
                                        params.descriptionText = editor.getText();
                                        setParams({
                                            ...params,
                                        });
                                    }}
                                // style={{ minHeight: '200px' }}
                                />
                                <div className='flex justify-end mt-6'>
                                    <Button type="primary" onClick={update} className='mr-4'>Update</Button>
                                    <Button type="primary" onClick={cancelAgree}>Cancel</Button>
                                </div>
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
                                    <p className="mt-4 px-0 py-2 bg-blue-600 w-full rounded-[4px] text-center text-white text-[14px]">Share this job</p>
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