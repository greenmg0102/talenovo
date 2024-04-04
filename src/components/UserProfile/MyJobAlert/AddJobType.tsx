import { useState } from 'react';
import { GlobalOutlined } from '@ant-design/icons';
import { Radio } from 'antd';
import type { RadioChangeEvent } from 'antd';

const AddJobType = () => {

  const [value, setValue] = useState(1);

  const onChange = (e: RadioChangeEvent) => {
    setValue(e.target.value);
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
        <Radio.Group onChange={onChange} value={value}>
          <Radio value={1}>On-Site</Radio>
          <Radio value={2}>Hybrid</Radio>
          <Radio value={3}>Remote</Radio>
        </Radio.Group>
      </div>
    </div>
  );
};

export default AddJobType;
