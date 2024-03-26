import React, { useState } from 'react';
import { InputNumber, Slider } from 'antd'
import { DollarOutlined } from '@ant-design/icons';

const AddPaySlider = () => {

  const [inputValue, setInputValue] = useState(50000);

  const onChange = (newValue: number) => {
    setInputValue(newValue);
  };

  return (
    <div className="">
      <div className='flex justify-start items-center pb-4'>
        <DollarOutlined className='text-gray-500' />
        <p className='text-[14px] text-gray-600 flex justify-start items-center pl-2'>
          Payment Range
        </p>
      </div>
      {/* <p className='text-center text-[14px] text-gray-400'>Hourly</p> */}
      <div className='flex justify-center items-center'>
        <Slider
          min={1}
          max={200000}
          onChange={onChange}
          value={typeof inputValue === 'number' ? inputValue : 0}
          className='max-w-[500px] w-full'
        />

        <InputNumber
          min={1}
          max={200000}
          style={{ margin: '0 16px' }}
          value={inputValue}
          onChange={onChange}
        />
      </div>
    </div>
  );
};

export default AddPaySlider;
