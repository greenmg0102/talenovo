'use client'
import UserBanner from "@/components/UserProfile/UserInitialInfo/UserBanner";
// import { jobTagGet } from '@/store/action/admin/jobInfo/jobTag'
import { Spin } from 'antd';
import type { SelectProps } from 'antd';

const options: SelectProps['options'] = [];

const UserBannerMain = ({ userInfo, setUserInfo }: any) => {

  // useEffect(() => {
  //   async function fetchData() {
  //     let result = await jobTagGet()
  //     let options: any = []
  //     for (let i = 10; i < result.length; i++) {
  //       options.push({
  //         value: result[i].tag,
  //         label: result[i].tag,
  //       });
  //     }
  //     setTagList(options)
  //   }
  //   fetchData()
  // }, [])

  return (
    <div>
      {userInfo.name === "" ?
        <div className="w-full h-[400px] flex justify-center items-center flex-col text-gray-300">
          <Spin size="large" />
          <p className="mt-2 text-blue-500">Please wait ...</p>
        </div>
        :
        <UserBanner
          userInfo={userInfo}
          onchange={(total: any) => setUserInfo(total)}
        />}
    </div>
  );
};

export default UserBannerMain;
