import { useState } from 'react';
import { GlobalOutlined } from '@ant-design/icons';
import { Radio } from 'antd';
import type { RadioChangeEvent } from 'antd';

const AddJobType = ({ setJobType, jobType }: any) => {

  const onChange = (e: RadioChangeEvent) => {
    setJobType(e.target.value);
  };

  return (
    <div>
      <div className='flex justify-start items-center pb-4 px-4 sm:px-16'>
        <GlobalOutlined className='text-gray-500' />
        <p className='text-[16px] text-gray-600 flex justify-start items-center pl-2'>
          Job Type
        </p>
      </div>
      <div className="flex justify-center items-center flex-wrap px-4 sm:px-16">
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
