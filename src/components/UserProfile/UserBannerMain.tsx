'use client'
import { useState, useEffect } from "react";
import UserBanner from "@/components/UserProfile/UserInitialInfo/UserBanner";
import { userInitialInfo } from '@/store/action/user/userProfile/userInfo'
import { jobTagGet } from '@/store/action/admin/jobInfo/jobTag'
import type { SelectProps } from 'antd';

const options: SelectProps['options'] = [];

const UserBannerMain = () => {

  const [userInfo, setUserInfo] = useState({
    avatar: "",
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
    profileViews: 0
  })

  const [tagList, setTagList] = useState([])

  useEffect(() => {
    async function fetchData() {
      let result = await jobTagGet()
      let options: any = []
      for (let i = 10; i < result.length; i++) {
        options.push({
          value: result[i].tag,
          label: result[i].tag,
        });
      }
      setTagList(options)
    }
    fetchData()
  }, [])

  useEffect(() => {
    async function userInfoGet() {
      let result = await userInitialInfo()

      console.log('result', result);


      let mail = result.mail.map((item: any) => item.emailAddress)
      let phone = result.phone.map((item: any) => item.phoneNumber)

      setUserInfo({
        ...userInfo,
        avatar: result.avatar,
        name: result.name,
        mail: mail,
        phone: phone,
        profile: result.profile,
        jobTitle: result.jobTitle,
        summary: result.summary,
        skill: result.skill,
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

  return (
    <div>
      {userInfo.name === "" ?
        <div className="w-full h-[400px] flex justify-center items-center text-gray-300">
          Please wait ...
        </div>
        :
        <UserBanner
          tagList={tagList}
          userInfo={userInfo}
          onchange={(total: any) => setUserInfo(total)}
        />}
    </div>
  );
};

export default UserBannerMain;
