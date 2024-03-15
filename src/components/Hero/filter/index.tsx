import React from "react";
import { Slider, Checkbox, Divider } from 'antd';

const Filter = () => {

  return (
    <div className="">
      <div className="flex justify-between items-center">
        <p className="font-bold text-gray-500 text-[16px]">Filter</p>
        <p className="font-bold text-blue-500 text-[12px]">Clear all</p>
      </div>
      <p className="font-bold text-gray-500 text-[14px] mt-8 mb-4">Salary</p>
      <Slider range defaultValue={[20, 50]} />
      <Divider />
      <p className="font-bold text-gray-500 text-[14px] mt-8 mb-4">Job Type</p>
      <div className="flex justify-between items-center mb-2">
        <div className="flex justify-start items-center">
          <Checkbox /> <p className="text-[12px] text-gray-500 ml-2 mb-0">Full-Time</p>
        </div>
        <p className="text-[12px] text-gray-500 ml-2 mb-0">326 jobs</p>
      </div>


      <div className="flex justify-between items-center mb-2">
        <div className="flex justify-start items-center">
          <Checkbox /> <p className="text-[12px] text-gray-500 ml-2 mb-0">Part-Time</p>
        </div>
        <p className="text-[12px] text-gray-500 ml-2 mb-0">125 jobs</p>
      </div>


      <div className="flex justify-between items-center mb-2">
        <div className="flex justify-start items-center">
          <Checkbox /> <p className="text-[12px] text-gray-500 ml-2 mb-0">Contract</p>
        </div>
        <p className="text-[12px] text-gray-500 ml-2 mb-0">245 jobs</p>
      </div>

      <Divider />

      <p className="font-bold text-gray-500 text-[14px] mt-8 mb-4">Job Location</p>
      <div className="flex justify-between items-center mb-2">
        <div className="flex justify-start items-center">
          <Checkbox /> <p className="text-[12px] text-gray-500 ml-2 mb-0">On-Site</p>
        </div>
        <p className="text-[12px] text-gray-500 ml-2 mb-0">1245 jobs</p>
      </div>

      <div className="flex justify-between items-center mb-2">
        <div className="flex justify-start items-center">
          <Checkbox /> <p className="text-[12px] text-gray-500 ml-2 mb-0">Remote</p>
        </div>
        <p className="text-[12px] text-gray-500 ml-2 mb-0">98 jobs</p>
      </div>
      <Divider />
      <p className="font-bold text-gray-500 text-[14px] mt-8 mb-4">Applications</p>

      <div className="flex justify-between items-center mb-2">
        <div className="flex justify-start items-center">
          <Checkbox /> <p className="text-[12px] text-gray-500 ml-2 mb-0">Less than 10</p>
        </div>
        <p className="text-[12px] text-gray-500 ml-2 mb-0">124 jobs</p>
      </div>
      <div className="flex justify-between items-center mb-2">
        <div className="flex justify-start items-center">
          <Checkbox /> <p className="text-[12px] text-gray-500 ml-2 mb-0">10 to 50</p>
        </div>
        <p className="text-[12px] text-gray-500 ml-2 mb-0">235 jobs</p>
      </div>
      <div className="flex justify-between items-center mb-2">
        <div className="flex justify-start items-center">
          <Checkbox /> <p className="text-[12px] text-gray-500 ml-2 mb-0">50 to 100</p>
        </div>
        <p className="text-[12px] text-gray-500 ml-2 mb-0">572 jobs</p>
      </div>
      <div className="flex justify-between items-center mb-2">
        <div className="flex justify-start items-center">
          <Checkbox /> <p className="text-[12px] text-gray-500 ml-2 mb-0">100 +</p>
        </div>
        <p className="text-[12px] text-gray-500 ml-2 mb-0">2372 jobs</p>
      </div>
    </div>
  );
};

export default Filter;
