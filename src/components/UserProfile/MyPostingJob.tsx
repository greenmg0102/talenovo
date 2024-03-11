'use client '
'use client'
import { useState, useEffect } from 'react';
import { myJobPost } from '@/store/action/user/userProfile/myjobpost'
import MyJobPostItem from '@/components/UserProfile/MyJobPost/MyJobPostItem'

const MyPostingJob = () => {

  const [list, setList] = useState([])

  useEffect(() => {

    async function fetchData() {
      const res = await myJobPost()
      setList(res.myjobposts)
    }
    fetchData()

  }, []);

  return (
    <div>
      {list.map((item: any, index: any) =>
        <MyJobPostItem
          key={index}
          item={item}
        />
      )}
    </div>
  );
};

export default MyPostingJob;
