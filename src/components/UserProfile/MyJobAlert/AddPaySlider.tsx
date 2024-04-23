import React, { useState } from 'react';
import { InputNumber, Slider } from 'antd'
import { DollarOutlined } from '@ant-design/icons';

const AddPaySlider = ({ range, setRange }: any) => {

  const onChange = (newValue: number) => {
    setRange(newValue);
  };

  return (
    <div className="">
      <div className='flex justify-start items-center pb-4 px-4 sm:px-16'>
        <DollarOutlined className='text-gray-500' />
        <p className='text-[16px] text-gray-600 flex justify-start items-center pl-2'>
          Payment Range
        </p>
      </div>
      {/* <p className='text-center text-[14px] text-gray-400'>Hourly</p> */}
      <div className='flex justify-center items-center px-4 sm:px-16'>
        <Slider
          min={1}
          max={200000}
          onChange={onChange}
          value={typeof range === 'number' ? range : 0}
          className='max-w-[500px] w-full'
        />

        <InputNumber
          min={1}
          max={200000}
          style={{ margin: '0 16px' }}
          value={range}
          onChange={onChange}
        />
      </div>
    </div>
  );
};

export default AddPaySlider;
