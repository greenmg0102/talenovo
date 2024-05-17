"use client";
import '@/styles/landing.css'
import '@/styles/refinementList.css'
import { useState, useEffect } from "react";
import { useUser } from "@clerk/nextjs";
import { Divider } from 'antd';
import CountUp from 'react-countup';
import { landingJob } from '@/store/action/user/jobget/landingJob'
import SuggestedJobCard from '@/components/Hero/job/SuggestedJobCard'
import Carousel from '@/components/Hero/carousel/Carousel'
import { instantMeiliSearch } from "@meilisearch/instant-meilisearch";
import JobCard from "@/components/Hero/job/jobCard";
import { suggestJobs } from '@/store/action/user/landing/suggestion'
import { landingInfo, paidJobGet } from '@/store/action/user/landing/landingInfo'
import { message, Alert, Tooltip } from 'antd';
import PaidJobPostItem from '@/components/Hero/job/PaidJobPostItem'
import PriceCard from '@/components/Hero/priceCard'
import clsx from 'clsx'
import { locationDetecting } from '@/store/action/user/service/geo'
import Pricing from '@/components/Pricing'
import Testimonials from '@/components/Testimonials'
import Features from '@/components/Features'

import {
  InstantSearch,
  Hits,
  SortBy,
  SearchBox,
  Pagination,
  Highlight,
  ClearRefinements,
  RefinementList,
  Configure,
  Snippet
} from "react-instantsearch-dom";

