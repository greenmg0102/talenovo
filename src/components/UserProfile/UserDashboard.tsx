'use client'

import { Tab } from '@headlessui/react';
import { Fragment } from 'react';
import OnlineMembers from "@/components/UserProfile/OnlineMembers";
import BestMatch from "@/components/UserProfile/BestMatch";
import Resume from "@/components/UserProfile/AboutMe/Resume";
import Education from "@/components/UserProfile/AboutMe/Education";
import WorkHistory from "@/components/UserProfile/AboutMe/WorkHistory";
import JobAlert from "@/components/UserProfile/JobAlert";
import MyPostingJob from "@/components/UserProfile/MyPostingJob";
import MyBookmark from "@/components/UserProfile/MyBookmark";
import MyJobs from "@/components/UserProfile/MyJobs";

const UserDashboard = () => {
  return (
    <div className="flex justify-between items-start border">
      <div className="w-4/5 border">
        <Tab.Group>
          <Tab.List className="mt-3 flex flex-wrap border-b border-gray-200">
            <Tab as={Fragment}>
              {({ selected }) => (
                <button
                  className={`${selected ? '!border-gray-200 !border-b-white text-danger dark:!border-b-black' : ''} p-3.5 py-2 -mb-[1px] flex items-center border border-transparent hover:text-danger !outline-none transition duration-300`}
                >
                  <svg viewBox="64 64 896 896" className='mr-2' focusable="false" data-icon="user" width="1em" height="1em" fill="currentColor" aria-hidden="true"><path d="M858.5 763.6a374 374 0 00-80.6-119.5 375.63 375.63 0 00-119.5-80.6c-.4-.2-.8-.3-1.2-.5C719.5 518 760 444.7 760 362c0-137-111-248-248-248S264 225 264 362c0 82.7 40.5 156 102.8 201.1-.4.2-.8.3-1.2.5-44.8 18.9-85 46-119.5 80.6a375.63 375.63 0 00-80.6 119.5A371.7 371.7 0 00136 901.8a8 8 0 008 8.2h60c4.4 0 7.9-3.5 8-7.8 2-77.2 33-149.5 87.8-204.3 56.7-56.7 132-87.9 212.2-87.9s155.5 31.2 212.2 87.9C779 752.7 810 825 812 902.2c.1 4.4 3.6 7.8 8 7.8h60a8 8 0 008-8.2c-1-47.8-10.9-94.3-29.5-138.2zM512 534c-45.9 0-89.1-17.9-121.6-50.4S340 407.9 340 362c0-45.9 17.9-89.1 50.4-121.6S466.1 190 512 190s89.1 17.9 121.6 50.4S684 316.1 684 362c0 45.9-17.9 89.1-50.4 121.6S557.9 534 512 534z"></path></svg>
                  About Me
                </button>
              )}
            </Tab>
            <Tab as={Fragment}>
              {({ selected }) => (
                <button
                  className={`${selected ? '!border-gray-200 !border-b-white text-danger dark:!border-b-black' : ''} p-3.5 py-2 -mb-[1px] flex items-center border border-transparent hover:text-danger !outline-none transition duration-300`}
                >
                  <svg viewBox="64 64 896 896" className='mr-2' focusable="false" data-icon="check-square" width="1em" height="1em" fill="currentColor" aria-hidden="true"><path d="M433.1 657.7a31.8 31.8 0 0051.7 0l210.6-292c3.8-5.3 0-12.7-6.5-12.7H642c-10.2 0-19.9 4.9-25.9 13.3L459 584.3l-71.2-98.8c-6-8.3-15.6-13.3-25.9-13.3H315c-6.5 0-10.3 7.4-6.5 12.7l124.6 172.8z"></path><path d="M880 112H144c-17.7 0-32 14.3-32 32v736c0 17.7 14.3 32 32 32h736c17.7 0 32-14.3 32-32V144c0-17.7-14.3-32-32-32zm-40 728H184V184h656v656z"></path></svg>
                  My Jobs
                </button>
              )}
            </Tab>
            <Tab as={Fragment}>
              {({ selected }) => (
                <button
                  className={`${selected ? '!border-gray-200 !border-b-white text-danger dark:!border-b-black' : ''} p-3.5 py-2 -mb-[1px] flex items-center border border-transparent hover:text-danger !outline-none transition duration-300`}
                >
                  <svg viewBox="64 64 896 896" className='mr-2' focusable="false" data-icon="check-square" width="1em" height="1em" fill="currentColor" aria-hidden="true"><path d="M433.1 657.7a31.8 31.8 0 0051.7 0l210.6-292c3.8-5.3 0-12.7-6.5-12.7H642c-10.2 0-19.9 4.9-25.9 13.3L459 584.3l-71.2-98.8c-6-8.3-15.6-13.3-25.9-13.3H315c-6.5 0-10.3 7.4-6.5 12.7l124.6 172.8z"></path><path d="M880 112H144c-17.7 0-32 14.3-32 32v736c0 17.7 14.3 32 32 32h736c17.7 0 32-14.3 32-32V144c0-17.7-14.3-32-32-32zm-40 728H184V184h656v656z"></path></svg>
                  Job Alert
                </button>
              )}
            </Tab>
            <Tab as={Fragment}>
              {({ selected }) => (
                <button
                  className={`${selected ? '!border-gray-200 !border-b-white text-danger dark:!border-b-black' : ''} p-3.5 py-2 -mb-[1px] flex items-center border border-transparent hover:text-danger !outline-none transition duration-300`}
                >
                  <svg viewBox="64 64 896 896" className='mr-2' focusable="false" data-icon="book" width="1em" height="1em" fill="currentColor" aria-hidden="true"><path d="M832 64H192c-17.7 0-32 14.3-32 32v832c0 17.7 14.3 32 32 32h640c17.7 0 32-14.3 32-32V96c0-17.7-14.3-32-32-32zm-260 72h96v209.9L621.5 312 572 347.4V136zm220 752H232V136h280v296.9c0 3.3 1 6.6 3 9.3a15.9 15.9 0 0022.3 3.7l83.8-59.9 81.4 59.4c2.7 2 6 3.1 9.4 3.1 8.8 0 16-7.2 16-16V136h64v752z"></path></svg>
                  My Bookmarks
                </button>
              )}
            </Tab>
            <Tab as={Fragment}>
              {({ selected }) => (
                <button
                  className={`${selected ? '!border-gray-200 !border-b-white text-danger dark:!border-b-black' : ''} p-3.5 py-2 -mb-[1px] flex items-center border border-transparent hover:text-danger !outline-none transition duration-300`}
                >
                  <svg viewBox="64 64 896 896" className='mr-2' focusable="false" data-icon="form" width="1em" height="1em" fill="currentColor" aria-hidden="true"><path d="M904 512h-56c-4.4 0-8 3.6-8 8v320H184V184h320c4.4 0 8-3.6 8-8v-56c0-4.4-3.6-8-8-8H144c-17.7 0-32 14.3-32 32v736c0 17.7 14.3 32 32 32h736c17.7 0 32-14.3 32-32V520c0-4.4-3.6-8-8-8z"></path><path d="M355.9 534.9L354 653.8c-.1 8.9 7.1 16.2 16 16.2h.4l118-2.9c2-.1 4-.9 5.4-2.3l415.9-415c3.1-3.1 3.1-8.2 0-11.3L785.4 114.3c-1.6-1.6-3.6-2.3-5.7-2.3s-4.1.8-5.7 2.3l-415.8 415a8.3 8.3 0 00-2.3 5.6zm63.5 23.6L779.7 199l45.2 45.1-360.5 359.7-45.7 1.1.7-46.4z"></path></svg>
                  My Posted Job
                </button>
              )}
            </Tab>
          </Tab.List>
          <Tab.Panels>
            <div className="active p-4 pt-5">
              <Tab.Panel>
                <Resume />
                <WorkHistory />
                <Education />
              </Tab.Panel>
              <Tab.Panel>
                <MyJobs />
              </Tab.Panel>
              <Tab.Panel>
                <JobAlert />
              </Tab.Panel>
              <Tab.Panel>
                <MyBookmark />
              </Tab.Panel>
              <Tab.Panel>
                <MyBookmark />
              </Tab.Panel>
            </div>
          </Tab.Panels>
        </Tab.Group>

      </div>
      <div className="w-1/5 border">
        <div>
          <OnlineMembers />
        </div>
        <div>
          <BestMatch />
        </div>
      </div>
    </div>
  );
};

export default UserDashboard;
