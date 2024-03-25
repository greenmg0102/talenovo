'use client'
import { useState, useEffect } from "react";
import UserInfo from "@/components/UserProfile/UserInitialInfo/UserInfo";
import { userInitialInfo } from '@/store/action/user/userProfile/userInfo';
import UserDashboard from '@/components/UserProfile/UserDashboard';

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
    profileViews: 0
  })

  useEffect(() => {
    async function userInfoGet() {
      let result = await userInitialInfo()

      let mail = result.mail.map((item: any) => item.emailAddress)
      let phone = result.phone.map((item: any) => item.phoneNumber)

      setUserInfo({
        ...userInfo,

        birthday: result.birthday,
        experience: result.experience,
        ctc: result.ctc,

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


  return (
    <div>
      {userInfo.name === "" ?
        <div className="w-full h-[400px] flex justify-center items-center text-gray-300">
          Please wait ...
        </div>
        :
        <div>
          <UserInfo
            userInfo={userInfo}
            onchange={(total: any) => setUserInfo(total)}
          />
          <UserDashboard
            skill={userInfo.skill}
            locatedin={userInfo.locatedin}
          />
        </div>
      }
    </div>
  );
};

export default UserInfoMain;
