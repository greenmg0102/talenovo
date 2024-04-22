'use client'
import { useState, useEffect } from 'react';
import JobItem from '@/components/Admin/jobManaging/JobItem'

const OurJobPostAdmin = () => {

  const [list, setList] = useState([])

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
        />
      )}
    </div>
  );
};

export default OurJobPostAdmin;


