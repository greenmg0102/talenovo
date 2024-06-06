import { useState } from 'react';
import { GlobalOutlined } from '@ant-design/icons';
import { Radio } from 'antd';
import type { RadioChangeEvent } from 'antd';

const AddJobLocation = ({ setJobType, jobType }: any) => {

  const onChange = (e: RadioChangeEvent) => {
    setJobType(e.target.value);
  };

  return (
    <div className='w-full mb-4 md:mb-0 md:w-1/2'>
      <div className='flex justify-center items-center pb-4 px-4 sm:px-16'>
        <GlobalOutlined className='text-gray-500 font-semibold' />
        <p className='text-[16px] text-gray-600 pl-2 font-semibold'>
          Job Location
        </p>
      </div>
      <div className="flex justify-center items-center flex-wrap px-4 sm:px-16">
        <p>Location Search UI</p>
      </div>
    </div>
  );
};

export default AddJobLocation;
