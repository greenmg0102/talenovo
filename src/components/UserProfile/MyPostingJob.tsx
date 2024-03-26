'use client '
import { useState, useEffect } from 'react';
import { myJobPost } from '@/store/action/user/userProfile/myjobpost'
import { Alert } from 'antd';
import MyJobPostItem from '@/components/UserProfile/MyJobPost/MyJobPostItem'

const MyPostingJob = () => {

  const [list, setList] = useState([])
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    setLoading(true)
    async function fetchData() {
      const res = await myJobPost()
      setList(res.myjobposts)
      setLoading(false)
    }
    fetchData()
  }, []);

  return (
    <div>
      {loading ?
        <div className='w-full h-40 flex justify-center items-center'>
          <svg viewBox="0 0 1024 1024" focusable="false" data-icon="loading" width="2em" height="2em" className='animate-spin' fill="currentColor" aria-hidden="true"><path d="M988 548c-19.9 0-36-16.1-36-36 0-59.4-11.6-117-34.6-171.3a440.45 440.45 0 00-94.3-139.9 437.71 437.71 0 00-139.9-94.3C629 83.6 571.4 72 512 72c-19.9 0-36-16.1-36-36s16.1-36 36-36c69.1 0 136.2 13.5 199.3 40.3C772.3 66 827 103 874 150c47 47 83.9 101.8 109.7 162.7 26.7 63.1 40.2 130.2 40.2 199.3.1 19.9-16 36-35.9 36z"></path></svg>
        </div>
        :
        <div>
          {list.length > 0 ?
            <>
              {list.map((item: any, index: any) =>
                <MyJobPostItem
                  key={index}
                  item={item}
                />
              )}
            </>
            :
            <Alert
              message={
                <p>
                  There are no posted job, if you like to post a job, please click
                  <a href="http://195.35.32.163:3000/job-post"  target="_blank" className='text-bold text-blue-500 hover:underline px-1'>here</a>
                  to post a job
                </p>
              }
              type="info"
            />

          }
        </div>
      }
    </div>
  );
};

export default MyPostingJob;
