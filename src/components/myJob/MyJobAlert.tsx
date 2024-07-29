'use client'
import { useState } from 'react';
// import UserBannerMain from '@/components/UserProfile/UserBannerMain';
// import UserInfoMain from '@/components/UserProfile/UserInfoMain';
// import { userInitialInfo } from '@/store/action/user/userProfile/userInfo'
// // import { jobTagGet } from '@/store/action/admin/jobInfo/jobTag'
// import { useUser } from '@clerk/clerk-react';
import SideMenu from './sideMenu'
import clsx from 'clsx'

const MyJobAlertPage = () => {

  const [isFold, setIsFold] = useState(false)

  return (
    <section className="pb-[120px] pt-[30px]">
      <div className="container flex justify-between items-start flex-wrap">
        <div className={clsx("transition-all", `w-[${isFold ? '80px' : '250px'}]`)}>
          <SideMenu
            isFold={isFold}
            setIsFold={(bool: any) => setIsFold(bool)}
          />
        </div>
        <div className={clsx("transition-all", `w-[calc(100%-${isFold ? 100 : 250}px)]`)}>
          <div className=' border rounded-[12px] p-4 overflow-hidden shadow-lg'>
            MyJobAlertPage
          </div>
        </div>
      </div>

    </section>
  );
};

export default MyJobAlertPage;
