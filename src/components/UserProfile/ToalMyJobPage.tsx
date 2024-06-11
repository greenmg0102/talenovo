'use client'
import { useState, useEffect } from 'react';
import UserBannerMain from '@/components/UserProfile/UserBannerMain';
import UserInfoMain from '@/components/UserProfile/UserInfoMain';

const ToalMyJobPage = () => {

  return (
    <section className="pb-[120px] pt-[30px]">
      <div className="container flex justify-between items-start flex-wrap">
        <div className="w-full lg:w-[35%] pr-0 lg:pr-4 mb-12">
          <div className="border border-gray-200 rounded-[16px] p-4 shadow-2xl">
            <UserBannerMain />
          </div>
        </div>
        <div className="w-full lg:w-[65%]">
          <UserInfoMain />
        </div>
      </div>
    </section>
  );
};

export default ToalMyJobPage;
