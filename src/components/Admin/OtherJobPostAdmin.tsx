import { useState, useEffect } from 'react';
import OtherJobItem from '@/components/Admin/otherJobManaging/OtherJobItem'
import { TempoaryPostlogData } from '@/components/Admin/categoryData'

const OtherJobPostAdmin = () => {

  useEffect(() => {

    async function fetchData() {
      const res = await fetch('http://l195.35.32.163:3000/api/admin/job-post', {
        method: 'POST',
        body: JSON.stringify({
          title: "title",
          content: "content",
        })
      });

      const data = await res.json();
    }
    fetchData()

  }, []);

  return (
    <div>
      <div className="flex justify-between bg-gray-200 p-1 rounded-[2px]">
        <p className="w-[40px]">
          No
        </p>
        <div className="w-[calc(100%-40px)] flex justify-between items-center">
          <p className='w-[15%]'>Full Name</p>
          <p className='w-[25%]'>Contact Information</p>
          <p className='w-[10%]'>Stack</p>
          <p className='w-[10%]'>Type</p>
          <p className='w-[15%]'>Level</p>
          <p className='w-[15%]'>Postion</p>
          <p className='w-[15%]'>Post Date</p>
        </div>
      </div>
      {TempoaryPostlogData.map((item: any, index: any) =>
        <OtherJobItem
          key={index}
          item={item}
        />
      )}
    </div>
  );
};

export default OtherJobPostAdmin;


