'use client'
import { useState, useEffect } from "react";
import UserInfo from "@/components/UserProfile/UserInitialInfo/UserInfo";
import { userInitialInfo, userlocationUpdate } from '@/store/action/user/userProfile/userInfo';
import UserDashboard from '@/components/UserProfile/UserDashboard';
import { Spin } from 'antd';
import { myJobAlert, myBookMarkJob } from '@/store/action/user/userProfile/myjobalert'
import { myJobPost } from '@/store/action/user/userProfile/myjobpost'

const UserInfoMain = () => {

  const [userInfo, setUserInfo] = useState({
    birthday: "",
    experience: 0,
    ctc: 0,

    name: "",
    jobTitle: "",
    summary: "",
    skill: [],
    profile: "",

    mail: [],
    phone: [],
    locatedin: "",
    gender: "",
    postedJob: 0,
    appliedJob: 0,
    bookmark: 0,
    profileViews: 0,
    mybookmarkjob: []
  })

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

  useEffect(() => {
    async function userInfoGet() {

      const res: any = await fetch('https://us-central1-sodium-mountain-418120.cloudfunctions.net/geolocation', { method: 'GET' });
      let geoLocation = await await res.json()
      const data = {
        geoLocation: geoLocation.city + ", " + geoLocation.country
      }

      let result = await userInitialInfo(data)

      let mail = result.mail.map((item: any) => item.emailAddress)
      let phone = result.phone.map((item: any) => item.phoneNumber)

      setUserInfo({
        ...userInfo,

        birthday: result.birthday,
        experience: result.experience,
        ctc: result.ctc,
        mybookmarkjob: result.mybookmarkjob,

        name: result.name,
        mail: mail,
        phone: phone,
        profile: result.profile,
        jobTitle: result.jobTitle,
        summary: result.summary,
        locatedin: result.locatedin,
        gender: result.gender,
        postedJob: result.postedJob,
        appliedJob: 0,
        bookmark: result.bookmark,
        profileViews: 0
      })
    }
    userInfoGet()
  }, [])

  const updateLocation = async () => {
    let result = await userlocationUpdate({
      ...userInfo,
    })
  }


  return (
    <div>
      {userInfo.name === "" ?
        <div className="w-full h-[400px] flex justify-center items-center flex-col text-gray-300">
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
