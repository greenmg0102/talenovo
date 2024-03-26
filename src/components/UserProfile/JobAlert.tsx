'use client '
import { useState, useEffect } from 'react';
import { Alert, Divider } from 'antd';
import AddJobTitle from '@/components/UserProfile/MyJobAlert/AddJobTitle'
import AddJobType from '@/components/UserProfile/MyJobAlert/AddJobType'
import AddPaySlider from '@/components/UserProfile/MyJobAlert/AddPaySlider'
import AddWorkSchedule from '@/components/UserProfile/MyJobAlert/AddWorkSchedule'
import Addnotification from '@/components/UserProfile/MyJobAlert/Addnotification'
import { getfacetedIndustry } from '@/store/action/user/userProfile/myjobalert'

const MyAlert = ({ }: any) => {

  const [industryList, setIndustryList] = useState([])

  useEffect(() => {

    async function fecthData() {
      let real = []
      let result = await getfacetedIndustry()

      for (let i = 10; i < result.length; i++) {
        real.push({
          label: result[i],
          value: result[i]
        });
      }
      setIndustryList(real)
    }
    fecthData()
  }, [])

  return (
    <div className=''>
      <p className='text-gray-600 pb-2 text-center'>Tell us the job details your are interested in to get better recommecdations across indeed.</p>
      <p className='text-gray-400 text-[12px] text-center'>Emplyers may see these preferences when your resume is set to searchable.</p>
      <Divider />
      <AddJobTitle />
      <Divider />
      <AddJobType />
      <Divider />
      <AddPaySlider />
      <Divider />
      <AddWorkSchedule industryList={industryList} />
      <Divider />
      <Addnotification />
    </div>
  );
};

export default MyAlert;