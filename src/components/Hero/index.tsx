"use client";
import '@/styles/landing.css'
import '@/styles/refinementList.css'
import { useState, useEffect } from "react";
import JobList from "./job";
import { Divider } from 'antd';
import CountUp from 'react-countup';
import { landingJob } from '@/store/action/user/jobget/landingJob'
import SuggestedJobCard from '@/components/Hero/job/SuggestedJobCard'
import Filter from '@/components/Hero/filter'
import { instantMeiliSearch } from "@meilisearch/instant-meilisearch";
import JobCard from "@/components/Hero/job/jobCard";
import { suggestJobs } from '@/store/action/user/landing/suggestion'
import { landingInfo } from '@/store/action/user/landing/landingInfo'
import { message, Alert } from 'antd';
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
  "https://ms-25a464fc2474-8311.nyc.meilisearch.io",
  "a9af493c2f5076aad794cab8b668828cb8f1835f",
  {
    finitePagination: true
  }
);

const Hero = () => {

  const [suggestList, setSuggestList] = useState(undefined);

  const [total, setTotal] = useState(0);
  const [today, setToday] = useState(0);
  const [companyCount, setCompanyCount] = useState(0);
  const [industry, setIndustry] = useState(0);
  const [locatedin, setLocatedin] = useState(null);
  const [skil, setSkil] = useState(null);
  const [messageApi, contextHolder] = message.useMessage();

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
    }

    landingJobGetting()
    fetchData()

  }, [])

  useEffect(() => {
    async function fetchSuggestJobs() {

      if (locatedin !== null && skil !== null) {

        let data = {
          skill: skil,
          locatedin: locatedin
        }

        let result: any = await suggestJobs(data)
        setSuggestList(result)
      }
    }
    fetchSuggestJobs()
  }, [locatedin, skil])

  const Hit = ({ hit }: any) => (
    <div key={hit.jobId}>
      <JobCard item={hit} />
    </div>
  );

  return (
    <>
      <section
        id="home"
        className="relative z-10 overflow-hidden bg-custom-gray pb-16 pt-[120px] dark:bg-gray-dark md:pb-[120px] md:pt-[150px] xl:pb-[160px] xl:pt-[180px] 2xl:pb-[200px] 2xl:pt-[210px]"
      >
        {contextHolder}
        <div className="container">
          <div className="-mx-4 flex flex-wrap">
            <div className="w-full px-4">
              <div className="mx-auto max-w-[1200px] text-center">
                <h1 className="mb-5 text-2xl font-bold leading-tight text-black dark:text-white sm:text-3xl sm:leading-tight md:text-4xl md:leading-tight">
                  Trusted by over {companyCount}+ customers
                </h1>
                <p className="mb-12 text-base !leading-relaxed text-body-color dark:text-body-color-dark sm:text-lg md:text-xl">
                  Search by location, skills, seniority, focus, and industry.
                </p>
                <div className="flex justify-around items-center flex-wrap mb-12">
                  <div>
                    <p className="text-blue-500 font-bold text-[24px] sm:text-[40px] text-center">
                      <CountUp start={0} end={total} duration={3} className="text-blue-500 font-bold text-[24px] sm:text-[40px] text-center"></CountUp>+</p>
                    <p className="text-gray-600 font-bold text-[14px] sm:text-[20px] text-center">Total Jobs</p>
                  </div>
                  <div>
                    <p className="text-blue-500 font-bold text-[24px] sm:text-[40px] text-center">
                      <CountUp start={0} end={today} duration={2} className="text-blue-500 font-bold text-[24px] sm:text-[40px] text-center"></CountUp>+
                    </p>
                    <p className="text-gray-600 font-bold text-[14px] sm:text-[20px] text-center">Today's Jobs</p>
                  </div>
                  <div>
                    <p className="text-blue-500 font-bold text-[24px] sm:text-[40px] text-center">
                      <CountUp start={0} end={companyCount} duration={1} className="text-blue-500 font-bold text-[24px] sm:text-[40px] text-center"></CountUp>+
                    </p>
                    <p className="text-gray-600 font-bold text-[14px] sm:text-[20px] text-center">Companys</p>
                  </div>
                  <div>
                    <p className="text-blue-500 font-bold text-[24px] sm:text-[40px] text-center">
                      <CountUp start={0} end={industry} duration={2} className="text-blue-500 font-bold text-[24px] sm:text-[40px] text-center"></CountUp>+
                    </p>
                    <p className="text-gray-600 font-bold text-[14px] sm:text-[20px] text-center">Industries</p>
                  </div>
                </div>
              </div>

              <div className="w-full">
                <InstantSearch
                  indexName="title"
                  searchClient={searchClient}
                >

                  <div className="mx-auto max-w-[1368px] flex justify-between items-start flex-wrap">
                    <div className="w-full sm:w-[30%] md:w-[25%] lg:w-[20%] border border-gray-300 bg-gray-50 rounded-md p-4 mt-[170px]">
                      <ClearRefinements />

                      {/* <SortBy
                            defaultRefinement="title"
                            items={[
                                { value: "title", label: "Relevant" },
                                {
                                    value: "title:recommendationCount:desc",
                                    label: "Most Recommended"
                                },
                                {
                                    value: "title:recommendationCount:asc",
                                    label: "Least Recommended"
                                }
                            ]}
                        /> */}

                      <h2 className='text-gray-700p pb-2'>Job Type</h2>
                      {/* <RefinementList attribute="location" /> */}
                      <RefinementList
                        attribute="occupationType"
                        limit={10}
                        showMore={true}
                        showMoreLimit={20}
                      />
                      <Divider />

                      <h2 className='text-gray-700p pb-2'>Location</h2>
                      {/* <RefinementList attribute="location" /> */}
                      <RefinementList
                        attribute="country"
                        limit={10}
                        showMore={true}
                        showMoreLimit={20}
                      />
                      <Divider />

                      <h2 className='text-gray-700p pb-2'>City</h2>
                      {/* <RefinementList attribute="location" /> */}
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

                      <h2 className='text-gray-700p pb-2'>Skill</h2>
                      <RefinementList
                        attribute="skills"
                        limit={10}
                        showMore={true}
                        showMoreLimit={20}
                      />
                      <Divider />

                      <h2 className='text-gray-700p pb-2'>Industry</h2>
                      <RefinementList
                        attribute="insightsV2"
                        limit={10}
                        showMore={true}
                        showMoreLimit={20}
                      />
                      <Divider />

                      <h2 className='text-gray-700p pb-2'>Salary</h2>
                      <RefinementList
                        attribute="tertiaryDescription"
                        limit={10}
                        showMore={true}
                        showMoreLimit={20}
                      />
                      {/* <Configure
                        hitsPerPage={6}
                        attributesToSnippet={["description:50"]}
                        snippetEllipsisText={"..."}
                        /> */}
                    </div>
                    <div className="w-full sm:w-[70%] md:w-[75%] lg:w-[80%] xl:w-[55%] px-0 sm:px-2">
                      <div className="flex justify-center items-center mb-[40px] mt-[40px]">
                        <SearchBox />
                      </div>
                      <div className="mb-4">
                        <Hits hitComponent={Hit} />
                      </div>
                      <Pagination showLast={true} />
                    </div>

                    <div className="w-full xl:w-[25%] mt-[170px]">
                      <div className=" border border-blue-600 bg-gray-50 rounded-md p-2 flex justify-between items-center mb-4">
                        <p className="font-bold text-[16px]">Suggeted Job</p>
                        <svg viewBox="64 64 896 896" focusable="false" data-icon="exclamation-circle" width="1em" height="1em" fill="currentColor" aria-hidden="true"><path d="M512 64C264.6 64 64 264.6 64 512s200.6 448 448 448 448-200.6 448-448S759.4 64 512 64zm0 820c-205.4 0-372-166.6-372-372s166.6-372 372-372 372 166.6 372 372-166.6 372-372 372z"></path><path d="M464 688a48 48 0 1096 0 48 48 0 10-96 0zm24-112h48c4.4 0 8-3.6 8-8V296c0-4.4-3.6-8-8-8h-48c-4.4 0-8 3.6-8 8v272c0 4.4 3.6 8 8 8z"></path></svg>
                      </div>
                      {suggestList === undefined ?
                        null
                        :
                        <div>
                          {suggestList.length > 0 ?
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
            </div>
          </div>
        </div>
        <div className="absolute right-0 top-0 z-[-1] opacity-30 lg:opacity-100">
          <svg
            width="450"
            height="556"
            viewBox="0 0 450 556"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <circle
              cx="277"
              cy="63"
              r="225"
              fill="url(#paint0_linear_25:217)"
            />
            <circle
              cx="17.9997"
              cy="182"
              r="18"
              fill="url(#paint1_radial_25:217)"
            />
            <circle
              cx="76.9997"
              cy="288"
              r="34"
              fill="url(#paint2_radial_25:217)"
            />
            <circle
              cx="325.486"
              cy="302.87"
              r="180"
              transform="rotate(-37.6852 325.486 302.87)"
              fill="url(#paint3_linear_25:217)"
            />
            <circle
              opacity="0.8"
              cx="184.521"
              cy="315.521"
              r="132.862"
              transform="rotate(114.874 184.521 315.521)"
              stroke="url(#paint4_linear_25:217)"
            />
            <circle
              opacity="0.8"
              cx="356"
              cy="290"
              r="179.5"
              transform="rotate(-30 356 290)"
              stroke="url(#paint5_linear_25:217)"
            />
            <circle
              opacity="0.8"
              cx="191.659"
              cy="302.659"
              r="133.362"
              transform="rotate(133.319 191.659 302.659)"
              fill="url(#paint6_linear_25:217)"
            />
            <defs>
              <linearGradient
                id="paint0_linear_25:217"
                x1="-54.5003"
                y1="-178"
                x2="222"
                y2="288"
                gradientUnits="userSpaceOnUse"
              >
                <stop stopColor="#4A6CF7" />
                <stop offset="1" stopColor="#4A6CF7" stopOpacity="0" />
              </linearGradient>
              <radialGradient
                id="paint1_radial_25:217"
                cx="0"
                cy="0"
                r="1"
                gradientUnits="userSpaceOnUse"
                gradientTransform="translate(17.9997 182) rotate(90) scale(18)"
              >
                <stop offset="0.145833" stopColor="#4A6CF7" stopOpacity="0" />
                <stop offset="1" stopColor="#4A6CF7" stopOpacity="0.08" />
              </radialGradient>
              <radialGradient
                id="paint2_radial_25:217"
                cx="0"
                cy="0"
                r="1"
                gradientUnits="userSpaceOnUse"
                gradientTransform="translate(76.9997 288) rotate(90) scale(34)"
              >
                <stop offset="0.145833" stopColor="#4A6CF7" stopOpacity="0" />
                <stop offset="1" stopColor="#4A6CF7" stopOpacity="0.08" />
              </radialGradient>
              <linearGradient
                id="paint3_linear_25:217"
                x1="226.775"
                y1="-66.1548"
                x2="292.157"
                y2="351.421"
                gradientUnits="userSpaceOnUse"
              >
                <stop stopColor="#4A6CF7" />
                <stop offset="1" stopColor="#4A6CF7" stopOpacity="0" />
              </linearGradient>
              <linearGradient
                id="paint4_linear_25:217"
                x1="184.521"
                y1="182.159"
                x2="184.521"
                y2="448.882"
                gradientUnits="userSpaceOnUse"
              >
                <stop stopColor="#4A6CF7" />
                <stop offset="1" stopColor="white" stopOpacity="0" />
              </linearGradient>
              <linearGradient
                id="paint5_linear_25:217"
                x1="356"
                y1="110"
                x2="356"
                y2="470"
                gradientUnits="userSpaceOnUse"
              >
                <stop stopColor="#4A6CF7" />
                <stop offset="1" stopColor="white" stopOpacity="0" />
              </linearGradient>
              <linearGradient
                id="paint6_linear_25:217"
                x1="118.524"
                y1="29.2497"
                x2="166.965"
                y2="338.63"
                gradientUnits="userSpaceOnUse"
              >
                <stop stopColor="#4A6CF7" />
                <stop offset="1" stopColor="#4A6CF7" stopOpacity="0" />
              </linearGradient>
            </defs>
          </svg>
        </div>
        <div className="absolute bottom-0 left-0 z-[-1] opacity-30 lg:opacity-100">
          <svg
            width="364"
            height="201"
            viewBox="0 0 364 201"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M5.88928 72.3303C33.6599 66.4798 101.397 64.9086 150.178 105.427C211.155 156.076 229.59 162.093 264.333 166.607C299.076 171.12 337.718 183.657 362.889 212.24"
              stroke="url(#paint0_linear_25:218)"
            />
            <path
              d="M-22.1107 72.3303C5.65989 66.4798 73.3965 64.9086 122.178 105.427C183.155 156.076 201.59 162.093 236.333 166.607C271.076 171.12 309.718 183.657 334.889 212.24"
              stroke="url(#paint1_linear_25:218)"
            />
            <path
              d="M-53.1107 72.3303C-25.3401 66.4798 42.3965 64.9086 91.1783 105.427C152.155 156.076 170.59 162.093 205.333 166.607C240.076 171.12 278.718 183.657 303.889 212.24"
              stroke="url(#paint2_linear_25:218)"
            />
            <path
              d="M-98.1618 65.0889C-68.1416 60.0601 4.73364 60.4882 56.0734 102.431C120.248 154.86 139.905 161.419 177.137 166.956C214.37 172.493 255.575 186.165 281.856 215.481"
              stroke="url(#paint3_linear_25:218)"
            />
            <circle
              opacity="0.8"
              cx="214.505"
              cy="60.5054"
              r="49.7205"
              transform="rotate(-13.421 214.505 60.5054)"
              stroke="url(#paint4_linear_25:218)"
            />
            <circle cx="220" cy="63" r="43" fill="url(#paint5_radial_25:218)" />
            <defs>
              <linearGradient
                id="paint0_linear_25:218"
                x1="184.389"
                y1="69.2405"
                x2="184.389"
                y2="212.24"
                gradientUnits="userSpaceOnUse"
              >
                <stop stopColor="#4A6CF7" stopOpacity="0" />
                <stop offset="1" stopColor="#4A6CF7" />
              </linearGradient>
              <linearGradient
                id="paint1_linear_25:218"
                x1="156.389"
                y1="69.2405"
                x2="156.389"
                y2="212.24"
                gradientUnits="userSpaceOnUse"
              >
                <stop stopColor="#4A6CF7" stopOpacity="0" />
                <stop offset="1" stopColor="#4A6CF7" />
              </linearGradient>
              <linearGradient
                id="paint2_linear_25:218"
                x1="125.389"
                y1="69.2405"
                x2="125.389"
                y2="212.24"
                gradientUnits="userSpaceOnUse"
              >
                <stop stopColor="#4A6CF7" stopOpacity="0" />
                <stop offset="1" stopColor="#4A6CF7" />
              </linearGradient>
              <linearGradient
                id="paint3_linear_25:218"
                x1="93.8507"
                y1="67.2674"
                x2="89.9278"
                y2="210.214"
                gradientUnits="userSpaceOnUse"
              >
                <stop stopColor="#4A6CF7" stopOpacity="0" />
                <stop offset="1" stopColor="#4A6CF7" />
              </linearGradient>
              <linearGradient
                id="paint4_linear_25:218"
                x1="214.505"
                y1="10.2849"
                x2="212.684"
                y2="99.5816"
                gradientUnits="userSpaceOnUse"
              >
                <stop stopColor="#4A6CF7" />
                <stop offset="1" stopColor="#4A6CF7" stopOpacity="0" />
              </linearGradient>
              <radialGradient
                id="paint5_radial_25:218"
                cx="0"
                cy="0"
                r="1"
                gradientUnits="userSpaceOnUse"
                gradientTransform="translate(220 63) rotate(90) scale(43)"
              >
                <stop offset="0.145833" stopColor="white" stopOpacity="0" />
                <stop offset="1" stopColor="white" stopOpacity="0.08" />
              </radialGradient>
            </defs>
          </svg>
        </div>
      </section>
    </>
  );
};

export default Hero;


