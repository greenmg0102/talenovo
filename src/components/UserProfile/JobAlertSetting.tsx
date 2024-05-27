'use client '
import { useState, useEffect } from 'react';
import { Divider } from 'antd';
import AddJobTitle from '@/components/UserProfile/MyJobAlert/AddJobTitle'
import AddJobType from '@/components/UserProfile/MyJobAlert/AddJobType'
import AddPaySlider from '@/components/UserProfile/MyJobAlert/AddPaySlider'
import AddWorkSchedule from '@/components/UserProfile/MyJobAlert/AddWorkSchedule'
import Addnotification from '@/components/UserProfile/MyJobAlert/Addnotification'
import { getfacetedIndustry } from '@/store/action/user/userProfile/myjobalert'
import { Button } from 'antd'
import { jobAlertConfig } from '@/store/action/user/userProfile/jobAlertConfig'

const JobAlertSetting = ({ }: any) => {

  const [titleList, setTitleList] = useState([])
  const [jobType, setJobType] = useState(1);
  const [range, setRange] = useState(50000);
  const [buffer, setBuffer] = useState([])
  const [notificationType, setNotificationType] = useState({
    email: true,
    marketing: true,
    blogs: true
  })

  const [industryList, setIndustryList] = useState([])

  useEffect(() => {

    async function fecthData() {
      let real: any = []
      let result = await getfacetedIndustry()

      for (let i = 10; i < result.length; i++) {
        real.push({
          label: result[i],
          value: result[i]
        });
      }
      setIndustryList(real)
    }
    // fecthData()
  }, [])

  const save = async () => {

    const data = {
      titleList: titleList,
      jobType: jobType,
      range: range,
      buffer: buffer,
      emailNotificationType: notificationType.email,
      marketingNotificationType: notificationType.marketing,
      blogsNotificationType: notificationType.blogs,
    }

    let result = await jobAlertConfig(data)
  }

  return (
    <div className=''>

      <AddJobTitle
        titleList={titleList}
        setTitleList={(list: any) => setTitleList(list)}
      />
      <Divider />

      <AddJobType
        jobType={jobType}
        setJobType={(type: any) => setJobType(type)}
      />
      <Divider />

      <AddPaySlider
        range={range}
        setRange={(range: any) => setRange(range)}
      />
      <Divider />

      <AddWorkSchedule
        buffer={buffer}
        industryList={industryList}
        setBuffer={(buffer: any) => setBuffer(buffer)}
      />
      <Divider />

      <Addnotification
        notificationType={notificationType}
        setNotificationType={(notificationType: any) => setNotificationType(notificationType)}
      />
      <Divider />

      <div className='flex justify-end'>
        <Button
          type="primary"
          onClick={save}
          block
        >Save</Button>
      </div>

    </div>
  );
};

export default JobAlertSetting;