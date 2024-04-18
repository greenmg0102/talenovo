'use client'

import { Tab } from '@headlessui/react';

import JobAlertSetting from '@/components/UserProfile/JobAlertSetting'
import AlertingJob from '@/components/UserProfile/AlertingJob'

const MyAlert = ({ alertingJob, setIsDetail }: any) => {

  return (
    <div className='w-full px-4'>
      <Tab.Group>
        <Tab.List className="flex flex-wrap border-b border-gray-200">
          <Tab className='mr-8'>
            Job Alert Setting
          </Tab>
          <Tab>
            Alerting Jobd {alertingJob.length === 0 ? null : `(${alertingJob.length})`}
          </Tab>
        </Tab.List>
        <Tab.Panels>
          <div className="active pt-5">
            <Tab.Panel>
              <JobAlertSetting />
            </Tab.Panel>
            <Tab.Panel>
              <AlertingJob
                alertingJob={alertingJob}
                setIsDetail={(data: any) => setIsDetail(data)}
              />
            </Tab.Panel>
          </div>
        </Tab.Panels>
      </Tab.Group>
    </div>
  );
};

export default MyAlert;