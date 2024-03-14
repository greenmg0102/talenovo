'use client'
import { useState } from 'react';
import EditButton from '@/components/Common/Button/EditButton'
import UserInfoModal from '@/components/UserProfile/UserInitialInfo/UserInfoModal'

const UserInitialInfo = ({ userInfo, onchange }: any) => {

  const [isModalVisible, setIsModalVisible] = useState(false);

  const add = () => {
    setIsModalVisible(!isModalVisible)
  }

  return (
    <div className="relative">
      <UserInfoModal
        userInfo={userInfo}
        isModalVisible={isModalVisible}
        onchange={(total: any) => onchange(total)}
        setIsModalVisible={(bool: any) => setIsModalVisible(bool)}
      />
      <EditButton add={add} />
      <p className='text-center py-6 text-[32px]'>User Information</p>

      <div className='flex justify-between items-start py-8 border border-dashed border-r-0 border-l-0'>
        <div className='w-1/3'>
          <p className='text-center'>Phone Number</p>
          {userInfo.phone.map((item: any, index: any) =>
            <p key={index} className='text-center text-blue-500'>{item}</p>
          )}
        </div>
        <div className='w-1/3'>
          <p className='text-center'>Lives in</p>
          <p className='text-center text-blue-500'>{userInfo.locatedin}</p>
        </div>
        <div className='w-1/3'>
          <p className='text-center'>Gender</p>
          <p className='text-center text-blue-500'>{userInfo.gender}</p>
        </div>
      </div>

      <div className='flex justify-between items-center pt-8'>
        <div className='w-1/3'>
          <p className='text-center'>Job applied</p>
          <p className='text-center text-[32px] text-blue-500'>{userInfo.appliedJob}</p>
        </div>
        <div className='w-1/3'>
          <p className='text-center'>Jb posted</p>
          <p className='text-center text-[32px] text-blue-500'>{userInfo.postedJob}</p>
        </div>
        <div className='w-1/3'>
          <p className='text-center'>Profile views</p>
          <p className='text-center text-[32px] text-blue-500'>{userInfo.profileViews}</p>
        </div>
      </div>
    </div>
  );
};

export default UserInitialInfo;
