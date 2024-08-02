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
    bookmark: 0,
    profileViews: 0
  })

  useEffect(() => {
    async function userInfoGet() {

      const res: any = await fetch('https://us-central1-sodium-mountain-418120.cloudfunctions.net/geolocation', { method: 'GET' });
      let geoResult: any = await await res.json()

      const data = {
        geoLocation: geoResult.city + ", " + geoResult.region + ", " + geoResult.country
      }

      let result: any = await userInitialInfo(data)

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
        bookmark: result.bookmark,
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
