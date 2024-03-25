'use client'
import { useState, useEffect } from 'react';
import EditButton from '@/components/Common/Button/EditButton'
import UserInfoModal from '@/components/UserProfile/UserInitialInfo/UserInfoModal'

const UserInitialInfo = ({ userInfo, onchange }: any) => {

  const [isModalVisible, setIsModalVisible] = useState(false);

  const add = () => {
    setIsModalVisible(!isModalVisible)
  }

  return (
    <div className="relative">
      {/* <UserInfoModal
        userInfo={userInfo}
        isModalVisible={isModalVisible}
        onchange={(total: any) => onchange(total)}
        setIsModalVisible={(bool: any) => setIsModalVisible(bool)}
      /> */}
      {/* <EditButton add={add} /> */}
      <p className='text-center py-6 text-[32px]'>User Information</p>

      <div className='flex justify-between items-start flex-wrap py-8 pb-0 border border-dashed border-r-0 border-l-0'>

        <div className='w-full sm:w-1/3 mb-12'>
          <p className='text-center'>Phone Number</p>
          {userInfo.phone.map((item: any, index: any) =>
            <p key={index} className='text-center text-blue-500'>{item}</p>
          )}
        </div>

        <div className='w-full sm:w-1/3 mb-12'>
          <p className='text-center'>Mail Address</p>
          {userInfo.mail.map((item: any, index: any) =>
            <p key={index} className='text-center text-blue-500'>{item}</p>
          )}
        </div>

        <div className='w-full sm:w-1/3 mb-12'>
          <p className='text-center'>located in</p>
          <p className='text-center text-blue-500'>{userInfo.locatedin}</p>
        </div>

        {/* <div className='w-full sm:w-1/3 mb-12'>
          <p className='text-center'>Age</p>
          {userInfo.birthday === "" ?
            <p className="text-center text-gray-300 text-[14px]">
              You did n't register <span className='text-gray-400'> Your Birthday </span>yet
            </p>
            :
            <p className="text-center text-blue-500" >
              {userInfo.birthday}
            </p>
          }
        </div> */}

        {/* <div className='w-full sm:w-1/3 mb-12'>
          <p className='text-center'>Experience</p>
          {userInfo.experience === 0 ?
            <p className="text-center text-gray-300 text-[14px]">
              You did n't register <span className='text-gray-400'> Year of the Experience </span>yet
            </p>
            :
            <p className="text-center text-blue-500" >
              {userInfo.experience}
            </p>
          }
        </div> */}

        {/* <div className='w-full sm:w-1/3 mb-12'>
          <p className='text-center'>CTC</p>
          {userInfo.ctc === 0 ?
            <p className="text-center text-gray-300 text-[14px]">
              You did n't register <span className='text-gray-400'> Expected CTC </span>yet
            </p>
            :
            <p className="text-center text-blue-500" >
              {userInfo.ctc} $
            </p>
          }
        </div> */}

        <div className='w-full sm:w-1/3 mb-12'>
          <p className='text-center'>Profile views</p>
          <p className='text-center text-[32px] text-blue-500'>{userInfo.profileViews}</p>
        </div>

        <div className='w-full sm:w-1/3 mb-12'>
          <p className='text-center'>Bookmarked Job</p>
          <p className='text-center text-[32px] text-blue-500'>{userInfo.bookmark}</p>
        </div>

        {/*<div className='w-full sm:w-1/3 mb-12'>
          <p className='text-center'>Job applied</p>
          <p className='text-center text-[32px] text-blue-500'>{userInfo.appliedJob}</p>
        </div> */}

        {/* <div className='w-full sm:w-1/3 mb-12'>
          <p className='text-center'>Job posted</p>
          <p className='text-center text-[32px] text-blue-500'>{userInfo.postedJob}</p>
        </div> */}

        {/* <div className='w-full sm:w-1/3 mb-12'>
          <p className='text-center'>Gender</p>
          <p className='text-center text-blue-500'>{userInfo.gender}</p>
        </div> */}
      </div>
    </div>
  );
};

export default UserInitialInfo;
