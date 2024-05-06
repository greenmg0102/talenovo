'use client'
import { useState, useEffect } from 'react';
import JobItem from '@/components/Admin/jobManaging/JobItem'
import { changejobPostStatus } from "@/store/action/user/jobPost"
import { message } from 'antd';
import LandingDetail from "@/components/Hero/landingDetail";

const OurJobPostAdmin = () => {

  const [list, setList] = useState([])
  const [messageApi, contextHolder] = message.useMessage();

  const [isDetail, setIsDetail] = useState(undefined)

  const changeStatus = async (item: any, status: any) => {
    let data = {
      ...item,
      postStatus: status
    }
    let result = await changejobPostStatus(data)

    if (status === 2) {
      if (result.isOkay) {
        messageApi.success("Approved");
        setList(result.myjobposts)
      }
      else messageApi.error("Approval failed");
    }

    if (status === 3) messageApi.info("It was rejected");
  }

  useEffect(() => {

    async function fetchData() {
      const res = await fetch('http://localhost:3000/api/admin/my-job-post', {
        method: 'POST',
        body: JSON.stringify({
        })
      });
      const data = await res.json();
      setList(data.myjobposts)
    }
    fetchData()

  }, []);

  return (
    <div>
      {contextHolder}

      <LandingDetail
        isDetail={isDetail}
        setIsDetail={(data: any) => setIsDetail(data)}
      />

      <div className="flex justify-between bg-gray-200 p-1 rounded-[2px]">
        <p className="w-[40px]">
          No
        </p>
        <div className="w-[calc(100%-40px)] flex justify-between items-center">
          <p className='w-[15%] text-center'>Company</p>
          <p className='w-[25%] text-center'>Title</p>
          <p className='w-[10%] text-center'>Stack</p>
          <p className='w-[20%] text-center'>Location</p>
          <p className='w-[5%] text-center'>Min</p>
          <p className='w-[5%] text-center'>Max</p>
          <p className='w-[12%] text-center'>Post Date</p>
          <p className='w-[13%] text-center'>Confirm</p>
        </div>
      </div>
      {list.map((item: any, index: any) =>
        <JobItem
          key={index}
          item={item}
          order={index}
          setIsDetail={(data: any) => setIsDetail(data)}
          changeStatus={(item: any, status: any) => changeStatus(item, status)}
        />
      )}
    </div>
  );
};

export default OurJobPostAdmin;


