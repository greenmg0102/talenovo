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