'use client'
import { useState, useEffect } from "react";
import UserBanner from "@/components/UserProfile/UserInitialInfo/UserBanner";
import UserInfo from "@/components/UserProfile/UserInitialInfo/UserInfo";
import { userInitialInfo } from '@/store/action/user/userProfile/userInfo'

const UserInitialInfo = () => {

  const [userInfo, setUserInfo] = useState({
    mail: [],
    phone: [],
    profile: "",
    locatedin: "",
    gender: "",
    postedJob: 0,
    appliedJob: 0,
    profileViews: 0
  })

  useEffect(() => {
    async function userInfoGet() {
      let result = await userInitialInfo()

      let mail = result.mail.map((item: any) => item.emailAddress)
      let phone = result.phone.map((item: any) => item.phoneNumber)

      setUserInfo({
        mail: mail,
        phone: phone,
        profile: result.profile,
        locatedin: result.locatedin,
        gender: result.gender,
        postedJob: result.postedJob,
        appliedJob: 0,
        profileViews: 0
      })
    }
    userInfoGet()
  }, [])

  return (
    <div className="flex justify-between items-start border">
      <div className="w-1/4 border">
        <UserBanner
          userInfo={userInfo}
          onchange={(total: any) => setUserInfo(total)}
        />
      </div>
      <div className="w-3/4">
        <UserInfo
          userInfo={userInfo}
          onchange={(total: any) => setUserInfo(total)}
        />
      </div>
    </div>
  );
};

export default UserInitialInfo;