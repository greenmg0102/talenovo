'use client '
import { useState, useEffect } from 'react';
import { Divider, message, Button } from 'antd';
import { PlusOutlined, EditOutlined, BarsOutlined, GlobalOutlined, CloseOutlined } from '@ant-design/icons';
import { getfacetedIndustry } from '@/store/action/user/userProfile/myjobalert'
import AddJobTitle from '@/components/UserProfile/MyJobAlert/AddJobTitle'
import AddJobType from '@/components/UserProfile/MyJobAlert/AddJobType'
import { Spin } from 'antd';
import AddJobLocation from '@/components/UserProfile/MyJobAlert/AddJobLocation'
import AddPaySlider from '@/components/UserProfile/MyJobAlert/AddPaySlider'
import AddWorkSchedule from '@/components/UserProfile/MyJobAlert/AddWorkSchedule'
import Addnotification from '@/components/UserProfile/MyJobAlert/Addnotification'
import clsx from 'clsx'
import { jobAlertConfig, jobAlertConfigGet } from '@/store/action/user/userProfile/jobAlertConfig'

const JobAlertSetting = ({ }: any) => {

  const [messageApi, contextHolder] = message.useMessage();

  const [titleList, setTitleList] = useState([])
  const [jobType, setJobType] = useState(1);
  const [jobLocation, setJobLocation] = useState("");

  const [bufferList, setBufferList] = useState<any>([])
  const [activeJobAlert, setActiveJobAlert] = useState(null)
  const [alertBack, setAlertBack] = useState(false)

  const [range, setRange] = useState(50000);
  const [buffer, setBuffer] = useState([])
  const [notificationType, setNotificationType] = useState({
    email: true,
    marketing: true,
    blogs: true
  })

  const [industryList, setIndustryList] = useState([])

  const addJobAlertSetting = () => {
    if (titleList.length > 0) {
      let real: any = bufferList
      real.push({
        titleList: titleList,
        jobType: jobType,
        jobLocation: jobLocation,
      })

      setBufferList(real)
      setTitleList([])
      setJobType(1)
      setJobLocation("")

      save()

    } else {
      messageApi.error("Please insert at least one job title.");
    }
  }

  const sliceJobAlert = (deletingIndex: any) => {
    let real: any = bufferList.filter((item: any, index: any) => index !== deletingIndex)
    setBufferList(real)
    save()
  }

  useEffect(() => {

    async function fecthData() {

      setAlertBack(true)
      let jobAlertResult = await jobAlertConfigGet()
      setAlertBack(false)

      if (jobAlertResult.isOkay && jobAlertResult.jobalertsetting && jobAlertResult.jobalertsetting.bufferList) {
        setBufferList(jobAlertResult.jobalertsetting.bufferList)

        setNotificationType({
          ...notificationType,
          email: jobAlertResult.jobalertsetting.emailNotificationType,
          marketing: jobAlertResult.jobalertsetting.marketingNotificationType,
          blogs: jobAlertResult.jobalertsetting.blogsNotificationType
        })
      }

      // let real: any = []
      // let result = await getfacetedIndustry()

      // for (let i = 10; i < result.length; i++) {
      //   real.push({
      //     label: result[i],
      //     value: result[i]
      //   });
      // }
      // setIndustryList(real)

    }
    fecthData()
  }, [])

  const save = async () => {

    if (bufferList.length > 0) {
      const data = {
        bufferList: bufferList,
        emailNotificationType: notificationType.email,
        marketingNotificationType: notificationType.marketing,
        blogsNotificationType: notificationType.blogs,
      }

      let result = await jobAlertConfig(data)
      if (result.isOkay) messageApi.success("Registering Success !");

    } else {
      messageApi.error("Please insert at least one job Alert Setting.");
    }

  }

  const jobTypeObject: any = {
    1: "On-Site",
    2: "Hybrid",
    3: "Remote"
  }

  return (
    <div className=''>
      {contextHolder}

      {alertBack ?
        <div className="w-full h-[100px] flex justify-center items-center flex-col text-gray-300 ">
          <Spin size="large" />
          <p className="mt-2 text-blue-500">Please wait ...</p>
        </div>
        :
        <div>
          {bufferList.map((item: any, index: any) =>
            <div key={index} className='border border-dashed border-t-[0px] border-l-[0px] border-r-[0px] py-2 mb-2'>
              <div className='flex justify-between items-between'>
                <div className='flex justify-start items-center pb-1 mb-1 px-4 sm:px-16'>
                  <EditOutlined className='text-gray-500 font-semibold' />
                  <p className='text-[16px] text-gray-600 flex justify-start items-center pl-2 font-semibold'>
                    Job Title
                  </p>
                </div>
                <div
                  className={clsx(
                    'transition-all text-[18px] font-bold mr-4 flex justify-center items-center w-[30px] h-[30px] rounded-full mb-0 border',
                    index === activeJobAlert ? "text-red-400 border-red-400" : "text-gray-400 border-gray-400"
                  )}
                  onMouseEnter={() => setActiveJobAlert(index)}
                  onMouseLeave={() => setActiveJobAlert(null)}
                >
                  {index === activeJobAlert ?
                    <CloseOutlined onClick={() => sliceJobAlert(index)} />
                    :
                    index + 1
                  }
                </div>
              </div>
              <div className='flex justify-start items-center flex-wrap px-4 sm:px-16'>
                {item.titleList.map((each: any, order: any) =>
                  <p key={order} className='mr-2 mb-1 px-2 border border-gray-300 rounded-[4px] text-gray-500 text-[13px]'>{each}</p>
                )}
              </div>

              <div className='flex justify-around items-center flex-wrap'>

                <div className='w-full sm:w-1/2 pb-4 px-4 sm:px-16'>
                  <div className='flex justify-center items-center'>
                    <BarsOutlined className='text-gray-500 font-semibold' />
                    <p className='text-[16px] text-gray-600 pl-2 font-semibold'>
                      Job Type
                    </p>
                  </div>
                  <p className='ml-4 text-center text-[14px] text-gray-500'>{jobTypeObject[item.jobType]}</p>
                </div>

                <div className='w-full sm:w-1/2 pb-4 px-4 sm:px-16'>
                  <div className='flex justify-center items-center'>
                    <GlobalOutlined className='text-gray-500 font-semibold' />
                    <p className='text-[16px] text-gray-600 pl-2 font-semibold'>
                      Job Location
                    </p>
                  </div>
                  {item.jobLocation === "" ?
                    <p className='ml-4 text-center text-[14px] text-gray-500'>Not Set</p>
                    :
                    <p className='ml-4 text-center text-[14px] text-gray-500'>{item.jobLocation}</p>
                  }
                </div>
              </div>
            </div>
          )}
        </div>
      }

      <div>
        <AddJobTitle
          titleList={titleList}
          setTitleList={(list: any) => setTitleList(list)}
        />
        <div className='flex justify-around items-start mt-2 flex-wrap'>
          <AddJobType
            jobType={jobType}
            setJobType={(type: any) => setJobType(type)}
          />
          <AddJobLocation
            jobLocation={jobLocation}
            setJobLocation={(location: any) => setJobLocation(location)}
          />
        </div>
      </div>

      <div className='flex justify-center items-center h-[50px]'>
        <PlusOutlined
          className='text-[40px] cursor-pointer transition-all hover:text-[60px] hover:text-blue-500 hover:font-bold'
          onClick={addJobAlertSetting}
        />
      </div>

      <Divider dashed />
      {/* <AddPaySlider
        range={range}
        setRange={(range: any) => setRange(range)}
      />
      <Divider />

      <AddWorkSchedule
        buffer={buffer}
        industryList={industryList}
        setBuffer={(buffer: any) => setBuffer(buffer)}
      />
      <Divider /> */}

      <Addnotification
        notificationType={notificationType}
        setNotificationType={(notificationType: any) => setNotificationType(notificationType)}
      />
      <Divider />

      {/* <div className='flex justify-end'>
        <Button
          type="primary"
          onClick={save}
          block
        >Save</Button>
      </div> */}

    </div>
  );
};

export default JobAlertSetting;