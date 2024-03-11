'use client'
import { useState } from 'react';
import EditButton from '@/components/Common/Button/EditButton'
import UserBannerModal from '@/components/UserProfile/UserInitialInfo/UserBannerModal'

const UserBanner = () => {

  const [isModalVisible, setIsModalVisible] = useState(false);

  const add = () => {
    setIsModalVisible(!isModalVisible)
  }

  return (
    <div className="relative p-2 px-4">
      <UserBannerModal
        isModalVisible={isModalVisible}
        setIsModalVisible={(bool: any) => setIsModalVisible(bool)}
      />
      <EditButton add={add} />
      <div className="flex justify-center py-4">
        <div className="w-[100px] h-[100px] rounded-full border-gray-200 border-[3px] flex justify-center items-center">
          avatar
        </div>
      </div>
      <p className="text-center mb-6">Galen Bowles</p>
      <p className="text-[12px]">Mail address</p>
      <p className="mb-6">greenmeansg0102@outlook.com</p>
      <p className="text-[12px]">Profile link</p>
      <p className="mb-6">https://www.linkedin.com/in/galen-bowles-21bbb47a/</p>
      <p className="text-[12px]">Profile Level</p>
      <p className="">Premium</p>
    </div>
  );
};

export default UserBanner;
