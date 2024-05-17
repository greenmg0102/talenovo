'use client'

import { Tab } from '@headlessui/react';

import JobAlertSetting from '@/components/UserProfile/JobAlertSetting'
import AlertingJob from '@/components/UserProfile/AlertingJob'

const MyAlert = ({ alertingJob, setIsDetail }: any) => {

  return (
    <div className='w-full px-4'>
      <Tab.Group>
        <Tab.List className="flex justify-between flex-wrap border-b border-gray-200">
          <Tab className='mr-8'>
            Recommended Jobs {alertingJob.length === 0 ? null : `(${alertingJob.length})`}
          </Tab>
          <Tab>
            Job Alert Settings
          </Tab>
        </Tab.List>
        <Tab.Panels>
          <div className="active pt-5">
            <Tab.Panel>

              <div className='flex justify-center items-center mb-4 mt-2'>
                <p className='w-3/5 text-center font-bold text-gray-600 text-[16px]' >Talenovo's AI Job Recommendations show jobs based on your job searches, job alerts, profile and skills.</p>
              </div>

              <AlertingJob
                alertingJob={alertingJob}
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
  );
};

export default MyAlert;