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
import { landingInfo } from '@/store/action/user/landing/landingInfo'
import { message, Alert, Tooltip } from 'antd';
import PriceCard from '@/components/Hero/priceCard'
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
  'https://ms-d932cad3594f-8320.sfo.meilisearch.io',
  '45679470fdc94d8c90ef03712354389f8d209067',
  {
    finitePagination: true
  }
);

const text = <span>For accurate job suggestion, please update your location and add your skills in your profile</span>;

const Hero = ({ setIsDetail }: any) => {

  const [suggestList, setSuggestList] = useState<any>(undefined);

  const [total, setTotal] = useState(0);
  const [today, setToday] = useState(0);
  const [companyCount, setCompanyCount] = useState(0);
  const [industry, setIndustry] = useState(0);
  const [locatedin, setLocatedin] = useState(null);
  const [skil, setSkil] = useState(null);
  const [messageApi, contextHolder] = message.useMessage();

  const [userData, setUserData] = useState<any>({});
  const { user } = useUser();

  const email = user?.primaryEmailAddress?.emailAddress;
  const clerkId = user?.id;

  useEffect(() => {

    if (email) {
      fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/stripe/get-user`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          // Add any additional headers if needed
        },
        body: JSON.stringify({
          email,
        }),
      })
        .then(response => {
          if (!response.ok) {
            throw new Error('Network response was not ok');
          }
          return response.json(); // Parse the response body as JSON
        })
        .then(data => {
          // Handle the response data
          console.log("setUserData", data.user);
          //redirect to checkout page
          setUserData(data.user);
        })
        .catch(error => {
          // Handle errors
          console.error('There was a problem with the fetch operation:', error);
        });
    }
  }, [email])

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
    <div key={hit.jobId} className='shadow-lg'>
      <JobCard
        item={hit}
        setIsDetail={(data: any) => setIsDetail(data)}
      />
    </div>
  );

  return (
    <>
      <section
        id="home"
        className="relative z-10 overflow-hidden bg-white pb-16 pt-[100px] md:pb-[120px] md:pt-[120px] xl:pb-[160px] xl:pt-[140px] 2xl:pb-[200px] 2xl:pt-[160px]"
      >
        {contextHolder}
        <div className="mx-auto">
          <div className="-mx-4 flex flex-wrap">
            <div className="w-full px-4">

              <div className="mx-auto max-w-[1200px] text-center">
                <h1 className="mb-5 text-center text-lg font-bold leading-tight text-black dark:text-white sm:text-2xl sm:leading-tight md:text-4xl md:leading-tight">
                  Connecting Talent to Opportunity
                </h1>
                <h4 className="mb-5 text-center text-md font-bold leading-tight text-black dark:text-white sm:text-sm sm:leading-tight md:text-4xl md:leading-tight">
                  Your Gateway to Success
                </h4>
              </div>

              <div className="container w-full">
                <InstantSearch
                  indexName="title"
                  searchClient={searchClient}
                >

                  <div className="mx-auto max-w-[998px] mt-[60px]">

                    <SearchBox translations={{ placeholder: "Search by Job Title, Keywords, Company in Canada" }} />

                  </div>

                  <div className='flex justify-center items-center pb-8'>
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

                      <h2 className='text-gray-700p pb-2'>Job Type</h2>
                      {/* <RefinementList attribute="location" /> */}
                      <RefinementList
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
                      />
                      <Divider />

                      <h2 className='text-gray-700p pb-2'>City</h2>
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

                      <h2 className='text-gray-700p pb-2'>Skill</h2>
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
                      <Divider />

                      <h2 className='text-gray-700p pb-2'>Salary</h2>
                      <RefinementList
                        attribute="tertiaryDescription"
                        limit={3}
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

                      <Carousel />

                      <div className="mb-4">
                        <Hits hitComponent={Hit} />
                      </div>
                      <div className='flex justify-center mb-12'>
                        {userData && Object.keys(userData).length > 0 ?
                          <Pagination showLast={true} limit={3} offset={0} />
                          :
                          null
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
              <Features />

              {/* <PriceCard /> */}
              <Testimonials />
              <section id="price"></section>

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
              </div>
            </div>
          </div>
        </div>
        {/* <div className="absolute right-0 top-0 z-[-1] opacity-30 lg:opacity-100">
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
        </div> */}
        <div className="absolute top-[500px] left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-[-1] opacity-30 lg:opacity-100">
          <svg
            viewBox="0 0 1422 800"
            opacity="0.38"
            width="1000"
            height="1000"
            fill="none"
            xmlns="http://www.w3.org/2000/svg">
            <defs><linearGradient x1="50%" y1="0%" x2="50%" y2="100%" id="ccchaos-grad"><stop stopColor="hsl(205, 69%, 60%)" stopOpacity="1" offset="0%"></stop><stop stopColor="hsl(205, 69%, 80%)" stopOpacity="1" offset="100%"></stop></linearGradient></defs><g strokeWidth="1" stroke="url(#ccchaos-grad)" fill="none" strokeLinecap="round"><path d="M721.47 -67.74Q736.65 -62.05 751.07 -56.29 764.54 -50.35 776.95 -44.13 788.25 -37.55 798.48 -30.53 807.76 -23.03 816.27 -15.01 824.27 -6.5 832.05 2.48 839.94 11.86 848.29 21.54 857.41 31.4 867.58 41.3 879.02 51.09 891.85 60.63 906.12 69.77 921.76 78.37 938.63 86.35 956.46 93.61 974.93 100.13 993.66 105.92 1012.22 111.01 1030.19 115.5 1047.19 119.5 1062.87 123.2 1076.98 126.75 1089.35 130.37 1099.94 134.26 1108.85 138.61 1116.26 143.61 1122.49 149.41 1108.08 163.25 1095.22 177.09 1087.31 190.94 1086.44 204.78 1092.83 218.62 1104.8 232.46 1119.19 246.31 1132.21 260.15 1140.42 273.99 1141.66 287.84 1135.6 301.68 1123.84 315.52 1109.48 329.36 1096.31 343.21 1087.8 357.05 1086.19 370.89 1091.92 384.74 1103.46 398.58 1117.78 412.42 1131.1 426.27 1139.91 440.11 1141.87 453.95 1136.49 467.79 1125.17 481.64 1110.89 495.48 1097.44 509.32 1088.35 523.17 1086.02 537.01 1091.06 550.85 1102.15 564.7 1116.37 578.54 1129.95 592.38 1122.43 601.91 1113.37 613.48 1102.56 626.91 1089.94 641.9 1075.58 658.07 1059.63 674.96 1042.39 692.08 1024.2 708.92 1005.47 724.96 986.63 739.72 968.11 752.8 950.28 763.84 933.48 772.64 917.95 779.05 903.84 783.11 891.21 784.93 879.99 784.77 870.04 783 861.12 780.07 852.96 776.49 837.43 770.21 821.14 767.05 811.83 768.52 801.52 772.32 790.11 778.67 777.56 787.66 763.92 799.24 749.33 813.2 733.97 829.24 718.08 846.92 708.2 851.26 697.5 855.79 685.91 859.9 673.41 863.01 660.04 864.58 645.92 864.18 631.2 861.48 616.07 856.27 600.73 848.48 585.39 838.18 570.25 825.55 555.47 810.91 541.18 794.68 527.46 777.34 514.33 759.44 501.79 741.53 489.78 724.16 478.2 707.87 466.93 693.09 455.83 680.2 444.77 669.46 433.62 661.01 422.27 654.89 410.64 650.99 398.69 649.11 386.41 648.92 373.81 650.04 360.95 652.01 347.9 654.33 334.75 656.49 321.59 658.02 308.5 658.45 308.06 643.46 307.61 628.47 307.25 613.48 307.09 598.49 307.17 583.5 307.46 568.51 307.89 553.52 308.34 538.53 308.7 523.54 308.88 508.55 308.81 493.56 308.53 478.57 308.11 463.58 307.65 448.59 307.28 433.6 307.1 418.61 307.15 403.62 307.42 388.63 307.84 373.64 308.3 358.65 308.68 343.66 308.87 328.68 308.83 313.69 308.57 298.7 308.15 283.71 307.69 268.72 307.31 253.73 307.1 238.74 307.13 223.75 307.39 208.76 307.8 193.77 308.26 178.78 321.29 167.86 334.46 156.67 347.69 145.44 360.89 134.37 373.98 123.67 386.85 113.48 399.43 103.95 411.69 95.17 423.58 87.19 435.13 80.01 446.39 73.58 457.44 67.82 468.39 62.63 479.38 57.87 490.54 53.37 502.03 48.98 513.96 44.53 526.43 39.89 539.52 34.9 553.23 29.48 567.55 23.55 582.38 17.06 597.6 10.01 613.05 2.42 628.51 -5.64 643.79 -14.12 658.66 -22.92 672.93 -31.91 686.43 -41 699.04 -50.06 716.09 -63.37 721.47 -67.74" strokeDasharray="0 0" transform="rotate(0, 711, 400)" opacity="0.05"></path><path d="M725.37 -50.15Q737.88 -44.85 749.45 -39.46 760.06 -33.89 769.76 -28.04 778.67 -21.82 786.95 -15.16 794.82 -8.03 802.56 -0.38 810.43 7.76 818.71 16.39 827.69 25.44 837.59 34.81 848.6 44.42 860.83 54.13 874.33 63.79 889.05 73.29 904.89 82.46 921.63 91.18 939.02 99.34 956.73 106.86 974.42 113.66 991.74 119.74 1008.32 125.1 1023.86 129.79 1038.1 133.91 1050.86 137.57 1062.06 140.94 1071.69 144.17 1086.32 151.2 1098.15 159.51 1084.98 172.87 1075.12 186.24 1070.96 199.61 1073.52 212.98 1082.18 226.35 1094.82 239.71 1108.36 253.08 1119.49 266.45 1125.48 279.82 1124.88 293.19 1117.84 306.55 1106.07 319.92 1092.44 333.29 1080.29 346.66 1072.59 360.03 1071.21 373.4 1076.49 386.76 1087.15 400.13 1100.57 413.5 1113.48 426.87 1122.73 440.24 1126.06 453.61 1122.65 466.98 1113.34 480.34 1100.4 493.71 1086.99 507.08 1076.39 520.45 1071.19 533.82 1072.65 547.19 1080.42 560.56 1092.61 573.92 1106.23 587.29 1100.21 598.72 1093.16 611.78 1084.8 626.2 1074.93 641.66 1063.45 657.74 1050.39 674.01 1035.85 690.03 1020.02 705.35 1003.19 719.54 985.67 732.24 967.83 743.15 950.03 752.05 932.62 758.8 915.93 763.4 900.2 765.93 885.64 766.56 872.34 765.59 860.34 763.38 849.58 760.36 839.92 757.01 823.27 751.87 807.75 750.12 799.94 752.23 791.67 756.52 782.72 763.17 772.93 772.21 762.2 783.58 750.47 797.09 737.79 812.47 724.22 829.32 712.76 833.3 700.41 837.48 687.22 841.31 673.32 844.29 658.86 845.93 644.03 845.86 629.03 843.74 614.04 839.39 599.26 832.7 584.85 823.69 570.92 812.49 557.57 799.34 544.83 784.55 532.7 768.53 521.12 751.73 510.01 734.64 499.27 717.74 488.76 701.51 478.35 686.38 467.92 672.72 457.34 660.85 446.52 650.96 435.39 643.16 423.91 637.47 412.08 633.78 399.93 631.9 387.49 631.57 374.85 632.42 362.09 634.08 349.28 636.1 336.53 638.06 323.88 639.51 323.18 625.26 322.55 611.01 322.15 596.76 322.08 582.51 322.35 568.26 322.89 554.01 323.58 539.76 324.25 525.51 324.73 511.26 324.91 497.01 324.73 482.76 324.26 468.51 323.59 454.27 322.9 440.02 322.35 425.77 322.08 411.52 322.15 397.27 322.55 383.02 323.17 368.77 323.88 354.52 324.48 340.27 324.85 326.02 324.88 311.77 324.57 297.52 323.99 283.27 323.3 269.03 322.64 254.78 322.2 240.53 322.07 226.28 322.28 212.03 322.79 197.78 323.47 183.53 336.03 172.57 348.75 161.59 361.59 150.79 374.47 140.36 387.3 130.44 400 121.16 412.47 112.6 424.65 104.82 436.49 97.82 447.94 91.57 459.03 85.99 469.79 81 480.29 76.46 490.62 72.24 500.91 68.19 511.3 64.14 521.92 59.96 532.91 55.5 544.38 50.67 556.42 45.37 569.09 39.54 582.4 33.15 596.32 26.21 610.76 18.74 625.6 10.81 640.68 2.47 655.81 -6.15 670.79 -14.98 685.42 -23.89 699.49 -32.79 719.11 -45.86 725.37 -50.15" strokeDasharray="0 0" transform="rotate(1.8, 711, 400)" opacity="0.09"></path><path d="M723.61 -32.56Q733.46 -27.64 742.57 -22.62 751.04 -17.41 759.04 -11.91 766.77 -6.06 774.45 0.21 782.31 6.97 790.6 14.23 799.53 22 809.3 30.24 820.06 38.92 831.89 47.96 844.83 57.27 858.84 66.74 873.84 76.24 889.64 85.63 906.04 94.79 922.78 103.59 939.55 111.92 956.06 119.66 972 126.76 987.11 133.16 1001.13 138.85 1013.91 143.85 1025.32 148.21 1035.33 152.01 1050.95 158.37 1063.61 164.32 1066.15 175.72 1056.99 196.9 1056.48 209.84 1061.94 222.77 1072.14 235.71 1084.8 248.64 1097.05 261.58 1106.13 274.51 1109.99 287.45 1107.77 300.39 1099.96 313.32 1088.33 326.26 1075.49 339.19 1064.35 352.13 1057.41 365.06 1056.24 378 1061.1 390.93 1070.9 403.87 1083.42 416.81 1095.85 429.74 1105.38 442.68 1109.87 455.61 1108.29 468.55 1101.01 481.48 1089.67 494.42 1076.82 507.35 1065.37 520.29 1057.89 533.22 1056.07 546.16 1060.32 559.09 1069.68 572.03 1082.05 584.97 1076.79 597.74 1071.04 611.67 1064.47 626.47 1056.83 641.78 1047.91 657.22 1037.6 672.4 1025.87 686.92 1012.76 700.44 998.41 712.63 983.01 723.21 966.81 732 950.1 738.86 933.2 743.77 916.4 746.78 900.01 748.02 884.28 747.72 869.42 746.17 855.6 743.71 842.88 740.76 831.31 737.75 820.82 735.1 811.31 733.24 794.74 734.36 779.3 740.87 771.64 747.75 763.65 756.79 755.14 767.92 745.95 780.97 735.97 795.69 725.15 811.72 712.02 815.36 698.25 819.19 684 822.75 669.45 825.58 654.79 827.27 640.2 827.46 625.86 825.87 611.91 822.29 598.46 816.61 585.6 808.81 573.35 798.97 561.71 787.27 550.65 773.93 540.07 759.29 529.88 743.71 519.96 727.59 510.19 711.38 500.42 695.48 490.55 680.3 480.46 666.2 470.09 653.51 459.37 642.46 448.28 633.22 436.83 625.87 425.05 620.42 412.98 616.78 400.71 614.79 388.3 614.21 375.84 614.75 363.42 616.06 351.09 617.78 338.93 619.53 338.04 606.03 337.36 592.53 337.06 579.03 337.19 565.53 337.73 552.03 338.55 538.52 339.47 525.02 340.29 511.52 340.81 498.02 340.93 484.52 340.6 471.02 339.92 457.52 339.03 444.02 338.13 430.51 337.42 417.01 337.07 403.51 337.16 390.01 337.65 376.51 338.46 363.01 339.38 349.5 340.21 336 340.78 322.5 340.94 309 340.66 295.5 340.01 282 339.12 268.49 338.21 254.99 337.48 241.49 337.09 227.99 337.13 214.49 337.58 200.99 338.36 187.48 350.41 176.79 362.65 166.31 375.05 156.2 387.56 146.6 400.1 137.64 412.59 129.38 424.94 121.86 437.08 115.11 448.92 109.08 460.41 103.73 471.52 98.96 482.24 94.66 492.58 90.71 502.62 86.95 512.42 83.26 522.08 79.49 531.75 75.51 541.53 71.2 551.58 66.47 562.01 61.26 572.94 55.5 584.44 49.2 596.58 42.35 609.37 35 622.77 27.19 636.71 19.01 651.08 10.54 665.74 1.89 680.51 -6.83 695.21 -15.54 716.62 -28.35 723.61 -32.56" strokeDasharray="0 0" transform="rotate(3.6, 711, 400)" opacity="0.13"></path><path d="M716.86 -14.98Q724.89 -10.42 732.62 -5.75 740.2 -0.9 747.85 4.23 755.74 9.72 764.09 15.62 773.06 21.99 782.81 28.85 793.43 36.21 805.01 44.05 817.56 52.33 831.03 61 845.34 69.97 860.34 79.15 875.85 88.43 891.65 97.67 907.5 106.77 923.13 115.6 938.3 124.03 952.76 131.98 966.31 139.35 978.8 146.09 990.1 152.14 1000.18 157.51 1016.29 166.03 1029.55 172.96 1040.34 178.4 1051.41 183.83 1043.72 196.36 1040.96 208.9 1043.71 221.43 1051.39 233.96 1062.41 246.49 1074.48 259.02 1085.11 271.55 1092.08 284.08 1093.95 296.62 1090.34 309.15 1081.99 321.68 1070.63 334.21 1058.62 346.74 1048.45 359.27 1042.24 371.8 1041.25 384.33 1045.72 396.87 1054.69 409.4 1066.33 421.93 1078.2 434.46 1087.86 446.99 1093.29 459.52 1093.37 472.05 1088.09 484.58 1078.53 497.11 1066.69 509.65 1055.01 522.18 1045.93 534.71 1041.31 547.24 1042.13 559.77 1048.2 572.3 1058.28 584.83 1053.09 598.32 1047.91 612.5 1042.41 627.06 1036.31 641.66 1029.37 655.97 1021.38 669.66 1012.22 682.42 1001.8 693.97 990.14 704.07 977.31 712.57 963.42 719.34 948.65 724.36 933.23 727.64 917.41 729.3 901.44 729.51 885.59 728.51 870.1 726.59 855.18 724.08 841.03 721.34 827.76 718.75 815.45 716.68 804.14 715.5 793.79 715.52 784.33 717.04 775.61 720.27 767.5 725.36 759.79 732.41 752.29 741.41 744.79 752.27 737.1 764.85 729.05 778.91 720.48 794.14 706.42 797.45 692.16 800.94 677.89 804.23 663.78 806.9 649.97 808.6 636.59 809.02 623.75 807.87 611.5 804.98 599.87 800.22 588.85 793.55 578.39 785 568.42 774.68 558.83 762.77 549.52 749.53 540.36 735.24 531.23 720.25 522.01 704.91 512.6 689.58 502.91 674.64 492.89 660.42 482.49 647.23 471.7 635.33 460.55 624.93 449.07 616.17 437.32 609.11 425.37 603.76 413.3 600.05 401.18 597.84 389.1 596.94 377.11 597.1 358.99 592.35 352.14 573.9 352.06 561.14 352.49 548.38 353.33 535.62 354.42 522.85 355.52 510.09 356.41 497.33 356.9 484.57 356.89 471.8 356.39 459.04 355.49 446.28 354.39 433.51 353.3 420.75 352.47 407.99 352.05 395.23 352.15 382.46 352.72 369.7 353.67 356.94 354.79 344.18 355.84 331.41 356.62 318.65 356.96 305.89 356.78 293.12 356.13 280.36 355.15 267.6 354.02 254.84 353 242.07 352.28 229.31 352.03 216.55 352.28 203.78 353 191.02 364.47 180.9 376.16 171.18 388.05 161.97 400.11 153.39 412.27 145.49 424.48 138.32 436.65 131.87 448.7 126.13 460.54 121.04 472.11 116.53 483.34 112.48 494.19 108.79 504.63 105.33 514.68 101.96 524.36 98.56 533.74 94.99 542.9 91.15 551.93 86.94 560.97 82.28 570.13 77.11 579.56 71.41 589.36 65.18 599.65 58.41 610.51 51.17 621.98 43.49 634.11 35.47 646.85 27.18 660.17 18.71 673.97 10.17 688.12 1.65 709.66 -10.86 716.86 -14.98" strokeDasharray="0 0" transform="rotate(5.3999999999999995, 711, 400)" opacity="0.16"></path><path d="M707.79 2.6Q715.29 6.8 722.95 11.12 730.94 15.63 739.4 20.41 748.48 25.54 758.28 31.06 768.88 37.03 780.31 43.48 792.57 50.41 805.61 57.83 819.34 65.69 833.63 73.95 848.33 82.54 863.25 91.38 878.17 100.38 892.88 109.42 907.18 118.39 920.86 127.18 933.75 135.67 945.72 143.77 956.66 151.38 966.53 158.43 975.33 164.85 983.12 170.62 995.91 179.91 1007.11 187.43 1018.1 192.83 1030.52 197.66 1026.32 209.8 1026.99 221.94 1032.42 234.08 1041.56 246.22 1052.69 258.36 1063.69 270.5 1072.46 282.64 1077.34 294.78 1077.41 306.92 1072.65 319.06 1063.96 331.2 1053 343.34 1041.85 355.48 1032.62 367.62 1027.08 379.76 1026.27 391.9 1030.35 404.05 1038.55 416.19 1049.3 428.33 1060.56 440.47 1070.19 452.61 1076.37 464.75 1077.91 476.89 1074.53 489.03 1066.87 501.17 1056.38 513.31 1045.06 525.45 1035.05 537.59 1028.27 549.73 1025.99 561.87 1028.66 574.01 1035.76 586.15 1030.08 599.71 1024.8 613.52 1019.65 627.28 1014.36 640.7 1008.68 653.5 1002.38 665.43 995.26 676.24 987.18 685.75 978.05 693.81 967.82 700.32 956.5 705.26 944.17 708.64 930.93 710.54 916.95 711.12 902.39 710.55 887.49 709.08 872.44 706.99 857.47 704.58 842.79 702.16 828.58 700.07 814.99 698.61 802.15 698.1 790.14 698.78 778.98 700.88 768.67 704.58 759.15 709.99 750.35 717.15 742.13 726.06 734.36 736.63 726.87 748.71 719.49 762.11 712.07 776.55 698.28 779.54 684.76 782.72 671.61 785.73 658.95 788.25 646.86 789.94 635.37 790.52 624.49 789.77 614.2 787.49 604.44 783.56 595.15 777.92 586.22 770.56 577.55 761.57 569.01 751.06 560.49 739.22 551.88 726.28 543.08 712.5 534.01 698.19 524.59 683.65 514.8 669.2 504.62 655.16 494.06 641.8 483.14 629.39 471.91 618.15 460.43 608.25 448.78 599.82 437.02 592.91 425.25 587.54 413.52 583.64 401.9 581.13 390.44 579.83 373.25 573.79 367 555.97 367.27 543.93 368.05 531.88 369.2 519.83 370.5 507.79 371.71 495.74 372.59 483.69 372.98 471.65 372.8 459.6 372.09 447.55 370.98 435.51 369.68 423.46 368.45 411.41 367.51 399.37 367.04 387.32 367.13 375.27 367.77 363.22 368.83 351.18 370.11 339.13 371.37 327.08 372.37 315.04 372.92 302.99 372.91 290.94 372.35 278.89 371.34 266.85 370.08 254.8 368.8 242.75 367.74 230.71 367.12 218.66 367.04 206.61 367.53 194.56 378.36 185.29 389.43 176.55 400.71 168.41 412.21 160.95 423.89 154.18 435.69 148.11 447.55 142.71 459.4 137.94 471.16 133.71 482.76 129.95 494.11 126.53 505.14 123.35 515.82 120.29 526.09 117.22 535.95 114.02 545.41 110.59 554.51 106.84 563.29 102.67 571.85 98.04 580.29 92.91 588.71 87.25 597.23 81.06 605.99 74.38 615.09 67.24 624.63 59.71 634.72 51.85 645.4 43.74 656.72 35.47 668.66 27.14 681.21 18.83 701.04 6.61 707.79 2.6" strokeDasharray="0 0" transform="rotate(7.2, 711, 400)" opacity="0.20"></path><path d="M699.99 20.19Q708.13 24.06 716.78 28.04 726.03 32.21 735.94 36.64 746.57 41.4 757.91 46.54 769.94 52.11 782.61 58.14 795.82 64.63 809.47 71.6 823.39 79.01 837.44 86.83 851.43 95 865.19 103.46 878.55 112.12 891.34 120.89 903.43 129.67 914.71 138.35 925.09 146.84 934.54 155.02 943.06 162.8 950.7 170.12 963.45 182.75 974.71 193.54 985.45 201.31 997.18 207.54 1007.7 216.93 1014.89 235.64 1022.27 247.39 1032.11 259.14 1042.72 270.89 1052.24 282.64 1059.04 294.38 1061.93 306.13 1060.4 317.88 1054.73 329.63 1045.9 341.37 1035.44 353.12 1025.16 364.87 1016.85 376.62 1011.94 388.37 1011.29 400.11 1015.01 411.86 1022.46 423.61 1032.34 435.36 1042.94 447.1 1052.42 458.85 1059.14 470.6 1061.94 482.35 1060.32 494.09 1054.58 505.84 1045.69 517.59 1035.21 529.34 1024.96 541.08 1016.7 552.83 1011.88 564.58 1011.32 576.33 1015.13 588.07 1008.57 601.11 1002.68 613.99 997.26 626.49 992.09 638.36 986.94 649.39 981.59 659.39 975.83 668.2 969.49 675.7 962.4 681.81 954.46 686.52 945.6 689.84 935.77 691.84 925.01 692.63 913.36 692.38 900.91 691.28 887.8 689.56 874.17 687.47 860.2 685.29 846.07 683.29 831.95 681.74 818.03 680.92 804.45 681.04 791.36 682.34 778.88 684.98 767.07 689.08 755.99 694.74 745.65 701.96 736.03 710.74 727.07 720.98 718.69 732.56 710.78 745.29 703.23 758.96 690.92 761.65 679.14 764.52 667.95 767.28 657.36 769.62 647.36 771.27 637.92 771.99 628.97 771.57 620.43 769.82 612.2 766.63 604.18 761.93 596.25 755.68 588.32 747.94 580.26 738.77 572 728.31 563.46 716.73 554.58 704.24 545.31 691.08 535.65 677.5 525.6 663.78 515.18 650.18 504.44 636.96 493.42 624.37 482.19 612.63 470.83 601.92 459.4 592.4 447.98 584.18 436.64 577.32 425.43 571.82 414.39 567.67 403.56 564.77 387.48 556.95 382.1 539.52 382.77 528.16 383.9 516.79 385.32 505.43 386.76 494.06 387.99 482.7 388.78 471.33 389 459.97 388.62 448.6 387.69 437.24 386.38 425.87 384.92 414.51 383.56 403.14 382.53 391.78 382.02 380.41 382.11 369.04 382.79 357.68 383.93 346.31 385.35 334.95 386.79 323.58 388.01 312.22 388.79 300.85 389 289.49 388.6 278.12 387.67 266.76 386.35 255.39 384.89 244.03 383.53 232.66 382.52 221.3 382.01 209.93 382.12 198.56 392.26 190.35 402.62 182.74 413.22 175.78 424.05 169.49 435.1 163.85 446.35 158.85 457.74 154.44 469.23 150.55 480.75 147.09 492.23 143.96 503.58 141.07 514.74 138.29 525.63 135.53 536.2 132.66 546.39 129.6 556.17 126.24 565.54 122.52 574.51 118.37 583.1 113.74 591.37 108.62 599.4 102.98 607.27 96.85 615.09 90.25 622.97 83.23 631.02 75.84 639.36 68.15 648.08 60.24 657.29 52.18 667.05 44.07 677.41 35.99 694.19 24.09 699.99 20.19" strokeDasharray="0 0" transform="rotate(9, 711, 400)" opacity="0.24"></path><path d="M696.53 37.78Q705.98 41.32 716.03 44.98 726.7 48.82 737.96 52.91 749.78 57.31 762.08 62.07 774.79 67.23 787.77 72.83 800.92 78.88 814.09 85.38 827.13 92.32 839.9 99.67 852.26 107.39 864.08 115.43 875.27 123.7 885.72 132.14 895.4 140.66 904.27 149.15 912.33 157.54 919.64 165.73 926.26 173.61 932.31 181.12 943.16 194.44 953.66 206.1 965.39 214.82 978.87 221.88 986.99 224.56 996.05 226.87 998.4 238.21 1004.31 249.55 1012.84 260.89 1022.66 272.23 1032.22 283.57 1040.01 294.91 1044.8 306.25 1045.85 317.59 1042.98 328.93 1036.65 340.27 1027.85 351.61 1017.98 362.95 1008.58 374.29 1001.13 385.63 996.81 396.97 996.31 408.31 999.69 419.65 1006.42 430.99 1015.45 442.33 1025.36 453.67 1034.57 465.01 1041.65 476.35 1045.48 487.69 1045.45 499.03 1041.56 510.37 1034.44 521.71 1025.21 533.05 1015.3 544.39 1006.3 555.73 999.61 567.07 996.28 578.41 996.85 589.75 989.2 601.72 982.37 613.25 976.22 624.14 970.6 634.22 965.33 643.33 960.23 651.35 949.58 663.18 937.83 671.29 922.93 673.66 905.68 673.24 895.62 671.83 884.78 670.05 873.23 668.12 861.07 666.29 848.43 664.77 835.43 663.8 822.22 663.6 808.95 664.35 795.76 666.21 782.81 669.32 770.2 673.76 758.04 679.6 746.42 686.84 735.4 695.45 725 705.34 715.22 716.4 706.06 728.47 697.46 741.37 687.33 743.78 677.78 746.36 660.48 750.74 644.43 753.44 629.56 751.37 614.8 745.6 607.24 740.37 599.44 733.78 591.34 725.89 582.89 716.76 574.05 706.54 564.82 695.38 555.19 683.45 545.2 670.97 534.88 658.16 524.28 645.24 513.46 632.45 502.49 619.99 491.43 608.09 480.36 596.92 469.34 586.66 458.43 577.42 447.68 569.32 437.11 562.41 426.77 556.73 416.65 552.24 401.88 542.41 397.54 525.19 398.62 514.47 400.07 503.74 401.68 493.02 403.17 482.29 404.32 471.57 404.95 460.84 404.95 450.12 404.34 439.4 403.19 428.67 401.7 417.95 400.1 407.22 398.64 396.5 397.55 385.77 397 375.05 397.08 364.32 397.78 353.6 398.99 342.87 400.51 332.15 402.1 321.42 403.53 310.7 404.55 299.97 405.01 289.25 404.85 278.52 404.07 267.8 402.81 257.07 401.26 246.35 399.68 235.62 398.3 224.9 397.34 214.17 396.96 203.45 406.37 196.44 415.98 190.05 425.8 184.29 435.87 179.16 446.18 174.61 456.72 170.6 467.48 167.07 478.41 163.94 489.48 161.12 500.63 158.52 511.79 156.02 522.88 153.54 533.85 150.98 544.61 148.24 555.1 145.24 565.26 141.9 575.06 138.17 584.45 133.99 593.43 129.35 602.01 124.22 610.2 118.61 618.05 112.53 625.62 106.01 632.99 99.11 640.26 91.87 647.51 84.37 654.86 76.66 662.41 68.83 670.27 60.96 678.52 53.11 691.89 41.57 696.53 37.78" strokeDasharray="0 0" transform="rotate(10.799999999999999, 711, 400)" opacity="0.28"></path><path d="M698.79 55.37Q709.46 58.6 720.6 61.95 732.15 65.47 744.04 69.22 756.17 73.26 768.46 77.64 780.78 82.4 793.02 87.57 805.06 93.16 816.78 99.19 828.09 105.64 838.87 112.5 849.07 119.74 858.62 127.3 867.48 135.14 875.65 143.19 883.14 151.37 890 159.6 896.29 167.81 902.11 175.91 907.56 183.8 912.77 191.42 923.19 205.29 934.22 217.74 947.68 227.49 963.28 235.58 972.51 238.7 982.62 241.37 987.43 252.28 994.81 263.18 1003.71 274.09 1012.87 284.99 1020.98 295.9 1026.88 306.8 1029.74 317.7 1029.15 328.61 1025.2 339.51 1018.44 350.42 1009.83 361.32 1000.62 372.23 992.09 383.13 985.47 394.04 981.71 404.95 981.32 415.85 984.38 426.76 990.44 437.66 998.65 448.57 1007.83 459.47 1016.67 470.38 1023.93 481.28 1028.56 492.19 1029.91 503.09 1027.79 514 1022.49 524.9 1014.77 535.81 1005.73 546.71 996.66 557.62 988.85 568.52 983.4 579.43 981.1 590.33 972.36 600.84 964.46 610.71 957.33 619.78 950.89 627.95 939.7 640.69 929.35 650.16 918.88 654.33 907.49 655.71 893.47 653.72 877.44 650.7 868.2 649.06 858.27 647.65 847.7 646.67 836.56 646.29 824.95 646.69 812.97 648.01 800.72 650.38 788.33 653.9 775.93 658.62 763.62 664.58 751.52 671.78 739.73 680.17 728.33 689.69 717.39 700.22 706.95 711.64 697.03 723.77 681.73 728.2 667.38 732.46 653.75 734.46 640 734.03 625.23 728.36 609.5 719.13 600.98 712.42 592.08 704.58 582.79 695.68 573.14 685.84 563.18 675.2 552.95 663.92 542.5 652.16 531.91 640.13 521.23 628 510.53 615.97 499.87 604.23 489.31 592.95 478.9 582.29 468.66 572.39 458.65 563.37 448.86 555.33 439.3 548.33 429.98 542.39 416.62 530.56 413.39 513.45 414.85 503.32 416.54 493.19 418.23 483.07 419.67 472.94 420.65 462.81 421.05 452.68 420.8 442.55 419.94 432.42 418.58 422.29 416.93 412.16 415.22 402.03 413.69 391.9 412.55 381.78 411.98 371.65 412.06 361.52 412.76 351.39 413.99 341.26 415.58 331.13 417.3 321 418.91 310.87 420.17 300.75 420.91 290.62 421.02 280.49 420.49 270.36 419.38 260.23 417.87 250.1 416.16 239.97 414.5 229.84 417.01 211.78 429.72 198.67 438.73 194.09 447.96 190.04 457.43 186.47 467.14 183.34 477.11 180.56 487.3 178.06 497.7 175.74 508.28 173.52 518.98 171.31 529.75 169.01 540.53 166.56 551.26 163.86 561.86 160.85 572.27 157.49 582.42 153.71 592.27 149.49 601.76 144.82 610.87 139.68 619.57 134.09 627.87 128.06 635.77 121.65 643.31 114.87 650.54 107.8 657.51 100.49 664.31 93.01 671.01 85.42 677.71 77.8 684.51 70.21 695.15 59.04 698.79 55.37" strokeDasharray="0 0" transform="rotate(12.600000000000001, 711, 400)" opacity="0.32"></path><path d="M705.86 72.95Q717.03 75.89 728.4 78.93 739.87 82.14 751.35 85.57 762.76 89.26 773.99 93.27 784.96 97.63 795.58 102.36 805.77 107.5 815.47 113.05 824.62 119 833.2 125.35 841.19 132.07 848.59 139.13 855.43 146.48 861.77 154.08 867.65 161.86 873.17 169.76 878.41 177.7 883.5 185.61 888.54 193.41 893.66 201.03 898.97 208.4 904.61 215.45 910.68 222.11 917.28 228.35 924.5 234.1 932.4 239.36 941.03 244.09 950.41 248.29 960.53 251.97 971.38 255.16 977.85 265.6 985.87 276.03 994.43 286.47 1002.41 296.91 1008.81 307.34 1012.8 317.78 1013.88 328.21 1011.9 338.65 1007.12 349.09 1000.15 359.52 991.88 369.96 983.37 380.4 975.7 390.83 969.87 401.27 966.61 411.7 966.34 422.14 969.1 432.58 974.53 443.01 981.93 453.45 990.37 463.89 998.76 474.32 1006.03 484.76 1011.25 495.2 1013.75 505.63 1013.21 516.07 1009.7 526.51 1003.67 536.94 995.9 547.38 987.36 557.82 979.17 568.25 972.36 578.69 967.8 589.13 958.13 597.91 949.24 605.94 941.09 613.12 933.66 619.4 920.94 628.6 909.64 634.93 891.88 636.36 878.52 634.51 865.54 631.72 850.91 629.45 842.56 629.02 833.6 629.22 824.08 630.19 814.02 632.04 803.5 634.86 792.59 638.72 781.37 643.65 769.94 649.68 758.39 656.78 746.82 664.93 735.32 674.05 723.99 684.04 712.9 694.8 702.12 706.19 689.47 710.11 676.92 713.95 663.74 715.95 649.78 715.95 634.11 711.51 617.31 703.99 608.26 698.38 598.89 691.74 589.22 684.11 579.31 675.57 569.21 666.23 558.98 656.2 548.68 645.61 538.37 634.62 528.11 623.36 517.94 612.01 507.92 600.72 498.09 589.65 488.46 578.95 479.06 568.75 469.89 559.18 460.96 550.34 452.26 542.32 443.76 535.19 431.85 521.57 429.69 504.57 431.44 494.99 433.25 485.41 434.9 475.84 436.18 466.26 436.93 456.68 437.04 447.1 436.51 437.53 435.4 427.95 433.86 418.37 432.08 408.8 430.28 399.22 428.71 389.64 427.55 380.06 426.97 370.49 427.02 360.91 427.72 351.33 428.96 341.76 430.59 332.18 432.39 322.6 434.15 313.03 435.63 303.45 436.65 293.87 437.07 284.3 436.84 274.72 435.99 265.14 434.63 255.57 432.94 245.99 431.12 236.41 432.7 219.79 444.05 208.74 452.24 205.22 460.61 202.13 469.19 199.41 478 197 487.05 194.81 496.35 192.78 505.9 190.82 515.68 188.86 525.67 186.81 535.83 184.6 546.12 182.16 556.49 179.44 566.88 176.38 577.24 172.94 587.5 169.1 597.59 164.82 607.47 160.11 617.06 154.96 626.34 149.4 635.26 143.45 643.8 137.13 651.94 130.51 659.68 123.62 667.05 116.52 674.07 109.28 680.78 101.95 687.24 94.59 693.52 87.27 702.78 76.5 705.86 72.95" strokeDasharray="0 0" transform="rotate(14.4, 711, 400)" opacity="0.35"></path><path d="M714.97 90.55Q725.62 93.2 736.17 95.95 746.56 98.86 756.69 101.97 766.51 105.33 775.96 108.97 784.99 112.93 793.56 117.24 801.64 121.92 809.22 126.98 816.31 132.42 822.93 138.25 834.72 151.11 845.53 164.89 850.55 172.2 855.49 179.69 860.45 187.27 865.51 194.9 870.79 202.5 876.38 210.02 882.36 217.38 888.81 224.51 895.79 231.37 903.37 237.88 911.56 244.02 920.4 249.73 929.87 254.98 939.97 259.76 950.63 264.04 961.82 267.84 969.09 277.77 976.98 287.7 984.59 297.62 991.04 307.55 995.61 317.48 997.76 327.41 997.25 337.34 994.15 347.27 988.8 357.19 981.82 367.12 974 377.05 966.23 386.98 959.42 396.91 954.32 406.83 951.53 416.76 951.36 426.69 953.83 436.62 958.67 446.55 965.31 456.47 973 466.4 980.86 476.33 988 486.26 993.59 496.18 997 506.11 997.84 516.04 996.02 525.97 991.73 535.9 985.48 545.82 977.98 555.75 970.07 565.68 962.67 575.61 956.62 585.53 946.34 592.48 936.67 598.65 927.65 604 919.28 608.5 904.73 614.59 891.85 618.3 873.62 617.58 861.25 615.24 850.73 613.06 839.26 611.71 825.64 612.97 810.52 616.42 802.07 619.62 793.15 623.75 783.77 628.82 774 634.85 763.89 641.82 753.5 649.69 742.91 658.38 732.2 667.84 721.44 677.95 710.71 688.6 698.81 692.05 686.26 695.47 672.2 697.44 657.07 697.76 648.86 696.71 640.3 694.82 631.42 692.06 622.25 688.38 612.83 683.77 603.2 678.23 593.43 671.8 583.57 664.52 573.66 656.46 563.77 647.7 553.94 638.34 544.23 628.49 534.66 618.26 525.28 607.79 516.11 597.21 507.17 586.64 498.46 576.23 489.99 566.08 481.75 556.32 473.72 547.06 465.88 538.4 458.2 530.4 447.66 515.38 446.43 498.54 448.33 489.48 450.13 480.42 451.63 471.36 452.65 462.29 453.09 453.23 452.89 444.17 452.07 435.1 450.73 426.04 449.02 416.98 447.14 407.91 445.29 398.85 443.7 389.79 442.54 380.72 441.95 371.66 441.99 362.6 442.66 353.53 443.88 344.47 445.52 335.41 447.38 326.34 449.25 317.28 450.92 308.22 452.21 299.15 452.95 290.09 453.07 281.03 452.55 271.96 451.46 262.9 449.91 253.84 448.09 244.77 448.98 229.48 459.09 220.28 474.13 215.5 489.63 211.46 506.16 207.98 523.42 204.41 532.48 202.42 541.77 200.2 551.28 197.72 560.96 194.91 570.79 191.76 580.72 188.23 590.7 184.29 600.68 179.95 610.6 175.21 620.4 170.07 630.02 164.54 639.43 158.67 648.56 152.49 657.37 146.03 665.84 139.34 673.94 132.47 681.66 125.48 689 118.42 695.97 111.34 702.59 104.3 711.94 93.95 714.97 90.55" strokeDasharray="0 0" transform="rotate(16.2, 711, 400)" opacity="0.39"></path><path d="M722.5 108.14Q731.74 110.52 740.69 113 757.34 118.53 772.82 124.73 786.26 132.36 798.54 141 809.22 151.39 819.27 162.83 828.95 175.78 838.85 189.45 844.13 196.61 849.71 203.86 855.66 211.16 862.03 218.45 868.88 225.67 876.23 232.76 884.12 239.67 892.55 246.35 901.52 252.74 911.01 258.79 920.98 264.48 931.39 269.77 942.18 274.63 953.27 279.05 960.52 288.43 967.61 297.81 973.83 307.19 978.55 316.57 981.28 325.95 981.76 335.33 979.94 344.71 975.99 354.09 970.32 363.47 963.5 372.85 956.23 382.23 949.24 391.61 943.23 400.99 938.82 410.37 936.46 419.75 936.38 429.13 938.58 438.51 942.86 447.89 948.77 457.27 955.72 466.65 962.99 476.03 969.87 485.41 975.64 494.79 979.72 504.17 981.71 513.55 981.4 522.92 978.81 532.3 974.22 541.68 968.09 551.06 961.04 560.44 953.78 569.82 947.05 579.2 936.52 584.34 926.42 588.76 916.82 592.44 907.74 595.39 891.51 598.91 876.9 600.59 856.69 598.59 843.82 596.25 826.87 595.02 814.01 596.45 801.95 601.54 788.71 608.99 781.35 614.14 773.56 620.13 765.37 626.91 756.79 634.46 747.86 642.72 738.62 651.62 729.12 661.08 719.42 671.01 706.61 674.01 692.8 677.03 677.26 678.92 660.74 679.49 651.98 678.78 642.98 677.38 633.78 675.24 624.45 672.33 615.01 668.61 605.54 664.09 596.06 658.76 586.63 652.67 577.3 645.84 568.09 638.34 559.05 630.23 550.2 621.58 541.57 612.49 533.16 603.06 524.98 593.38 517.04 583.57 509.32 573.72 501.8 563.95 494.48 554.37 487.33 545.06 480.31 536.12 473.4 527.64 464.08 511.73 463.53 495.19 466.86 478.02 468.99 460.86 468.26 443.7 465.9 426.54 464.06 417.96 462.11 409.38 458.88 392.22 456.92 375.06 457.85 357.9 460.37 340.74 462.24 332.16 464.19 323.58 467.31 306.42 469.09 289.26 467.96 272.1 465.29 254.93 473.7 236.09 488.4 229.63 502.36 226.56 516.77 223.51 532.2 219.92 548.34 215.69 556.83 213.1 565.55 210.18 574.5 206.9 583.63 203.26 592.93 199.24 602.36 194.84 611.88 190.08 621.43 184.95 630.98 179.49 640.47 173.72 649.84 167.68 659.06 161.41 668.07 154.94 676.83 148.32 685.3 141.6 693.45 134.83 701.25 128.05 708.7 121.31 719.14 111.4 722.5 108.14" strokeDasharray="0 0" transform="rotate(18, 711, 400)" opacity="0.43"></path><path d="M725.49 125.73Q739.91 130.07 752.97 134.92 764.72 140.57 775.34 147.24 785.14 155.13 794.51 164.31 803.93 174.78 813.89 186.46 824.83 199.15 837.15 212.58 851.14 226.42 866.92 240.3 884.46 253.8 903.58 266.56 923.92 278.23 944.98 288.53 957.3 306.13 964.81 323.72 964.88 341.31 957.51 358.9 945.25 376.49 932.38 394.08 923.38 411.67 921.39 429.27 927.11 446.86 938.54 464.45 951.69 482.04 961.99 499.63 965.84 517.22 961.91 534.81 951.56 552.4 938.4 569.99 917.92 576.35 898.67 580.29 881.03 582.07 865.19 582.1 851.19 580.94 838.9 579.24 828.02 577.7 818.18 577.02 808.89 577.86 799.66 580.78 790.01 586.22 779.52 594.43 767.88 605.48 754.9 619.24 740.52 635.38 724.8 653.42 710.47 656 694.89 658.64 678.24 660.6 660.79 661.16 642.85 659.73 624.78 655.87 606.91 649.32 589.53 640.01 572.87 628.05 557.06 613.75 542.15 597.56 528.08 580.06 514.73 561.91 501.92 543.81 489.41 526.41 476.97 510.32 480.89 494.09 483.97 477.85 485.14 461.61 483.99 445.38 480.92 429.14 477.01 412.9 473.61 396.67 471.91 380.43 472.5 364.19 475.18 347.96 479.01 331.72 482.66 315.48 484.85 299.25 484.83 283.01 482.6 266.77 478.93 250.53 491.37 247.34 503.67 244.65 516.07 242.05 528.81 239.14 542.13 235.55 556.2 230.96 571.17 225.15 587.07 218 603.85 209.46 621.37 199.6 639.39 188.59 657.6 176.65 675.66 164.07 693.21 151.18 709.91 138.29 725.49 125.73 725.49 125.73 725.49 125.73" strokeDasharray="0 0" transform="rotate(19.8, 711, 400)" opacity="0.47"></path><path d="M722.76 143.32Q733.81 147.17 743.94 151.48 753.39 156.48 762.45 162.4 771.48 169.39 780.85 177.54 790.93 186.88 802.04 197.36 814.44 208.86 828.28 221.19 843.62 234.09 860.38 247.27 878.36 260.39 897.27 273.13 916.71 285.16 936.22 296.2 945.69 312.56 949.77 328.92 947.22 345.28 938.8 361.64 927.1 378 915.66 394.36 907.99 410.73 906.41 427.09 911.41 443.45 921.46 459.81 933.51 476.18 943.87 492.54 949.4 508.9 948.4 525.26 941.18 541.62 929.95 557.99 910.4 561.7 891.41 563.57 873.38 563.92 856.62 563.18 841.31 561.87 827.55 560.52 815.25 559.71 804.27 559.97 794.33 561.79 785.11 565.58 776.21 571.61 767.27 580.05 757.93 590.9 747.86 604.02 736.84 619.13 724.72 635.82 708.96 638.01 692.45 640.3 675.47 642.07 658.31 642.77 641.29 641.89 624.66 639.04 608.65 633.97 593.4 626.54 579 616.79 565.44 604.87 552.66 591.07 540.52 575.79 528.85 559.51 517.45 542.75 506.11 526.08 494.63 510.01 498.32 494.67 500.69 479.34 501.02 464.01 499.21 448.67 495.8 433.34 491.84 418.01 488.53 402.67 486.89 387.34 487.41 372.01 489.93 356.67 493.69 341.34 497.54 326.01 500.31 310.67 501.15 295.34 499.8 280.01 496.69 264.67 508.36 262.38 519.72 260.18 530.93 257.72 542.21 254.69 553.77 250.81 565.82 245.89 578.54 239.76 592.07 232.39 606.48 223.77 621.76 214.01 637.85 203.27 654.57 191.76 671.71 179.73 689 167.47 706.12 155.24 722.76 143.32 722.76 143.32 722.76 143.32" strokeDasharray="0 0" transform="rotate(21.599999999999998, 711, 400)" opacity="0.51"></path><path d="M715.38 160.9Q724.3 164.29 732.95 168.08 741.61 172.48 750.55 177.67 760.06 183.78 770.37 190.93 781.71 199.15 794.2 208.42 807.91 218.68 822.82 229.8 838.82 241.59 855.72 253.83 873.25 266.27 891.1 278.64 908.91 290.66 926.31 302.07 932.54 317.15 933.47 332.24 928.88 347.33 919.97 362.42 909.08 377.51 899.1 392.6 892.64 407.69 891.43 422.78 895.77 437.87 904.52 452.96 915.37 468.05 925.47 483.14 932.14 498.23 933.64 513.32 929.55 528.41 920.97 543.5 903.01 545.21 885.06 545.66 867.47 545.2 850.58 544.2 834.63 543.11 819.83 542.37 806.25 542.4 793.93 543.6 782.78 546.33 772.65 550.84 763.33 557.32 754.55 565.85 746.03 576.39 737.48 588.81 728.63 602.87 719.23 618.24 703.15 620.07 686.96 622.01 670.91 623.59 655.23 624.36 640.1 623.9 625.68 621.89 612.03 618.07 599.19 612.31 587.11 604.56 575.7 594.88 564.83 583.44 554.33 570.47 544.02 556.32 533.73 541.36 523.29 526 512.55 510.68 515.65 496.25 517.13 481.82 516.59 467.39 514.17 452.96 510.53 438.53 506.6 424.11 503.44 409.68 501.87 395.25 502.31 380.82 504.64 366.39 508.25 351.97 512.19 337.54 515.41 323.11 517.07 308.68 516.73 294.25 514.48 279.83 525.58 277.97 536.26 275.87 546.61 273.26 556.79 269.92 566.97 265.66 577.33 260.35 588.07 253.93 599.36 246.37 611.33 237.75 624.08 228.15 637.67 217.74 652.07 206.72 667.2 195.29 682.93 183.69 699.07 172.15 715.38 160.9 715.38 160.9 715.38 160.9" strokeDasharray="0 0" transform="rotate(23.400000000000002, 711, 400)" opacity="0.54"></path><path d="M706.27 178.5Q714.56 181.44 723.16 184.74 732.26 188.56 742.05 193.06 752.67 198.35 764.22 204.53 776.76 211.65 790.26 219.72 804.67 228.71 819.85 238.53 835.63 249.08 851.77 260.2 868.03 271.7 884.13 283.37 899.79 294.99 914.76 306.33 917.73 320.12 916.02 333.92 910.02 347.71 901.09 361.5 891.23 375.3 882.67 389.09 877.34 402.88 876.45 416.68 880.18 430.47 887.7 444.26 897.32 458.06 906.87 471.85 914.19 485.64 917.63 499.43 916.42 513.23 910.83 527.02 894.95 527.41 878.68 527.08 862.31 526.34 846.11 525.51 830.35 524.93 815.24 524.94 800.96 525.86 787.63 527.96 775.3 531.47 763.97 536.55 753.59 543.32 744.03 551.8 735.14 561.93 726.72 573.59 718.58 586.59 710.49 600.65 695.54 602.15 680.99 603.77 666.99 605.15 653.65 605.93 641.03 605.79 629.15 604.44 617.98 601.68 607.44 597.35 597.44 591.37 587.85 583.74 578.5 574.53 569.25 563.87 559.95 551.98 550.46 539.09 540.66 525.51 530.46 511.55 532.67 498.05 533.15 484.55 531.79 471.05 528.89 457.54 525.12 444.04 521.31 430.54 518.33 417.04 516.85 403.54 517.21 390.04 519.32 376.53 522.7 363.03 526.61 349.53 530.14 336.03 532.51 322.53 533.19 309.02 532.02 295.52 542.7 293.69 552.91 291.38 562.7 288.42 572.14 284.64 581.36 279.94 590.49 274.26 599.7 267.58 609.14 259.93 618.97 251.37 629.33 242.02 640.34 232.02 652.06 221.54 664.55 210.75 677.8 199.85 691.74 189.04 706.27 178.5 706.27 178.5 706.27 178.5" strokeDasharray="0 0" transform="rotate(25.200000000000003, 711, 400)" opacity="0.58"></path><path d="M699.03 196.09Q707.85 198.63 717.28 201.47 727.41 204.75 738.3 208.59 749.97 213.09 762.39 218.35 775.53 224.42 789.28 231.31 803.5 239.03 818.04 247.54 832.72 256.76 847.33 266.6 861.67 276.93 875.55 287.61 888.79 298.46 901.24 309.31 901.29 321.8 897.58 334.3 890.81 346.79 882.28 359.28 873.59 371.77 866.41 384.27 862.09 396.76 861.46 409.25 864.64 421.75 871.02 434.24 879.39 446.73 888.16 459.22 895.66 471.72 900.48 484.21 901.68 496.7 899.05 509.19 885.5 508.91 871.36 508.35 856.8 507.77 842.05 507.41 827.29 507.54 812.73 508.38 798.56 510.16 784.93 513.05 771.96 517.2 759.74 522.69 748.31 529.59 737.68 537.89 727.82 547.51 718.65 558.36 710.07 570.28 701.94 583.06 689.31 584.26 677.31 585.59 665.98 586.76 655.31 587.51 645.27 587.58 635.79 586.75 626.8 584.84 618.17 581.7 609.78 577.25 601.52 571.44 593.24 564.27 584.83 555.82 576.18 546.18 567.21 535.52 557.85 524 548.06 511.85 549.2 499.32 548.68 486.78 546.6 474.24 543.36 461.7 539.58 449.16 535.96 436.62 533.21 424.08 531.84 411.54 532.11 399 533.97 386.46 537.07 373.93 540.82 361.39 544.51 348.85 547.43 336.31 549.03 323.77 549.01 311.23 559.36 309.1 569.25 306.37 578.68 302.91 587.69 298.65 596.34 293.53 604.72 287.54 612.92 280.69 621.08 273.03 629.31 264.64 637.76 255.62 646.56 246.1 655.81 236.22 665.63 226.12 676.08 215.97 693.12 201 699.03 196.09" strokeDasharray="0 0" transform="rotate(27, 711, 400)" opacity="0.62"></path><path d="M696.51 213.68Q706.28 215.84 716.65 218.25 727.63 221.02 739.18 224.25 751.24 228.03 763.74 232.42 776.58 237.49 789.64 243.26 802.78 249.74 815.86 256.93 828.74 264.78 841.28 273.25 853.34 282.26 864.81 291.7 875.6 301.47 885.64 311.45 883.37 322.65 878.37 333.86 871.41 345.07 863.61 356.27 856.18 367.48 850.29 378.69 846.88 389.89 846.48 401.1 849.15 412.3 854.48 423.51 861.61 434.72 869.44 445.92 876.73 457.13 882.32 468.33 879.75 484.95 862.34 490.01 849.97 489.91 837.17 490.22 824.09 491.14 810.87 492.8 797.66 495.35 784.59 498.89 771.81 503.51 759.43 509.25 747.53 516.12 736.2 524.1 725.47 533.14 715.37 543.13 705.88 553.96 696.97 565.47 687.16 566.4 677.91 567.46 661.13 568.87 645.48 568.87 630.77 564.95 616.01 558.02 608.36 552.67 600.43 546.22 592.17 538.73 583.54 530.27 574.5 520.94 565.06 510.88 565.07 499.35 563.65 487.82 561.03 476.29 557.6 464.76 553.93 453.23 550.57 441.7 548.07 430.17 546.82 418.64 547.01 407.11 548.61 395.58 551.37 384.05 554.86 372.51 558.53 360.98 561.8 349.45 564.15 337.92 565.21 326.39 575.21 323.76 584.82 320.48 594.02 316.5 602.79 311.78 611.16 306.31 619.16 300.11 626.84 293.2 634.28 285.65 641.56 277.53 648.77 268.94 656.02 259.98 663.42 250.75 671.08 241.39 679.08 232.02 692.02 218.21 696.51 213.68" strokeDasharray="0 0" transform="rotate(28.8, 711, 400)" opacity="0.66"></path><path d="M699.71 231.26Q710.04 233.07 720.77 235.09 731.83 237.39 743.17 240.06 754.69 243.16 766.32 246.76 777.96 250.89 789.5 255.61 800.84 260.91 811.91 266.82 822.59 273.32 832.81 280.38 842.52 287.97 851.65 296.02 860.18 304.48 868.09 313.26 864.25 323.21 858.65 333.16 852.01 343.11 845.17 353.05 839.02 363 834.33 372.95 831.71 382.9 831.5 392.85 833.71 402.8 838.07 412.75 844.02 422.7 850.8 432.65 857.54 442.6 863.38 452.55 864.11 467.43 851.13 472.55 841.05 473.11 830.48 474.19 819.48 475.87 808.16 478.27 796.6 481.45 784.9 485.48 773.17 490.38 761.52 496.19 750.02 502.88 738.77 510.43 727.85 518.79 717.3 527.89 707.19 537.62 697.54 547.89 683.42 549.37 670.08 550.76 657.24 550.56 644.23 548.69 630.26 543.14 615.4 535.06 607.38 529.51 599 523.12 590.27 515.94 581.21 508.03 580.19 497.56 578.05 487.09 575.07 476.61 571.64 466.14 568.18 455.67 565.15 445.2 562.93 434.73 561.8 424.25 561.91 413.78 563.25 403.31 565.63 392.84 568.77 382.37 572.26 371.9 575.64 361.42 578.49 350.95 580.45 340.48 590.02 337.26 599.29 333.43 608.23 328.97 616.82 323.89 625.04 318.19 632.89 311.91 640.38 305.09 647.54 297.78 654.41 290.05 661.04 281.98 667.48 273.65 673.82 265.15 680.13 256.57 686.49 248 696.35 235.4 699.71 231.26" strokeDasharray="0 0" transform="rotate(30.6, 711, 400)" opacity="0.70"></path><path d="M707.37 248.85Q717.37 250.34 727.5 252 737.68 253.87 747.85 256.03 757.95 258.52 767.92 261.39 777.68 264.68 787.18 268.42 796.36 272.64 805.18 277.34 813.58 282.53 821.56 288.21 829.07 294.37 836.13 300.96 843.49 316.01 838.68 332.79 832.74 341.52 827.03 350.25 822.12 358.98 818.52 367.71 816.58 376.44 816.52 385.17 818.32 393.9 821.81 402.63 826.64 411.36 832.31 420.09 838.26 428.82 843.88 437.56 838.2 454.28 821.27 459.46 812.49 461.83 803.33 464.81 793.83 468.44 784.04 472.76 774.04 477.77 763.89 483.47 753.65 489.84 743.39 496.85 733.17 504.46 723.07 512.62 713.13 521.26 703.42 530.29 683.9 532.05 669.63 532.71 657.11 531.21 643.79 528.15 628.96 522.03 613.25 513.93 604.91 508.72 596.33 502.87 594.49 493.5 591.89 484.14 588.79 474.78 585.5 465.41 582.37 456.05 579.71 446.69 577.78 437.32 576.78 427.96 576.82 418.6 577.89 409.24 579.88 399.87 582.59 390.51 585.74 381.15 589.02 371.78 592.09 362.42 594.65 353.06 603.62 349.29 612.41 345 620.98 340.2 629.3 334.91 637.33 329.15 645.07 322.96 652.49 316.37 659.6 309.43 666.39 302.21 672.88 294.76 679.09 287.14 685.06 279.42 690.82 271.66 696.42 263.94 704.64 252.59 707.37 248.85" strokeDasharray="0 0" transform="rotate(32.4, 711, 400)" opacity="0.73"></path><path d="M716.46 266.44Q733.8 268.96 750.62 272.15 766.62 276.32 781.54 281.73 795.21 288.56 807.56 296.93 818.61 306.85 828.49 318.23 818.75 333.34 809.23 348.44 802.85 363.55 801.53 378.66 805.69 393.77 814.06 408.88 824.09 423.99 832.71 439.1 821.67 441.82 809.28 446.18 795.54 452.44 780.51 460.72 764.39 471.06 747.44 483.34 729.96 497.34 712.29 512.7 702.5 513.43 692.07 514.21 680.81 514.54 668.58 513.91 655.34 511.93 641.14 508.27 626.09 502.71 610.37 495.16 605.22 478.74 599.24 462.31 594.25 445.89 591.77 429.46 592.55 413.04 596.36 396.61 602.04 380.19 607.85 363.77 624.13 355.03 639.96 344.79 655.11 333.23 669.38 320.62 682.65 307.27 694.88 293.55 711.28 273.13 716.46 266.44" strokeDasharray="0 0" transform="rotate(34.2, 711, 400)" opacity="0.77"></path><path d="M723.39 284.04Q736.82 286 749.5 288.44 761.31 291.56 772.21 295.55 782.19 300.56 791.32 306.69 799.69 313.99 807.47 322.46 799.1 335.31 791.84 348.15 787.31 361 786.55 373.84 789.72 386.68 796.11 399.53 804.11 420.75 794.69 434.39 784.55 441.11 773.46 449.3 761.43 458.93 748.54 469.9 734.89 482.03 720.65 495.11 710.99 495.54 700.56 496.06 689.34 496.35 677.33 496.11 664.61 495.04 651.29 492.93 637.49 489.58 623.38 484.88 618.17 470.82 612.91 456.76 608.79 442.7 606.75 428.64 607.24 414.58 610.15 400.52 614.83 386.46 620.23 372.4 634.6 363.47 648.85 353.54 662.82 342.77 676.33 331.36 689.24 319.55 701.43 307.57 718.11 289.84 723.39 284.04" strokeDasharray="0 0" transform="rotate(36, 711, 400)" opacity="0.81"></path><path d="M725.43 301.63Q734.87 303.1 743.72 304.89 759.41 310.26 773.64 317.6 780.05 330.87 774.88 349.77 771.92 360.42 771.57 371.08 773.89 381.73 778.5 392.38 784.83 410.71 778.07 424.07 770.72 430.76 762.83 438.43 754.34 447.03 745.23 456.49 735.51 466.7 725.2 477.52 715.48 477.71 705.19 478.01 694.4 478.21 683.15 478.15 671.55 477.66 659.68 476.58 647.65 474.8 635.56 472.19 630.85 460.53 626.55 448.87 623.34 437.22 621.73 425.56 621.97 413.9 624.03 402.24 627.57 390.58 632.05 378.92 644.13 370.36 656.31 361.23 668.47 351.63 680.51 341.72 692.32 331.61 703.81 321.47 720.15 306.53 725.43 301.63" strokeDasharray="0 0" transform="rotate(37.8, 711, 400)" opacity="0.85"></path><path d="M721.77 319.21Q733.8 321.63 745.06 324.83 758.55 337.51 758.36 353.56 757.42 370.59 761.29 387.62 765.54 402.86 760.3 415.13 754.95 421.3 749.38 428.04 743.56 435.34 737.43 443.12 730.96 451.35 724.14 459.94 715.03 459.96 705.66 460.07 696.09 460.16 686.38 460.16 676.58 459.96 666.74 459.5 650.19 453.45 640.23 438.95 637.91 429.7 636.71 420.45 636.76 411.2 638.04 401.95 640.43 392.7 643.69 383.45 653.22 375.85 662.92 367.97 672.75 359.9 682.64 351.71 692.55 343.47 702.41 335.26 716.97 323.18 721.77 319.21" strokeDasharray="0 0" transform="rotate(39.6, 711, 400)" opacity="0.89"></path><path d="M713.85 336.8Q730.04 340.66 746.42 346.81 742.3 359.62 741.6 372.43 744.49 385.24 750.31 398.05 742.39 407.43 734.49 418.05 726.39 429.76 717.89 442.34 702.93 442.24 687.96 442.21 673.15 441.96 658.7 441.19 654.02 427.47 651.7 413.74 652.26 400.01 655.57 386.28 669.48 373.95 683.94 361.42 698.78 348.95 713.85 336.8 713.85 336.8 713.85 336.8" strokeDasharray="0 0" transform="rotate(41.4, 711, 400)" opacity="0.92"></path><path d="M704.81 354.39Q721.46 362.11 726.62 376.44 726.72 392.9 719.78 408.37 706.65 420.46 689.24 424.41 673.85 419.61 666.68 405.93 666.73 396.9 668.12 387.86 676.82 379.38 685.85 370.92 700 358.48 704.81 354.39" strokeDasharray="0 0" transform="rotate(43.199999999999996, 711, 400)" opacity="0.96"></path></g>
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


