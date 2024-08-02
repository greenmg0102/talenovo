'use client'
import { useState, useEffect } from 'react';
import UserBannerMain from '@/components/UserProfile/UserBannerMain';
import UserInfoMain from '@/components/UserProfile/UserInfoMain';
import { userInitialInfo } from '@/store/action/user/userProfile/userInfo'
// import { jobTagGet } from '@/store/action/admin/jobInfo/jobTag'
import { useUser } from '@clerk/clerk-react';

const ToalMyJobPage = () => {

  const { user } = useUser();

  const [userInfo, setUserInfo] = useState<any>({

    birthday: "",
    experience: 0,
    ctc: 0,

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
    profileViews: 0,
    mybookmarkjob: []
  })

  useEffect(() => {
    async function userInfoGet() {

      const res: any = await fetch('https://us-central1-sodium-mountain-418120.cloudfunctions.net/geolocation', { method: 'GET' });
      let geoResult: any = await await res.json()

      const data = {
        geoLocation: geoResult.city + ", " + geoResult.region + ", " + geoResult.country
      }

      let result = await userInitialInfo(data)

      let mail = result.mail.map((item: any) => item.emailAddress)
      let phone = result.phone.map((item: any) => item.phoneNumber)

      if (user?.imageUrl && mail && phone) {

        setUserInfo({
          ...userInfo,

          birthday: result.birthday,
          experience: result.experience,
          ctc: result.ctc,
          mybookmarkjob: result.mybookmarkjob,

          avatar: user?.imageUrl,
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

    }
    userInfoGet()
  }, [user])

  return (
    <section className="pb-[120px] pt-[30px]">
      <div className="container flex justify-between items-start flex-wrap">
        <div className="w-full lg:w-[35%] pr-0 lg:pr-4 mb-12">
          <div className="border border-gray-200 rounded-[16px] p-4 shadow-2xl">
            <UserBannerMain
              userInfo={userInfo}
              setUserInfo={(total: any) => setUserInfo(total)}
            />
          </div>
        </div>
        <div className="w-full lg:w-[65%]">
          <UserInfoMain
            userInfo={userInfo}
            setUserInfo={(total: any) => setUserInfo(total)}
          />
        </div>
      </div>
    </section>
  );
};

export default ToalMyJobPage;
