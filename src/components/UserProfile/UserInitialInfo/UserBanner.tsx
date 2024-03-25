'use client'
import { useState } from 'react';
import clsx from 'clsx';
import EditButton from '@/components/Common/Button/EditButton'
import UserBannerModal from '@/components/UserProfile/UserInitialInfo/UserBannerModal'

const UserBanner = ({ userInfo, tagList, onchange }: any) => {

  const [isModalVisible, setIsModalVisible] = useState(false);

  const add = () => {
    setIsModalVisible(!isModalVisible)
  }

  return (
    <div className="relative p-2">
      <UserBannerModal
        tagList={tagList}
        userInfo={userInfo}
        isModalVisible={isModalVisible}
        setIsModalVisible={(bool: any) => setIsModalVisible(bool)}
        onchange={(total: any) => onchange(total)}
      />
      <EditButton add={add} />

      <div className="flex justify-center py-4">
        <div className="w-[100px] h-[100px] rounded-full border-gray-200 border-[3px] flex justify-center items-center">
          <img src={userInfo.avatar} className='w-full bg-cover rounded-full shadow-lg' alt="avatar" />
        </div>
      </div>

      <p className={clsx("text-center mb-2 font-bold", userInfo.name === "" ? "text-gray-300" : "text-blue-500")}>
        {userInfo.name === "" ? "Please wait ..." : userInfo.name}
      </p>
      {userInfo.jobTitle === "" ?
        <p className="text-center mb-6 font-bold text-gray-300 text-[14px]">
          You did n't register <span className='text-gray-400'> Job Title </span>yet
        </p>
        :
        <p className="text-center mb-6 font-bold text-gray-600 text-[14px]" >
          {userInfo.jobTitle}
        </p>
      }

      <p className="text-center text-[12px]">Profile link</p>
      {userInfo.profile === "" ?
        <p className="text-center mb-6 font-bold text-gray-300 text-[14px]" >
          You did n't register <span className='text-gray-400'> profile link </span>yet
        </p>
        :
        <a href={userInfo.profile} target="_blank">
          <p className="text-center mb-6 font-bold text-gray-600 text-[14px] hover:underline" >
            {userInfo.profile}
          </p>
        </a>
      }

      <p className="text-center text-[12px]">Summary</p>
      {userInfo.summary === "" ?
        <p className="text-center mb-6 font-bold text-gray-300 text-[14px]" >
          You did n't register <span className='text-gray-400'> summary </span>yet
        </p>
        :
        <p className="mb-6 text-gray-600 p-2 border border-gray-100 break-words text-[14px]" >
          {userInfo.summary}
        </p>
      }

      <p className="text-center text-[12px]">Skill</p>
      {userInfo.skill.length === 0 ?
        <p className="text-center mb-6 font-bold text-gray-300" >
          You did n't register <span className='text-gray-400'> Skill </span>yet
        </p>
        :
        <div className='flex justify-start items-center flex-wrap'>
          {userInfo.skill.map((item: any, index: any) =>
            <p key={index} className="text-center mb-1 mr-2 px-2 text-[12px] font-bold text-gray-500 border border-gray-300 rounded-[3px]" >
              {item}
            </p>
          )}
        </div>
      }

      {/* <div className='flex justify-between items-center flx-wrap mt-4'>
        <p className="text-[12px]">Profile Level</p>
        <p className="">Premium</p>
      </div> */}

    </div>
  );
};

export default UserBanner;
