'use client'
import { useState, useEffect } from "react";
import UserInfo from "@/components/UserProfile/UserInitialInfo/UserInfo";
import { userInitialInfo, userlocationUpdate } from '@/store/action/user/userProfile/userInfo';
import UserDashboard from '@/components/UserProfile/UserDashboard';
import { Spin } from 'antd';
import { myJobAlert, myBookMarkJob } from '@/store/action/user/userProfile/myjobalert'
import { myJobPost } from '@/store/action/user/userProfile/myjobpost'

const UserInfoMain = ({ userInfo, setUserInfo }: any) => {

  const [alertingJob, setAlertingJob] = useState([])
  const [bookJob, setBookJob] = useState([])
  const [postedJob, setPostedJob] = useState([])

  useEffect(() => {

    async function fecthData() {

      let result1 = await myJobAlert()
      if (result1.isOkay) setAlertingJob(result1.result)

      let result2 = await myBookMarkJob()
      if (result2.isOkay) setBookJob(result2.result)

      let result3 = await myJobPost()

      setPostedJob(result3.myjobposts)
    }

    fecthData()
  }, [])

  const updateLocation = async () => {
    let result = await userlocationUpdate({
      ...userInfo,
    })
  }

  return (
    <div>
      {userInfo.name === "" ?
        <div className="w-full h-[calc(400px+2em)] flex justify-center items-center flex-col text-gray-300 border border-gray-200 rounded-[16px] shadow-2xl">
          <Spin size="large" />
          <p className="mt-2 text-blue-500">Please wait ...</p>
        </div>
        :
        <div>
          <div className="w-full border border-gray-200 rounded-[16px] p-4 shadow-2xl">
            <UserInfo
              userInfo={userInfo}
              updateLocation={updateLocation}
              onchange={(total: any) => setUserInfo(total)}
            />
          </div>
          <div className="w-full border border-gray-200 rounded-[16px] p-4 shadow-2xl mt-8">
            <UserDashboard
              skill={userInfo.skill}
              locatedin={userInfo.locatedin}
              postedJob={userInfo.postedJob}
              myPostedJob={postedJob}
              appliedJob={userInfo.appliedJob}
              alertingJob={alertingJob}
              bookJob={bookJob}
              bookmark={userInfo.bookmark}
              mybookmarkjob={userInfo.mybookmarkjob}
            />
          </div>
        </div>
      }
    </div>
  );
};

export default UserInfoMain;
