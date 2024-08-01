"use client";
import '@/styles/landing.css'
import '@/styles/refinementList.css'
import { useState, useEffect } from "react";
import { useUser } from "@clerk/nextjs";
import CountUp from 'react-countup';
import { landingJob } from '@/store/action/user/jobget/landingJob'
import SuggestedJobCard from '@/components/Hero/job/SuggestedJobCard'
import Carousel from '@/components/Hero/carousel/Carousel'
import { instantMeiliSearch } from "@meilisearch/instant-meilisearch";
import JobCard from "@/components/Hero/job/jobCard";
import { suggestJobs, newletterSubscribePost } from '@/store/action/user/landing/suggestion'
import { landingInfo, paidJobGet } from '@/store/action/user/landing/landingInfo'
import { message, Alert, Tooltip, Divider } from 'antd';
import { jobLocationPut } from "@/store/action/user/jobInfo/jobLocation"
import LandingSearchInput from '@/components/Common/Input/LandingSearchInput'
import NewsLatterBox from "@/components/Contact/NewsLatterBox";
import PaidJobPostItem from '@/components/Hero/job/PaidJobPostItem'
import PriceCard from '@/components/Hero/priceCard'
import clsx from 'clsx'
import { locationDetecting } from '@/store/action/user/service/geo'
import Pricing from '@/components/Pricing'
import Testimonials from '@/components/Testimonials'
import Features from '@/components/Features'
import { v4 as uuidv4 } from 'uuid';

import {
  InstantSearch,
  Hits,
  SortBy,
  SearchBox,
  Pagination,
  Highlight,
  Stats,
  ClearRefinements,
  RefinementList,
  Configure,
  Snippet
} from "react-instantsearch-dom";

const searchClient = instantMeiliSearch(
  'https://search.talenovo.com/',
  '47dfe734-68fb-4b19-a96f-5f19a3355458',
  {
    finitePagination: true,
    // limit: 1
    // filter: [
    //   "jobPostStatus = 2",
    // ],
    // filter: 'jobPostStatus = 2 OR jobPostStatus = 3',
    // sort: ['jobPostStatus:asc']
  }
);

const text = <span>For accurate job suggestion, please update your location and add your skills in your profile</span>;

