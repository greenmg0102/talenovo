import { useState } from 'react';
import { BarsOutlined } from '@ant-design/icons';
import { Radio } from 'antd';
import type { RadioChangeEvent } from 'antd';

const AddJobType = ({ setJobType, jobType }: any) => {

  const onChange = (e: RadioChangeEvent) => {
    setJobType(e.target.value);
  };

  return (
    <div className='w-full mb-4 md:mb-0 md:w-1/2'>
      <div className='flex justify-center items-center pb-4 px-4 sm:px-16'>
        <BarsOutlined  className='text-gray-500 font-semibold' />
        <p className='text-[16px] text-gray-600 pl-2 font-semibold'>
          Job Type
        </p>
      </div>
      <div className="flex justify-center items-center">
        <Radio.Group onChange={onChange} value={jobType}>
          <Radio value={1}>On-Site</Radio>
          <Radio value={2}>Hybrid</Radio>
          <Radio value={3}>Remote</Radio>
        </Radio.Group>
      </div>
    </div>
  );
};

export default AddJobType;
