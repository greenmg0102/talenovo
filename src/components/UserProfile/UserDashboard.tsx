'use client'
import { useState } from "react";

import { Tab } from '@headlessui/react';
import { Fragment } from 'react';
// import Resume from "@/components/UserProfile/AboutMe/Resume";
// import Education from "@/components/UserProfile/AboutMe/Education";
// import WorkHistory from "@/components/UserProfile/AboutMe/WorkHistory";
import JobAlert from "@/components/UserProfile/JobAlert";
import MyPostingJob from "@/components/UserProfile/MyPostingJob";
import MyJobs from "@/components/UserProfile/MyJobs";
import LandingDetail from "@/components/Hero/landingDetail";
import JobAlertSetting from '@/components/UserProfile/JobAlertSetting'
import AlertingJob from '@/components/UserProfile/AlertingJob'

const UserDashboard = ({ myPostedJob, mybookmarkjob, postedJob, appliedJob, bookmark, skill, locatedin, alertingJob, bookJob }: any) => {

  const [isDetail, setIsDetail] = useState(undefined)

  return (
    <div className="flex justify-between items-start relative">
      <LandingDetail
        isDetail={isDetail}
        setIsDetail={(data: any) => setIsDetail(data)}
      />
      <div className="w-full">
        <p className='text-center py-6 pt-2 text-[20px] font-bold text-gray-600 flex justify-center items-center mt-0'>
          <svg className="mr-2" viewBox="64 64 896 896" focusable="false" data-icon="database" width="1em" height="1em" fill="currentColor" aria-hidden="true"><path d="M832 64H192c-17.7 0-32 14.3-32 32v832c0 17.7 14.3 32 32 32h640c17.7 0 32-14.3 32-32V96c0-17.7-14.3-32-32-32zm-600 72h560v208H232V136zm560 480H232V408h560v208zm0 272H232V680h560v208zM304 240a40 40 0 1080 0 40 40 0 10-80 0zm0 272a40 40 0 1080 0 40 40 0 10-80 0zm0 272a40 40 0 1080 0 40 40 0 10-80 0z"></path></svg>
          My Jobs
        </p>
        <Tab.Group>
          <Tab.List className="mt-3 flex flex-wrap border-b border-gray-200">
            {/* <Tab as={Fragment}>
              {({ selected }) => (
                <button
                  className={`${selected ? '!border-gray-200 !border-b-white text-blue-600 font-semibold dark:!border-b-black' : ''} p-3.5 py-2 -mb-[1px] flex items-center border border-transparent hover:text-blue-600 font-semibold !outline-none transition duration-300`}
                >
                  <svg viewBox="64 64 896 896" className='mr-2' focusable="false" data-icon="user" width="1em" height="1em" fill="currentColor" aria-hidden="true"><path d="M858.5 763.6a374 374 0 00-80.6-119.5 375.63 375.63 0 00-119.5-80.6c-.4-.2-.8-.3-1.2-.5C719.5 518 760 444.7 760 362c0-137-111-248-248-248S264 225 264 362c0 82.7 40.5 156 102.8 201.1-.4.2-.8.3-1.2.5-44.8 18.9-85 46-119.5 80.6a375.63 375.63 0 00-80.6 119.5A371.7 371.7 0 00136 901.8a8 8 0 008 8.2h60c4.4 0 7.9-3.5 8-7.8 2-77.2 33-149.5 87.8-204.3 56.7-56.7 132-87.9 212.2-87.9s155.5 31.2 212.2 87.9C779 752.7 810 825 812 902.2c.1 4.4 3.6 7.8 8 7.8h60a8 8 0 008-8.2c-1-47.8-10.9-94.3-29.5-138.2zM512 534c-45.9 0-89.1-17.9-121.6-50.4S340 407.9 340 362c0-45.9 17.9-89.1 50.4-121.6S466.1 190 512 190s89.1 17.9 121.6 50.4S684 316.1 684 362c0 45.9-17.9 89.1-50.4 121.6S557.9 534 512 534z"></path></svg>
                  About Me
                </button>
              )}
            </Tab> */}
            <Tab as={Fragment}>
              {({ selected }) => (
                <button
                  className={`${selected ? ' !border-gray-200 !border-b-white text-blue-600 font-semibold dark:!border-b-black' : ''} p-3.5 py-2 -mb-[1px] flex items-center border border-transparent hover:text-blue-600 font-semibold !outline-none transition duration-300`}
                >
                  <svg viewBox="64 64 896 896" className='mr-2' focusable="false" data-icon="check-square" width="1em" height="1em" fill="currentColor" aria-hidden="true"><path d="M433.1 657.7a31.8 31.8 0 0051.7 0l210.6-292c3.8-5.3 0-12.7-6.5-12.7H642c-10.2 0-19.9 4.9-25.9 13.3L459 584.3l-71.2-98.8c-6-8.3-15.6-13.3-25.9-13.3H315c-6.5 0-10.3 7.4-6.5 12.7l124.6 172.8z"></path><path d="M880 112H144c-17.7 0-32 14.3-32 32v736c0 17.7 14.3 32 32 32h736c17.7 0 32-14.3 32-32V144c0-17.7-14.3-32-32-32zm-40 728H184V184h656v656z"></path></svg>
                  AI Recommended Jobs {alertingJob.length === 0 ? null : `(${alertingJob.length})`}
                </button>
              )}
            </Tab>
            <Tab as={Fragment}>
              {({ selected }) => (
                <button
                  className={`${selected ? '!border-gray-200 !border-b-white text-blue-600 font-semibold dark:!border-b-black' : ''} p-3.5 py-2 -mb-[1px] flex items-center border border-transparent hover:text-blue-600 font-semibold !outline-none transition duration-300 `}
                >
                  <svg viewBox="64 64 896 896" className='mr-2' focusable="false" data-icon="save" width="1em" height="1em" fill="currentColor" aria-hidden="true"><path d="M893.3 293.3L730.7 130.7c-7.5-7.5-16.7-13-26.7-16V112H144c-17.7 0-32 14.3-32 32v736c0 17.7 14.3 32 32 32h736c17.7 0 32-14.3 32-32V338.5c0-17-6.7-33.2-18.7-45.2zM384 184h256v104H384V184zm456 656H184V184h136v136c0 17.7 14.3 32 32 32h320c17.7 0 32-14.3 32-32V205.8l136 136V840zM512 442c-79.5 0-144 64.5-144 144s64.5 144 144 144 144-64.5 144-144-64.5-144-144-144zm0 224c-44.2 0-80-35.8-80-80s35.8-80 80-80 80 35.8 80 80-35.8 80-80 80z"></path></svg>
                  My Saved Jobs {bookJob.length === 0 ? null : `(${bookJob.length})`}
                </button>
              )}
            </Tab>

            <Tab as={Fragment}>
              {({ selected }) => (
                <button
                  className={`${selected ? ' !border-gray-200 !border-b-white text-blue-600 font-semibold dark:!border-b-black' : ''} p-3.5 py-2 -mb-[1px] flex items-center border border-transparent hover:text-blue-600 font-semibold !outline-none transition duration-300`}
                >
                  <svg viewBox="64 64 896 896" className='mr-2' focusable="false" data-icon="form" width="1em" height="1em" fill="currentColor" aria-hidden="true"><path d="M904 512h-56c-4.4 0-8 3.6-8 8v320H184V184h320c4.4 0 8-3.6 8-8v-56c0-4.4-3.6-8-8-8H144c-17.7 0-32 14.3-32 32v736c0 17.7 14.3 32 32 32h736c17.7 0 32-14.3 32-32V520c0-4.4-3.6-8-8-8z"></path><path d="M355.9 534.9L354 653.8c-.1 8.9 7.1 16.2 16 16.2h.4l118-2.9c2-.1 4-.9 5.4-2.3l415.9-415c3.1-3.1 3.1-8.2 0-11.3L785.4 114.3c-1.6-1.6-3.6-2.3-5.7-2.3s-4.1.8-5.7 2.3l-415.8 415a8.3 8.3 0 00-2.3 5.6zm63.5 23.6L779.7 199l45.2 45.1-360.5 359.7-45.7 1.1.7-46.4z"></path></svg>
                  My Posted Jobs {myPostedJob.length === 0 ? null : `(${myPostedJob.length})`}
                </button>
              )}
            </Tab>
            <Tab as={Fragment}>
              {({ selected }) => (
                <button
                  className={`${selected ? ' !border-gray-200 !border-b-white text-blue-600 font-semibold dark:!border-b-black' : ''} p-3.5 py-2 -mb-[1px] flex items-center border border-transparent hover:text-blue-600 font-semibold !outline-none transition duration-300`}
                >
                  <svg viewBox="64 64 896 896" className='mr-2' focusable="false" data-icon="alert" width="1em" height="1em" fill="currentColor" aria-hidden="true"><path d="M193 796c0 17.7 14.3 32 32 32h574c17.7 0 32-14.3 32-32V563c0-176.2-142.8-319-319-319S193 386.8 193 563v233zm72-233c0-136.4 110.6-247 247-247s247 110.6 247 247v193H404V585c0-5.5-4.5-10-10-10h-44c-5.5 0-10 4.5-10 10v171h-75V563zm-48.1-252.5l39.6-39.6c3.1-3.1 3.1-8.2 0-11.3l-67.9-67.9a8.03 8.03 0 00-11.3 0l-39.6 39.6a8.03 8.03 0 000 11.3l67.9 67.9c3.1 3.1 8.1 3.1 11.3 0zm669.6-79.2l-39.6-39.6a8.03 8.03 0 00-11.3 0l-67.9 67.9a8.03 8.03 0 000 11.3l39.6 39.6c3.1 3.1 8.2 3.1 11.3 0l67.9-67.9c3.1-3.2 3.1-8.2 0-11.3zM832 892H192c-17.7 0-32 14.3-32 32v24c0 4.4 3.6 8 8 8h688c4.4 0 8-3.6 8-8v-24c0-17.7-14.3-32-32-32zM484 180h56c4.4 0 8-3.6 8-8V76c0-4.4-3.6-8-8-8h-56c-4.4 0-8 3.6-8 8v96c0 4.4 3.6 8 8 8z"></path></svg>
                  Job Alert setting
                </button>
              )}
            </Tab>
          </Tab.List>
          <Tab.Panels>
            <div className="active pt-5">
              {/* <Tab.Panel>
                <Resume />
                <WorkHistory />
                <Education />
              </Tab.Panel> */}
              <Tab.Panel>
                <AlertingJob
                  alertingJob={alertingJob}
                  setIsDetail={(data: any) => setIsDetail(data)}
                />
              </Tab.Panel>
              <Tab.Panel>
                <MyJobs
                  mybookmarkjob={mybookmarkjob}
                  bookJob={bookJob}
                  setIsDetail={(data: any) => setIsDetail(data)}
                />
              </Tab.Panel>
              <Tab.Panel>
                <MyPostingJob
                  myPostedJob={myPostedJob}
                  setIsDetail={(data: any) => setIsDetail(data)}
                />
              </Tab.Panel>
              <Tab.Panel>
                <JobAlertSetting />
              </Tab.Panel>
            </div>
          </Tab.Panels>
        </Tab.Group>
      </div>
    </div>
  );
};

export default UserDashboard;