const Hero = ({ setIsDetail }: any) => {

  const [suggestList, setSuggestList] = useState<any>(undefined);

  const [total, setTotal] = useState(0);
  const [today, setToday] = useState(0);
  // const [paidJobList, setPaidJobList] = useState([]);

  const [searchHint, setSearchHint] = useState({
    location: "",
  })
  const [jobLocation, setJobLocation] = useState([])
  const [userInfo, setUserInfo] = useState({
    locatedin: undefined
  })

  useEffect(() => {

    async function locationFetchData(hint: any) {
      const data = { locationHint: hint }
      let reslutJobLocation = await jobLocationPut(data)
      setJobLocation(reslutJobLocation)
    }

    if (searchHint.location !== "") locationFetchData(searchHint.location)

  }, [searchHint])


  const [companyCount, setCompanyCount] = useState(0);
  const [industry, setIndustry] = useState(0);
  const [locatedin, setLocatedin] = useState<any>(undefined);
  const [geoPosition, setGeoPosition] = useState<any>(undefined);
  const [skil, setSkil] = useState(null);
  const [messageApi, contextHolder] = message.useMessage();
  const [hint, setHint] = useState("")
  const [companyFilter, setCompanyFilter] = useState(undefined)

  const [userData, setUserData] = useState<any>({});
  const { user } = useUser();

  const [isNewsletter, setIsNewsletter] = useState(true)

  const [newsletterInfo, setnewsletterInfo] = useState({
    email: '',
    FirstName: '',
    LastName: '',
  })

  // const [newsletterInfo, setnewsletterInfo] = useState({
  //   email: '',
  //   FirstName: '',
  //   LastName: '',
  // })

  // const email = user?.primaryEmailAddress?.emailAddress;
  const clerkId = user?.id;
  // const firstName = user?.firstName;
  // const lastName = user?.lastName;

  // useEffect(() => {
  //   if (email && firstName && clerkId && lastName) {
  //     setIsNewsletter(false)
  //     console.log("setIsNewsletter", false);
  //   } else {
  //     setIsNewsletter(true)
  //     console.log("setIsNewsletter", true);
  //   }
  // }, [email, firstName, clerkId, lastName])

  const agreeNewsletter = async (event: any) => {
    event.preventDefault();
    if (
      newsletterInfo.email.length > 0 &&
      newsletterInfo.FirstName.length > 0 &&
      newsletterInfo.LastName.length > 0
    ) {
      let result: any = await newletterSubscribePost(newsletterInfo)
      if (result.result) {
        messageApi.success(result.message);
      } else {
        messageApi.info(result.message);
      }

      setnewsletterInfo({
        email: '',
        FirstName: '',
        LastName: '',
      })
    } else {
      messageApi.error("All inputs are required!");
    }
  }

  const bufferSetLocation = (locationInfo: any) => {

    if (user === null || user === undefined) {
      setGeoPosition(locationInfo);
    } else {
      setLocatedin(locationInfo)
    }

  }

  const bufferSetCompanyFilter = (companyFilter: any) => {
    setCompanyFilter(companyFilter)
    setGeoPosition("");
  }

  const returnBufferSetCompanyFilter = async () => {
    setCompanyFilter(undefined)
    const res: any = await fetch('https://us-central1-sodium-mountain-418120.cloudfunctions.net/geolocation', { method: 'GET' });
    let result: any = await await res.json()

    setGeoPosition(result.region + ", " + result.country)
  }

  useEffect(() => {
    async function fetchGeo() {
      // let result = await locationDetecting()
      const res: any = await fetch('https://us-central1-sodium-mountain-418120.cloudfunctions.net/geolocation', { method: 'GET' });
      let result = await await res.json()

      setGeoPosition(result.region + ", " + result.country)
    }
    fetchGeo()
  }, [])

  useEffect(() => {

    let total = localStorage.getItem('talenovo-job-total')
    let company = localStorage.getItem('talenovo-company-total')
    let todayJob = localStorage.getItem('talenovo-company-todayJob')
    let industry = localStorage.getItem('talenovo-company-industry')

    setTotal(Number(total))
    setCompanyCount(Number(company))
    setToday(Number(todayJob))
    setIndustry(Number(industry))

    async function fetchData() {
      let landingInfoResult: any = await landingInfo()

      if (!landingInfoResult.isOkay) messageApi.error(landingInfoResult.message);
      else {
        localStorage.setItem('talenovo-company-total', landingInfoResult.companyCount)
        setCompanyCount(landingInfoResult.companyCount)

        localStorage.setItem('talenovo-company-industry', landingInfoResult.industryCount)
        setIndustry(landingInfoResult.industryCount)
      }
    }

    async function landingJobGetting() {
      let result: any = await landingJob()
      localStorage.setItem('talenovo-job-total', result.total)
      localStorage.setItem('talenovo-job-todayJob', result.todayJob)

      setTotal(result.total)
      setToday(result.todayJob)
      setLocatedin(result.currentLocatedin)
      // setLocatedin(result.locatedin)
      setSkil(result.skill)
      setUserData(result.jobalertsetting === null ? {} : result)
    }

    landingJobGetting()
    fetchData()

  }, [])

  useEffect(() => {
    async function fetchSuggestJobs() {

      if (geoPosition !== null && skil !== null) {

        let data = {
          skill: skil,
          currentLocatedin: geoPosition,
          ...userData
        }

        let result: any = await suggestJobs(data)

        setSuggestList(result)
      }
    }
    fetchSuggestJobs()
  }, [geoPosition, skil, userData])

  const Hit = ({ hit }: any) => {

    return (
      <div key={hit.jobId} className='shadow-lg'>
        <JobCard
          item={hit}
          clerkId={clerkId}
          setIsDetail={(data: any) => setIsDetail(data)}
        />
      </div>
    )
  };

  console.log("locatedin", locatedin);
  console.log("geoPosition", geoPosition);

  return (
    <>
      <section
        id="home"
        className='z-10 bg-white pb-16 md:pb-[40px] pt-[50px] md:pt-[50px] xl:pb-[50px] xl:pt-[50px] 2xl:pb-[60px] 2xl:pt-[50px]'
      >
        {contextHolder}
        <div className="mx-auto">
          <div className="flex flex-wrap">
            <div className="w-full">

              <div className="mx-auto max-w-[1200px] text-center mb-[60px]">
                <h1 className="mb-5 text-center text-lg font-bold leading-tight text-black sm:text-2xl sm:leading-tight md:text-4xl md:leading-tight">
                  Search Over <span className='text-blue-500 font-bold text-[26px] sm:text-[32px] w-[60px]'> <CountUp start={0} end={total} duration={3}></CountUp>+ </span>Jobs Near You
                </h1>
                <h4 className="mb-5 text-center font-semibold leading-tight text-gray-600 sm:leading-tight md:leading-tight text-[20px]">
                  Connecting Talent to Opportunity
                </h4>
              </div>

              <div className="container w-full ">
                <InstantSearch
                  indexName="title"
                  searchClient={searchClient}
                >
                  <div className='flex justify-center items-center sticky top-[1px] z-[11] mb-6'>
                    <div className="flex justify-between items-center mx-auto w-full sm:max-w-[760px] xl:max-w-[998px] bg-white border py-2 px-4 rounded-xl search-box-main text-gray-500">
                      <div className='w-full flex justify-between items-center flex-wrap py-0 pl-[12px] pr-[12px] sm:pr-[0px]'>
                        <div className='w-full flex items-center sm:w-1/2 pr-4 border border-t-[0px] border-l-[0px] border-b-[1px] sm:border-b-[0px] border-r-[0px] sm:border-r-[1px] border-[#697EF5] border-[2px] border-dashed sm:border-solid'>
                          <svg viewBox="64 64 896 896" focusable="false" data-icon="search" width="1em" height="1em" fill="currentColor" aria-hidden="true"><path d="M909.6 854.5L649.9 594.8C690.2 542.7 712 479 712 412c0-80.2-31.3-155.4-87.9-212.1-56.6-56.7-132-87.9-212.1-87.9s-155.5 31.3-212.1 87.9C143.2 256.5 112 331.8 112 412c0 80.1 31.3 155.5 87.9 212.1C256.5 680.8 331.8 712 412 712c67 0 130.6-21.8 182.7-62l259.7 259.6a8.2 8.2 0 0011.6 0l43.6-43.5a8.2 8.2 0 000-11.6zM570.4 570.4C528 612.7 471.8 636 412 636s-116-23.3-158.4-65.6C211.3 528 188 471.8 188 412s23.3-116.1 65.6-158.4C296 211.3 352.2 188 412 188s116.1 23.2 158.4 65.6S636 352.2 636 412s-23.3 116.1-65.6 158.4z"></path></svg>
                          <input
                            type="text"
                            className="w-full outline-none focus:outline-none p-2 rounded focus:ring-0 focus:border-transparent"
                            placeholder="Search by Job Title, Keywords, Company"
                            onChange={(e: any) => setHint(e.target.value)}
                          />
                        </div>
                        <div className='w-full flex items-center sm:w-1/2 px-2 ignore-outline'>
                          <svg viewBox="64 64 896 896" focusable="false" data-icon="global" width="1em" height="1em" fill="currentColor" aria-hidden="true"><path d="M854.4 800.9c.2-.3.5-.6.7-.9C920.6 722.1 960 621.7 960 512s-39.4-210.1-104.8-288c-.2-.3-.5-.5-.7-.8-1.1-1.3-2.1-2.5-3.2-3.7-.4-.5-.8-.9-1.2-1.4l-4.1-4.7-.1-.1c-1.5-1.7-3.1-3.4-4.6-5.1l-.1-.1c-3.2-3.4-6.4-6.8-9.7-10.1l-.1-.1-4.8-4.8-.3-.3c-1.5-1.5-3-2.9-4.5-4.3-.5-.5-1-1-1.6-1.5-1-1-2-1.9-3-2.8-.3-.3-.7-.6-1-1C736.4 109.2 629.5 64 512 64s-224.4 45.2-304.3 119.2c-.3.3-.7.6-1 1-1 .9-2 1.9-3 2.9-.5.5-1 1-1.6 1.5-1.5 1.4-3 2.9-4.5 4.3l-.3.3-4.8 4.8-.1.1c-3.3 3.3-6.5 6.7-9.7 10.1l-.1.1c-1.6 1.7-3.1 3.4-4.6 5.1l-.1.1c-1.4 1.5-2.8 3.1-4.1 4.7-.4.5-.8.9-1.2 1.4-1.1 1.2-2.1 2.5-3.2 3.7-.2.3-.5.5-.7.8C103.4 301.9 64 402.3 64 512s39.4 210.1 104.8 288c.2.3.5.6.7.9l3.1 3.7c.4.5.8.9 1.2 1.4l4.1 4.7c0 .1.1.1.1.2 1.5 1.7 3 3.4 4.6 5l.1.1c3.2 3.4 6.4 6.8 9.6 10.1l.1.1c1.6 1.6 3.1 3.2 4.7 4.7l.3.3c3.3 3.3 6.7 6.5 10.1 9.6 80.1 74 187 119.2 304.5 119.2s224.4-45.2 304.3-119.2a300 300 0 0010-9.6l.3-.3c1.6-1.6 3.2-3.1 4.7-4.7l.1-.1c3.3-3.3 6.5-6.7 9.6-10.1l.1-.1c1.5-1.7 3.1-3.3 4.6-5 0-.1.1-.1.1-.2 1.4-1.5 2.8-3.1 4.1-4.7.4-.5.8-.9 1.2-1.4a99 99 0 003.3-3.7zm4.1-142.6c-13.8 32.6-32 62.8-54.2 90.2a444.07 444.07 0 00-81.5-55.9c11.6-46.9 18.8-98.4 20.7-152.6H887c-3 40.9-12.6 80.6-28.5 118.3zM887 484H743.5c-1.9-54.2-9.1-105.7-20.7-152.6 29.3-15.6 56.6-34.4 81.5-55.9A373.86 373.86 0 01887 484zM658.3 165.5c39.7 16.8 75.8 40 107.6 69.2a394.72 394.72 0 01-59.4 41.8c-15.7-45-35.8-84.1-59.2-115.4 3.7 1.4 7.4 2.9 11 4.4zm-90.6 700.6c-9.2 7.2-18.4 12.7-27.7 16.4V697a389.1 389.1 0 01115.7 26.2c-8.3 24.6-17.9 47.3-29 67.8-17.4 32.4-37.8 58.3-59 75.1zm59-633.1c11 20.6 20.7 43.3 29 67.8A389.1 389.1 0 01540 327V141.6c9.2 3.7 18.5 9.1 27.7 16.4 21.2 16.7 41.6 42.6 59 75zM540 640.9V540h147.5c-1.6 44.2-7.1 87.1-16.3 127.8l-.3 1.2A445.02 445.02 0 00540 640.9zm0-156.9V383.1c45.8-2.8 89.8-12.5 130.9-28.1l.3 1.2c9.2 40.7 14.7 83.5 16.3 127.8H540zm-56 56v100.9c-45.8 2.8-89.8 12.5-130.9 28.1l-.3-1.2c-9.2-40.7-14.7-83.5-16.3-127.8H484zm-147.5-56c1.6-44.2 7.1-87.1 16.3-127.8l.3-1.2c41.1 15.6 85 25.3 130.9 28.1V484H336.5zM484 697v185.4c-9.2-3.7-18.5-9.1-27.7-16.4-21.2-16.7-41.7-42.7-59.1-75.1-11-20.6-20.7-43.3-29-67.8 37.2-14.6 75.9-23.3 115.8-26.1zm0-370a389.1 389.1 0 01-115.7-26.2c8.3-24.6 17.9-47.3 29-67.8 17.4-32.4 37.8-58.4 59.1-75.1 9.2-7.2 18.4-12.7 27.7-16.4V327zM365.7 165.5c3.7-1.5 7.3-3 11-4.4-23.4 31.3-43.5 70.4-59.2 115.4-21-12-40.9-26-59.4-41.8 31.8-29.2 67.9-52.4 107.6-69.2zM165.5 365.7c13.8-32.6 32-62.8 54.2-90.2 24.9 21.5 52.2 40.3 81.5 55.9-11.6 46.9-18.8 98.4-20.7 152.6H137c3-40.9 12.6-80.6 28.5-118.3zM137 540h143.5c1.9 54.2 9.1 105.7 20.7 152.6a444.07 444.07 0 00-81.5 55.9A373.86 373.86 0 01137 540zm228.7 318.5c-39.7-16.8-75.8-40-107.6-69.2 18.5-15.8 38.4-29.7 59.4-41.8 15.7 45 35.8 84.1 59.2 115.4-3.7-1.4-7.4-2.9-11-4.4zm292.6 0c-3.7 1.5-7.3 3-11 4.4 23.4-31.3 43.5-70.4 59.2-115.4 21 12 40.9 26 59.4 41.8a373.81 373.81 0 01-107.6 69.2z"></path></svg>

                          <input
                            type="text"
                            className="w-full outline-none focus:outline-none p-2 rounded focus:ring-0 focus:border-transparent"
                            placeholder="City, Province or remote"
                            onChange={(e: any) => bufferSetLocation(e.target.value)}
                            // onChange={(e: any) => setHint(e.target.value)}
                            // value={locatedin !== (null || undefined) ? locatedin : geoPosition}
                            // value={locatedin !== null || locatedin !== undefined ? locatedin : geoPosition}
                            // value={user === null || user === undefined ? geoPosition : locatedin !== null || locatedin !== undefined ? locatedin : geoPosition}

                            value={locatedin !== undefined ? user === null || user === undefined ? geoPosition : locatedin : undefined}
                          // readOnly
                          />

                          {/* 
                          <div className='w-full outline-none focus:outline-none p-2 rounded focus:ring-0 focus:border-transparent'>
                            <LandingSearchInput
                              // value={userInfo}
                              type={'location'}
                              warn={{ location: "" }}
                              title={"Location *"}
                              isTtitle={true}
                              firstLocatedin={locatedin}
                              list={jobLocation}
                              formatList={() => setJobLocation([])}
                              pushList={(type: any, eachvalue: any) => setUserInfo({ ...userInfo, locatedin: eachvalue })}
                              onchange={(type: any, eachvalue: any) => setSearchHint({ ...searchHint, [type]: eachvalue })}
                            />
                          </div> */}

                        </div>
                      </div>
                    </div>
                  </div>

                  <SearchBox
                    // defaultRefinement={geoPosition.split(',')[1]}
                    // defaultRefinement={locatedin !== (null || undefined) ? locatedin + " " + hint : geoPosition + " " + hint}
                    defaultRefinement={locatedin !== undefined ? user === null || user === undefined ? geoPosition : locatedin : undefined}
                    // defaultRefinement={userInfo.locatedin !== (null || undefined) ? userInfo.locatedin + " " + hint : geoPosition + " " + hint}
                    // translations={{ placeholder: `Search by Job Title, Keywords, Company in ${geoPosition}` }}
                    autoFocus
                  />

                  {companyFilter ? <Configure filters={`companyName='${companyFilter}'`} /> : null}

                  <div className='flex justify-center items-center pb-8 mt-[60px]'>
                    <div className="flex justify-around items-center flex-wrap mt-2 mb-6 w-full sm:w-3/5">
                      <div>
                        <p className="text-blue-500 font-bold text-[20px] sm:text-[26px] text-center">
                          <CountUp start={0} end={total} duration={3} className="text-blue-500 font-bold text-[20px] sm:text-[26px] text-center"></CountUp>+</p>
                        <p className="text-gray-600 font-bold text-[12px] sm:text-[14px] text-center">Total Jobs</p>
                      </div>
                      <div>
                        <p className="text-blue-500 font-bold text-[20px] sm:text-[26px] text-center">
                          <CountUp start={0} end={today} duration={2} className="text-blue-500 font-bold text-[20px] sm:text-[26px] text-center"></CountUp>+
                        </p>
                        <p className="text-gray-600 font-bold text-[12px] sm:text-[14px] text-center">Today&apos;s Jobs</p>
                      </div>
                      <div>
                        <p className="text-blue-500 font-bold text-[20px] sm:text-[26px] text-center">
                          <CountUp start={0} end={companyCount} duration={1} className="text-blue-500 font-bold text-[20px] sm:text-[26px] text-center"></CountUp>+
                        </p>
                        <p className="text-gray-600 font-bold text-[12px] sm:text-[14px] text-center">Companys</p>
                      </div>
                      <div>
                        <p className="text-blue-500 font-bold text-[20px] sm:text-[26px] text-center">
                          <CountUp start={0} end={industry} duration={2} className="text-blue-500 font-bold text-[20px] sm:text-[26px] text-center"></CountUp>+
                        </p>
                        <p className="text-gray-600 font-bold text-[12px] sm:text-[14px] text-center">Industries</p>
                      </div>
                    </div>
                  </div>

                  <div className="mx-auto max-w-[1368px] w-full flex flex-col-reverse lg:flex-row lg:justify-between items-start flex-wrap">

                    <div className="w-full lg:w-[25%]">
                      {
                        isNewsletter &&
                        <NewsLatterBox
                          newsletterInfo={newsletterInfo}
                          setnewsletterInfo={(total: any) => setnewsletterInfo(total)}
                          agreeNewsletter={agreeNewsletter}
                        />
                      }

                      <div className="border border-gray-300 bg-white rounded-md p-2 flex justify-between items-center mb-4 shadow-lg">
                        <p className="font-bold text-[16px]">Suggested Jobs {suggestList !== undefined && suggestList.length > 0 ? `(${suggestList.length})` : null}</p>
                        <Tooltip placement="topLeft" title={text}>
                          <svg viewBox="64 64 896 896" focusable="false" data-icon="exclamation-circle" width="1em" height="1em" fill="currentColor" aria-hidden="true"><path d="M512 64C264.6 64 64 264.6 64 512s200.6 448 448 448 448-200.6 448-448S759.4 64 512 64zm0 820c-205.4 0-372-166.6-372-372s166.6-372 372-372 372 166.6 372 372-166.6 372-372 372z"></path><path d="M464 688a48 48 0 1096 0 48 48 0 10-96 0zm24-112h48c4.4 0 8-3.6 8-8V296c0-4.4-3.6-8-8-8h-48c-4.4 0-8 3.6-8 8v272c0 4.4 3.6 8 8 8z"></path></svg>
                        </Tooltip>
                      </div>
                      {suggestList === undefined ?
                        null
                        :
                        <div>
                          {suggestList !== undefined && suggestList.length > 0 ?
                            <div>
                              {suggestList.map((item: any, index: any) =>
                                <SuggestedJobCard
                                  key={index}
                                  item={item}
                                  setIsDetail={(data: any) => setIsDetail(data)}
                                />
                              )}
                            </div>
                            :
                            <Alert
                              message={
                                <a href='/my-jobs'>
                                  <ul>
                                    <li>No jobs available, please check back again.</li>
                                    <li>For accurate job suggestion, please update your location and add your skills in your profile.</li>
                                  </ul>
                                </a>
                              }
                              type="info"
                            />
                          }
                        </div>
                      }

                    </div>
                    <div className='w-full lg:w-[75%] flex flex-col-reverse md:flex-row md:justify-between items-start flex-wrap'>
                      <div className="w-full md:w-[75%] px-0 sm:px-2">
                        <Carousel
                          companyFilter={companyFilter}
                          setCompanyFilter={(companyName: any) => bufferSetCompanyFilter(companyName)}
                        />
                        {companyFilter !== undefined ?
                          <div
                            className='my-1'
                            onClick={returnBufferSetCompanyFilter}
                          >
                            <Alert
                              message={
                                <div className='flex justify-between items-center'>
                                  <p className='text-green-600 w-full'>
                                    See your results below, Press <span className='font-semibold underline'>Return</span> to start a new search
                                  </p>
                                  <div className='flex items-center text-green-400'>
                                    <svg viewBox="64 64 896 896" focusable="false" data-icon="rollback" width="1em" height="1em" fill="currentColor" aria-hidden="true"><path d="M793 242H366v-74c0-6.7-7.7-10.4-12.9-6.3l-142 112a8 8 0 000 12.6l142 112c5.2 4.1 12.9.4 12.9-6.3v-74h415v470H175c-4.4 0-8 3.6-8 8v60c0 4.4 3.6 8 8 8h618c35.3 0 64-28.7 64-64V306c0-35.3-28.7-64-64-64z"></path></svg>
                                    <p className='ml-1 mb-0'>Return</p>
                                  </div>
                                </div>
                              }
                              className='cursor-pointer'
                              type="success"
                              showIcon
                            />
                          </div>
                          : null
                        }

                        <div className="mb-4">
                          {/* {paidJobList.map((item: any, index: any) =>
                            <div
                              key={index}
                              className="border border-gray-300 bg-white rounded-md px-2 mb-2 cursor-pointer transition-all hover:shadow-lg hover:border-blue-500"
                            >
                              <PaidJobPostItem
                                item={item}
                                setIsDetail={(data: any) => setIsDetail(data)}
                              />
                            </div>
                          )} */}

                          {/* <Configure
                            // Add sorting configuration here
                            sortBy="-postStatus"
                          /> */}
                          <Hits hitComponent={Hit} />
                        </div>
                        <div className='flex justify-center mb-12'>
                          {/* {userData && Object.keys(userData).length > 0 ?
                            <Pagination showLast={true} limit={3} offset={0} /> : null
                          } */}
                          <Pagination showLast={true} limit={3} offset={0} />
                        </div>
                      </div>
                      <div className="w-full md:w-[25%] pl-0 md:pl-4">
                        <ClearRefinements />
                        <SortBy
                          defaultRefinement="title:scrapedDate:desc"
                          items={[
                            // { value: "title", label: "Relevant" },  scrapedDate   postStatus   desc    asc
                            {
                              value: "title:scrapedDate:desc",
                              label: "Most Featured"
                            },
                            // {
                            //     value: "title:skills:asc",
                            //     label: "Least Recommended"
                            // }
                          ]}
                        />
                        {/* <Divider /> */}
                        <h2 className='text-gray-700p pb-2'>Job Type</h2>
                        {/* <RefinementList attribute="location" /> */}
                        <RefinementList
                          attribute="occupationType"
                          limit={10}
                          showMore={true}
                          showMoreLimit={20}
                        />
                        <Divider />
                        {/* 
                      <h2 className='text-gray-700p pb-2'>Location</h2>
                      <RefinementList
                        attribute="country"
                        limit={10}
                        showMore={true}
                      /> */}
                        {/* <Divider /> */}

                        <h2 className='text-gray-700p pb-2'>Location</h2>
                        <RefinementList
                          attribute="city"
                          limit={10}
                          showMore={true}
                          showMoreLimit={20}
                        />
                        <Divider />

                        <h2 className='text-gray-700p pb-2'>Company Name</h2>
                        <RefinementList
                          attribute="companyName"
                          limit={10}
                          showMore={true}
                          showMoreLimit={20}
                        />
                        <Divider />

                        {/* <h2 className='text-gray-700p pb-2'>Skill</h2>
                      <RefinementList
                        attribute="skills"
                        limit={3}
                        showMore={true}
                        showMoreLimit={20}
                      />
                      <Divider />

                      <h2 className='text-gray-700p pb-2'>Industry</h2>
                      <RefinementList
                        attribute="insightsV2"
                        limit={3}
                        showMore={true}
                        showMoreLimit={20}
                      />
                      <Divider /> */}

                        {/* <h2 className='text-gray-700p pb-2'>Salary</h2>
                      <RefinementList
                        attribute="tertiaryDescription"
                        limit={3}
                        showMore={true}
                        showMoreLimit={20}  
                      /> */}
                        {/* <Configure
                        hitsPerPage={6}
                        attributesToSnippet={["description:50"]}
                        snippetEllipsisText={"..."}
                        /> */}
                      </div>
                    </div>

                  </div>
                </InstantSearch>

              </div>

              <Testimonials />

            </div>
          </div>
        </div >

      </section >
    </>
  );
};

export default Hero;