const searchClient = instantMeiliSearch(
  'https://ms-7b38c9a53bf5-9766.lon.meilisearch.io',
  'a9120440eb9dce6256f824577056a48700be88f0',
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

  const [companyCount, setCompanyCount] = useState(0);
  const [industry, setIndustry] = useState(0);
  const [locatedin, setLocatedin] = useState(null);
  const [geoPosition, setGeoPosition] = useState("Globally");
  const [skil, setSkil] = useState(null);
  const [messageApi, contextHolder] = message.useMessage();

  const [userData, setUserData] = useState<any>({});
  const { user } = useUser();

  const email = user?.primaryEmailAddress?.emailAddress;
  const clerkId = user?.id;

  useEffect(() => {
    async function fetchGeo() {
      let result = await locationDetecting()
      setGeoPosition(result.geoPostion)
    }
    fetchGeo()
  }, [])

  // useEffect(() => {
  //   async function fetchData() {
  //     let result = await paidJobGet()
  //     setPaidJobList(result.myjobposts)
  //   }
  //   fetchData()
  // }, [email])

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
      setLocatedin(result.locatedin)
      setSkil(result.skill)
      setUserData(result.jobalertsetting === null ? {} : result)
    }

    landingJobGetting()
    fetchData()

  }, [])

  useEffect(() => {
    async function fetchSuggestJobs() {

      if (locatedin !== null && skil !== null) {

        let data = {
          skill: skil,
          locatedin: locatedin,
          ...userData
        }

        let result: any = await suggestJobs(data)

        setSuggestList(result)
      }
    }
    fetchSuggestJobs()
  }, [locatedin, skil, userData])

  const Hit = ({ hit }: any) => {
    return (
      <div key={hit.jobId} className='shadow-lg'>
        <JobCard
          item={hit}
          setIsDetail={(data: any) => setIsDetail(data)}
        />
      </div>
    )
  };

  return (
    <>
      <section
        id="home"
        className='z-10 bg-white pb-16 pt-[50px] md:pb-[40px] md:pt-[50px] xl:pb-[50px] xl:pt-[70px] 2xl:pb-[60px] 2xl:pt-[100px]'
      // className="z-10 overflow-hidden bg-white pb-16 pt-[30px] md:pb-[40px] md:pt-[120px] xl:pb-[50px] xl:pt-[140px] 2xl:pb-[60px] 2xl:pt-[160px]"
      // className="relative z-10 overflow-hidden bg-white pb-16 pt-[30px] md:pb-[40px] md:pt-[120px] xl:pb-[50px] xl:pt-[140px] 2xl:pb-[60px] 2xl:pt-[160px]"
      >
        {contextHolder}
        <div className="mx-auto">
          <div className="-mx-4 flex flex-wrap">
            <div className="w-full px-4">

              <div className="mx-auto max-w-[1200px] text-center mb-[60px]">
                <h1 className="mb-5 text-center text-lg font-bold leading-tight text-black sm:text-2xl sm:leading-tight md:text-4xl md:leading-tight">
                  Search Over <span className='text-blue-500 font-bold text-[26px] sm:text-[32px] w-[60px]'> <CountUp start={0} end={total} duration={3}></CountUp>+ </span>Jobs Globally
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
                  <div className='flex justify-center items-center sticky top-[1px] z-[11]'>
                    <div className="mx-auto w-full sm:max-w-[558px] xl:max-w-[768px] bg-white">
                      <SearchBox translations={{ placeholder: `Search by Job Title, Keywords, Company in ${geoPosition}` }} />
                    </div>
                  </div>

                  <div className='flex justify-center items-center pb-8 mt-[60px]'>
                    <div className="flex justify-around items-center flex-wrap mt-2 mb-6 w-full sm:w-4/5">
                      <div>
                        <p className="text-blue-500 font-bold text-[20px] sm:text-[26px] text-center">
                          <CountUp start={0} end={total} duration={3} className="text-blue-500 font-bold text-[20px] sm:text-[26px] text-center"></CountUp>+</p>
                        <p className="text-gray-600 font-bold text-[12px] sm:text-[14px] text-center">Total Jobs</p>
                      </div>
                      <div>
                        <p className="text-blue-500 font-bold text-[20px] sm:text-[26px] text-center">
                          <CountUp start={0} end={today} duration={2} className="text-blue-500 font-bold text-[20px] sm:text-[26px] text-center"></CountUp>+
                        </p>
                        <p className="text-gray-600 font-bold text-[12px] sm:text-[14px] text-center">Today's Jobs</p>
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

                  <div className="mx-auto max-w-[1368px] flex justify-between items-start flex-wrap">
                    <div className="w-full sm:w-[30%] md:w-[25%] lg:w-[20%] border border-gray-300 bg-white rounded-md p-4 shadow-lg h-[300px] sm:h-full overflow-y-scroll sm:overflow-y-auto mb-4">
                      <ClearRefinements />
                      {/* <SortBy
                            defaultRefinement="title"
                            items={[
                                { value: "title", label: "Relevant" },
                                {
                                    value: "title:companyName:desc",
                                    label: "Most Recommended"
                                },
                                {
                                    value: "title:skills:asc",
                                    label: "Least Recommended"
                                }
                            ]}
                        /> */}

                      {/* <h2 className='text-gray-700p pb-2'>Job Type</h2> */}
                      {/* <RefinementList attribute="location" /> */}
                      {/* <RefinementList
                        attribute="occupationType"
                        limit={3}
                        showMore={false}
                      // showMoreLimit={20}
                      />
                      <Divider />

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
                        limit={3}
                        showMore={true}
                        showMoreLimit={20}
                      />
                      <Divider />

                      <h2 className='text-gray-700p pb-2'>Company Name</h2>
                      <RefinementList
                        attribute="companyName"
                        limit={3}
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
                    <div className="w-full sm:w-[70%] md:w-[75%] lg:w-[80%] xl:w-[55%] px-0 sm:px-2">

                      <Carousel />

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
                        <Configure
                          // Add sorting configuration here
                          sortBy="-postStatus"
                        />
                        <Hits hitComponent={Hit} />
                      </div>
                      <div className='flex justify-center mb-12'>
                        {userData && Object.keys(userData).length > 0 ?
                          <Pagination showLast={true} limit={3} offset={0} /> : null
                        }
                      </div>
                    </div>

                    <div className="w-full xl:w-[25%]">
                      <div className="border border-gray-300 bg-white rounded-md p-2 flex justify-between items-center mb-4 shadow-lg">
                        <p className="font-bold text-[16px]">Suggested Jobs</p>
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
                                <SuggestedJobCard key={index} item={item} />
                              )}
                            </div>
                            :
                            <Alert message="No jobs available, please check back again" type="info" />
                          }
                        </div>
                      }
                    </div>
                  </div>
                </InstantSearch>

              </div>
              {/* <Features /> */}

              {/* <PriceCard /> */}
              <Testimonials />
              {/* <section id="price"></section>

              <div className='dark:bg-bg-color-dark bg-gray-light pt-12'>
                <div
                  className={`w-full mx-auto text-center mt-[60px]`}
                  style={{ maxWidth: "570px", marginBottom: "30px" }}
                >

                  <h2 className="mb-2 text-3xl font-bold !leading-tight text-black dark:text-white sm:text-4xl md:text-[45px] text-center">
                    Pricing
                  </h2>
                  <h4 className="mb-2 text-lg !leading-tight text-black dark:text-white sm:text-xl md:text-[20px] text-center px-2 text-gray-500">
                    Subscribe to membership and unlock all jobs
                  </h4>
                </div>
                <Pricing isSectionTitle={true} />
              </div> */}
            </div>
          </div>
        </div >

      </section >
    </>
  );
};

export default Hero;


